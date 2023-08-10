<template>
      <div class="upload py-6">
        <h2 class="text-3xl mb-3">{{ fileType.toUpperCase() }} file</h2>
        <hr class="mb-3">
        <form ref="mexForm" id="mexForm">
          <input
            class="my-3 w-60"
            name="mexFile"
            @change="uploadedFile"
            type="file"
            id="mexFiles"
            multiple
          />
        </form>
        <button type="button" @click="sendFile" class="button">
          Get file Info
        </button>
        <button v-if="state.status === 'Success'" type="button" @click="goToDetails" class="button ml-3">
          View File details
        </button>
        <p class="my-3" v-if="state.status !== ''">Status: {{ state.status }}. {{ state.message }}</p>
      </div>
</template>

<script>
import { reactive } from 'vue';
import router from '@/router';
import { useFileStore } from '@/store';

export default {
  name: "UpLoad",
  props: {
    fileType: String
  },
  setup(props) {
    const state = reactive({
      message: "",
      file: null,
      fileInfo: null,
      status: ""
    });

    const store = useFileStore();

    function uploadedFile(event) {
      state.file = event.target.files;
    };

    function goToDetails() {
      store.setFileInfo(state.fileInfo);
      
      router.push({
        path: '/details'
      })
    }

    const sendFile = async () => {
      const formData = new FormData();

      if (!state.file) {
        state.status = "error";
        state.message = `You need to upload a ${props.fileType} file.`; 
        return;
      }

      Object.keys(state.file).forEach((key) => {
        formData.append(state.file.item(key).name, state.file.item(key));
      });

      const response = await fetch(`${process.env.VUE_APP_APIURL}/${props.fileType}`, {
        method: "POST",
        body: formData,
      }).catch((err) => {
        console.log(err);
      });

      const json = await response.json();
      state.message = json.message;
      state.status = json.status;

      if (json) {
        state.fileInfo = json.fileInfo
        console.log(json.fileInfo);
      }
    }

    return {
      state,
      uploadedFile,
      sendFile,
      goToDetails
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #F87575;
}

.upload {
  background: #4A4E69;
  color: #F87575;
}

.button {
  width: auto;
  align-self: center;
  padding: 10px;
  color: white;
  background: #F87575;
  border: none;
  border-radius: 5px;
}


</style>

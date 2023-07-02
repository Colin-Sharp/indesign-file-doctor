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
        <p class="my-3" v-if="status !== ''">Status: {{ status }}</p>
        <p>{{ message }}</p>
      </div>
</template>


<script>
import FileInfo from "./FileInfo.vue";

export default {
  components: { FileInfo },
  name: "UpLoad",
  component: {
    FileInfo,
  },
  props: {
    fileType: String
  },
  data: () => {
    return {
      message: "",
      file: null,
      currentForm: null,
      status: "",
      open: false,
    };
  },
  methods: {
    uploadedFile(event) {
      this.file = event.target.files;
    },
    sendFile: async function () {
      const formData = new FormData();

      if (!this.file) {
        this.status = "error";
        this.message = `You need to upload a ${this.fileType} file.`; 
        return;
      }

      Object.keys(this.file).forEach((key) => {
        formData.append(this.file.item(key).name, this.file.item(key));
      });

      const response = await fetch(`${process.env.VUE_APP_APIURL}/${this.fileType}`, {
        method: "POST",
        body: formData,
      }).catch((err) => {
        console.log(err);
      });

      const json = await response.json();
      this.message = json.message;
      this.status = json.status;
      if (json) {
        console.log(json.fileInfo);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  color: #42b983;
}

.upload {
  background: #235454;
  color: #d8a1d3;
}

.button {
  width: auto;
  align-self: center;
  padding: 10px;
  color: white;
  background: #42b983;
  border: none;
  border-radius: 5px;
}


</style>

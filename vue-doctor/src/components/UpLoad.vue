<template>
      <div class="upload py-6">
        <h2 class="text-3xl mb-3">{{ fileType.toUpperCase() }} file</h2>
        <hr class="mb-3">
        <form ref="mexForm" id="mexForm">
          <input
            class="single-upload"
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
      if (json.fileInfo) {
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

.restore-container {
  border: #42b983 2px solid;
  border-radius: 10px;
  background: #d2cdcd;
  padding: 10px 0;
}

.single-upload {
  align-self: center;
  margin: 0 0 20px 50px;
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

.restore-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.restore-options {
  display: flex;
  flex-direction: column;
}

.file-data {
  display: flex;
  justify-content: space-between;
}

.file-data .mex-container {
  width: 46%;
}
</style>

<template>
    <div class="restore-container py-6">
        <h2 class="text-3xl mb-3">Create script to restore InDesign values with mex file.</h2>
        <hr>
          <div class="restore-wrapper">
            <div class="restore-options">
              <label for="cars">What do you want to restore?</label>
              <select name="cars" id="cars">
                <option value="volvo">Logic</option>
                <option value="saab">Variables</option>
              </select>
            </div>
            <div class="restore-upload">
              <h2>Mex file</h2>
              <input class="single-upload" @change="uploadedFile" type="file" id="restoreFilesMex" multiple />
            </div>
          </div>
          <button class="button" @click="sendFile">Restore</button>
        </div>
</template>

<script>
export default {
    name: "RestoreData",
    setup() {
        
    },
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

.mex-container {
  border: #F87575 2px solid;
  border-radius: 10px;
  padding: 50px 0;
  display: flex;
  background: #d3cdcd;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  align-content: center;
  margin: 0 0 30px;
}

.restore-container {
  width: 100%;
  background: #4A4E69;
  color: #F87575;
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
  background: #F87575;
  border: none;
  border-radius: 5px;
}
.upload {
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  align-content: center;
  max-width: 80%;
  margin: 0 10% 50px;
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
<template>
    <div id="app">
      <h1 class="my-10 text-4xl">File Doctor</h1>
      <div class="flex max-w-6xl mx-auto">
        <UpLoad class="w-6/12 mr-2" fileType="mex" />
        <UpLoad class="w-6/12 ml-2" fileType="idml" />
      </div>
      <div class="flex max-w-6xl mx-auto mt-3">
        <RestoreData />
      </div>
    </div>
  </template>
  
  <script>
  import UpLoad from '../components/UpLoad.vue';
  import RestoreData from '../components/RestoreData.vue';
  
  export default {
    name: 'Home',
    components: {
      UpLoad,
      RestoreData
    }
  };
  </script>
  
  <style>
  h1 {
    color: #d8a1d3;
  }
  body {
    background: #171718;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  
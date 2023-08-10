<template>
  <h1 class="text-4xl">File Details</h1>
  <div class="flex max-w-6xl mx-auto">
    <Logic v-if="state.logicRules.length" :data="state.logicRules"></Logic>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useFileStore } from "@/store";
import { onMounted } from "vue";
import Logic from "../components/Logic.vue";

export default {
  components: {
    Logic,
  },
  setup() {
    const store = useFileStore();
    const state = reactive({
      logicRules: []
    })
    onMounted(() => { 
      console.log(store.getFileInfo);
      const fileInfo = store.getFileInfo;
      state.logicRules = fileInfo.logicRules ? fileInfo.logicRules : [];
    });
    return {
      state
    }      
  },
};
</script>

<template>
    <h1 class="text-4xl">File Details</h1>
</template>

<script>
import { useFileStore } from '@/store';
import { onMounted } from "vue";

export default {
    setup() {
        const store = useFileStore();
       onMounted(() => {
        console.log(store.getFileInfo);
       })
    }
}
</script>
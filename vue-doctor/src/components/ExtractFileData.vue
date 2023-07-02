<template>
  <div class="upload py-6">
    <h2 class="text-3xl mb-3">{{ fileType.toUpperCase() }} file</h2>
    <hr class="mb-3" />
    <form>
      <input
        class="my-3 w-60"
        name="mexFile"
       
        type="file"
        id="mexFiles"
        multiple
      />
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExtractFileData",
  props: {
    fileType: String,
  },
  setup() {

  },
});
</script>

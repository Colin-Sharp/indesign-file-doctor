<template>
    <div class="bg-gradient-to-tr from-green-700 via-emerald-400 to-green-400 p-4">
        <h1></h1>

    </div>
</template>

<script>
import { reactive } from 'vue';

export default {
    name: "LoadFileInfo",
    props: {
        fileType: String
    },
    setup(props) {
        const state = reactive({
            fileType: props.fileType
        })

        return state
    },
}
</script>
<template>
    <div v-if="isOpen" class="file-data">
        <div @click="close" class="modal-background"></div>
        <div class="content">
            <h1>File data</h1>
            <h2>File type: Mex</h2>
            <h3>Logic:</h3>
            <p class="red">Amount of Rules: 85</p>
            <p>Amount of items: 2</p>
            <h3>Image:</h3>
            <p class="red">Total Image size: 80BM</p>
            <h3>Fonts:</h3>
            <p>NexaRustSans-Black02.otf, GothamCondensed-Bold.otf</p>
            <h3>Variables:</h3>
            <p>Amount: 10</p>
            <p>Type: Text, Dropdown, color</p>
            <h3>Pages</h3>
            <p>Amount: 2</p>
            <h3>Fields</h3>
            <p>Amount: 10</p>
            <p>Types: color, text, dropdown</p>
        </div>
    </div>
</template>


<script>
export default {
    name:'FileInfo',
    props: {
        isActive: Boolean
    },
    emits: ['close'],
    data() {
        return {
            active: this.isActive
        }
    },
    computed: {
        isOpen() {
            return this.isActive;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style>
.modal-background {
    background-color: rgba(15,19,22,.86);
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
}

.modal-background + .content {
    background: #e5e3e3;
    z-index: 1000;
    border-radius: 10px;
    padding: 1rem;
    width: 45vw;
    position: absolute;
    top: 5vh;
    left: calc(50% - 22.5vw);
    height: 80vh;
}

.red {
    color: red;
}

</style>
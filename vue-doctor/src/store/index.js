import { defineStore } from "pinia";

export const useFileStore = defineStore('fileInfo', {
    state: () => ({
        fileInfo: {}
    }),
    actions: {
        setFileInfo(fileInfo) {
            this.fileInfo = fileInfo;
        }
    },
    getters: {
        getFileInfo: (state) => {
            return state.fileInfo;
        }
    }
})
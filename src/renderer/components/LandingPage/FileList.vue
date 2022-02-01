<template>
    <ul class = "fileList">
        <FileItem v-for="(data, index) in dataList" :file="data" :index="index" :key="index" ref="fileItem"/>
    </ul>
</template>
<script>
import FileItem from './FileItem.vue'

export default {
    components: {
        FileItem
    },
    props: [
        'dataList'
    ],
    updated() {
        this.$refs.fileItem.forEach(
            data => {
                data.$off();
                data.$on('deleteFile', (index) => {
                    this.dataList.splice(index, 1);
                });
            }
        );
    }
}
</script>

<style scoped>
</style>
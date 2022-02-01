<template>
    <div class="search">
        <md-field class="field">
            <label>{{ dataType }}</label>
            <md-file 
                id="fileSelector"
                ref="file"
                type="file"
                :accept=dataType
                v-model="placeholder"
                @md-change="selectFile($event)"/>
        </md-field>
        <md-button 
            class="add"
            v-on:click = "addFileToList()">
            add
        </md-button>
    </div>
</template>

<script>
export default {
    name: "FileSearch",
    props: ["title", "dataType"],
    data () {
        return {
            file: null,
            placeholder: null
        }
    },
    methods: {
        selectFile(f) {
            this.file = f[0];
        },
        addFileToList() {
            this.$emit("newFile", this.file);
        }
    },
}
</script>

<style scoped>
</style>
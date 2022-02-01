<template>
  <div id="upload">
    <Settings ref="settings"/>
    <FileSearch ref="fileSearch" :title="searchTitle" :dataType="dataType"/>
    <FileList ref="fileList" v-bind:data-list="dataList" v-bind="user"/>
  </div>
</template>

<script>
import FileSearch from "./FileSearch.vue";
import FileList from "./FileList.vue";
import Settings from "./Settings.vue";
export default {
  name: "FileUpload",
  components: {
    FileSearch,
    FileList,
    Settings
  },
  data: () => {
    return {
      dataList: [],
      dataType: ".tif, .tiff",
      searchTitle: "Mapbox Tileset Uploader",
      user: {
        id: '',
        token: '',
      }
    };
  },
  mounted() {
    this.$refs.fileSearch.$on("newFile", (newFile) => {
      this.dataList.push(newFile);
    });
    this.$refs.settings.$on("id", (id) => {
      this.user.id = id
    })
    this.$refs.settings.$on("token", (token) => {
      this.user.token = token
    })
  },
};
</script>
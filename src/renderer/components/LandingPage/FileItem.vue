<template>
  <div class="md-layout gutter md-alignment-center-center item-wrapper" v-if="!deleted">
    <div class="md-layout-item">
      {{ this.file.name }}
    </div>
    <div class="md-layout-item">
      <span class="status uploading" v-if="currentStatus == 'uploading'">
        <md-progress-spinner
          :md-diameter="10"
          :md-stroke="1"
          md-mode="indeterminate"
        ></md-progress-spinner>
        UPLOADING
      </span>
      <span class="status complete" v-if="currentStatus == 'complete'">
        COMPLETE
      </span>
      <span
        class="status error"
        v-if="currentStatus == 'error'"
        v-on:click="deleteItem()"
      >
        ERROR
        <md-tooltip md-direction="bottom">
          Click to delete the file
        </md-tooltip>
      </span>
    </div>
    <div class="md-layout-item">
      <md-button
        class="md-raised md-primary"
        v-if="currentStatus == 'ready'"
        @click="uploadFile()"
      >
        upload
      </md-button>
      <md-button
        class="md-raised md-primary"
        v-if="currentStatus == 'ready'"
        v-on:click="deleteItem()"
      >
        delete
      </md-button>
      <md-field v-if="currentStatus == 'complete'">
        <label>Tileset ID</label>
        <md-input v-model="tileId" readonly></md-input>
      </md-field>
    </div>
  </div>
</template>

<script>
import {
  getS3Credentials,
  uploadFileToS3,
} from "../../service/NetworkService.js";

export default {
  name: "FileItem",
  props: ["file", "index"],
  data() {
    return {
      currentStatus: "ready",
      tileId: "",
      deleted: false,
    };
  },
  methods: {
    deleteItem() {
      // this.$emit("deleteFile", this.index);
      this.deleted = true
    },
    uploadFile() {
      this.changeStatus("uploading");
      const callback = (tilesetId) => {
        console.log("callback initialized.");
        console.log(tilesetId);
        this.changeStatus("complete");
        this.tileId = tilesetId;
      };
      getS3Credentials(this.$store.getters.getId, this.$store.getters.getToken)
        .then((response) =>
          uploadFileToS3(
            this.file,
            JSON.parse(response),
            this.$store.getters.getId,
            this.$store.getters.getToken,
            callback
          )
        )
        .catch((error) => {
          console.log("network error", error);
          this.changeStatus("error");
        });
    },
    changeStatus(status) {
      if (status === "uploading") {
        this.currentStatus = "uploading";
      } else if (status === "complete") {
        this.currentStatus = "complete";
      } else if (status === "error") {
        this.currentStatus = "error";
      }
    },
  },
  mounted() {
    console.log("index", this.index)
  },
};
</script>
<style scoped>
.status {
  font-weight: 200;
}
.status.error {
  color: red;
  cursor: pointer;
}
.status.complete {
  color: green;
}
.status.uploading {
  color: blue;
}
.item-wrapper {
  margin-bottom: 2vh;
  min-height: 10vh;
}
</style>
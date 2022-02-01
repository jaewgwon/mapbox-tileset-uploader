<template>
  <div id="app">
    <div class="page-container">
      <md-app md-waterfall md-mode="fixed-last">
        <md-app-toolbar class="md-primary">
          <span class="md-title">
            Mapbox Tile Uploader v0.0.1
            <md-tooltip md-direction="bottom">
              Developed by Jaewon Gwon(https://jaewgwon.github.io/)@株式会社イーグリッド
            </md-tooltip>
          </span>
        </md-app-toolbar>
        <md-app-content>
          <FileUpload ref="fileUpload" v-if="fileVisible"/>
        </md-app-content>
      </md-app>
    </div>
  </div>
</template>

<script>
import FileUpload from './LandingPage/FileUpload';
export default {
    name: "App",
    components: {
        FileUpload
    },
    data: () => ({
      menuVisible: false,
      fileVisible: true,
      settingVisible: false,
      user: {
        id: '',
        token: '',
      }
    }),
    methods: {
      navigate(target) {
        console.log(target)
        if(target == "file") {
          this.fileVisible = true
          this.settingVisible = false
          this.menuVisible = false
        } else if(target == "setting") {
          this.fileVisible = false
          this.settingVisible = true
          this.menuVisible = false
        }
      }
    }
};
</script>

<style scoped>
  .md-app {
    min-height: 630px;
    max-height: 630px;
    max-width: 800px;
    border: 1px solid rgba(#000, .12);
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  .copyright {
    color: white;
    font-style: italic;
  }
</style>
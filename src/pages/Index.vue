<template>
  <div class="editor-container">
    <Editor />
    <SideBar :visible="sidebarVisible" @close="toggleSideBar" />
    <div class="footer">
      <Footer @show-side-bar="toggleSideBar" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Editor, Footer, SideBar } from '../components';

@Component({
  components: {
    Editor,
    Footer,
    SideBar
  },
})
export default class Index extends Vue {
  private sidebarVisible = false;

  private toggleSideBar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
</script>
<style lang="scss" scoped>
$footer-height: 50px;
.editor-container {
  height: calc(100vh - #{$footer-height});
  width: 100vw;
}
.footer {
  background: rgba(31, 30, 30, 0.87);
  height: $footer-height;
  line-height: $footer-height;
}
</style>
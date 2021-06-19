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
.editor-container {
  height:  95vh;
  width: 100vw;
  background: red;
}
.footer {
  background: rgba(0,0,0,0.87);
  height: 5vh;
}
</style>
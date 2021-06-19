<template>
  <a-drawer :visible="visible" @close="$emit('close')" :width="400">
    <h3 class="section-title">CDN Url</h3>
    <a-input-search placeholder="Input a CDN url" @search="onAddCdnUrl">
      <a-button slot="enterButton">
        Add
      </a-button>
    </a-input-search>
    <h3 class="section-title">Search Packages</h3>
    <a-input @change="onInput"></a-input>
    <ul class="result-list">
      <li class="result-item" v-for="(item, index) in list" :key="index" @click="injectPackage(item)">
        {{ item.name + '@' + item.version }}
      </li>
    </ul>
  </a-drawer>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import axios from 'axios'
import { runCode } from '../utils'

@Component
export default class SideBar extends Vue {
  @Prop() private visible: boolean;

  private list = [];
  private timer = null;

  private onAddCdnUrl(url: string) {
    if (url.trim()) {
      this.injectScript(url);
    }
  }

  private async onInput(event: InputEvent) {
    const { value } = event.target as HTMLInputElement;
    this.debounce(async () => {
      const res = await axios.get('https://www.npmjs.com/search/suggestions?q=' + value);
      this.list = res.data;
    }, 500)
  }

  private injectPackage(item) {
    this.injectScript('https://cdn.jsdelivr.net/npm/' + item.name + '@' + item.version, item.name);
  }

  private injectScript(url: string, packageName?: string) {
    const code = `
      const script = document.createElement('script');
      script.src = '${url}';
      script.onload = function () {
        console.log('%c${packageName || url} loaded successfully.', 'color: green')
      };
      document.head.appendChild(script);
    `;
    runCode(code);
  }

  private debounce(fn, delay) {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(fn, delay);
  }
}
</script>
<style lang="scss" scoped>
  
.result-list {
  padding-left: 24px;
}
.result-item {
  cursor: pointer;
  margin-top: 6px;
}
.section-title {
  margin-top: 24px;
  &:first-child {
    margin-top: 0;
  }
}
</style>
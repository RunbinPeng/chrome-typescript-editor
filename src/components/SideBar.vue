<template>
  <a-drawer class="drawer" :visible="visible" @close="$emit('close')" width="40vw">
    <h3 class="section-title">CDN</h3>
    <a-input-search placeholder="Input a cdn url" @search="onAddCdnUrl">
      <a-button slot="enterButton">
        Add
      </a-button>
    </a-input-search>
    <h3 class="section-title">Search Packages</h3>
    <a-input @change="onInput"></a-input>
    <div v-if="loading" class="loading-container">
      <a-spin  tip="Loading..."></a-spin>
    </div>
    <ul v-else class="result-list">
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
  private loading = false;

  private onAddCdnUrl(url: string) {
    if (url.trim()) {
      this.injectScript(url);
    }
  }

  private async onInput(event: InputEvent) {
    const { value } = event.target as HTMLInputElement;
    this.debounce(() => {
      this.fetchPackageList(value);
    }, 500)
  }

  private async fetchPackageList(keyword: string) {
    try {
      if (!keyword) {
        return;
      }
      this.loading = true;
      this.list = [];
      const res = await axios.get('https://www.npmjs.com/search/suggestions?q=' + keyword);
      this.list = res.data;
      return res;
    } catch(error) {
      this.$message.error('Network error, please try again!')
    } finally {
      this.loading = false;
    }
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
.loading-container {
  text-align: center;
  margin-top: 16px;
}
</style>
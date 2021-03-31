import Vue from 'vue'
import App from './App.vue'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});

chrome.devtools.panels.create('typescript-editor', '', 'devtools.html', () => {});
import Vue from 'vue';
import App from './App.vue'
import { loadWASM } from 'onigasm';

// load wasm
(async () => {
  await loadWASM('./onigasm.wasm');
  new Vue({
    el: '#app',
    render: h => h(App)
  })
})();

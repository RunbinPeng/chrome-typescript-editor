import Vue from 'vue';
import App from './App.vue'
import { loadWASM } from 'onigasm';

// TODO: use babel plugin
import Button from 'ant-design-vue/lib/button'
import Layout from 'ant-design-vue/lib/layout'
import Drawer from 'ant-design-vue/lib/drawer'
import Input from 'ant-design-vue/lib/input'
import Spin from 'ant-design-vue/lib/spin'
import Message from 'ant-design-vue/lib/message';
import 'ant-design-vue/lib/drawer/style'
import 'ant-design-vue/lib/input/style'
import 'ant-design-vue/lib/layout/style'
import 'ant-design-vue/lib/button/style'
import 'ant-design-vue/lib/spin/style'
import 'ant-design-vue/lib/message/style';
Vue.use(Button)
Vue.use(Input)
Vue.use(Layout)
Vue.use(Drawer)
Vue.use(Spin)
Vue.use(Message);
Vue.prototype.$message = Message;


// load wasm
;(async () => {
  await loadWASM('./onigasm.wasm');
  new Vue({
    el: '#app',
    render: h => h(App)
  })
})();

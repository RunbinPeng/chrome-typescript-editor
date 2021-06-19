<template>
  <div>
    <Index />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Index from './pages/Index.vue';

@Component({
  components: {
    Index,
  },
})
export default class App extends Vue {
}
</script>
<style lang="scss">
body {
  margin: 0;
  overflow: hidden;
}
</style>
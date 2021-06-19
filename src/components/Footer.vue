<template>
  <div class="container">
    <a-button shape="circle" icon="left" @click="$emit('show-side-bar')" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {
  
}
</script>
<style lang="scss" scoped>
.container {
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
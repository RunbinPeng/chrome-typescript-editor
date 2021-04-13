<template>
  <div class="editor-container">
    <div class="editor" ref="editor"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import * as ts from 'typescript';
import { runCode } from './utils';

@Component
export default class App extends Vue {
  private monacoEditor = null;
  private originCode = `/* press ctrl+s or cmd+s to run the code */\n`;
  private mounted() {
    this.monacoEditor = monaco.editor.create((this.$refs as any).editor, {
      value: this.originCode,
      language: 'typescript',
      theme: 'vs-dark',
      tabSize: 2,
    });
    this.monacoEditor.onDidChangeModelContent(() => {
      this.change(this.monacoEditor.getValue());
    });
    this.monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      this.runCode();
    });
    this.registerResizeListener();
  }
  private beforeDestroy() {
    this.removeResizeListener();
  }
  private change(value: string) {
    this.originCode = value;
  }
  private runCode() {
    const result = ts.transpileModule(this.originCode, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
    runCode(result.outputText);
  }
  private registerResizeListener() {
    window.addEventListener('resize', this.resizeEditor.bind(this));
  }
  private removeResizeListener() {
    window.removeEventListener('resize', this.resizeEditor.bind(this));
  }
  private resizeEditor() {
    this.monacoEditor.layout()
  }
}
</script>
<style lang="scss">
body {
  margin: 0;
  overflow: hidden;
}
.editor-container {
  height:  100vh;
  width: 100vw;
  background: red;
}
.editor {
  height: 100%;
  width: 100%;
}
</style>
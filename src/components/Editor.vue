<template>
  <div>
    <div class="editor" ref="editor"></div>
  </div>
</template>
<script>
import * as monaco from 'monaco-editor';
import * as ts from 'typescript';
export default {
  mounted() {
    this.monacoEditor = monaco.editor.create(this.$refs.editor, {
      value: this.originCode,
      language: 'typescript',
      theme: 'vs-dark'
    });
    this.monacoEditor.onDidChangeModelContent(() => {
      this.change(this.monacoEditor.getValue());
    });
    this.monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      this.runCode();
    });
  },
  data() {
    return {
      originCode: '',
      monacoEditor: null,
    }
  },
  methods: {
    change(val) {
      this.originCode = val;
    },
    runCode() {
      const result = ts.transpileModule(this.originCode, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
      chrome.devtools.inspectedWindow.eval(result.outputText);
    }
  },
}
</script>
<style scoped>
.editor {
  height: 100vh;
  width: 100vw;
}
</style>
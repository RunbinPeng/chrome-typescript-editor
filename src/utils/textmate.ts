import { Registry } from 'monaco-textmate';
import { wireTmGrammars } from '../monaco-editor-textmate';
const registry = new Registry({
  getGrammarDefinition: async (scopeName) => {
    if (scopeName == 'source.ts') {
      return {
        format: 'json',
        content: await (await fetch('./TypeScript.tmLanguage.json')).text()
      }
    } else if (scopeName == 'source.js') {
      return {
        format: 'json',
        content: await (await fetch('./JavaScript.tmLanguage.json')).text()
      }
    } else {
      return null;
    }

  }
})
export const liftOff = async (monaco, editor) => {
  // map of monaco "language id's" to TextMate scopeNames
  const grammars = new Map();
  grammars.set('typescript', 'source.ts');
  // grammars.set('javascript', 'source.js');
  monaco.languages.register({ id: 'typescript' });
  // monaco.languages.register({ id: 'javascript' });
  await wireTmGrammars(monaco, registry, grammars, editor);
};
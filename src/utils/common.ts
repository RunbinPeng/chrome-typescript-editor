const IsExtensionEnv = process.env.EXTENSION || false;

export async function createDevtoolPanel() {
  if (!IsExtensionEnv) {
    const { browser } = await import('webextension-polyfill-ts');
    browser.devtools.panels.create('typescript-editor', '', 'devtools.html');
  }
}

export async function runCode(code: string) {
  if (!IsExtensionEnv) {
    const { browser } = await import('webextension-polyfill-ts');
    try {
      browser.tabs.executeScript(undefined, { code }).then(res => {
        if (browser.runtime.lastError) {
          browser.tabs.executeScript(undefined, { code: `console.error(${browser.runtime.lastError.message})` })
        }
      });
    } catch (e) { }
  } else {
    eval(code);
  }
}
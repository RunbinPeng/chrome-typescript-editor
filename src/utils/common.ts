const IsDev = process.env.NODE_ENV === 'development';

export async function createDevtoolPanel() {
  if (!IsDev) {
    const { browser } = await import('webextension-polyfill-ts');
    browser.devtools.panels.create('typescript-editor', '', 'devtools.html');
  }
}

export async function runCode(code: string) {
  if (!IsDev) {
    const { browser } = await import('webextension-polyfill-ts');
    try {
      browser.tabs.executeScript(undefined, { code }).then(res => {
        if (browser.runtime.lastError) {
          browser.tabs.executeScript(undefined, { code: `console.error(${browser.runtime.lastError.message})` })
        }
      });
    } catch(e) {}
  } else {
    eval(code);
  }
}
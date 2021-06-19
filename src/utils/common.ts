const IsExtensionEnv = process.env.EXTENSION || false;

export async function createDevtoolPanel() {
  if (IsExtensionEnv) {
    const { browser } = await import('webextension-polyfill-ts');
    browser.devtools.panels.create('Editor', '', 'devtools.html');
  }
}

export async function runCode(code: string) {
  if (IsExtensionEnv) {
    const { browser } = await import('webextension-polyfill-ts');
    try {
      const res = await browser.tabs.executeScript(undefined, { code })
    } catch (e) { }
  } else {
    eval(code);
  }
}
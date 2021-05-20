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
      const res = await browser.devtools.inspectedWindow.eval(code);
      if (res[1]) {
        const errMsgCode = `console.error(${JSON.stringify(res[1].value)})`;
        browser.devtools.inspectedWindow.eval(errMsgCode);
      }
    } catch (e) { }
  } else {
    eval(code);
  }
}
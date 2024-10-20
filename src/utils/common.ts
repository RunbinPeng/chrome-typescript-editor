import browser from 'webextension-polyfill';
const IsExtensionEnv = process.env.EXTENSION || false;

export async function createDevtoolPanel() {
  if (IsExtensionEnv) {
    browser.devtools.panels.create('Editor', '', 'devtools.html');
  }
}

export async function runCode(code: string) {
  if (IsExtensionEnv) {
    try {
      const tryCatch = `
try {
  ${code}
} catch(e) {
  console.error(e);
}
      `;
      const res = await browser.devtools.inspectedWindow.eval(tryCatch);
    } catch (e) { }
  } else {
    eval(code);
  }
}
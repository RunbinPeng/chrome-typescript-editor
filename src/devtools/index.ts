import { browser } from 'webextension-polyfill-ts';
browser.devtools.panels.create('typescript-editor', '', 'devtools.html');
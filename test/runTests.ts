import { runTests } from '@vscode/test-electron';
import { resolve } from 'path';

(async () => {
  runTests(
    {
      extensionDevelopmentPath: resolve(__dirname, '..', '..'),
      extensionTestsPath: resolve(__dirname, 'index')
    });
})();

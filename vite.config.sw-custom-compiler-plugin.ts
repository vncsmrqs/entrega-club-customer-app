import { rollup, InputOptions, OutputOptions } from 'rollup';
// @ts-ignore
import rollupPluginTypescript from 'rollup-plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export const CompileTsServiceWorker = () => ({
  name: 'compile-typescript-service-worker',
  async writeBundle() {
    const inputOptions: InputOptions = {
      input: 'src/handle-notifications.sw.ts',
      plugins: [rollupPluginTypescript(), nodeResolve()],
    };
    const outputOptions: OutputOptions = {
      file: 'dist/handle-notifications.sw.js',
      format: 'es',
    };
    const bundle = await rollup(inputOptions);
    await bundle.write(outputOptions);
    await bundle.close();
  },
});

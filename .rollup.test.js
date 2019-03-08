import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';
import assertEs from 'rollup-plugin-assert-es';

export default {
  input: 'test/tape.mjs',
  output: [{ format: 'umd', file: 'test/bundle.js' }],
  plugins: [resolve({ browser: true }), buble(), assertEs()],
};

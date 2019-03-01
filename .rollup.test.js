import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';

export default {
  input: 'test/tape.mjs',
  output: [{ format: 'umd', file: 'test/bundle.js' }],
  plugins: [resolve({ browser: true }), buble()],
};

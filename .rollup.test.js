import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';

export default {
  entry: 'test/tape.mjs',
  targets: [{ format: 'umd', dest: 'test/bundle.js' }],
  plugins: [
    commonjs({ include: 'node_modules/**' }),
    globals(),
    builtins(),
    resolve({ browser: true }),
    buble(),
  ],
};

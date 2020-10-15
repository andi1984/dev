import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'assets/js/index.js',
  output: { file: 'dist/assets/bundle.js', format: 'cjs', sourcemap: true },
  plugins: [
    alias({
      entries: [
        { find: 'react', replacement: 'preact/compat' },
        { find: 'react-dom', replacement: 'preact/compat' },
      ],
    }),
    babel({ babelHelpers: 'bundled' }),
    commonjs(),
    nodeResolve(),
    postcss({ plugins: [] }),
  ],
};

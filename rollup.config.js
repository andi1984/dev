import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import dotenv from 'dotenv';
dotenv.config();
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
    json(),
    injectProcessEnv({
      sentryDSN: process.env.SENTRY_DSN,
      rssAPIEndpoint: process.env.RSS_API_ENDPOINT,
    }),
  ],
};

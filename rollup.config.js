import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy-glob'

import pkg from './package.json'

const name = 'CubeModal'
const version = pkg.version
const banner =
`/*
 * cube-vue-modal v${version}
 * (c) 2018-${new Date().getFullYear()} Cube Living, Inc.
 * Released under the MIT License.
 */`

export default [
  {
    input: 'src/wrapper.js',
    output: [
      {
        name,
        banner,
        file: pkg.main,
        format: 'iife',
        exports: 'named',
        compact: true,
        sourcemap: true
      },
      {
        name,
        banner,
        file: pkg.module,
        format: 'es',
        compact: true,
        sourcemap: true
      },
      {
        name,
        banner,
        file: pkg.unpkg,
        format: 'umd',
        exports: 'named',
        compact: true,
        sourcemap: true
      }
    ],
    plugins: [
      vue(),
      buble(),
      commonjs(),
      // terser(),
      copy([
        { files: 'src/assets/modal.scss', dest: 'dist/assets' },
        { files: 'src/assets/animations.scss', dest: 'dist/assets' }
      ], { verbose: true, watch: false })
    ]
  }
]

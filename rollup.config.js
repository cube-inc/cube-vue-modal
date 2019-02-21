import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy-glob'

import pkg from './package.json'

const name = 'CubeModal'

export default [
  {
    input: 'src/wrapper.js',
    output: [
      {
        name,
        file: pkg.main,
        format: 'iife',
        exports: 'named',
        compact: true,
        sourcemap: true
      },
      {
        name,
        file: pkg.module,
        format: 'es',
        compact: true,
        sourcemap: true
      },
      {
        name,
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
      terser(),
      copy([
        { files: 'src/assets/modal.scss', dest: 'dist/assets' },
        { files: 'src/assets/animations.scss', dest: 'dist/assets' }
      ], { verbose: true, watch: false })
    ]
  }
]

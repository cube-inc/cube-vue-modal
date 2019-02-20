import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy-assets'

import pkg from './package.json'

const name = 'CubeModal'

export default [
  {
    input: 'src/wrapper.js',
    output: [
      {
        name,
        file: pkg.module,
        format: 'es',
        compact: true,
        sourcemap: true
      },
      {
        name,
        exports: 'named',
        file: pkg.main,
        format: 'umd',
        compact: true,
        sourcemap: true
      }
    ],
    plugins: [
      copy({
        assets: [
          './src/assets/modal.scss',
          './src/assets/animations.scss'
        ]
      }),
      resolve(),
      vue(),
      buble(),
      commonjs(),
      terser()
    ]
  }
]

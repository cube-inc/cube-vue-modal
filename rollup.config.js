import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/wrapper.js',
  output: {
    name: 'CubeModal',
    exports: 'named'
  },
  plugins: [
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
    }),
    buble(),
    terser()
  ]
}

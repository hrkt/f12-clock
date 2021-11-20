import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/f12-clock.js',
  output: [
    {
      compact: true,
      file: 'dist/f12-clock.js',
      format: 'iife',
      name: 'F12Clock',
      sourcemap: true
    },
    {
      file: 'dist/f12-clock.min.js',
      format: 'iife',
      name: 'F12Clock',
      plugins: [terser()]
    }
  ],
  plugins: [
    commonjs() // convert cjs modules to ES6
  ]
}

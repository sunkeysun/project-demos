const commonjs = require('@rollup/plugin-commonjs')
const { terser } = require('rollup-plugin-terser')
const { nodeResolve: resolve } = require('@rollup/plugin-node-resolve')
const { visualizer } = require('rollup-plugin-visualizer')
const { babel } = require('@rollup/plugin-babel')
const { NODE_ENV, ANALYSE } = process.env

module.exports = {
    input: './src/index.js',
    output: {
        file: 'dist/index.js',
        // iife: 自执行函数，可返回全局变量挂在到全局，如 script 加载 jquery 脚本，则 window.jQuery 自动挂载
        // umd: 兼容 commonjs, cmd，iife 模块封装规范
        // cjs: commonjs 模块规范，只能通过 require 调用
        // es: esm 模块规范，需要支持导入 esm 模块
        format: 'iife',
        name: 'GlobalVariableName', // 需要挂载的全局变量，不写则为封闭执行模块，不对外暴露
    },
    plugins: [
        resolve({ browser: true }),
        commonjs(),
        // 如果需要 babel 转义，则开启，注意顺序顺序包放到 reaolve 和 commonjs 后面
        // babel({
        //     babelrc: false,
        //     babelHelpers: 'runtime',
        //     skipPreflightCheck: true,
        //     presets: [
        //         ['@babel/preset-env', { targets: '> 0.25%, not ie < 11' }]
        //     ],
        //     plugins: [
        //         ['@babel/plugin-transform-runtime', { regenerator: true }]
        //     ],
        // }),
        NODE_ENV === 'production' && terser(),
        ANALYSE && visualizer(),
    ].filter(Boolean),
}

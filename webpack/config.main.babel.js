import baseConfig from './config.base.js'
import merge from 'webpack-merge'

// eslint-disable-next-line
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
// eslint-disable-next-line
console.log(`Using config: ./config.${process.env.NODE_ENV}.js`)
export default merge({}, baseConfig, require(`./config.${process.env.NODE_ENV}.js`).default)

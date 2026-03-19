import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import path from 'node:path'
import { glob } from 'glob'
import { codeInspectorPlugin } from 'code-inspector-plugin'

// export default defineConfig({
//   plugins: [pluginReact()],
// });

// @ts-ignore
export default defineConfig(async () => {
  const isProd = process.env.NODE_ENV === 'production'
  
  const entryFiles = await glob('./src/pages/**/index.{ts,tsx,js,jsx}', {
    ignore: ['**/store/**', '**/components/**', '**/utils/**', '**/hooks/**'],
  })
  const templates = Object.fromEntries(
    entryFiles.map(file => {
      const entryName = path.basename(path.dirname(file))
      return [entryName, './' + file]
    })
  )
  console.log('⚠️:[ entryFiles ]🎈：', entryFiles)
  const inject = isProd ? 'body' : 'head' //解决单页html 无法打开的

  return {
    root: './',
    source: {
      entry: {
        ...templates,
      },
    },
    plugins: [pluginReact()],
    html: {
      inject: inject, //解决单页html 无法打开的
      // inject:'body'
    },
    server: {
      host: 'localhost',
      open: false,
    },
    // 打包为单个html，不需要请注释 inlineScripts inlineStyles
    output: {
      assetPrefix: './',
      legalComments: 'none', //移除开源注释
      inlineScripts: true,
      inlineStyles: true,
    },

    performance: {
      chunkSplit: {
        strategy: 'all-in-one',
      },
    },
    tools: {
      rspack: {
        plugins: [
          codeInspectorPlugin({
            bundler: 'rspack',
            showSwitch: true,
          }),
        ],
      },
    },
  }
})

import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import path from 'node:path'
import { glob } from 'glob'
// export default defineConfig({
//   plugins: [pluginReact()],
// });
export default defineConfig(async () => {
  const entryFiles = await glob('./src/pages/**/index.{ts,tsx,js,jsx}')
  const templates = Object.fromEntries(
    entryFiles.map(file => {
      const entryName = path.basename(path.dirname(file))
      return [entryName, './' + file]
    })
  )
  console.log('⚠️:[ entryFiles ]🎈：', entryFiles)

  return {
    root: './',
    source: {
      entry: {
        ...templates,
      },
    },
    plugins: [pluginReact()],
    html: {
      inject: 'body', //解决单页html 无法打开的
    },
    server: {
      host: 'localhost',
      open: false,
    },
    // 打包为单个html，不需要请注释 inlineScripts inlineStyles
    output: {
      assetPrefix: './',
      legalComments: 'none', //移除开源注释
      // inlineScripts: true,
      // inlineStyles: true,
    },

    performance: {
      chunkSplit: {
        strategy: 'all-in-one',
      },
    },
  }
})

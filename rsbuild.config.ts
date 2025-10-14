import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from "node:path";
import { glob } from "glob"
// export default defineConfig({
//   plugins: [pluginReact()],
// });
export default defineConfig(async () => {
  const entryFiles = await glob("./src/pages/**/index.{ts,tsx,js,jsx}");
  const templates = Object.fromEntries(
    entryFiles.map((file) => {
      const entryName = path.basename(path.dirname(file));
      return [entryName,"./"+ file];
    })
  );
  console.log('⚠️:[ entryFiles ]🎈：', entryFiles)

  return {
    root: "./",
    source: {
      entry: {
        ...templates,
      },
    },
    plugins: [pluginReact()],
    server: {
      host: "localhost",
      open: false,
    },
    output: {
      assetPrefix: "./",
    },
  };
});
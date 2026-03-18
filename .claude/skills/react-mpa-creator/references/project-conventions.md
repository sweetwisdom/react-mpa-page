# 项目约定参考

## 目录结构

```
react-mpa-page/
├── rsbuild.config.ts          # Rsbuild 配置，动态扫描入口
├── tsconfig.json              # TypeScript 严格模式配置
├── tailwind.config.js         # Tailwind CSS 配置
├── package.json               # pnpm 项目配置
├── src/
│   ├── style/
│   │   └── common.css         # Tailwind 三层指令 (@tailwind base/components/utilities)
│   ├── pages/
│   │   ├── home/              # 首页
│   │   │   ├── index.tsx      # 入口（固定模板）
│   │   │   ├── App.tsx        # 页面组件
│   │   │   └── App.css        # 页面样式
│   │   └── demo/              # 示例页
│   │       ├── index.tsx
│   │       ├── App.tsx
│   │       └── App.css
│   └── components/            # 共享组件（按需创建）
└── dist/                      # 构建产物
```

## 入口扫描机制

`rsbuild.config.ts` 中的核心逻辑：

```typescript
const entryFiles = await glob('./src/pages/**/index.{ts,tsx,js,jsx}')
const templates = Object.fromEntries(
  entryFiles.map(file => {
    const entryName = path.basename(path.dirname(file))
    return [entryName, './' + file]
  })
)
```

- 页面文件夹名 = 入口名 = URL 路径名
- 新建页面文件夹后自动识别，无需修改配置
- 每个入口独立生成一个 HTML 文件

## 页面间导航

使用相对路径 `<a>` 标签，因为每个页面是独立的 HTML：

```tsx
// 从 home 页跳转到 demo 页
<a href="./demo">查看 Demo</a>

// 从 demo 页返回 home 页
<a href="./home">返回首页</a>
```

## Tailwind CSS 配置

`tailwind.config.js` 的 content 扫描范围：

```javascript
content: ['./src/**/*.{html,js,ts,jsx,tsx}']
```

全局引入在 `src/style/common.css`：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

每个页面的 `index.tsx` 必须引入此文件：`import "@/style/common.css"`

## TypeScript 路径别名

`tsconfig.json` 中配置：

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

用法：`import SomeComponent from '@/components/SomeComponent'`

## 构建输出

- `assetPrefix: "./"` — 使用相对路径，支持离线打开
- `legalComments: 'none'` — 移除开源注释
- `chunkSplit: 'all-in-one'` — 所有 chunk 合并
- `html.inject: 'body'` — script 标签放在 body 底部

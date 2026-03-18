---
name: react-mpa-creator
description: >
  从 React MPA 多页面应用模板快速创建项目和页面。当用户想要创建 React 多页面项目、
  新建 MPA demo、基于模板初始化项目、添加新的页面入口、搭建营销页/后台子站/多业务页面时，
  务必使用此 skill。即使用户只是说"新建一个页面"、"帮我搭个 React 项目"、"创建一个 demo"、
  "加一个登录页"等模糊表述，只要涉及 React 多页面场景都应触发。
  模板仓库: https://github.com/sweetwisdom/react-mpa-page.git
---

# React MPA Demo 创建器

从模板仓库快速创建 React 多页面应用(MPA)项目，或在已有项目中添加新页面。

## 判断执行模式

开始前先检查当前目录：

1. 存在 `rsbuild.config.ts` 且存在 `src/pages/` → **添加页面模式**
2. 否则 → **创建项目模式**

---

## 创建项目模式

### 步骤

1. 克隆模板并重新初始化 git：

```bash
git clone https://github.com/sweetwisdom/react-mpa-page.git <项目名>
cd <项目名>
rm -rf .git
git init
```

2. 安装依赖（必须使用 pnpm）：

```bash
pnpm install
```

3. 如果用户同时描述了页面需求，切换到「添加页面模式」创建对应页面。

4. 验证项目可启动：

```bash
pnpm dev
```

---

## 添加页面模式

在 `src/pages/<页面名>/` 下创建 3 个文件。页面名使用 kebab-case 小写命名。

### 文件 1: `index.tsx`（入口，固定模板）

```tsx
import "@/style/common.css"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

每个页面的入口文件完全一致，不要遗漏 `@/style/common.css` 的引入——它负责加载 Tailwind 的 base/components/utilities 三层样式。

### 文件 2: `App.tsx`（页面组件）

这是页面的核心。根据用户描述编写，遵循以下约定：

- 箭头函数组件 + `export default App`
- 样式优先使用 Tailwind CSS class（项目已集成 v3.4.19）
- 图标使用 `lucide-react`（项目已安装）
- 共享模块通过 `@/*` 路径别名引用（映射 `src/*`）
- 页面间导航使用相对路径：`<a href="./other-page">`
- 保持不可变性，状态更新返回新对象
- 函数体小于 50 行，必要时提取子组件

### 文件 3: `App.css`（页面私有样式）

仅存放无法用 Tailwind 实现的页面特有样式。大部分情况下保持最小化：

```css
body {
  margin: 0;
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
}
```

如果页面需要动画 keyframes 或复杂的伪元素样式，可以在此文件中添加。

---

## 技术栈速查

| 技术 | 版本 | 说明 |
|------|------|------|
| React | ^19.2.0 | 函数组件 + Hooks |
| TypeScript | ^5.9.3 | 严格模式 |
| Rsbuild | ^1.5.14 | 自动扫描 `src/pages/**/index.{ts,tsx,js,jsx}` |
| Tailwind CSS | ^3.4.19 | 通过 PostCSS 集成 |
| lucide-react | ^0.575.0 | 图标库 |
| pnpm | - | 包管理器（不要使用 npm/yarn） |

## 关键架构细节

- Rsbuild 在 `rsbuild.config.ts` 中通过 glob 动态扫描入口，新建页面文件夹后无需修改任何配置
- `assetPrefix: "./"` 使打包产物使用相对路径，支持直接打开 HTML 文件
- `chunkSplit: 'all-in-one'` 将所有 chunk 合并，适合独立分发场景
- Tailwind 在 `src/style/common.css` 中通过 `@tailwind` 指令引入
- 路径别名 `@/*` 在 `tsconfig.json` 和 Rsbuild 中同时配置

更多技术细节请参阅 `references/project-conventions.md`。

---

## 示例

**输入**: "创建一个 login 页面，带邮箱密码表单和验证"

**执行**:
1. 创建 `src/pages/login/index.tsx`（固定模板）
2. 创建 `src/pages/login/App.tsx`（含表单组件、Tailwind 样式、基本验证逻辑）
3. 创建 `src/pages/login/App.css`（最小化基础样式）

**输入**: "用模板创建一个叫 my-shop 的新项目，包含首页和商品列表页"

**执行**:
1. `git clone` 模板到 `my-shop/`
2. `pnpm install`
3. 在 `src/pages/` 下创建 `home/` 和 `product-list/` 两个页面
4. `pnpm dev` 验证

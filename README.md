## 本目录配置

### 初始化项目

pnpm init
创建pnpm-workspace.yaml

### typescript

npx tsc --init

### 代码风格

.prettierrc
.prettierignore

### 代码检查

eslint.config.js

### 拼写检查

插件: cspell
vscode 插件： code spell checker

cspell.json
.cspell/custom-words.txt

### 代码提交

插件：cz-git, commitizen, fast-glob,
@commitlint/config-conventional,
@commitlint/cli,

配置commit：commitlint.config.js

### 自动拦截

插件：husk, lint-staged
npx husky init

## packages/core 配置

### tsup

插件： tsup
配置：tsup.config.ts, tsconfig.json

## demos/vanilla 配置

pnpm create vite vanilla --template vanilla-ts

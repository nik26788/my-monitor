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

## 创建数据库

```sql
DROP TABLE IF EXISTS base_monitor_storage;
CREATE TABLE base_monitor_storage (
	app_id VARCHAR(11),
	info String,
	created_at DateTime DEFAULT now(),
	event_type String,
	message String
) ENGINE = MergeTree()
	ORDER BY tuple()




```

物化数据

```sql
DROP TABLE IF EXISTS base_monitor_view;
CREATE MATERIALIZED VIEW base_monitor_view ENGINE = MergeTree() ORDER BY tuple() POPULATE AS SELECT
app_id, info, created_at, event_type, message, concat('miaoma', event_type) AS processed_message FROM base_monitor_storage
```

插入一条数据

```
insert into base_monitor_storage (app_id, info, event_type, message)
values ('1', 'info', '{"name": "nick", "age": "23"}', 'Hello world');
```

## docker

docker compose -p my-monitor -f .devcontainer/docker-compose.yml up -d

## montior前端项目

### 创建项目

cd apps/frontend
pnpm create vite monitor -- template=react-ts

# FanVerse · 追星与电影 IP 灵感收藏

基于 [Pintree](https://github.com/Pintree-io/pintree) 定制的个人泛娱乐产品 Demo。沿用原项目收藏管理与界面。

![FanVerse 电影收藏页面](docs/screenshots/film.jpg)

## 本次修改

- 4 个主题集合：追星现场、电影宇宙、游戏灵感、美妆灵感。
- 16 条官方内容入口与视觉样例，保留搜索、集合切换、卡片/列表功能。
- FanVerse 紫色品牌主题。
- SQLite 本地演示配置，免 PostgreSQL 服务器。

## 运行

环境：Node.js 22.13+ 与 pnpm。

```bash
pnpm install --frozen-lockfile
pnpm exec prisma generate
node scripts/setup-demo.mjs
pnpm dev --port 3102
```

打开 http://localhost:3102 。不要提交本地数据库或环境变量。样例只链接官方内容，不托管歌曲、视频或影视作品。

## 产品材料

[产品方案](docs/PRODUCT.md) · [验收记录](docs/QA.md) · [上游与授权](UPSTREAM.md) · [原始 README](README.upstream.md)

MIT License，保留原 LICENSE。品牌属于各自权利人，演示与品牌无关联；图片为 Unsplash 氛围样例。

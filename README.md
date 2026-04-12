# 生日宝可梦 (Birthday Pokémon)

这是一个基于生日匹配宝可梦的趣味全栈 Web 应用。用户输入自己的生日，系统通过特定算法匹配出一只“本命宝可梦”，并展示其详细信息与个性化寄语。

## 🌟 核心特性

- **命中注定算法**: 采用直观的生日映射逻辑，让每一天都拥有独特的羁绊。
- **全图鉴集成**: 接入 PokeAPI，支持从第1世代到第9世代的所有 1025 只宝可梦。
- **个性化体验**: 根据匹配结果生成独特的生日寄语。
- **历史记录**: 登录后可保存并随时查看所有的匹配历史。
- **响应式设计**: 完美适配手机、平板及电脑端，拥有精美的 UI 动画。
- **安全可靠**: 基于 NextAuth 的用户认证与 Prisma 数据库管理。

## 🛠️ 技术栈

- **前端**: Next.js 15 (App Router), Tailwind CSS, Framer Motion, Lucide React
- **后端**: Next.js API Routes, NextAuth.js
- **数据库**: SQLite (Prisma ORM)
- **数据源**: [PokeAPI](https://pokeapi.co/)
- **测试**: Vitest, React Testing Library
- **验证**: Zod, React Hook Form

## 📐 映射规则逻辑

本项目采用了简单易懂的**直接拼接取模法**：
1. **基础编号**: `月份 * 100 + 日期` (例如 10月24日 = 1024)。
2. **上限处理**: 如果结果超过当前宝可梦总数 (1025)，则执行 `(结果 % 1025) + 1`。
3. **结果区间**: 确保所有生日都能映射到 1 - 1025 之间的合法图鉴编号。

## 🚀 快速开始

### 1. 环境准备
确保已安装 Node.js (v18+)

### 2. 安装依赖
```bash
npm install
```

### 3. 配置环境
复制 `.env.example` 并重命名为 `.env` (本项目已预置基础配置):
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. 数据库初始化
```bash
npx prisma migrate dev --name init
```

### 5. 启动开发服务器
```bash
npm run dev
```
访问 [http://localhost:3000](http://localhost:3000)

## 🧪 运行测试

```bash
npm run test
```

## 📄 项目结构说明

- `/src/app`: 页面路由与 API 接口
- `/src/components`: UI 组件
- `/src/lib`: 核心算法、API 服务、数据库工具
- `/prisma`: 数据库模型定义
- `/vitest.config.ts`: 测试配置文件

## 🔒 权限管理

- **访客**: 可进行生日匹配与结果查看。
- **注册用户**: 匹配结果将自动保存至云端历史记录。
- **登录方式**: 演示模式下支持任意邮箱+密码自动登录/注册。

---
*声明：本项目仅用于学习与娱乐，宝可梦版权归 Nintendo/Creatures Inc./GAME FREAK inc. 所有。*

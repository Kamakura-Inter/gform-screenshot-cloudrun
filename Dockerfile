# Node.js Puppeteer の公式イメージを使用
FROM ghcr.io/puppeteer/puppeteer:latest

# 作業ディレクトリ
WORKDIR /home/pptruser/app

# package.json をコピー
COPY package*.json ./

# 🔽 ここを修正！
RUN npm install --unsafe-perm

# アプリの中身をコピー
COPY . .

# 起動コマンド（必要に応じて変更）
CMD ["node", "index.js"]

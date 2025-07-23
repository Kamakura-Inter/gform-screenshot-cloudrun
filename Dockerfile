# Node.js の公式イメージを使用（Puppeteer 互換）
FROM ghcr.io/puppeteer/puppeteer:latest

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール（必要に応じて puppeteer を再インストール）
RUN npm install

# アプリのコードをコピー
COPY . .

# アプリのエントリーポイントを指定
CMD ["node", "index.js"]

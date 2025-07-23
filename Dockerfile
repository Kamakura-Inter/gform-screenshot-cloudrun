# Node.js の公式イメージ使用（Puppeteer 版）
FROM ghcr.io/puppeteer/puppeteer:latest

# 作業ディレクトリを pptruser のホームディレクトリ下に設定
WORKDIR /home/pptruser/app

# package.json をコピー
COPY package*.json ./

# puppeteer は既にインストール済みなので依存関係のみ
RUN npm install

# アプリのソースをコピー
COPY . .

# アプリを実行するユーザーを指定（非root）
USER pptruser

# アプリのエントリーポイントを指定
CMD ["node", "index.js"]

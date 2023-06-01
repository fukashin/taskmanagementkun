# Node.jsを基にしたイメージを使用
FROM node:18

# ワーキングディレクトリを設定
WORKDIR /usr/src/app

# ディレクトリ内のpackage.jsonをコピー
COPY package*.json ./

# パッケージのインストール
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# 環境変数を設定（ポートの指定など）
ENV PORT=3000

# ポートのエクスポーズ
EXPOSE 3000

# コンテナ起動時のコマンド
CMD [ "npm", "start" ]

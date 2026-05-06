# 社内FAQ — お客様対応サポートシステム

CSVファイルから社内FAQを表示するシンプルなWebシステムです。

## デプロイ手順

### 1. GitHubにプッシュ

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/あなたのユーザー名/faq-site.git
git push -u origin main
```

### 2. Vercelにデプロイ

1. https://vercel.com にログイン
2. 「Add New」→「Project」をクリック
3. GitHubリポジトリ「faq-site」をインポート
4. 「Framework Preset」は「Other」のままでOK
5. 「Deploy」をクリック

### 3. パスワード保護を有効化

Vercelダッシュボードでプロジェクトを開いて:

1. 「Settings」→「Environment Variables」
2. 以下の2つを追加:
   - `BASIC_AUTH_USER` = 任意のユーザー名（例: `staff`）
   - `BASIC_AUTH_PASS` = 任意のパスワード（例: `mySecret2026`）
3. 「Deployments」→ 最新のデプロイの右側「⋯」→「Redeploy」

これでアクセス時にユーザー名とパスワードを求められるようになります。

## ローカルで動作確認する方法

このフォルダの `index.html` をブラウザで直接開けばOK（Live Server拡張機能などを使うと便利）。

## ファイル構成

- `index.html` — メインページ（CSVを読み込んでFAQ表示）
- `middleware.js` — Vercel Edge Middlewareによるパスワード保護
- `vercel.json` — Vercelの設定ファイル


# 概要
画像を収集してマイリストを作るアプリです。react, express.jsを使用してdbへのアクセスやawsへのデプロイの習作として作りました。

絵を書いたりするときの参考資料集めに使用したりできるようにしたいと思っているので、ゆくゆくは類似画像のサジェスト・画像の分析などの機能をつけたいです。

# URL
- https://main.d2kpalskmrui20.amplifyapp.com/

# 技術スタック
| Category | Stack | 
| -------- | -------- | 
| Frontend     | React, Typescript     | 
| Backend     | express.js     |   
| Infrastructure     | AWS Amplify, EC2     | 
| Database     | MySQL     | 
| CI/CD     | Amplify(frontend)     | 
| library     |  Axios, react-router-dom, prisma, jwt     |
| CSS Framework    | MUI   |
| External API    | Unsplush Image API   |
| etc     | nginx    | 


# 制作期間
2024/10/12～


# 機能
- トップ画面
- 画像検索
- マイリスト
- サインイン/サインアップ


# 基本的な要素
- react-router-domを使用したルーティング
- axiosを使用してバックエンドのapiを使用
- 画像検索
    - 入力テキストをクエリとしたunsplush image apiをつかった画像の検索
- 画像表示
    - masonry listのレイアウトを使用
    - 画面幅に対するレスポンシブな表示
    - アニメーション
- jwtを使用したcookieを利用した認証

# 課題
- 画像表示の際にレイアウトが崩れる問題の解決
- バックエンドのエラーハンドリング
- EC2上でのデプロイの自動化
- 画像検索の手法を増やす


# 追加したい機能
- 画像分析機能の追加: 画像内の
- 類似画像の検索: 画像のタグや埋め込みを使用した画像検索
- 画像表示
    - 無限スクロール
    - 画像のホバーによる詳細表示
    - キャッシュの活用



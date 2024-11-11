
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

# Material Designを参考にしたhooksなどの実装
[Material Design](https://m3.material.io/)を読んでいて、インタラクションやアニメーションを含むデザインの定量化がされていてとてもおもしろかったので参考にしつつ、それらの機能を実現するためのカスタムフックやコンポーネントの実装を行っていく予定です。

- [ ] サイドバーを使ったページ遷移
    - Top levelのtransitionによってページの遷移を行う。 [Transition: Material Design](https://m3.material.io/styles/motion/transitions/transition-patterns#f852afd2-396f-49fd-a265-5f6d96680e16)
    - サイドバーの選択が保持されている間の色の変更
 framer-motionとreact-router-domを使用して、遷移が起こった際のアニメーションイベントを指定する。
- [ ] Loading画面
    - skelton loaderの実装。読み込みが終わっていない段階での事前レイアウト、左上から右下への脈動アニメーション。非同期関数をラップしてloading状態を監視することで行う。 [skelton loaders: Material Design](https://m3.material.io/styles/motion/transitions/transition-patterns#b39a0641-1b44-4864-83f5-fac38e0bd94a)
- [ ] レイアウト
- [ ] Action(hover, select, etc...)に対する色の管理 [State layers: Material Design](https://m3.material.io/foundations/interaction/states/state-layers#f432d79b-5ac0-4822-90da-f62ff78a4880)
どうするか考え中...

- [ ] スワイプライクなスクロール
    - このアプリは主にpc向けだがiosアプリのようなスワイプ操作に近いスクロールを行う。
- [ ] カーソル
      マウス座標を取得するhooksを作り、マウス座標に追従するポインターをつけた。



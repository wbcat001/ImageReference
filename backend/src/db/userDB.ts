
const mysql = require("mysql2/promise");


// MySQLデータベース接続の設定
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'my_db',
});

export default pool;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS transactions (
      idtransactions INTEGER PRIMARY KEY AUTOINCREMENT,
      description VARCHAR(255) NOT NULL,
      value VARCHAR(255) NOT NULL,
      type VARCHAR(50) NOT NULL
    )
  `,
    (err) => {
      if (err) {
        console.error("Erro ao criar tabela:", err);
      } else {
        console.log("Tabela criada com sucesso!");
      }

      // Feche a conexão com o banco de dados após criar a tabela
      db.close();
    }
  );
});

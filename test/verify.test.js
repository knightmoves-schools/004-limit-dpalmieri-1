const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const assert = require('assert');

function runScript(db, script) {
  const sql = fs.readFileSync(script, 'utf8');
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

describe('the SQL in the `exercise.sql` file', () => {
  let db;
  let scriptPath;

  beforeAll(() => {
    const dbPath = path.resolve(__dirname, '..', 'lesson4.db');
    db = new sqlite3.Database(dbPath);

    scriptPath = path.resolve(__dirname, '..', 'exercise.sql');
  });

  afterAll(() => {
    db.close();
  });

  it('should return only 5 rows and all columns from the Grocery table', async () => {
      const results = await runScript(db, scriptPath);

      expect(results.length).toBe(5);
      expect(results[0]).toHaveProperty('ID');
      expect(results[0]).toHaveProperty('PRODUCT_NAME');
      expect(results[0]).toHaveProperty('PRICE');
      expect(results[0]).toHaveProperty('DEPARTMENT');
  });
});

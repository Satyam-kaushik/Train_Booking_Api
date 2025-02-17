const db = require('../config/dbconfig');


class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    
    
  }

  async save() {
    try {
      const [result] = await db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [this.name, this.email, this.password]
      );
      return result;
    } catch (err) {
      throw new Error('Error saving user: ' + err.message);
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      throw new Error('Error finding user: ' + err.message);
    }
  }
}

module.exports = User;

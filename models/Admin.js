const db = require('../config/dbconfig');

class Admin {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    
  }

  async save() {
    try {
      const [result] = await db.query(
        'INSERT INTO admin (name, email, password) VALUES (?, ?, ?)',
        [this.name, this.email, this.password]
      );
      return result;
    } catch (err) {
      throw new Error('Error saving user: ' + err.message);
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await db.query('SELECT * FROM admin WHERE email = ?', [email]);
      return rows.length > 0 ? rows[0] : null;  // Return the first row if found, or null if not found
    } catch (err) {
      throw new Error('Error finding user: ' + err.message);
    }
  }
  
}

module.exports = Admin;

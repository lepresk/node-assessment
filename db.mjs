import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('test.sqlite');

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='categories'", (err, row) => {
  if (!row) {
    db.run("CREATE TABLE categories (id INTEGER PRIMARY KEY, name TEXT)", createCategoriesTableCallback);
  } else {
    console.log('Tables already exist, skipping creation.');
  }
});

db.run("CREATE TABLE tasks(id INTEGER PRIMARY KEY, name TEXT, description TEXT)")

function createCategoriesTableCallback(err) {
  if (err) {
    console.error('Error creating categories table:', err);
  } else {
    console.log('Categories table created successfully.');
    db.run("CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT, content TEXT, category_id INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", createPostsTableCallback);
  }
}

function createPostsTableCallback(err) {
  if (err) {
    console.error('Error creating posts table:', err);
  } else {
    console.log('Posts table created successfully.');
    insertInitialData();
  }
}

function insertInitialData() {
  db.run("INSERT INTO categories (name) VALUES ('Category 1')", insertCategoryCallback);
  db.run("INSERT INTO categories (name) VALUES ('Category 2')", insertCategoryCallback);

  db.run("INSERT INTO categories (name) VALUES ('Category 1')");
  db.run("INSERT INTO categories (name) VALUES ('Category 2')");
  db.run("INSERT INTO posts (title, content, category_id) VALUES ('Post 1', 'Content of post 1', 1)");
  db.run("INSERT INTO posts (title, content, category_id) VALUES ('Post 2', 'Content of post 2', 2)");
}

function insertCategoryCallback(err) {
  if (err) {
    console.error('Error inserting category:', err);
  } else {
    console.log('Category inserted successfully.');
  }
}

export default db;

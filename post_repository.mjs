import db from './db.mjs';

function getAllCategories() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM categories", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function getAllPosts() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM posts", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function getPostById(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT p.*, c.id AS category_id, c.name AS category_name FROM posts p INNER JOIN categories c ON p.category_id = c.id WHERE p.id = ?", [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (row) {
          const post = {
            id: row.id,
            title: row.title,
            content: row.content,
            category: {
              id: row.category_id,
              name: row.category_name
            },
            createdAt: row.created_at
          };
          resolve(post);
        } else {
          resolve(null);
        }
      }
    });
  });
}

function createPost(title, content, category_id) {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO posts (title, content, category_id) VALUES (?, ?, ?)", [title, content, category_id], function(err) {
      if (err) {
        reject(err);
      } else {
        getPostById(this.lastID).then(resolve).catch(reject);
      }
    });
  });
}

function updatePost(id, title, content, category_id) {
  return new Promise((resolve, reject) => {
    db.run("UPDATE posts SET title = ?, content = ?, category_id = ? WHERE id = ?", [title, content, category_id, id], function(err) {
      if (err) {
        reject(err);
      } else {
        getPostById(id).then(resolve).catch(reject);
      }
    });
  });
}

function deletePost(id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM posts WHERE id = ?", [id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export { getAllCategories, getAllPosts, getPostById, createPost, updatePost, deletePost };

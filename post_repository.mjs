import { object, string, number, optional } from 'zod';
import db from './db.mjs';


const taskSchema = object({
  name: string().min(1),
  description: string().min(1),
});

const updateTaskSchema = object({
  name: optional(string().min(1)),
  description: optional(string().min(1)),
});

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
    db.run(`DELETE FROM posts`, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function getAllTasks() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM tasks", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function getTaskById(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function createTask(name, description, post_id) {
  try {

    const taskData = taskSchema.parse({ name, description, post_id });

    return new Promise((resolve, reject) => {
      db.run("INSERT INTO tasks (name, description, post_id) VALUES (?, ?, ?)", [taskData.name, taskData.description, taskData.post_id], function(err) {
        if (err) {
          reject(err);
        } else {
          getTaskById(this.lastID).then(resolve).catch(reject);
        }
      });
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function updateTask(id, updates) {
  try {
    const taskUpdates = updateTaskSchema.parse(updates);
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          resolve(null);
        } else {
          const updatedTask = { ...row, ...taskUpdates };
          db.run(`UPDATE tasks SET title = '${updatedTask.title}', description = '${updatedTask.description}' WHERE id = ${id}`, function(err) {
            if (err) {
              reject(err);
            } else {
              getTaskById(id).then(resolve).catch(reject);
            }
          });
        }
      });
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function deleteTask(id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM tasks WHERE id = ?", [id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export { getAllCategories, getAllPosts, getPostById, createPost, updatePost, deletePost, getAllTasks, getTaskById, createTask, updateTask, deleteTask };

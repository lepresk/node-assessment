import express from 'express';
import { object, string, number } from 'zod';

const postSchema = object({
  title: string().min(1).max(255),
  content: string().min(1),
  category_id: number().positive()
});

import { getAllCategories, getAllPosts, getPostById, createPost, updatePost, deletePost } from './post_repository.mjs';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from './post_repository.mjs';

const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    const categories = getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/posts/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const post = await getPostById(id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/posts', async (req, res) => {
  try {
    const { title, content, category_id } = postSchema.parse(req.body);
    const createdPost = await createPost(title, content, category_id);
    res.status(201).json(createdPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/posts/:id', async (req, res) => {
  const id = req.params.id;
  const { title, content, category_id } = req.body;
  try {
    const updatedPost = await updatePost(id, title, content, category_id);
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/posts/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await deletePost(id);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/tasks/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const task = await getTaskById(id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/tasks', async (req, res) => {
  const { name, description, post_id } = req.body;
  try {
    const createdTask = await createTask(name, description, post_id);
    res.status(201).json(createdTask);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/tasks/:id', async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const updatedTask = await updateTask(id, updates);
    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/tasks/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await deleteTask(id);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;

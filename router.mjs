import express from 'express';
import { object, string, number } from 'zod';

// Schéma de validation pour la création de post
const postSchema = object({
  title: string().min(1).max(255),
  content: string().min(1),
  category_id: number().positive()
});

import { getAllCategories, getAllPosts, getPostById, createPost, updatePost, deletePost } from './post_repository.mjs';

const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    const categories = await getAllCategories();
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

export default router;

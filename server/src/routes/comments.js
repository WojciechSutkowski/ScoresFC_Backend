'use strict';
const express = require('express');

const {
  getAllComments,
  getGameComments,
  addComment,
  deleteComment,
} = require('../utils/Comments');
const { userAuth, checkRole } = require('../utils/Auth');

const router = express.Router();

router.get('/', async (req, res) => {
  return await getAllComments(res);
});

router.get('/:gameId', async (req, res) => {
  return await getGameComments(req.params.gameId, res);
});

router.post(
  '/create',
  userAuth,
  checkRole(['user', 'admin']),
  async (req, res) => {
    await addComment(
      req.body.params.username,
      req.body.params.gameId,
      req.body.params.comment,
      res
    );
  }
);

router.post('/delete', userAuth, checkRole(['admin']), async (req, res) => {
  await deleteComment(req.body.params._id, res);
});

module.exports = router;

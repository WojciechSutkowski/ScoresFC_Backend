const express = require('express');

const router = express.Router();

const {
  getAllComments,
  getGameComments,
  addComment,
  deleteComment,
} = require('../utils/Comments');

// USER PROTECTED ROUTE
router.get('/', async (req, res) => {
  return await getAllComments(res);
});

router.get('/:gameId', async (req, res) => {
  console.log(req.params.gameId);
  return await getGameComments(req.params.gameId, res);
});

router.post('/create', async (req, res) => {
  await addComment(req.body.username, req.body.gameId, req.body.comment, res);
  console.log(res.req.body);
});

router.delete('/delete', async (req, res) => {
  await deleteComment(req.query.username, 'admin', req.query._id, res);
  console.log(res.statusCode);
});

module.exports = router;

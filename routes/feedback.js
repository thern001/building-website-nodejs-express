const express = require('express');
const { NotExtended } = require('http-errors');

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (req, res, next) => {
    try {
      const feedback = await feedbackService.getList();
      return res.render('layout', { template: 'feedback', pageTitle: 'Feedback', feedback });
    } catch (error) {
      return next(error);
    }
  });

  router.post('/', (req, res) => {
    console.log(req.body);
    res.send('Feedback form posted');
  });
  return router;
};

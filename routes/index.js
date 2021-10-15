const express = require('express');

const speakerRoute = require('./speakers');
const feedbackRoute = require('./feedback');
const { request } = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res) => {
    const topSpeakers = await speakerService.getList();
    const speakerArtwork = await speakerService.getAllArtwork();
    res.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers, speakerArtwork });
  });

  router.use('/speakers', speakerRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};

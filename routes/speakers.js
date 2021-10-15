const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res) => {
    const speakers = await speakerService.getList();
    res.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers });
  });

  router.get('/:shortname', async (req, res) => {
    const speaker = await speakerService.getSpeaker(req.params.shortname);
    const speakerArtwork = await speakerService.getArtworkForSpeaker(req.params.shortname);

    return res.render('layout', {
      pageTitle: `Speaker ${speaker.name}`,
      template: 'speakers-detail',
      speaker,
      speakerArtwork,
    });
  });
  return router;
};

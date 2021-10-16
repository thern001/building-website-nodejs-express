const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res, next) => {
    try {
      const speakers = await speakerService.getList();
      const speakerArtwork = await speakerService.getAllArtwork();
      return res.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        speakerArtwork,
      });
    } catch (error) {
      return next(error);
    }
  });

  router.get('/:shortname', async (req, res, next) => {
    try {
      const speaker = await speakerService.getSpeaker(req.params.shortname);
      const speakerArtwork = await speakerService.getArtworkForSpeaker(req.params.shortname);

      return res.render('layout', {
        pageTitle: `Speaker ${speaker.name}`,
        template: 'speakers-detail',
        speaker,
        speakerArtwork,
      });
    } catch (error) {
      return next(error);
    }
  });

  return router;
};

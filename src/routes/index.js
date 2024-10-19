const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teamsController'); // Asegúrate de que este archivo y ruta existan
const playersController = require('../controllers/playersController');
// Ruta para obtener campeones de la NBA
router.get('/champions', teamsController.getNBAChampions);
router.get('/champions/:id', teamsController.getNBAChampionsById);
router.get('/conference_champions', teamsController.getConferenceChampions);
router.get('/conference_champions/:id', teamsController.getConferenceChampionsById);
router.get('/teams', teamsController.getTeams);
router.get('/teams/:id', teamsController.getTeamById);
router.get('/teams/:id/:season', teamsController.getSeasonStatsById);
router.get('/teams/:id/:season/players', teamsController.getPlayersStatsById);
router.get('/player/:id', playersController.getPlayerById);
router.get('/player/stats/:id', playersController.getPlayerStatsById);
router.get('/player/stats/:id/:season', playersController.getPlayerStatsBySeason);
router.get('/player/championships/:id', playersController.getChampionshipsByPlayer);
router.get('/player/conference_championships/:id', playersController.getConferenceChampionshipByPlayer);
router.get('/best_players', playersController.getBestPlayers);
router.get('/mvps', playersController.getMVPS);
router.get('/mvps/:id', playersController.getMVPSByID);
module.exports = router;

const pool = require("../config/db");

// Obtener campeones de la NBA
const getNBAChampions = async (req, res) => {
  try {
    const query = "SELECT * FROM nba_champions";
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error obteniendo los campeones de la NBA:", err);
    res
      .status(500)
      .json({ message: "Error al obtener los campeones de la NBA" });
  }
};

const getNBAChampionsById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM nba_champions WHERE idteam = ${id}`;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error obteniendo los campeones de la NBA:", err);
    res
      .status(500)
      .json({ message: "Error al obtener los campeones de la NBA" });
  }
};

const getConferenceChampions = async (req, res) => {
  try {
    const query = "SELECT * FROM conference_champions";
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error obteniendo los campeones de la NBA:", err);
    res
      .status(500)
      .json({ message: "Error al obtener los campeones de la NBA" });
  }
};

const getConferenceChampionsById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM conference_champions WHERE idteam = ${id}`;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error obteniendo los campeones de la NBA:", err);
    res
      .status(500)
      .json({ message: "Error al obtener los campeones de la NBA" });
  }
};

const getTeams = async (req, res) => {
  try {
    const query = "SELECT * FROM teams";
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error obteniendo los equipos:", err);
    res.status(500).json({ message: "Error al obtener los equipos" });
  }
};

const getTeamById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM teams WHERE id = ${id}`;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error obteniendo el equipo:", err);
    res.status(500).json({ message: "Error al obtener el equipo" });
  }
};

const getSeasonStatsById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const season = req.params.season;
    console.log(id, season);
    const query = `SELECT * FROM teams_stats as ts JOIN teams as t ON ts.idteam = t.id  WHERE idteam = $1 AND year = $2`;
    const result = await pool.query(query, [id, season.toString()]);
    if (result.rows.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error obteniendo los jugadores del equipo:", err);
    res
      .status(500)
      .json({ message: "Error al obtener los jugadores del equipo" });
  }
};

const getPlayersStatsById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const season = req.params.season;
    const query = `SELECT * FROM players_stats as ps JOIN teams as ts ON ps.team = ts.abreviation JOIN players p ON ps.id_player = p.id WHERE ts.id = $1 AND ps.season = $2`;
    const result = await pool.query(query, [id, season.toString()]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error obteniendo los jugadores del equipo:", err);
    res
      .status(500)
      .json({ message: "Error al obtener los jugadores del equipo" });
  }
};

module.exports = {
  getNBAChampions,
  getNBAChampionsById,
  getConferenceChampions,
  getConferenceChampionsById,
  getTeams,
  getTeamById,
  getSeasonStatsById,
  getPlayersStatsById,
};

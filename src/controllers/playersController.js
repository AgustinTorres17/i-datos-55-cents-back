const pool = require("../config/db");

const getPlayerById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM players WHERE id = ${id}`;
    const result = await pool.query(query);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error obteniendo los jugadores:", err);
    res.status(500).json({ message: "Error al obtener los jugadores" });
  }
};

const getPlayerStatsById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM players_stats WHERE id_player = ${id}`;
    const result = await pool.query(query);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error obteniendo las estadísticas del jugador:", err);
    res
      .status(500)
      .json({ message: "Error al obtener las estadísticas del jugador" });
  }
};

const getPlayerStatsBySeason = async (req, res) => {
  try {
    const id = req.params.id;
    const season = req.params.season;
    const query = `SELECT * FROM players_stats WHERE id_player = ${id} AND season = '${season}'`;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(
      "Error obteniendo las estadísticas del jugador por temporada:",
      err
    );
    res.status(500).json({
      message: "Error al obtener las estadísticas del jugador por temporada",
    });
  }
};

const getMVPS = async (req, res) => {
  try {
    const query = `SELECT * FROM mvp`;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error obteniendo los MVPs:", err);
    res.status(500).json({ message: "Error al obtener los MVPs" });
  }
};

const getMVPSByID = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM mvp WHERE idplayer = ${id}`;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error obteniendo el MVP:", err);
    res.status(500).json({ message: "Error al obtener el MVP" });
  }
};

const getChampionshipsByPlayer = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query = `
        SELECT nc.year, t.name as team_name 
        FROM players_stats as ps
        JOIN teams as t ON ps.team = t.abreviation
        JOIN teams_stats as ts ON t.id = ts.idteam
        JOIN nba_champions as nc ON ts.idteam = nc.idteam
        WHERE ps.id_player = $1
        AND LEFT(ps.season, 4) = LEFT(nc.year, 4)
        AND LEFT(ts.year, 4) = LEFT(nc.year, 4)
      `;
    const result = await pool.query(query, [id]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error obteniendo los campeonatos del jugador:", err);
    res
      .status(500)
      .json({ message: "Error al obtener los campeonatos del jugador" });
  }
};

const getConferenceChampionshipByPlayer = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query = `
          SELECT cc.year, t.name as team_name 
          FROM players_stats as ps
          JOIN teams as t ON ps.team = t.abreviation
          JOIN teams_stats as ts ON t.id = ts.idteam
          JOIN conference_champions as cc ON ts.idteam = cc.idteam
          WHERE ps.id_player = $1
          AND LEFT(ps.season, 4) = LEFT(cc.year, 4)
          AND LEFT(ts.year, 4) = LEFT(cc.year, 4)
        `;
    const result = await pool.query(query, [id]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error obteniendo los campeonatos del jugador:", err);
    res
      .status(500)
      .json({ message: "Error al obtener los campeonatos del jugador" });
  }
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getBestPlayers = async (req, res) => {
  try {
    const query = `
        SELECT ps.id_player, p.name, p.nba_id, COUNT(DISTINCT nc.year) as championships
        FROM players_stats as ps
        JOIN players as p ON ps.id_player = p.id
        JOIN teams as t ON ps.team = t.abreviation
        JOIN teams_stats as ts ON t.id = ts.idteam
        JOIN nba_champions as nc ON ts.idteam = nc.idteam
        WHERE LEFT(ps.season, 4) = LEFT(nc.year, 4) and p.nba_id != -1
        GROUP BY ps.id_player, p.name, p.nba_id
        ORDER BY championships DESC
        LIMIT 50;
      `;
    const result = await pool.query(query);
    const shuffledRows = shuffle(result.rows);
    res.status(200).json(shuffledRows.slice(0, 10));
  } catch (err) {
    console.error("Error obteniendo los mejores jugadores:", err);
    res.status(500).json({ message: "Error al obtener los mejores jugadores" });
  }
};

module.exports = {
  getPlayerById,
  getPlayerStatsById,
  getPlayerStatsBySeason,
  getMVPS,
  getMVPSByID,
  getChampionshipsByPlayer,
  getConferenceChampionshipByPlayer,
  getBestPlayers,
};

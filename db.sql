-- public.teams definition

-- Drop table

-- DROP TABLE public.teams;

CREATE TABLE public.teams (
	id serial4 NOT NULL,
	"name" varchar(100) NULL,
	imageurl text NULL,
	abreviation varchar NULL,
	CONSTRAINT teams_pkey PRIMARY KEY (id)
);


-- public.players definition

-- Drop table

-- DROP TABLE public.players;

CREATE TABLE public.players (
	id serial4 NOT NULL,
	"name" varchar(100) NULL,
	"position" varchar(50) NULL,
	nba_id int8 NULL,
	CONSTRAINT players_pkey PRIMARY KEY (id)
);

-- public.players_stats definition

-- Drop table

-- DROP TABLE public.players_stats;

CREATE TABLE public.players_stats (
	id_player int4 NOT NULL,
	"year" varchar(9) NOT NULL,
	team varchar NOT NULL,
	games int4 NULL,
	games_started int4 NULL,
	minutes_played float8 NULL,
	fg float8 NULL,
	fga float8 NULL,
	fg_percentage float8 NULL,
	three_points float8 NULL,
	three_pa float8 NULL,
	three_p_percentage float8 NULL,
	two_points float8 NULL,
	two_pa float8 NULL,
	two_p_percentage float8 NULL,
	efg_percentage float8 NULL,
	ft float8 NULL,
	fta float8 NULL,
	ft_percentage float8 NULL,
	orb float8 NULL,
	drb float8 NULL,
	trb float8 NULL,
	ast float8 NULL,
	stl float8 NULL,
	blk float8 NULL,
	tov float8 NULL,
	pf float8 NULL,
	pts float8 NULL,
	season varchar NULL,
	CONSTRAINT players_stats_pkey PRIMARY KEY (id_player, year, team)
);


-- public.players_stats foreign keys

ALTER TABLE public.players_stats ADD CONSTRAINT players_stats_id_player_fkey FOREIGN KEY (id_player) REFERENCES public.players(id);

-- public.teams_stats definition

-- Drop table

-- DROP TABLE public.teams_stats;

CREATE TABLE public.teams_stats (
	idteam int4 NOT NULL,
	"year" varchar(9) NOT NULL,
	games int4 NULL,
	fg float8 NULL,
	fga float8 NULL,
	fg_percentage float8 NULL,
	three_points float8 NULL,
	three_pa float8 NULL,
	three_p_percentage float8 NULL,
	ft float8 NULL,
	fta float8 NULL,
	ft_percentage float8 NULL,
	orb float8 NULL,
	drb float8 NULL,
	trb float8 NULL,
	ast float8 NULL,
	stl float8 NULL,
	blk float8 NULL,
	tov float8 NULL,
	pf float8 NULL,
	pts float8 NULL,
	eff float8 NULL,
	deff float8 NULL,
	CONSTRAINT teams_stats_pkey PRIMARY KEY (idteam, year)
);


-- public.teams_stats foreign keys

ALTER TABLE public.teams_stats ADD CONSTRAINT teams_stats_idteam_fkey FOREIGN KEY (idteam) REFERENCES public.teams(id);

-- public.mvp definition

-- Drop table

-- DROP TABLE public.mvp;

CREATE TABLE public.mvp (
	idplayer int4 NOT NULL,
	"year" varchar(9) NOT NULL,
	CONSTRAINT mvp_pkey PRIMARY KEY (idplayer, year)
);


-- public.mvp foreign keys

ALTER TABLE public.mvp ADD CONSTRAINT mvp_idplayer_fkey FOREIGN KEY (idplayer) REFERENCES public.players(id);



-- public.nba_champions definition

-- Drop table

-- DROP TABLE public.nba_champions;

CREATE TABLE public.nba_champions (
	idteam int4 NOT NULL,
	"year" varchar(9) NOT NULL,
	CONSTRAINT nba_champions_pkey PRIMARY KEY (idteam, year)
);


-- public.nba_champions foreign keys

ALTER TABLE public.nba_champions ADD CONSTRAINT nba_champions_idteam_fkey FOREIGN KEY (idteam) REFERENCES public.teams(id);


-- public.conference_champions definition

-- Drop table

-- DROP TABLE public.conference_champions;

CREATE TABLE public.conference_champions (
	idteam int4 NOT NULL,
	"year" varchar(9) NOT NULL,
	conference varchar(50) NULL,
	CONSTRAINT conference_champions_pkey PRIMARY KEY (idteam, year)
);


-- public.conference_champions foreign keys

ALTER TABLE public.conference_champions ADD CONSTRAINT conference_champions_idteam_fkey FOREIGN KEY (idteam) REFERENCES public.teams(id);
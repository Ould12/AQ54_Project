-- Vérification de l'existence du rôle 'postgres' avant de le créer
DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'postgres') THEN
      CREATE ROLE postgres;
   END IF;
END
$$;

-- Truncate tables sans conflit de dépendances
TRUNCATE TABLE public.capteur RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.metrics RESTART IDENTITY CASCADE;

SET default_transaction_read_only = off;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

-- Création des tables uniquement si elles n'existent pas
CREATE TABLE IF NOT EXISTS public.capteur (
    id integer NOT NULL PRIMARY KEY,
    libelle character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);

CREATE TABLE IF NOT EXISTS public.metrics (
    id integer NOT NULL PRIMARY KEY,
    libelle character varying(255) NOT NULL,
    unite character varying(255) NOT NULL,
    code character varying(255) DEFAULT 'extT'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);

CREATE TABLE IF NOT EXISTS public.capteur_metrics (
    id integer NOT NULL PRIMARY KEY,
    moyenne character varying(255) NOT NULL,
    "time" character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "capteurId" integer,
    "metricId" integer,
    CONSTRAINT "FK_capteur_metrics_metricId" FOREIGN KEY ("metricId") REFERENCES public.metrics(id),
    CONSTRAINT "FK_capteur_metrics_capteurId" FOREIGN KEY ("capteurId") REFERENCES public.capteur(id)
);

-- Définir les séquences si elles n'existent pas et les attacher aux colonnes concernées
CREATE SEQUENCE IF NOT EXISTS public.capteur_id_seq
    AS integer START WITH 1 INCREMENT BY 1 CACHE 1;
ALTER SEQUENCE public.capteur_id_seq OWNED BY public.capteur.id;

CREATE SEQUENCE IF NOT EXISTS public.metrics_id_seq
    AS integer START WITH 1 INCREMENT BY 1 CACHE 1;
ALTER SEQUENCE public.metrics_id_seq OWNED BY public.metrics.id;

CREATE SEQUENCE IF NOT EXISTS public.capteur_metrics_id_seq
    AS integer START WITH 1 INCREMENT BY 1 CACHE 1;
ALTER SEQUENCE public.capteur_metrics_id_seq OWNED BY public.capteur_metrics.id;

-- Définir les valeurs par défaut des séquences pour les ID
ALTER TABLE ONLY public.capteur ALTER COLUMN id SET DEFAULT nextval('public.capteur_id_seq'::regclass);
ALTER TABLE ONLY public.metrics ALTER COLUMN id SET DEFAULT nextval('public.metrics_id_seq'::regclass);
ALTER TABLE ONLY public.capteur_metrics ALTER COLUMN id SET DEFAULT nextval('public.capteur_metrics_id_seq'::regclass);

-- Insertion des données initiales
--
-- TOC entry 3358 (class 0 OID 16386)
-- Data for Name: capteur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.capteur (id, libelle, "createdAt", "isDeleted") FROM stdin WITH (FORMAT csv, DELIMITER E'\t', NULL '');
1	SMART188	2024-10-25 12:10:03.756928	f
2	SMART189	2024-10-25 12:10:12.757221	f
\.


--
-- TOC entry 3360 (class 0 OID 16395)
-- Dependencies: 212
-- Data for Name: metrics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metrics (id, libelle, unite, code, "createdAt", "isDeleted") FROM stdin WITH (FORMAT csv, DELIMITER E'\t', NULL '');
1	PM2.5	µg/m³	pm25	2024-10-25 12:13:12.973481	f
2	PM10	µg/m³	pm10	2024-10-25 12:14:18.322042	f
3	NO2	µg/m³	no2	2024-10-25 12:16:40.747926	f
4	CO	mg/m³	co	2024-10-25 12:17:42.636724	f
5	O3	µg/m³	o3	2024-10-25 12:18:06.451852	f
6	RH	%	rh	2024-10-25 12:18:23.191588	f
7	Temp. Ext.	°C	extT	2024-10-25 12:18:44.465782	f
8	Temp. Int.	°C	intT	2024-10-25 12:19:02.16597	f
\.


-- Ajustement des séquences pour refléter la dernière valeur d'ID insérée
SELECT pg_catalog.setval('public.capteur_id_seq', 2, true);
SELECT pg_catalog.setval('public.metrics_id_seq', 8, true);
SELECT pg_catalog.setval('public.capteur_metrics_id_seq', 1, false);

--
-- PostgreSQL database cluster dump
--

-- Started on 2024-10-25 12:20:49 GMT

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;

--
-- User Configurations
--






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Debian 14.13-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)

-- Started on 2024-10-25 12:20:49 GMT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3329 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2024-10-25 12:20:49 GMT

--
-- PostgreSQL database dump complete
--

--
-- Database "aq54_db" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Debian 14.13-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)

-- Started on 2024-10-25 12:20:49 GMT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3368 (class 1262 OID 16384)
-- Name: aq54_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE aq54_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE aq54_db OWNER TO postgres;

\connect aq54_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16386)
-- Name: capteur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.capteur (
    id integer NOT NULL,
    libelle character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.capteur OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16385)
-- Name: capteur_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.capteur_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.capteur_id_seq OWNER TO postgres;

--
-- TOC entry 3370 (class 0 OID 0)
-- Dependencies: 209
-- Name: capteur_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.capteur_id_seq OWNED BY public.capteur.id;


--
-- TOC entry 214 (class 1259 OID 16407)
-- Name: capteur_metrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.capteur_metrics (
    id integer NOT NULL,
    moyenne character varying(255) NOT NULL,
    "time" character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "capteurId" integer,
    "metricId" integer
);


ALTER TABLE public.capteur_metrics OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16406)
-- Name: capteur_metrics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.capteur_metrics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.capteur_metrics_id_seq OWNER TO postgres;

--
-- TOC entry 3371 (class 0 OID 0)
-- Dependencies: 213
-- Name: capteur_metrics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.capteur_metrics_id_seq OWNED BY public.capteur_metrics.id;


--
-- TOC entry 212 (class 1259 OID 16395)
-- Name: metrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metrics (
    id integer NOT NULL,
    libelle character varying(255) NOT NULL,
    unite character varying(255) NOT NULL,
    code character varying(255) DEFAULT 'extT'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.metrics OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16394)
-- Name: metrics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.metrics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.metrics_id_seq OWNER TO postgres;

--
-- TOC entry 3372 (class 0 OID 0)
-- Dependencies: 211
-- Name: metrics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.metrics_id_seq OWNED BY public.metrics.id;


--
-- TOC entry 3200 (class 2604 OID 16389)
-- Name: capteur id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.capteur ALTER COLUMN id SET DEFAULT nextval('public.capteur_id_seq'::regclass);


--
-- TOC entry 3207 (class 2604 OID 16410)
-- Name: capteur_metrics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.capteur_metrics ALTER COLUMN id SET DEFAULT nextval('public.capteur_metrics_id_seq'::regclass);


--
-- TOC entry 3203 (class 2604 OID 16398)
-- Name: metrics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metrics ALTER COLUMN id SET DEFAULT nextval('public.metrics_id_seq'::regclass);


--
-- TOC entry 3358 (class 0 OID 16386)
-- Dependencies: 210
-- Data for Name: capteur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.capteur (id, libelle, "createdAt", "isDeleted") FROM stdin;
1	SMART188	2024-10-25 12:10:03.756928	f
2	SMART189	2024-10-25 12:10:12.757221	f
\.


--
-- TOC entry 3362 (class 0 OID 16407)
-- Dependencies: 214
-- Data for Name: capteur_metrics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.capteur_metrics (id, moyenne, "time", "createdAt", "isDeleted", "capteurId", "metricId") FROM stdin;
\.


--
-- TOC entry 3360 (class 0 OID 16395)
-- Dependencies: 212
-- Data for Name: metrics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metrics (id, libelle, unite, code, "createdAt", "isDeleted") FROM stdin;
1	PM2.5	µg/m³	extT	2024-10-25 12:13:12.973481	f
2	PM10	µg/m³	extT	2024-10-25 12:14:18.322042	f
3	NO2	µg/m³	extT	2024-10-25 12:16:40.747926	f
4	CO	mg/m3	extT	2024-10-25 12:17:42.636724	f
5	O3	µg/m³	extT	2024-10-25 12:18:06.451852	f
6	RH	%	extT	2024-10-25 12:18:23.191588	f
7	Temp. Ext.	°C	extT	2024-10-25 12:18:44.465782	f
8	Temp. Int.	°C	extT	2024-10-25 12:19:02.16597	f
\.


--
-- TOC entry 3373 (class 0 OID 0)
-- Dependencies: 209
-- Name: capteur_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.capteur_id_seq', 2, true);


--
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 213
-- Name: capteur_metrics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.capteur_metrics_id_seq', 1, false);


--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 211
-- Name: metrics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.metrics_id_seq', 8, true);


--
-- TOC entry 3215 (class 2606 OID 16416)
-- Name: capteur_metrics PK_15cf5350ec3b34bcd736740fd1c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.capteur_metrics
    ADD CONSTRAINT "PK_15cf5350ec3b34bcd736740fd1c" PRIMARY KEY (id);


--
-- TOC entry 3211 (class 2606 OID 16393)
-- Name: capteur PK_4c491166f327bd6cb5b1436bd7b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.capteur
    ADD CONSTRAINT "PK_4c491166f327bd6cb5b1436bd7b" PRIMARY KEY (id);


--
-- TOC entry 3213 (class 2606 OID 16405)
-- Name: metrics PK_5283cad666a83376e28a715bf0e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metrics
    ADD CONSTRAINT "PK_5283cad666a83376e28a715bf0e" PRIMARY KEY (id);


--
-- TOC entry 3216 (class 2606 OID 16422)
-- Name: capteur_metrics FK_0e19238044653956616b3402691; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.capteur_metrics
    ADD CONSTRAINT "FK_0e19238044653956616b3402691" FOREIGN KEY ("metricId") REFERENCES public.metrics(id);


--
-- TOC entry 3217 (class 2606 OID 16417)
-- Name: capteur_metrics FK_2bf880811869a32721931ca617b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.capteur_metrics
    ADD CONSTRAINT "FK_2bf880811869a32721931ca617b" FOREIGN KEY ("capteurId") REFERENCES public.capteur(id);


--
-- TOC entry 3369 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2024-10-25 12:20:49 GMT

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Debian 14.13-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)

-- Started on 2024-10-25 12:20:49 GMT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3329 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2024-10-25 12:20:49 GMT

--
-- PostgreSQL database dump complete
--

-- Completed on 2024-10-25 12:20:49 GMT

--
-- PostgreSQL database cluster dump complete
--


--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: product; Type: TABLE; Schema: public; Owner: diplom_maker
--

CREATE TABLE public.product (
    name character varying(80),
    description text,
    price double precision,
    quantity integer,
    img text
);


ALTER TABLE public.product OWNER TO diplom_maker;

--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: diplom_maker
--

COPY public.product (name, description, price, quantity, img) FROM stdin;
Beauty	Some new skate	399	2	none
\.


--
-- PostgreSQL database dump complete
--


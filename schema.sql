-- DROP SCHEMA if exists qa;
-- CREATE SCHEMA qa;
drop table if exists answers cascade;
drop table if exists questions cascade;
drop table if exists photos cascade;

CREATE TABLE questions (
	question_id serial PRIMARY KEY,
	product_id int,
	question_body varchar,
	question_date date,
	asker_name varchar,
	asker_email varchar,
	question_helpfulness int,
	reported boolean
);

CREATE table answers (
  answer_id serial primary key,
  question_id int,
  body varchar,
  date date,
  answerer_name varchar,
  answerer_email varchar,
  helpfulness int,
  reported boolean,
  foreign key(question_id)
    references questions(question_id)
      on delete cascade
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  answer_id int,
  url VARCHAR,
  FOREIGN KEY(answer_id)
    REFERENCES answers(answer_id)
      ON DELETE CASCADE
);

-- psql -h localhost -p 5432 -d qa -f schema.sql


-- psql --dbname=postgres --username=postgres --file=/sql/questionnaire/create-dquestionnaire-db.sql
-- psql --dbname=questionnaire_db --username=questionnaire_db_user --file=/sql/questionnaire/create-questionnaire-schema.sql


CREATE ROLE questionnaire_db_user LOGIN PASSWORD 'VibeCheck10.05.2025';

CREATE DATABASE questionnaire_db;

GRANT ALL ON DATABASE questionnaire_db TO questionnaire_db_user;

CREATE TABLESPACE questionnairespace OWNER questionnaire_db_user LOCATION '/var/lib/postgresql/tablespace/questionnaire';
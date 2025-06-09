    --    psql --dbname=postgres --username=postgres --file=/sql/questionnaire/create-questionnaire-db.sql
    --    psql --dbname=questionnaire_db --username=questionnaire_db_user --file=/sql/questionnaire/create-questionnaire-schema.sql

CREATE SCHEMA IF NOT EXISTS questionnaire_schema AUTHORIZATION questionnaire_db_user;

ALTER ROLE questionnaire_db_user SET search_path = 'questionnaire_schema';
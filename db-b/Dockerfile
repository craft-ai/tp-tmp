FROM postgres:14.1-alpine

ENV POSTGRES_USER myuser
ENV POSTGRES_PASSWORD mypassword
ENV POSTGRES_DB mynewdb

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

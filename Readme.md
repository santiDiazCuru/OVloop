# OVLoop - Plataforma5 Servicio de notificaciones


## Running this app

This application is dockerized so ideally you only need `docker` and `docker-compose` to run this app.

To start the server (api) locally, just run:

```bash
docker-compose up server-local
```

To run the unit tests (not yet setup), just run:

```bash
docker-compose up test
```

To recreate container run the next commands and then start it again:

```bash
docker-compose down
```

```bash
docker-compose build
```
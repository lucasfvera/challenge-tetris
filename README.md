# Tetris Challenge

A 3D Tetris game with save/load functionality.

## Running the Services and Client

### Using Docker (Recommended)

Run the server, database, and client with docker:

```bash
docker compose up
```

The server will be available at `http://localhost:8000`.
The client will be available at `http://localhost:5173`.

### Running Locally

#### Client

See [client/README.md](client/README.md) for local setup instructions.

#### Server

See [server/README.md](server/README.md) for local setup instructions.

## Environment Variables

Copy `.env` to configure database credentials. Default values work with Docker setup.

# Vinci Challenge - Server

FastAPI server for saving and loading Tetris game state.

## Running Locally

### Prerequisites

- Python 3.11+
- PostgreSQL running on port 5433

### Setup

Install dependencies:

```bash
pip install -r requirements.txt
```

Set up the database:

```bash
python app/init_db.py
```

### Run Options

**Development mode** (auto-reload):

```bash
fastapi dev app/main.py --port 8000
```

**Production mode**:

```bash
fastapi run app/main.py --port 8000
```

## Running with Docker

From the project root:

```bash
docker compose up
```

This starts both the PostgreSQL database and the server. The database is automatically initialized on startup.

## Database

The server uses PostgreSQL to store game state. Connection details are configured via environment variables in `.env`:

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `DATABASE_URL`

When running locally, ensure PostgreSQL is accessible on port 5433 and update `DATABASE_URL` accordingly.

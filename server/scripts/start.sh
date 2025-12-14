#!/bin/bash

set -e

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Navigate to the server directory (parent of scripts)
cd "$SCRIPT_DIR/.."

# Add the project root to PYTHONPATH so 'server' module can be found
export PYTHONPATH="$(cd .. && pwd):$PYTHONPATH"

# 1. Run migrations / initialization
# This ensures tables exist before the app wakes up
echo "Running database initialization..."
python init_db.py

# 2. Start the application
echo "Starting FastAPI..."
fastapi run --workers 4 main.py
#!/bin/bash

set -e

# Restore the dump with psql
psql -U postgres -d aq54_db -f /docker-entrypoint-initdb.d/init.sql

echo "Database restore completed"

#!/usr/bin/env bash
set -e

SCRIPT_PATH="$(dirname "${BASH_SOURCE[0]}")"
cd $SCRIPT_PATH

function cleanup() {
    docker logs ${CONTAINER_ID} --tail 15
    docker-compose -f ../docker-compose.yml down -v
    docker-compose -f ./docker-compose.yml down -v
}

if [ "$1" == "db" ]; then
    docker-compose \
        -f docker-compose-db.yml \
        up --force-recreate --remove-orphans
else
    docker-compose \
        -f docker-compose-db.yml \
        -f docker-compose-service-a.yml \
        up --force-recreate --remove-orphans
fi

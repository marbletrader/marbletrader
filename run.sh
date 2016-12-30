cd web/server && ./build.sh
cd ../.. && docker-compose build db
# docker-compose build server
docker-compose up

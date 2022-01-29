# Build project

docker build -t yerlem-observer-app .

## Run project
docker run -p 7082:80 -d yerlem-observer-app

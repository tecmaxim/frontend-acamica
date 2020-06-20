# Challenge React Frontend Acamica
### v1.0.0

## How to start
### Clone repository
```bash
git clone https://github.com/tecmaxim/api-acamica.git
```
### Install dependencies, copy env file set the main settings and run the main script
```bash
cd api-acamica/
npm i
# You must config variables as you need. example your db host:user:pw
cp .env.example .env
node app.js
```
### IMPORTANT
It is mandatory to have the Main API running for this to work properly:
https://github.com/tecmaxim/node-api-acamica.git

## Run with Docker

1) Install Docker.

2) Create .env file using .env.example info (Modify envs vars as much as you need).

3) In project root execute ```~$ docker build -t [docker-repository-name] .```.

4) Then run the docker ```~$ sudo docker run --publish [port]:[port] --name [docker-image-name]  -v [absolute root to the proyect]:/[proyect-name] -d [docker-repository-name]```.

5) Try to get into the bash with ```~$ docker exec -it [docker-image-name] bash```.
docker container run -p 80:80 --name nginx-fazztrack -v $(pwd):/usr/share/nginx/html nginx:alpine

docker-compose up
docker-compose up -d
docker-compose ps
docker-compose ps -a
docker-compose images
docker-compose logs
docker-compose top web1
docker-compose start web1
docker-compose stop web1


docker build : docker-compose build
docker container run -d : docker-compose up -d


# syntax=docker/dockerfile:1
FROM python:3.7-alpine = cari base image ukuran kecil alpine

WORKDIR /code = cd membuka folder

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0


RUN apk add --no-cache gcc musl-dev linux-headers = apt-get install


COPY requirements.txt requirements.txt 

RUN pip install -r requirements.txt  = npm install


EXPOSE 5000 = port yang dibuka oleh aplikasi python


COPY . . copy folder yang ada di compose 1 ke folder /code

CMD ["flask", "run"] = flask run = npm start


DOCKER VOLUME - BIND
====================
"menggunakan direktori yang ada pada host"
docker container run --name mysql-fazztrack -v /home/user/Apps/fazztrack/sesi-8/volumes/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=true -d mysql:latest
docker container run --name nginx-fazztrack -d -p 82:80 -v /home/user/Apps/fazztrack/sesi-8/volumes/nginx:/usr/share/nginx/html nginx:latest


DOCKER VOLUME - MOUNT
=====================
"menggunakan volume yang sudah dibuat sebelumnya"
docker container run --name nginx1-fazztrack -d -p 83:80 -v nginx-1:/usr/share/nginx/html nginx:latest


docker volume create <nama volume>
docker network create <nama network>


RUNNING WORDPRESS
=================
docker pull wordpress

docker container run --name wp-mysql -v /home/user/Apps/fazztrack/sesi-8/volumes/wordpress:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=passroot -e MYSQL_DATABASE=db_wordpress -e MYSQL_USER=wp-fazztrack -e MYSQL_PASSWORD=pass-fazztrack --network wp-network -d mysql:latest

docker container run -p 84:80 --name wp-fazztrack -v /home/user/Apps/fazztrack/sesi-8/volumes/wp:/var/www/html -e WORDPRESS_DB_HOST=wp-mysql -e WORDPRESS_DB_USER=wp-fazztrack -e WORDPRESS_DB_PASSWORD=pass-fazztrack -e WORDPRESS_DB_NAME=db_wordpress --network wp-network -d wordpress:latest



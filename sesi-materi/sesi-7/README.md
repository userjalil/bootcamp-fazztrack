DOCKER COMMAND
==============
docker container run --name nginx-fazztrack nginx
docker container run -d -p 81:80 --name <nama container> <nama image>
docker container run -p 81:80 --name <nama container> <nama image>
docker container run -d -p 81:80 --name <nama container> <nama image>

docker ps
docker ps -a
docker container ls

docker container rm <id/nama container>                                     -> menghapus container yang tidak berjalan
docker container rm -f <id/nama container>                                  -> menghapus container yang sedang berjalan

docker container stop <id/nama container>
docker container start <id/nama container>

docker exec -it <id/nama container> /bin/bash                               -> mengakses shell/console container yang sedang berjalan 
docker exec -it <id/nama container> sh 

docker container stats
docker container top <id/nama container>

docker build -t <nama image> .                                              -> membuat image sesuai dockerfile
docker build -t <nama image> -f <nama dockerfile>                           -> membuat iamge sesuai nama dan ekstensi dockerfile

docker tag <nama image> <username docker>/<nama image>:<versi>
docker tag nginx-fazztrack userjalil/nginxfazztrack:1.0

docker inspect <id/nama container>                                          -> melihat detail informasi dari container

docker rmi <id/nama images>                                                 -> menghapus images




//-- pull down image
docker pull IMAGENAME

//--run image
docker run IMAGENAME

//--show all docker images present on machine
docker images

//--show running images
docker ps
docker start IMAGE-ID
docker stop IMAGE-ID
 -d is detached mode - i.e run container as a service in background

 

//--better
docker run -p 13306:3306 --name yoyo -e MYSQL_ROOT_PASSWORD=bils32611 -d bilzadb:latest


docker exec -it CONTAINER_NAME /bin/bash

mysql -uroot -p -A

select user , host from mysql.user;

update mysql.user SET  host="%" where user = "root"; //or what ever is password
flush privileges;

exit twice once to exit from mysql 2nd form conteiner os



//////////////-----------push 
before you push you have to tag your repository 
docker tag bubble:1 bilza2023/bubble


//--how to find the port number of mysql
show variables where variable_name = 'port';

// run a docker mysql container in localhost
mysql -h127.0.0.1 -P3306 -uroot -pmy-secret-pw


////--to see all containers running
docker ps
//-to see all containers running or not
docker ps -a

//--if we use docker run --this will create a new container from an image to run an existing container use
docekr start nameofcontainer

--//how to find the IP address of a running container 
docker inspect <containr name> | find "IPAddress"
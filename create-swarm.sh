#! /bin/bash

docker-machine create --driver virtualbox --virtualbox-memory 2048 --virtualbox-disk-size 10000 --virtualbox-cpu-count 1 manager
docker-machine ssh manager docker swarm init --advertise-addr eth1

echo {"\""insecure-registries"\"" : ["\""192.168.99.0/24"\""]} > daemon.json

docker-machine scp ./daemon.json manager:/home/docker/daemon.json
docker-machine ssh manager sudo cp /home/docker/daemon.json /etc/docker/daemon.json
docker-machine restart manager

export SWARM_TOKEN=$(docker-machine ssh manager docker swarm join-token -q worker)
export MANAGER_IP=$(docker-machine ip manager)
export DOCKER_REGISTRY=$MANAGER_IP:5001

for i in {1..5}
do
	docker-machine create --driver virtualbox --virtualbox-memory 2048 --virtualbox-disk-size 10000 --virtualbox-cpu-count 1 worker-$i
	docker-machine ssh worker-$i docker swarm join --token $SWARM_TOKEN $MANAGER_IP:2377
	docker-machine scp ./daemon.json worker-$i:/home/docker/daemon.json
	docker-machine ssh worker-$i sudo cp /home/docker/daemon.json /etc/docker/daemon.json
	docker-machine restart worker-$i
done

# sudo cp daemon.json /etc/docker/daemon.json
# systemctl restart docker
# rm daemon.json

eval $(docker-machine env manager)
docker run -d -p 5001:5000 --restart=always --name registry registry
sleep 5

eval $(docker-machine env -u)
docker-compose build
docker-compose push

eval $(docker-machine env manager)
docker stack deploy --with-registry-auth project -c ./docker-compose.yml

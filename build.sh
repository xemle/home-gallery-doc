#!/bin/bash

docker images| awk '{print $1}' | grep home-gallery-doc > /dev/null
if [ $? -ne 0 ]; then
  echo "Docker image is missing. Building it..."
  docker build -t home-gallery-doc .
fi
docker run -ti --rm -u $(id -u):$(id -g) -v $(pwd):/docs home-gallery-doc make html
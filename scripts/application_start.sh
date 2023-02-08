#!/bin/sh

# Start Backend application
cd /home/ec2-user/catculator/backend

echo "Remove Previous Application"
make drm

echo "Build Application"
make dbuild

echo "Start Backend Application"
make drun

# Start Frontend application
cd /home/ec2-user/catculator/frontend

echo "Remove Previous Application"
make drm

echo "Build Application"
make dbuild

echo "Start Frontend Application"
make drun   
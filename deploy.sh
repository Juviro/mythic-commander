#!/bin/bash
echo -e "\e[93mBuilding frontend"
(cd /home/hauke/packages/mtg/frontend && yarn install --production=false && yarn build)

echo -e "\e[93mBuilding backend"
(cd /home/hauke/packages/mtg/backend && yarn install --production=false && yarn build)

echo -e "\e[93mdeploying frontend"
rm -rf /var/www/virtual/hauke/html/* 
cp -r /home/hauke/packages/mtg/frontend/build/* /var/www/virtual/hauke/html/

echo -e "\e[93mrestarting backend"
supervisorctl restart mtg
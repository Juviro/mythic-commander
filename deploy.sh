#!/bin/bash
echo -e "\e[93mBuilding frontend\e[39"
(cd /home/hauke/packages/mtg/frontend && yarn install --production=false && yarn build)

echo -e "\e[93mBuilding backend\e[39"
(cd /home/hauke/packages/mtg/backend && yarn install --production=false && yarn build)

echo -e "\e[93mdeploying frontend\e[39"
rm -rf /var/www/virtual/hauke/html/* 
cp -r /home/hauke/packages/mtg/frontend/build/* /var/www/virtual/hauke/html/

echo -e "\e[93mrestarting backend\e[39"
supervisorctl restart mtg
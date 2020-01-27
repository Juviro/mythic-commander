#!/bin/bash
set -e

echo -e "\e[44mBuilding frontend\e[0m"
cd /home/hauke/packages/mtg/frontend && yarn install --production=false && rm -rf /home/hauke/packages/mtg/frontend/build && yarn build

echo -e "\e[44mBuilding backend\e[0m"
cd /home/hauke/packages/mtg/backend && yarn install --production=false && yarn build

echo -e "\e[44mdeploying frontend\e[0m"
rm -rf /var/www/virtual/hauke/html/* 
cp -r /home/hauke/packages/mtg/frontend/build/* /var/www/virtual/hauke/html/

echo -e "\e[44mrestarting backend\e[0m"
supervisorctl restart mtg
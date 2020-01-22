#!/bin/bash
echo \e[92mBuilding frontend
(cd /home/hauke/packages/mtg/frontend && yarn install --production=false && yarn build)

echo \e[92mBuilding backend
(cd /home/hauke/packages/mtg/backend && yarn install --production=false && yarn build)

echo \e[92mdeploying frontend
rm -rf /var/www/virtual/hauke/html/* 
cp -r /home/hauke/packages/mtg/frontend/build/* /var/www/virtual/hauke/html/

echo \e[92mrestarting backend
supervisorctl restart mtg
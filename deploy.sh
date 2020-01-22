#!/bin/bash
echo Building frontend
(cd /home/hauke/packages/mtg/frontend && yarn install --production=false && yarn build)

echo Building backend
(cd /home/hauke/packages/mtg/backend && yarn install --production=false && yarn build && )

echo deploying frontend
rm -rf /var/www/virtual/hauke/html/* 
cp -r /home/hauke/packages/mtg/frontend/build/* /var/www/virtual/hauke/html/

echo restarting backend
supervisorctl restart mtg
#!/bin/bash
set -e
. ~/.nvm/nvm.sh

echo -e "\e[44mSetting node version\e[0m"
cd /opt/mtg && nvm install && nvm use

echo -e "\e[44mBuilding Frontend\e[0m"
cd /opt/mtg/frontend && yarn install && rm -rf /opt/mtg/frontend/build/* && ./node_modules/.bin/react-scripts --max_old_space_size=4096 build

echo -e "\e[44mBuilding Backend\e[0m"
cd /opt/mtg/backend && yarn install && yarn build

echo -e "\e[44mBuilding Clash\e[0m"
cd /opt/mtg/clash && yarn install && yarn build

echo -e "\e[44mCopying Schema\e[0m"
cp /opt/mtg/backend/src/graphql/schema.graphql /opt/mtg/backend/dist/graphql/schema.graphql

echo -e "\e[44mMigrating Database\e[0m"
cd /opt/mtg/backend && NODE_ENV=production yarn migrate

echo -e "\e[44mDeploying Frontend\e[0m"
rm -rf /var/www/mtg/* 
cp -r /opt/mtg/frontend/build/* /var/www/mtg/

echo -e "\e[44mRestarting Backend\e[0m"
pm2 reload backend

echo -e "\e[44mRestarting Clash\e[0m"
pm2 reload clash

echo -e "\e[45mDeployed Successfully\e[0m"
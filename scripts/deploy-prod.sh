#!/bin/bash
set -e

echo -e "\e[44mBuilding frontend\e[0m"
cd /opt/mtg/frontend && yarn install --production=false && rm -rf /opt/mtg/frontend/build/* && yarn build

echo -e "\e[44mBuilding backend\e[0m"
cd /opt/mtg/backend && yarn install --production=false && yarn build

echo -e "\e[44mCopying schema\e[0m"
cp /opt/mtg/backend/src/graphql/schema.graphql /opt/mtg/backend/dist/graphql/schema.graphql

echo -e "\e[44mMigrating Database\e[0m"
yarn migrate

echo -e "\e[44mrestarting backend\e[0m"
NODE_ENV=production pm2 restart backend
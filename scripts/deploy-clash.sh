#!/bin/bash
set -e


echo -e "\e[44mSetting node version\e[0m"
cd /opt/mtg/clash && nvm install && nvm use

echo -e "\e[44mBuilding Clash\e[0m"
cd /opt/mtg/clash && yarn install --ignore-engines && yarn build

echo -e "\e[44mRestarting Clash\e[0m"
pm2 reload clash

echo -e "\e[45mDeployed Successfully\e[0m"
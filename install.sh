#!/bin/bash

npm install -g @angular/cli
npm install

date=$(date)
echo "*** npm version: ***" 
npm --version
echo "*** node version:  ***" 
node --version


echo  "Installation Angular 14 done at $date !" >> install.log

npm run start
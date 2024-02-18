#!/bin/bash

# Load nvm first 
export NVM_DIR="$HOME/.nvm"

echo "loading nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

echo "loading bash completion"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

ZIP_FILE=~/webapp.zip
SERVER_FOLDER=~/webapp

unzip $ZIP_FILE

cd $SERVER_FOLDER

# Install dependencies
npm install 

# Start server - Final step
npm run server
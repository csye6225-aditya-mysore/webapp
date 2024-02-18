#!/bin/bash

# Install node on your machine

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source ~/.bash_profile

nvm install v16.18.0
nvm list
nvm install lts/erbium
nvm use v16.18.0
node --version

echo "Exporting dir"
export NVM_DIR="$HOME/.nvm"
echo "loading nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
echo "loading bash completion"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
#!/bin/bash

# Load nvm first 
export NVM_DIR="$HOME/.nvm"

echo "loading nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

echo "loading bash completion"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

ZIP_FILE=~/webapp.zip
SERVER_FOLDER=~/webapp-forked

unzip $ZIP_FILE

cd $SERVER_FOLDER

# Install dependencies - Final step before you run the server
npm install 

# Adding a new user csye6225 and changing the ownership of all artifacts to csye6225
sudo adduser csye6225 --shell /usr/sbin/nologin
sudo chown -R csye6225 /home/adityamysore002/webapp-forked
sudo chown -R csye6225 /home/adityamysore002/webapp.zip

sudo chgrp -R csye6225 /home/adityamysore002/webapp-forked
sudo chgrp -R csye6225 /home/adityamysore002/webapp.zip

sudo mv /home/adityamysore002/webapp.service /etc/systemd/system/webapp.service
sudo sed -i -e "s/enforcing/disabled/g" /etc/selinux/config # disabling SElinux
sudo chmod 744 /etc/systemd/system/webapp.service
sudo setenforce 0
sudo systemctl daemon-reload
sudo systemctl enable webapp.service # systemctl will now pick up the webapp-service
# sudo systemctl enable /etc/systemd/system/webapp.service
#!/bin/bash


sudo mv /tmp/webapp.zip /opt/webapp.zip
ZIP_FILE=/opt/webapp.zip
SERVER_FOLDER=/opt/webapp

sudo unzip $ZIP_FILE

cd $SERVER_FOLDER

# Install dependencies - Final step before you run the server
sudo npm install 

# Adding a new user csye6225 and changing the ownership of all artifacts to csye6225
sudo adduser csye6225 --shell /usr/sbin/nologin
sudo chown -R csye6225:csye6225 /opt/webapp
sudo chown -R csye6225:csye6225 /opt/webapp.zip

sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service
sudo chown -R csye6225 /etc/systemd/system/webapp.service
sudo chgrp -R csye6225 /etc/systemd/system/webapp.service
sudo sed -i -e "s/enforcing/disabled/g" /etc/selinux/config # disabling SElinux
sudo setenforce 0
sudo systemctl daemon-reload
# sudo systemctl enable webapp.service # systemctl will now pick up the webapp-service
# sudo systemctl enable /etc/systemd/system/webapp.service
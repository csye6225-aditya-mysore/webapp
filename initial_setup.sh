#!/bin/bash

# Setting initial packages necessary to install the dependencies

# Installing zip and unzip
echo "Installing zip and unzip"
sudo yum install zip unzip -y

# Configure Ops agent for google cloud observability
cd /opt
sudo curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

cd /var/log
sudo mkdir webapplogs
cd webapplogs
sudo touch webapp-logs

sudo cp /tmp/logconfig.yaml /etc/google-cloud-ops-agent/config.yaml
sudo systemctl restart google-cloud-ops-agent
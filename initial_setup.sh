#!/bin/bash

# Setting initial packages necessary to install the dependencies

# Installing zip and unzip
echo "Installing zip and unzip"
sudo yum install zip unzip -y

curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh -y
sudo bash add-google-cloud-ops-agent-repo.sh --also-install -y
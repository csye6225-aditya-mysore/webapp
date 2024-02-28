#!/bin/bash

# Install node on your machine

sudo dnf module list nodejs

sudo dnf module enable nodejs:16 -y

sudo dnf install nodejs -y

sudo node --version
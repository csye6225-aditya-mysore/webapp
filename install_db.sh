#!/bin/bash
# Install postgresql 
dnf module list postgresql
sudo dnf module enable postgresql:16 -y
sudo dnf install postgresql-server -y
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Editing the postgresql configuration file to include md5 as the authentication method
CONF_FILE="/var/lib/pgsql/data/pg_hba.conf"
> $CONF_FILE
{
    echo "local   all             all                                     md5",
    echo "host    all             all             127.0.0.1/32            md5",
    echo "host    all             all             ::1/128                 ident",
    echo "local   replication     all                                     peer",
    echo "host    replication     all             127.0.0.1/32            ident"
} >> $CONF_FILE

# Alter user password and create database
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
sudo -u postgres psql -c "CREATE DATABASE example;"
sudo systemctl restart postgresql


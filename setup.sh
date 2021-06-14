#!/bin/bash

# set up and run mysql first
#cd ./docs
#mysql --host=localhost < wdc-project_database_schema.sql
#mysql --host=localhost < mysql_test_data.sql

chmod +x ./frontend/src/plugins/setup.sh
./frontend/src/plugins/setup.sh
for i in {1..100}
do
   echo "CS50 is $i percent awesome"
done
cd ./backend
npm install
cd ../frontend
npm install

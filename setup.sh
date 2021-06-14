# set up and run mysql first
#cd docs
#mysql --host=localhost < wdc-project_database_schema.sql
#mysql --host=localhost < mysql_test_data.sql
cd ./backend
npm install
cd ../frontend
chmod +x ./src/plugins/setup.sh
./src/plugins/setup.sh
npm install

# set up and run mysql first
#cd ./docs
#mysql --host=localhost < wdc-project_database_schema.sql
#mysql --host=localhost < mysql_test_data.sql
chmod +x ./frontend/src/plugins/setup.sh
.frontend/src/plugins/setup.sh
cd ./backend
npm install
cd ../frontend
npm install

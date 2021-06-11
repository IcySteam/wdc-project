# set up and run mysql first
# ALSO, change Google auth callback url in backend/app.js according to environment
cd docs
mysql --host=localhost < wdc-project_database_schema.sql
cd ../backend
npm install
cd ../frontend
npm install

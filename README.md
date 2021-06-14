# COVID-19 Contact Tracing Web Application

## Project port configuration
```
Proxy: 8080
Frontend: 8081
Backend: 3000
```

### To set up the project, just run the following command:
```
./setup.sh
```

### To start the project, just run the following command:
```
./start.sh
```

### Notes on running on CS50 IDE
<ul>
	<li>.profile hack script (from github.com/ian-knight-uofa/uofa-tools) line where export PORT=xxxx should be DELETED</li>
	<li><strike>Start MySQL first before running setup.sh or start.sh</strike></li>
	<li>Project uses an external MariaDB database located at 34.151.109.78</li>
	<li>Change Google auth callback url in backend/app.js according to external hostname</li>
	<li>Change QR Code url in frontend/src/components/VenueStats.vue according to external hostname</li>
</ul>

# COVID-19 Contact Tracing Web Application

## Project port configuration
```
Proxy: 8080
Frontend: 8081
Backend: 3000
```

### Project setup
```
./setup.sh
```

### Compiles and hot-reloads for development
```
./start.sh
```

### Notes on running on CS50 IDE
<ul>
	<li>.profile hack script (from github.com/ian-knight-uofa/uofa-tools) line where export PORT=xxxx should be DELETED</li>
	<li><strike>Start MySQL first before running setup.sh or start.sh</strike></li>
	<li>Project uses an external MariaDB database located at 34.151.109.78</li>
	<li>Change Google auth callback url in backend/app.js according to environment</li>
</ul>

@echo off
cd /d %~dp0

echo Starting project...
start http://localhost:3000

npm start

pause
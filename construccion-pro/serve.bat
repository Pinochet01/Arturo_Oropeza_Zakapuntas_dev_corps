@echo off
cd /d "%~dp0"
echo Starting server at http://localhost:3000
echo Press Ctrl+C to stop
npx serve -l 3000
pause
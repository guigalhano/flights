@echo off
chcp 65001 > nul
cls
echo ============================================
echo   Flight Price History Tracker - Santiago
echo ============================================
echo.
echo Iniciando... Aguarde um momento...
echo.

cd /tmp/flights

echo [1/2] Iniciando Backend Flask (porta 5000)...
start "Flask Backend" cmd /k python app.py

timeout /t 3 /nobreak

echo [2/2] Iniciando ngrok (expondo porta 8080)...
start "ngrok Tunnel" cmd /k ngrok http 8080

echo.
echo ============================================
echo   Dashboard sera disponibilizado em:
echo   https://seu-ngrok-url/dashboard.html
echo ============================================
echo.
echo Procure pela linha:
echo   Forwarding    https://xxxxx.ngrok.io -> http://localhost:8080
echo.
timeout /t 10

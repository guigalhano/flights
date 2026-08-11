@echo off
chcp 65001 > nul
cd /d /tmp/flights
cls
echo ============================================
echo   Flight Price History Tracker - CMD
echo ============================================
echo.
echo Comandos uteis:
echo.
echo   python app.py              - Inicia Backend
echo   ngrok http 8080            - Inicia ngrok
echo   python price_tracker.py    - Scraper de precos
echo   git status                 - Ver status git
echo   git push origin main       - Push para GitHub
echo.
echo ============================================
echo.
cmd /k

@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

cls
echo ============================================
echo   Flight Price Tracker - Auto Setup
echo ============================================
echo.

cd /d D:\

echo [1/5] Removendo diretorio antigo...
rmdir /s /q flights 2>nul

echo [2/5] Clonando repositorio...
git clone https://github.com/guigalhano/flights.git flights

if errorlevel 1 (
    echo ERRO ao clonar! Verifique sua conexao.
    pause
    exit /b 1
)

cd /d D:\flights

echo [3/5] Instalando dependencias...
pip install -r requirements.txt

if errorlevel 1 (
    echo ERRO ao instalar! Tente novamente.
    pause
    exit /b 1
)

echo [4/5] Corrigindo encoding...
python << 'PYEOF'
try:
    with open('price_tracker.py', 'rb') as f:
        content = f.read()
    
    with open('price_tracker.py', 'w', encoding='utf-8') as f:
        f.write('# -*- coding: utf-8 -*-\n')
        f.write(content.decode('latin-1'))
    
    print("OK - Encoding corrigido!")
except Exception as e:
    print(f"ERRO: {e}")
PYEOF

echo [5/5] Iniciando servidor...
echo.
echo ============================================
echo   Servidor iniciando em 3 segundos...
echo ============================================
echo.

timeout /t 3 /nobreak

echo.
echo Iniciando Flask Backend...
start "Flask Backend" cmd /k python app.py

timeout /t 2 /nobreak

echo.
echo Iniciando ngrok...
start "ngrok Tunnel" cmd /k ngrok http 8080

echo.
echo ============================================
echo   PRONTO! Dashboard esta sendo iniciado
echo ============================================
echo.
echo Procure por:
echo   Forwarding    https://xxxxx.ngrok.io
echo.
echo No dashboard acesse:
echo   https://xxxxx.ngrok.io/dashboard.html
echo.
timeout /t 10

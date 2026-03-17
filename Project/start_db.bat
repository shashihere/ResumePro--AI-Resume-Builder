@echo off
TITLE MongoDB Starter
CLS
ECHO ---------------------------------------------------
ECHO    Auto-Locating and Starting MongoDB Server...
ECHO ---------------------------------------------------
ECHO.

REM Ensure Data Directory Exists
IF NOT EXIST "C:\data\db" (
    ECHO Creating Data Directory at C:\data\db...
    mkdir "C:\data\db"
)

REM Try to find in PATH first
WHERE mongod >nul 2>nul
IF %ERRORLEVEL% EQU 0 (
    ECHO Found 'mongod' in System PATH. Starting...
    mongod
    GOTO END
)

REM Check Common Locations
IF EXIST "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" (
    ECHO Found MongoDB 8.0
    "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath="C:\data\db"
    GOTO END
)
IF EXIST "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" (
    ECHO Found MongoDB 7.0
    "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\data\db"
    GOTO END
)
IF EXIST "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" (
    ECHO Found MongoDB 6.0
    "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="C:\data\db"
    GOTO END
)
IF EXIST "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" (
    ECHO Found MongoDB 5.0
    "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="C:\data\db"
    GOTO END
)
IF EXIST "C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" (
    ECHO Found MongoDB 4.4
    "C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" --dbpath="C:\data\db"
    GOTO END
)

ECHO.
ECHO [ERROR] MongoDB (mongod.exe) was NOT found in common locations.
ECHO.
ECHO Please verify you have installed MongoDB Community Server.
ECHO If installed in a custom location, please add it to your PATH.
ECHO.
PAUSE
:END

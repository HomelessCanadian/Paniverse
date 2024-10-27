@echo off
setlocal enabledelayedexpansion

set "state_file=%~dp0wallpaper_state.txt"
set "wallpaper32=C:\Program Files (x86)\Steam\steamapps\common\wallpaper_engine\wallpaper64.exe"
set "play=-control play"
set "stop=-control stop"

if not exist "%state_file%" (
    echo 0 > "%state_file%"
)

for /f %%i in ('type "%state_file%"') do set "state=%%i"

REM echo Current state: !state!
REM pause

if "!state!"=="0" (
    echo 1  > "%state_file%"
    echo Starting Wallpaper Engine...
    "%wallpaper32%" %play%
    timeout /t 2 /nobreak >nul
) else (
    echo 0 > "%state_file%"
    echo Stopping Wallpaper Engine...
    "%wallpaper32%" %stop%
    timeout /t 2 /nobreak >nul
)

exit
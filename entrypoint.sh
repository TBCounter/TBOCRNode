#!/bin/bash

# Скачиваем tessdata, если их нет
/usr/src/app/download-tessdata.sh

# Запускаем приложение
bun run sockets.js

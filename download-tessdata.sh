#!/bin/bash

mkdir -p /usr/src/app/tessdata

# Проверяем наличие файлов и скачиваем, если их нет
if [ ! -f /usr/src/app/tessdata/rus.traineddata.gz ]; then
  curl -o /usr/src/app/tessdata/rus.traineddata.gz https://tbcounter-tessdata.s3.amazonaws.com/rus.traineddata.gz
fi

if [ ! -f /usr/src/app/tessdata/eng.traineddata.gz ]; then
  curl -o /usr/src/app/tessdata/eng.traineddata.gz https://tbcounter-tessdata.s3.amazonaws.com/eng.traineddata.gz
fi

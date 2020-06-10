#!/bin/sh
mkdir ./node_modules/@types/axios -p
cp ./node_modules/axios/index.d.ts ./node_modules/@types/axios
FILE=./node_modules/@types/axios/index.d.ts

if test -f "$FILE"; then
  echo "SUCCESS"
else
  echo "ERR: $FILE does not exist. You can try to manually move the /node_modules/axios/index.d.ts file to /node_modules/@types/axios."
fi

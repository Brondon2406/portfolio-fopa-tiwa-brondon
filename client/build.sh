#!/bin/bash

echo "Compilation de main.ts..."
tsc

if [ $? -eq 0 ]; then
  echo "Compilation réussie : main.js généré."
else
  echo "Erreur de compilation."
fi

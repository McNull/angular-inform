#!/usr/bin/env sh

rm -rf dist
mkdir dist

gulp --target release

cp public/angular-inform/* dist/
cp LICENSE dist/
cp README.md dist/

cat LICENSE-banner.txt dist/angular-inform.min.js > tmp.js
cp tmp.js dist/angular-inform.min.js
rm -f tmp.js

cat LICENSE-banner.txt dist/angular-inform.min.css > tmp.css
cp tmp.css dist/angular-inform.min.css
rm -f tmp.css
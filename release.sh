#!/usr/bin/env bash

bun run build

VERSION=$(bun -p "require('./package.json').version")

gh release create v"$VERSION" --notes-from-tag -t "$VERSION" ./dist/*

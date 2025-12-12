#!/usr/bin/env bash

read_version_from_package_json() {
  bun -p "require('./package.json').version"
}

VERSION=$(read_version_from_package_json)

echo "Releasing version $VERSION"

# Build the project
bun run build

# Create git tag and GitHub release
git tag v"$VERSION" --sign --message "$VERSION"
gh release create v"$VERSION" --notes-from-tag -t "$VERSION" --target main ./dist/*

# Bump to the next version (patch)
bun pm version patch --no-git-tag-version
git add package.json public/manifest.json versions.json
git commit -m "chore(version): bump to v$(read_version_from_package_json)"
git push origin main
echo "Released version $VERSION"

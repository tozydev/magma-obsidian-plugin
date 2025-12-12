type Manifest = {
  version: string
  minAppVersion: string
  [key: string]: unknown
}

const bumpVersions = async () => {
  const targetVersion = Bun.env.npm_package_version

  if (!targetVersion) {
    throw new Error("npm_package_version is not set")
  }

  const manifestFile = Bun.file("public/manifest.json")
  const versionsFile = Bun.file("versions.json")

  if (!(await manifestFile.exists())) {
    throw new Error("public/manifest.json does not exist")
  }

  const manifest: Manifest = await manifestFile.json()
  if (manifest.version !== targetVersion) {
    console.log(`Bumping manifest version from ${manifest.version} to ${targetVersion}`)
    manifest.version = targetVersion
    await Bun.write(manifestFile, JSON.stringify(manifest, null, 2))
  }

  const minAppVersion = manifest.minAppVersion
  if (!(await versionsFile.exists())) {
    console.log(`Creating versions.json with mapping: ${targetVersion} -> ${minAppVersion}`)
    await Bun.write(versionsFile, JSON.stringify({ [targetVersion]: minAppVersion }, null, 2))
    return
  }

  const versions: Record<string, string> = await versionsFile.json()
  if (Object.values(versions).includes(minAppVersion)) {
    return
  }

  console.log(`Adding version mapping: ${targetVersion} -> ${minAppVersion}`)
  versions[targetVersion] = minAppVersion
  await Bun.write(versionsFile, JSON.stringify(versions, null, 2))
}

void bumpVersions()

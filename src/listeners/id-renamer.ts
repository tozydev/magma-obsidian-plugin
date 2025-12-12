import { TFolder, type Vault } from "obsidian"
import { Settings } from "../settings"

const PREFIX_PATTERN = /^([12])(x+)-/
const PADDING_LENGTH = 2

const takeId = async (settings: Settings, prefixNum: string) => {
  switch (prefixNum) {
    case "1":
      const projectId = settings.lastProjectId + 1
      await settings.update({ lastProjectId: projectId })
      return projectId
    case "2":
      const areaId = settings.lastAreaId + 1
      await settings.update({ lastAreaId: areaId })
      return areaId
    default:
      throw new Error("Invalid prefix number")
  }
}

export const idRenamer = (settings: Settings, vault: Vault) => {
  return vault.on("rename", async (file) => {
    if (!(file instanceof TFolder)) {
      return
    }

    const folderName = file.name
    const match = folderName.match(PREFIX_PATTERN)
    if (!match) {
      return
    }

    const prefixNum = match[1]
    const id = await takeId(settings, prefixNum)

    const paddedId = id.toString().padStart(PADDING_LENGTH, "0")
    const newName = folderName.replace(PREFIX_PATTERN, `${prefixNum}${paddedId}-`)
    const newPath = file.path.replace(folderName, newName)

    await vault.rename(file, newPath)
  })
}

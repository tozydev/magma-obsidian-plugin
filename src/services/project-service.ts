import type { PluginSettings } from "../settings"
import type { Vault } from "obsidian"

export enum ProjectType {
  Project = "project",
  Area = "area",
}

export interface ProjectService {
  createProject(name: string, type: ProjectType): Promise<void>
}

export class VaultProjectService implements ProjectService {
  constructor(
    private vault: Vault,
    private settings: PluginSettings,
  ) {}
  async createProject(name: string, type: ProjectType) {
    const fullPath = await this.buildProjectPath(name, type)
    await this.vault.createFolder(fullPath)
  }

  private async buildProjectPath(name: string, type: ProjectType) {
    const id = await this.takeNextId(type)
    const projectDir = `${id}-${name}`
    return `${this.getDirectoryPath(type)}/${projectDir}`
  }

  private async takeNextId(type: ProjectType) {
    switch (type) {
      case ProjectType.Project:
        const nextProjectId = this.settings.get().lastProjectId + 1
        await this.settings.update({ lastProjectId: nextProjectId })
        return nextProjectId
      case ProjectType.Area:
        const nextAreaId = this.settings.get().lastAreaId + 1
        await this.settings.update({ lastAreaId: nextAreaId })
        return nextAreaId
    }
  }

  private getDirectoryPath(type: ProjectType) {
    switch (type) {
      case ProjectType.Project:
        return this.settings.get().projectDirPath
      case ProjectType.Area:
        return this.settings.get().areasDirPath
    }
  }
}

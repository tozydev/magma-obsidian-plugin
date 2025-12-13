import type { Plugin } from "obsidian"

export interface SettingsData {
  lastProjectId: number
  lastAreaId: number
  projectDirPath: string
  areasDirPath: string
}

const DEFAULT_SETTINGS_DATA: SettingsData = {
  lastProjectId: 100,
  lastAreaId: 200,
  projectDirPath: "1-Projects",
  areasDirPath: "2-Areas",
}

export class PluginSettings {
  private readonly plugin: Plugin
  private data: SettingsData = DEFAULT_SETTINGS_DATA

  constructor(plugin: Plugin) {
    this.plugin = plugin
  }

  get(): SettingsData {
    if (!this.data) {
      throw new Error("Settings not initialized")
    }
    return this.data
  }

  async init() {
    const data = await this.plugin.loadData()
    this.data = this.mergeData(data)
  }

  async update(data: Partial<SettingsData>) {
    this.data = this.mergeData({ ...this.data, ...data })
    await this.save()
  }

  async save() {
    await this.plugin.saveData(this.data)
  }

  private mergeData(data: any): SettingsData {
    return { ...DEFAULT_SETTINGS_DATA, ...data }
  }
}

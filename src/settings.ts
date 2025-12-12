import type { Plugin } from "obsidian"

export interface SettingsData {
  lastProjectId: number
  lastAreaId: number
}

const DEFAULT_SETTINGS_DATA: SettingsData = {
  lastProjectId: 0,
  lastAreaId: 0,
}

export class Settings implements SettingsData {
  private readonly plugin: Plugin
  private data: SettingsData = DEFAULT_SETTINGS_DATA

  constructor(plugin: Plugin) {
    this.plugin = plugin
  }

  get lastProjectId(): number {
    return this.get().lastProjectId
  }

  get lastAreaId(): number {
    return this.get().lastAreaId
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

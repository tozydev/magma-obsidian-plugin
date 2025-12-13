import { App, Plugin, type PluginManifest } from "obsidian"
import { PluginSettings } from "./settings"
import type { MagmaPlugin } from "./plugin"
import { MagmaSettingTab } from "./ui/settings"
import { registerCommands } from "./commands"
import type { ProjectService } from "./services"
import { VaultProjectService } from "./services/project-service"
import { registerListeners } from "./listeners"

// noinspection JSUnusedGlobalSymbols
export default class MagmaObsidianPlugin extends Plugin implements MagmaPlugin {
  readonly settings: PluginSettings
  readonly projectService: ProjectService

  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest)
    this.settings = new PluginSettings(this)
    this.projectService = new VaultProjectService(this.app.vault, this.settings)
  }

  async onload() {
    await this.settings.init()

    this.addSettingTab(new MagmaSettingTab(this.app, this))

    registerListeners(this)
    registerCommands(this)
  }
}

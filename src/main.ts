import { App, Plugin, type PluginManifest } from "obsidian"
import { Settings } from "./settings"
import type { MagmaPlugin } from "./plugin"
import { registerListeners } from "./listeners"

// noinspection JSUnusedGlobalSymbols
export default class MagmaObsidianPlugin extends Plugin implements MagmaPlugin {
  readonly settings: Settings

  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest)
    this.settings = new Settings(this)
  }

  async onload() {
    await this.settings.init()

    registerListeners(this)
  }
}

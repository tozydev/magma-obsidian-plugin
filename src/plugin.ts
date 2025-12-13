import { Plugin } from "obsidian"
import type { PluginSettings } from "./settings"
import type { ProjectService } from "./services"

export interface MagmaPlugin extends Plugin {
  readonly settings: PluginSettings

  readonly projectService: ProjectService
}

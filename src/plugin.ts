import { Plugin } from "obsidian"
import type { Settings } from "./settings"

export interface MagmaPlugin extends Plugin {
  readonly settings: Settings
}

import type { MagmaPlugin } from "../plugin"
import { createProjectFileMenuListener } from "./file-menu"

export const registerListeners = (plugin: MagmaPlugin) => {
  plugin.registerEvent(createProjectFileMenuListener(plugin))
}

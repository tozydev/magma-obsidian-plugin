import type { MagmaPlugin } from "../plugin"
import { createProjectCommand } from "./create-project"

export const registerCommands = (plugin: MagmaPlugin) => {
  plugin.addCommand(createProjectCommand(plugin))
}

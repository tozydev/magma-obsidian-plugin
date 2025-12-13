import { type Command } from "obsidian"
import type { MagmaPlugin } from "../plugin"
import { openCreateProjectModal } from "../ui/modals"

export const createProjectCommand = (plugin: MagmaPlugin): Command => {
  return {
    id: "create-project",
    name: "Create project",
    callback: async () => {
      openCreateProjectModal(plugin)
    },
  }
}

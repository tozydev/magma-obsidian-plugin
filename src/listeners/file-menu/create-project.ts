import type { MagmaPlugin } from "../../plugin"
import { openCreateProjectModal } from "../../ui/modals"

export const createProjectFileMenuListener = (plugin: MagmaPlugin) => {
  return plugin.app.workspace.on("file-menu", (menu, _) => {
    menu.addItem((item) => {
      item
        .setTitle("Create project")
        .setIcon("folder-plus")
        .onClick(() => {
          openCreateProjectModal(plugin)
        })
    })
  })
}

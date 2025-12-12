import type { MagmaPlugin } from "../plugin"
import { idRenamer } from "./id-renamer"

export const registerListeners = (plugin: MagmaPlugin) => {
  plugin.registerEvent(idRenamer(plugin.settings, plugin.app.vault))
}

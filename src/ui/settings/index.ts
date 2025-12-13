import { type App, PluginSettingTab, Setting } from "obsidian"
import type { MagmaPlugin } from "../../plugin"
import { PluginSettings } from "../../settings"
import { FolderSuggest } from "./folder-suggest"

export class MagmaSettingTab extends PluginSettingTab {
  settings: PluginSettings
  constructor(app: App, plugin: MagmaPlugin) {
    super(app, plugin)
    this.settings = plugin.settings
  }

  display() {
    const { containerEl } = this
    const setting = () => new Setting(containerEl)

    containerEl.empty()

    containerEl.createEl("h1", { text: "Magma Settings" })

    setting().setName("Projects & Areas").setHeading()

    setting()
      .setName("Projects Directory Path")
      .setDesc("The directory where project are stored.")
      .addText((text) => {
        text
          .setPlaceholder("Enter project directory path")
          .setValue(this.settings.get().projectDirPath)
          .onChange(async (value) => {
            await this.settings.update({ projectDirPath: value })
          })
        new FolderSuggest(this.app, text.inputEl)
      })

    setting()
      .setName("Areas Directory Path")
      .setDesc("The directory where areas are stored.")
      .addText((text) => {
        text
          .setPlaceholder("Enter areas directory path")
          .setValue(this.settings.get().areasDirPath)
          .onChange(async (value) => {
            await this.settings.update({ areasDirPath: value })
          })
        new FolderSuggest(this.app, text.inputEl)
      })

    // add setting that can collapse/expand to show more advanced settings in the future

    setting()
      .setName("Last Project ID")
      .setDesc("The last used project ID.")
      .setTooltip(
        `Used for generating new project IDs.
        Each time a new project is created, this ID is incremented.
        Change this value when you want to reset or modify the ID sequence.`,
      )
      .addText((text) => {
        text.setValue(this.settings.get().lastProjectId.toString()).onChange(async (value) => {
          const newId = parseInt(value, 10)
          if (!isNaN(newId)) {
            await this.settings.update({ lastProjectId: newId })
          }
        })
      })

    setting()
      .setName("Last Area ID")
      .setDesc("The last used area ID.")
      .setTooltip(
        `Used for generating new area IDs.
        Each time a new area is created, this ID is incremented.
        Change this value when you want to reset or modify the ID sequence.`,
      )
      .addText((text) => {
        text.setValue(this.settings.get().lastAreaId.toString()).onChange(async (value) => {
          const newId = parseInt(value, 10)
          if (!isNaN(newId)) {
            await this.settings.update({ lastAreaId: newId })
          }
        })
      })
  }
}

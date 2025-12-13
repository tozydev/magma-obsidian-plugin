import { App, Modal, Notice, Setting } from "obsidian"
import { ProjectType } from "../../services"
import type { MagmaPlugin } from "../../plugin"

export function openCreateProjectModal(plugin: MagmaPlugin) {
  new CreateProjectModal(plugin.app, (name, type) => {
    plugin.projectService
      .createProject(name, type)
      .then(() => {
        new Notice(`${type === ProjectType.Project ? "Project" : "Area"} "${name}" created.`)
      })
      .catch((error) => {
        new Notice(`Error creating ${type === ProjectType.Project ? "project" : "area"}: ${error.message}`)
      })
  }).open()
}

class CreateProjectModal extends Modal {
  constructor(app: App, onSubmit: (name: string, type: ProjectType) => void) {
    super(app)

    const { contentEl } = this
    const setting = () => new Setting(contentEl)

    this.setTitle("Create Project or Area")

    let type = ProjectType.Project
    let name = ""

    setting()
      .setName("Name")
      .addText((text) => {
        text
          .setPlaceholder("Enter name")
          .setValue(name)
          .onChange((value) => {
            name = value
          })
      })

    setting()
      .setName("Type")
      .addDropdown((dropdown) => {
        dropdown
          .addOption(ProjectType.Project, "Project")
          .addOption(ProjectType.Area, "Area")
          .setValue(type)
          .onChange((value) => {
            type = value as ProjectType
          })
      })

    setting().addButton((btn) => {
      btn.setButtonText("Create").onClick(() => {
        this.close()
        onSubmit(name, type)
      })
    })
  }
}

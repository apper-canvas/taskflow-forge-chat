import settingsData from '../mockData/appSettings.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let settings = { ...settingsData }

const appSettingsService = {
  async getAll() {
    await delay(200)
    return { ...settings }
  },

  async getById(key) {
    await delay(150)
    if (!(key in settings)) throw new Error('Setting not found')
    return settings[key]
  },

  async create(settingData) {
    await delay(300)
    Object.assign(settings, settingData)
    return { ...settings }
  },

  async update(key, value) {
    await delay(250)
    if (!(key in settings)) throw new Error('Setting not found')
    settings[key] = value
    return { ...settings }
  },

  async delete(key) {
    await delay(200)
    if (!(key in settings)) throw new Error('Setting not found')
    delete settings[key]
    return true
  }
}

export default appSettingsService
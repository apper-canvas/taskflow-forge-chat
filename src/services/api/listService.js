import listData from '../mockData/lists.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let lists = [...listData]

const listService = {
  async getAll() {
    await delay(250)
    return [...lists]
  },

  async getById(id) {
    await delay(200)
    const list = lists.find(l => l.id === id)
    if (!list) throw new Error('List not found')
    return { ...list }
  },

  async create(listData) {
    await delay(400)
    const newList = {
      id: Date.now().toString(),
      ...listData,
      taskCount: 0,
      createdAt: new Date().toISOString()
    }
    lists.push(newList)
    return { ...newList }
  },

  async update(id, updates) {
    await delay(300)
    const index = lists.findIndex(l => l.id === id)
    if (index === -1) throw new Error('List not found')
    
    lists[index] = {
      ...lists[index],
      ...updates
    }
    return { ...lists[index] }
  },

  async delete(id) {
    await delay(250)
    const index = lists.findIndex(l => l.id === id)
    if (index === -1) throw new Error('List not found')
    
    lists.splice(index, 1)
    return true
  }
}

export default listService
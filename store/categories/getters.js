export default {
  hasCategories(state) {
    if (state.items) {
      // More than 1 because categories has 1 static category "Transfer"
      if (Object.keys(state.items).length > 1)
        return true
    }
    return false
  },

  categoriesIds(state, getters) {
    if (!getters.hasCategories) return []
    return Object.keys(state.items)
  },

  categoriesRootIds(state, getters) {
    if (!getters.hasCategories) return []

    return Object.keys(state.items)
      .filter(id => state.items[id].parentId === 0)
      .sort((a, b) => {
        if (state.items[a].order < state.items[b].order) return -1
        if (state.items[a].order > state.items[b].order) return 1
        return 0
      })
  },

  categoriesForBeParent(state, getters, rootState) {
    const categories = state.items
    const categoriesRootIds = getters.categoriesRootIds
    const trns = rootState.trns.items
    const categoriesForBeParent = []

    for (const categoryId of categoriesRootIds) {
      let hasTrnsIn = false
      for (const trnId in trns) {
        if (trns[trnId].categoryId === categoryId) {
          hasTrnsIn = true
          break
        }
      }
      if (!hasTrnsIn && categoryId !== 'transfer' && categories[categoryId].name.toLowerCase() !== 'перевод' && categories[categoryId].name.toLowerCase() !== 'trnasfer')
        categoriesForBeParent.push(categoryId)
    }

    return categoriesForBeParent
  },

  isCategoryHasChildren: (state, getters) => (categoryId) => {
    if (!getters.hasCategories) return []
    return state.items[categoryId].childIds?.length > 0
  },

  getChildCategoriesIds: (state, getters) => (categoryId) => {
    if (!getters.hasCategories) return []
    const category = state.items[categoryId]
    return category?.childIds || []
  },

  lastUsedCategoriesIdsByDate(state, getters, rootState, rootGetters) {
    if (!getters.hasCategories) return []

    const trnsItems = rootState.trns.items
    const trnsIds = Object.keys(trnsItems)
      .filter(trnId => trnsItems[trnId].type !== 2)
      .sort((a, b) => {
        if (trnsItems[a].date > trnsItems[b].date) return -1
        if (trnsItems[a].date < trnsItems[b].date) return 1
        return 0
      })

    const transferCategoryId = getters.transferCategoryId
    const lastCategoriesIds = []

    if (state.items && rootGetters['trns/hasTrns']) {
      for (const trnId of trnsIds.slice(0, 500)) {
        if (lastCategoriesIds.length < 16) {
          const categoryId = trnsItems[trnId].categoryId
          const category = state.items[categoryId]
          if (category && (category.showInLastUsed || category.showInLastUsed === undefined)) {
            if (categoryId !== transferCategoryId) {
              if (!lastCategoriesIds.includes(categoryId) && !getters.quickSelectorCategoriesIds.includes(categoryId))
                lastCategoriesIds.push(categoryId)
            }
          }
        }
      }

      return lastCategoriesIds.sort((a, b) => {
        if (state.items[a] && state.items[b]) {
          if (state.items[a].name < state.items[b].name) return -1
          if (state.items[a].name > state.items[b].name) return 1
        }
        return 0
      })
    }
  },

  quickSelectorCategoriesIds(state, getters) {
    if (!getters.hasCategories) return []

    return Object.keys(state.items)
      .filter(key => state.items[key].showInQuickSelector)
      .sort((a, b) => {
        if (state.items[a].name < state.items[b].name) return -1
        if (state.items[a].name > state.items[b].name) return 1
        return 0
      })
  },

  transferCategoryId(state, getters) {
    if (!getters.hasCategories) return null

    return Object.keys(state.items)
      .find(id => state.items[id].name === 'Перевод' || state.items[id].name === 'Transfer') || state.items.transfer || false
  },
}

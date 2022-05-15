export function getCatsIds(catsIds, catsItems) {
  const ids = []

  for (const catId of catsIds) {
    const category = catsItems[catId]
    category?.childIds
      ? ids.push(...category.childIds)
      : ids.push(catId)
  }

  return ids
}

export function getTransferCatgoryIds(categoriesItems) {
  const categoriesIdsByName = Object.keys(categoriesItems)
    .filter(id =>
      categoriesItems[id].name.toLowerCase() === 'перевод'
      || categoriesItems[id].name.toLowerCase() === 'transfer',
    )

  return [...categoriesIdsByName, 'transfer']
}

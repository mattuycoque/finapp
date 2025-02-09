<script>
import useFilter from '~/modules/filter/useFilter'

export default defineComponent({
  props: {
    activeItemId: { type: String, default: null },
    category: { type: Object, required: true },
    id: { type: String, required: true },
    isHideParentCategory: { type: Boolean, default: false },
    slider: { type: Object, required: true },
  },

  setup(props, { listeners }) {
    const { $store } = useNuxtApp()
    const { setFilterCatsId } = useFilter()

    const childCategoriesIds = computed(() => $store.getters['categories/getChildCategoriesIds'](props.id))
    const parentCategory = computed(() => $store.state.categories.items[props.category?.parentId])

    function onClickItem() {
      if (listeners.onClick) listeners.onClick(props.id)
    }

    function onClickIcon() {
      // Prevent filter when using in TrnForm
      if (props.slider) {
        onClickItem()
        return
      }

      setFilterCatsId(props.id)
      $store.commit('filter/setFilterDateNow')
      $store.dispatch('ui/setActiveTabStat', 'details')
    }

    return {
      childCategoriesIds,
      parentCategory,
      onClickItem,
      onClickIcon,
    }
  },
})
</script>

<template lang="pug">
.cursor-pointer.py-2.px-3.gap-x-3.flex.items-center.rounded-md.bg-skin-item-main-bg.hocus_bg-skin-item-main-hover(
  v-if="category"
  :class="{ '!cursor-default !bg-skin-item-main-active': activeItemId === id }"
  @click="onClickItem"
)
  .w-8.h-8.flex.items-center.justify-center.rounded-full.text-xl.leading-none.text-neutral-50(
    :style="{ background: category.color }"
    @click.stop="onClickIcon"
  ): div(:class="category.icon")

  .grow.truncate
    .text-xs.text-skin-item-base-down(
      v-if="parentCategory && !isHideParentCategory"
      class="dark_text-neutral-400"
    ) {{ parentCategory.name }}

    .leading-none.text-sm.text-skin-item-base {{ category.name }}

  .font-unica.text-md.text-skin-item-base-down(
    v-if="childCategoriesIds.length > 0"
  ) {{ childCategoriesIds.length }}
</template>

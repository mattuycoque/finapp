<script lang="ts">
import useFilter from '~/modules/filter/useFilter'

export default defineComponent({
  props: {
    id: { type: String, required: true },
    activeItemId: { type: String, default: null },
  },

  setup(props) {
    const { $store } = useNuxtApp()
    const { setFilterWalletsId } = useFilter()

    const onClickFilterWallet = () => {
      setFilterWalletsId(props.id)
      $store.dispatch('ui/setActiveTabStat', 'details')
    }

    return {
      onClickFilterWallet,
    }
  },

  computed: {
    wallet() {
      return {
        ...this.$store.state.wallets.items[this.id],
        total: this.$store.getters['wallets/walletsTotal'][this.id].base,
      }
    },
  },

  methods: {
    handleClick() {
      if (this.$listeners.onClick) this.$listeners.onClick(this.id)
    },
  },
})
</script>

<template lang="pug">
.cursor-pointer.py-1.px-5.gap-x-3.flex.items-center.hocus_bg-gray-200.dark_hocus_bg-neutral-800.border-b.border-gray-200.dark_border-neutral-800(
  :class="[{ _active: activeItemId === id }]"
  @click="handleClick"
)
  //- Icon
  .w-6.h-6.flex-center.rounded-md.text-skin-icon-base.text-xs.leading-none(
    :style="{ background: wallet.color }"
    @click.stop="onClickFilterWallet"
  ) {{ wallet.name.substring(0, 2) }}

  .grow
    .py-1.items-center.flex
      .grow.text-xs.text-skin-item-base-down
        | {{ wallet.name }}

      Amount(
        :currency="wallet.currency"
        :value="wallet.total"
        alwaysShowSymbol
        vertical="right"
      )
</template>

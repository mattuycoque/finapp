<script lang="ts">
export default defineComponent({
  props: {
    id: { type: String, required: true },
    showBase: { type: Boolean, default: true },
    vertical: { type: String, default: 'left' },
    size: { type: String, default: null },
    activeItemId: { type: String, default: null },
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
.p-2.rounded-md(
  :class="{ _active: activeItemId === id }"
  @click="handleClick"
)
  div.bg-red-300.h-8(v-if="activeItemId === id")
  .gap-x-3.flex
    .text-neutral-50.text-xs.leading-none.w-6.h-6.rounded-md.justify-center.items-center.flex(
      :style="{ background: wallet.color }"
      class="mt-[2px]"
    ) {{ wallet.name.substring(0, 2) }}

    div
      .text-sm.text-neutral-500(class="dark_text-neutral-400") {{ wallet.name }}
      Amount(
        :currency="wallet.currency"
        :value="wallet.total"
        alwaysShowSymbol
        showBase
        vertical="right"
      )
</template>

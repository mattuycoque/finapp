<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
const { height } = useWindowSize()

defineProps<{
  title: string
}>()

const emit = defineEmits(['click', 'closed'])

function onClickWallet(walletId, close) {
  emit('click', walletId)
  close()
}
</script>

<template lang="pug">
BaseBottomSheet(
  :maxHeight="height"
  insideClass="sm_rounded-b-2xl bg-skin-layout-main"
  @closed="emit('closed')"
)
  template(#handler="{ close }")
    BaseBottomSheetHandler
    BaseBottomSheetClose(@onClick="close")

  template(#header)
    .py-4.px-3.text-center.text-skin-item-base.text-xl.font-nunito.font-semibold.bg-skin-layout-main.rounded-t-2xl
      | {{ title }}

  template(#default="{ close }")
    WalletsList(#default="{ walletsItemsSorted }")
      .pb-3.px-3.grid.gap-1
        //- Wallet
        .cursor-pointer.flex.items-center.py-2.px-3.rounded-md.bg-skin-item-main-bg.hocus_bg-skin-item-main-hover(
          v-for="(walletItem, walletId) in walletsItemsSorted"
          :key="walletId"
          @click="onClickWallet(walletId, close)"
        )
          .grow.gap-x-3.flex.items-center
            .grow.flex-center.gap-x-3
              //- Icon
              .w-6.h-6.rounded-md.flex-center.text-skin-icon-base.text-xs.leading-none(
                :style="{ background: walletItem.color }"
                class="mt-[2px]"
              ) {{ walletItem.name.substring(0, 2) }}
              //- Name
              .grow.text-sm.text-skin-item-base {{ walletItem.name }}

            //- Amount
            Amount(
              :currency="walletItem.currency"
              :value="walletItem.amount"
              alwaysShowSymbol
              showBase
              vertical="right"
            )
</template>

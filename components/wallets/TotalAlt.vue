<script setup lang="ts">
import useAmount from '~/components/amount/useAmount'

const props = withDefaults(defineProps<{
  isShowCredits?: boolean
  isShowSavings?: boolean
}>(), {
  isShowCredits: false,
  isShowSavings: false,
})

const { $store } = useNuxtApp()
const { getAmountInBaseCurrency } = useAmount()

const totalInWallets = computed(() => {
  const walletsItems = $store.state.wallets.items
  const walletsTotal = $store.getters['wallets/walletsTotal']
  const total = {
    counted: 0,
    savings: 0,
    credits: 0,
  }

  for (const walletId in walletsItems) {
    let walletTotal = 0
    if (walletsItems[walletId].currency === $store.state.currencies.base) {
      walletTotal = walletsTotal[walletId].base
    }
    else {
      walletTotal = getAmountInBaseCurrency({
        amount: walletsTotal[walletId].base,
        currency: walletsItems[walletId].currency,
        noFormat: true,
      })
    }

    if (walletsItems[walletId].countTotal)
      total.counted = total.counted + walletTotal
    else if (walletsItems[walletId].isCredit)
      total.credits = total.credits + walletTotal
    else
      total.savings = total.savings + walletTotal
  }
  return total
})

const counts = computed(() => ({
  credit: {
    titleId: 'credits',
    isShow: props.isShowCredits && totalInWallets.value.credits !== 0,
    value: totalInWallets.value.credits,
  },
  savings: {
    titleId: 'savings',
    isShow: totalInWallets.value.savings !== 0 && props.isShowSavings,
    value: totalInWallets.value.savings,
  },
  withdraw: {
    titleId: 'withdrawal',
    isShow: totalInWallets.value.counted !== totalInWallets.value.counted + totalInWallets.value.savings - Math.abs(totalInWallets.value.credits),
    value: totalInWallets.value.counted,
    icon: 'UiIconWalletWithdrawal',
  },
  total: {
    titleId: 'total',
    isShow: true,
    value: totalInWallets.value.counted + totalInWallets.value.savings,
  },
  withCredit: {
    titleId: 'withCredit',
    isShow: totalInWallets.value.credits !== 0,
    value: totalInWallets.value.counted + totalInWallets.value.savings - Math.abs(totalInWallets.value.credits),
  },
}))
</script>

<template lang="pug">
.px-3.py-1.bg-skin-item-main-bg.rounded-md(
  v-if="$store.getters['wallets/hasWallets']"
)
  template(
    v-for="item in counts"
  )
    .py-2.flex.items-center.border-b.border-skin-item-main-hover.last_border-0(
      v-if="item.isShow"
    )
      .grow.flex.items-center.gap-3
        .text-sm.leading-none {{ $t(item.titleId) }}

      Amount(
        :currency="$store.state.currencies.base"
        :value="item.value"
        vertical="right"
      )
</template>

<i18n lang="json5">
{
  "en": {
    "withdrawal": "Withdrawal",
    "credits": "Credits",
    "withCredit": "Total with credit",
    "savings": "Savings",
    "total": "Total"
  },
  "ru": {
    "withdrawal": "Доступные",
    "credits": "Кредиты",
    "withCredit": "Всего с учетом кредита",
    "savings": "Вложения",
    "total": "Всего"
  }
}
</i18n>

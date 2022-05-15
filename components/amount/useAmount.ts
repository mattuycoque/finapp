import currency from 'currency.js'
import { getAmountInBaseRate, getFixedAmount } from '~/components/trns/functions/getTotal'

function getCurrencySymbol(currency) {
  switch (currency) {
    case 'USD':
      return '$'
    case 'RUB':
      return '₽'
    case 'EUR':
      return '€'
    case 'IDR':
      return 'Rp'
    case 'THB':
      return '฿'
    default:
      return currency
  }
}

const formatAmount = (value, separator = ' ') =>
  currency(value, {
    symbol: '',
    precision: 0,
    pattern: '#',
    separator,
  }).format()

export default function useAmount() {
  const { $store } = useNuxtApp()

  function getAmountInBaseCurrency({ amount, currency, noFormat }) {
    const rates = $store.state.currencies.rates
    const baseRate = $store.state.currencies.base

    const amountInBaseRate = getAmountInBaseRate({
      amount,
      currency,
      rates,
      baseRate,
    })

    if (noFormat)
      return getFixedAmount({ amount: amountInBaseRate, fixed: 2 })

    return formatAmount(amountInBaseRate)
  }

  const baseCurrency = computed(() => $store.state.currencies.base)

  return {
    baseCurrency,

    formatAmount,
    getCurrencySymbol,
    getAmountInBaseCurrency,
  }
}

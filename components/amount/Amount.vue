<script>
import currency from 'currency.js'
import useAmount from '~/components/amount/useAmount'

const baseAmountFormat = (value, separator) =>
  currency(value, { symbol: '', precision: 0, pattern: '#', separator })
    .format()

export default {
  name: 'Amount',

  props: {
    currency: { type: String, required: true },
    isAltColor: { type: Boolean, default: false },
    isColorize: { type: Boolean, default: true },
    isShowPrefix: { type: Boolean, default: false },
    showBase: { type: Boolean, default: true },
    size: { type: String, default: null },
    type: { type: Number, default: null },
    value: { type: Number, required: true },
    vertical: { type: String, default: null },
  },

  setup() {
    const { getAmountInBaseCurrency } = useAmount()
    return { getAmountInBaseCurrency }
  },

  computed: {
    className() {
      return {
        _altColor: this.isAltColor,
        _expenses: this.isColorize && this.type === 0,
        _incomes: this.isColorize && this.type === 1,
        [`_${this.vertical}`]: this.vertical,
        [`_size_${this.size}`]: this.size,
      }
    },

    amountInBaseCurrency() {
      return this.getAmountInBaseCurrency({
        amount: this.value,
        currency: this.currency,
      })
    },
  },

  methods: {
    getCurrencySymbol(currency) {
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
    },

    formatAmount(amount) {
      return baseAmountFormat(amount, ' ')
    },
  },
}
</script>

<template lang="pug">
.amount(:class="className")
  .amountItem._original.flex.items-baseline(:class="className")
    .amountItem__prefix(v-if="isShowPrefix && value !== 0") {{ type === 0 ? '-' : '+' }}
    .amountItem__value.leading-none {{ formatAmount(value) }}
    .amountItem__symbol.leading-none {{ getCurrencySymbol(currency) }}

  template(v-if="showBase && (value !== 0) && (currency !== $store.state.currencies.base)")
    .amountItem._base.pt-1.flex.items-baseline(:class="className")
      .amountItem__prefix(v-if="isShowPrefix && value !== 0") {{ type === 0 ? '-' : '+' }}
      .amountItem__value.leading-none {{ amountInBaseCurrency }}
      .amountItem__symbol.leading-none {{ getCurrencySymbol($store.state.currencies.base) }}
</template>

<style lang="stylus" scoped>
.amount
  color var(--c-font-2)
  typo-money()

  &._altColor
    /.light &
      color var(--c-font-1)

  &._incomes
    color var(--c-incomes-1)

  &._expenses
    color var(--c-expenses-1)

  @media $media-laptop
    font-size 16px

  &._big
    font-size 20px
    font-weight 600

  &._small
    font-size 14px
    font-weight 600

  &__wrap
    display flex
    flex-flow row nowrap
    align-items flex-end
    justify-content flex-end

    ^[0]._center &
      justify-content center

  &__price
    &:first-child
      margin-right $m3

    &:last-child
      margin-left $m3

  &__symbol
    font-primary()
    font-size 14px
    font-weight normal

    ^[0]._small &
      font-size 11px

.amountItem
  display flex
  justify-content flex-end

  &._left
    justify-content flex-start

  &._center
    justify-content center

  &._original
    font-size 16px

  &._base
    opacity .6

  &._base._size_xl
    padding-top 4px

  &._base._size_md
    padding-top 3px

  &__prefix
    align-self center
    padding-right $m2
    font-weight 400

    ~/._size_xl &
      padding-top 2px
      padding-right $m4
      font-size 26px

    ~/._base &
      font-size 12px

    ~/._base._size_xl &
      padding-top 1px

    ~/._base._size_md &
      padding-top 2px

  &__value
    font-secondary()
    font-size 16px
    font-weight 400

    ~/._base &
      font-size 12px

    ~/._size_md &
      font-size 16px
      font-weight 500

    ~/._size_xl &
      font-size 36px
      font-weight 500

    ~/._size_xl._base &
      padding-top 0
      font-size 18px

    ~/._size_md._base &
      padding-top 0
      font-size 14px

  &__symbol
    padding-bottom 0px
    padding-left 2px
    font-weight 400

    ~/._original &
      font-size 11px

    ~/._base &
      font-size 10px

    ~/._size_lg &
      padding-bottom 3px

    ~/._size_xl &
      padding-bottom 5px
      font-size 18px
      font-weight 300

    ~/._size_xl._base &
      padding-bottom 2px
      font-size 12px

    ~/._size_md._base &
      padding-bottom 1px
      font-size 10px

.amount._size_lg
  .amountItem__value
    font-size 22px
    font-weight 500

  .amountItem__symbol
    font-size 16px

.amount._size_md
  .amountItem__symbol
    font-size 12px
</style>

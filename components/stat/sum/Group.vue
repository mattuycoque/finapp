<script setup lang="ts">
import useStatPage from '~/components/stat/useStatPage'
import useStat from '~/modules/stat/useStat'

const props = defineProps<{
  typeText: 'incomes' | 'expenses'
}>()

const { statPage } = useStatPage()
const { moneyTypes } = useStat()
const typeNumber = computed(() => moneyTypes.find(t => t.id === `${props.typeText}`.toLowerCase())?.type)
</script>

<template lang="pug">
.my-4.px-2.bg-white.dark_bg-dark3
  .pb-2.text-lg.leading-none.font-nunito.font-semibold.text-skin-item-base {{ $t(`money.${typeText}`) }}
  .overflow-hidden.overflow-x-auto.scrollbar
    .flex.items-center
      //- Total
      .pr-6
        Amount(
          :currency="$store.state.currencies.base"
          :type="typeNumber"
          :value="statPage.current[typeText].total"
          size="xl"
          vertical="left"
        )

      //- Average
      LazyStatSummaryRowItemView(
        v-if="statPage.average[typeText] !== 0"
        :amount="statPage.average[typeText]"
        :title="$t(`money.average.${typeText}`)"
        :type="typeNumber"
      )
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import VChart from 'vue-echarts'

import {
  GridComponent,
  MarkAreaComponent,
  MarkLineComponent,
  TooltipComponent,
} from 'echarts/components'

use([
  MarkLineComponent,
  BarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  MarkAreaComponent,
  SVGRenderer,
])

defineProps<{
  option: object
  loading?: boolean
}>()

const chart = ref()
const emit = defineEmits(['finished', 'onClickChart'])

function finished() {
  emit('finished', chart.value)
}

function onClickChart(params: any) {
  emit('onClickChart', params)
}
</script>

<template lang="pug">
VChart.w-full(
  ref="chart"
  :option="option"
  autoresize
  :loading="loading"
  @finished="finished"
  @zr:click="onClickChart"
)
</template>

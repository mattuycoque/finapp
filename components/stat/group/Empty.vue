<script>
import useStatPage from '~/components/stat/useStatPage'

export default defineComponent({
  props: {
    typeText: { type: String, required: true },
  },

  setup(props) {
    const { typeText } = toRefs(props)
    const { statPage } = useStatPage()

    const isShow = computed(() => statPage.current[typeText.value]?.categoriesIds?.length === 0)

    return {
      isShow,
    }
  },
})
</script>

<template lang="pug">
.my-4.px-2.text-sm(v-if="isShow") {{ $t('stat.empty') }}
</template>

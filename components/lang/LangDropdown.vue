<script>
export default {
  data() {
    return {
      visibleDropdown: false,
    }
  },

  computed: {
    currentLanguageName() {
      switch (this.$i18n.locale) {
        case 'ru':
          return '🇷🇺 Русский - Russian'
        default:
          return '🇺🇸 English - Английский'
      }
    },
  },

  methods: {
    changeLang(lang) {
      this.visibleDropdown = false
      this.$store.dispatch('lang/setLang', lang)
    },

    onClickOpener() {
      this.visibleDropdown = !this.visibleDropdown
    },
  },
}
</script>

<template lang="pug">
SharedContextMenu(
  :position="{ left: true, top: true }"
  :visible="visibleDropdown"
  @onClickOpener="onClickOpener"
)

  template(slot="opener")
    SharedDropdown(
      :active="visibleDropdown"
      :title="currentLanguageName"
    )
  template(slot="content")
    SharedContextMenuItem(
      title="🇷🇺 Русский - Russian"
      @onClick="changeLang('ru')")

    SharedContextMenuItem(
      title="🇺🇸 English - Английский"
      @onClick="changeLang('en')")
</template>

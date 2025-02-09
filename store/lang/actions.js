import localforage from 'localforage'
import { getDataOnce, saveData } from '~/services/firebase/api'

export default {
  setLang({ commit, rootGetters }, lang) {
    const uid = rootGetters['user/userUid']
    if (uid)
      saveData(`users/${uid}/settings/lang`, lang)

    commit('setLang', lang)
    localforage.setItem('finapp.lang', lang)

    if (this.$i18n.locales.find(i => i.code !== this.$i18n.locale)) {
      if (this.app.i18n.locale !== lang)
        this.app.i18n.setLocale(lang)
    }
  },

  async initLocalLang({ commit }) {
    const localLang = await localforage.getItem('finapp.lang')
    if (localLang) commit('setLang', localLang)
  },

  async initDbLang({ commit, rootGetters }) {
    const uid = rootGetters['user/userUid']
    if (!uid) return

    const lang = await getDataOnce(`users/${uid}/settings/lang`)
    if (!lang) return

    commit('setLang', lang)
    localforage.setItem('finapp.lang', lang)

    if (this.$i18n.locales.find(i => i.code !== this.$i18n.locale)) {
      if (this.app.i18n.locale !== lang)
        this.app.i18n.setLocale(lang)
    }
  },
}

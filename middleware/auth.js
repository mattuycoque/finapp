export default function ({ store, redirect, route, app }) {
  const routeName = app.getRouteBaseName(route)
  console.log('auth', store.state.user.user)

  if (store.state.user.user !== null && routeName === 'login') {
    redirect(app.localePath('/'))
  }
  if (store.state.user.user === null && routeName !== 'login') {
    redirect(app.localePath('login'))
  }
}

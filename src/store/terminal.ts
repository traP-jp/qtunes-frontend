import { InjectionKey, readonly, ref, Ref } from 'vue'

const usingTerminal: Ref<'mobile' | 'tablet' | 'pc'> = ref('pc')
const fetchTerminal = () => {
  if (window.matchMedia('(max-width: 767px)').matches) {
    usingTerminal.value = 'mobile'
    return
  }
  if (window.matchMedia('(max-width: 1199px)').matches) {
    usingTerminal.value = 'tablet'
    return
  }
  usingTerminal.value = 'pc'
}
fetchTerminal()
window.onresize = fetchTerminal

export const terminalStore = {
  usingTerminal: readonly(usingTerminal),
}
export const terminalKey: InjectionKey<typeof terminalStore> =
  Symbol('terminal')

import { colors } from '~/layouts/composables/colors'

export const colorOptions = (function () {
  const colorList: Array<string> = []
  const colorListSelect: Array<Record<any, any>> = []
  let cont = -1
  for (const [key, value] of Object.entries(colors)) {
    let temp = /--([a-z]+)-/.exec(key)
    if (temp && !colorList.includes(temp[1])) {
      colorList.push(temp[1])
      colorListSelect.push({ label: temp[1], items: [] })
      cont++
    }
    colorListSelect[cont].items.push({ label: key, value: value })
  }
  return colorListSelect
})()

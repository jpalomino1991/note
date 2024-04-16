import { watch } from 'vue'

export function useWatchCharacter(valueToWatch, maxChar = 100) {
    watch(valueToWatch,(newValue) => {
        if(newValue.length === maxChar)
            alert(`solo ${maxChar} car prro`)
    })
}
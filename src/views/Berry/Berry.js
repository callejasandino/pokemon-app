import { useBerryStore } from '@/stores/berry'
import debounce from 'lodash.debounce'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
   setup() {
      const berryName = ref(null)
      const berry = ref([])
      const berryStore = useBerryStore()
      const isLoading = ref(false)

      const fetchBerry = async (name) => {
         try {
            isLoading.value = true
            await berryStore.fetchBerryInformation(name)
            berry.value = berryStore.getBerry

            console.log(berry.value)
         } catch (error) {
            console.log(error)
         }
      }

      const debouncedSearch = debounce(() => {
         berryName.value !== null ? fetchBerry(berryName.value) : (berryName.value = null)
      }, 2000)

      watch(berryName, debouncedSearch)
      return {
         fetchBerry,
         berryName,
         isLoading
      }
   }
})

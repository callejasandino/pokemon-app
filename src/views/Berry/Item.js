import { useItemStore } from '@/stores/item'
import debounce from 'lodash.debounce'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
   setup() {
      const itemName = ref(null)
      const item = ref([])
      const itemStore = useItemStore()
      const isLoading = ref(false)

      const fetchItem = async (name) => {
         try {
            isLoading.value = true
            await itemStore.fetchItemInformation(name)
            item.value = itemStore.getItem

            console.log(item.value)
         } catch (error) {
            console.log(error)
         }
      }

      const debouncedSearch = debounce(() => {
         itemName.value !== null ? fetchItem(itemName.value) : (itemName.value = null)
      }, 2000)

      watch(itemName, debouncedSearch)
      return {
         itemName,
         isLoading,
         item
      }
   }
})

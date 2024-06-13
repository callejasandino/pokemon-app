import { useItemStore } from '@/stores/item'
import debounce from 'lodash.debounce'
import { defineComponent, ref, watch } from 'vue'
import ItemDescription from '../../components/Modals/ItemDescription.vue'

export default defineComponent({
   components: {
      ItemDescription
   },
   setup() {
      const itemName = ref(null)
      const item = ref()
      const itemStore = useItemStore()
      const isLoading = ref(false)
      const itemLanguage = ref()
      const itemDescription = ref()

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

      const showItemInformation = (language, description) => {
         itemLanguage.value = language
         itemDescription.value = description
      }

      watch(itemName, debouncedSearch)

      return {
         itemName,
         isLoading,
         item,
         showItemInformation,
         itemLanguage,
         itemDescription
      }
   }
})

import { defineComponent, ref, computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { useMovesStore } from '../../../stores/move'
import MoveInformation from '@/components/Modals/MoveInformation.vue'

export default defineComponent({
   components: {
      MoveInformation,
      ChevronLeftIcon,
      ChevronRightIcon
   },
   props: {
      moves: {
         type: Array,
         required: true
      }
   },
   setup(props) {
      const currentPage = ref(1)
      const pageSize = 5
      const moveInformation = ref(null)

      // Fetch move store
      const moveStore = useMovesStore()

      // Fetch move information
      const fetchMove = async (moveName) => {
         await moveStore.fetchMoveInformation(moveName)
         moveInformation.value = moveStore.getMove
      }

      // Computed properties
      const totalPages = computed(() => Math.ceil(props.moves.length / pageSize))

      const paginatedItems = computed(() => {
         const startIndex = (currentPage.value - 1) * pageSize
         const endIndex = startIndex + pageSize
         return props.moves.slice(startIndex, endIndex)
      })

      // Pagination functions
      const goToPage = (page) => {
         if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page
         }
      }

      const nextPage = () => {
         if (currentPage.value < totalPages.value) {
            currentPage.value++
         }
      }

      const prevPage = () => {
         if (currentPage.value > 1) {
            currentPage.value--
         }
      }

      return {
         currentPage,
         pageSize,
         moveInformation,
         moveStore,
         totalPages,
         paginatedItems,
         goToPage,
         nextPage,
         prevPage,
         fetchMove
      }
   }
})

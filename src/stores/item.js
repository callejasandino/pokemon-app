import { defineStore } from 'pinia'
import axios from 'axios'
const prefix = 'item'

export const useItemStore = defineStore(prefix, {
   state: () => ({
      item: null,
      error: null
   }),

   actions: {
      async fetchItemInformation(id) {
         try {
            const response = await axios.get(`${prefix}/${id}`)
            this.item = response.data
         } catch (error) {
            this.error = error
         }
      }
   },
   getters: {
      getItem: (state) => state.item,
      getError: (state) => state.error
   }
})

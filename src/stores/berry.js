import { defineStore } from 'pinia'
import axios from 'axios'

const prefix = 'berry'

export const useBerryStore = defineStore(prefix, {
   state: () => ({
      berry: null,
      error: null
   }),

   actions: {
      async fetchBerryInformation(berryName) {
         try {
            const response = await axios.get(`${prefix}/${berryName}`)
            this.berry = response.data
         } catch (error) {
            this.error = error
         }
      }
   },

   getters: {
      getBerry: (state) => state.berry,
      getError: (state) => state.error
   }
})

import { defineStore } from 'pinia'
import axios from 'axios'
const prefix = 'move'

export const useMovesStore = defineStore(prefix, {
   state: () => ({
      move: null,
      error: null
   }),

   actions: {
      async fetchMoveInformation(moveName) {
         await axios
            .get(`${prefix}/${moveName}`)
            .then((response) => {
               this.move = response.data
            })
            .catch((error) => {
               this.error = error
            })
      }
   },

   getters: {
      getMove(state) {
         return state.move
      },
      getErrors(state) {
         return state.error
      }
   }
})

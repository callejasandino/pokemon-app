import { defineStore } from 'pinia'
import axios from 'axios'
const prefix = 'pokemon'

export const usePokemonStore = defineStore('pokemon', {
   state: () => ({
      pokemon: null,
      error: null
   }),

   actions: {
      async fetchPokemon(name) {
         await axios
            .get(`${prefix}/${name}`)
            .then((response) => {
               this.pokemon = response.data
            })
            .catch((error) => {
               this.error = error
            })
      }
   },

   getters: {
      getPokemon(state) {
         return state.pokemon
      },

      getError(state) {
         return state.error
      }
   }
})

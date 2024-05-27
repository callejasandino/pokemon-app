import { defineStore } from 'pinia'
import axios from 'axios'

const prefix = 'pokemon'

export const usePokemonStore = defineStore(prefix, {
   state: () => ({
      pokemon: null,
      error: null
   }),

   actions: {
      async fetchPokemon(name) {
         try {
            const response = await axios.get(`${prefix}/${name}`)
            this.pokemon = response.data
         } catch (error) {
            this.error = error
         }
      }
   },

   getters: {
      getPokemon: (state) => state.pokemon,
      getError: (state) => state.error
   }
})

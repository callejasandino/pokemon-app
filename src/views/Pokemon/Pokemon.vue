<template>
   <div class="container">
      <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Search Pokemon</label>
      <div class="relative mt-2 flex items-center mb-10">
         <input type="text" name="search" id="search" class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" v-model="pokemonName" />
         <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <kbd class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">⌘K</kbd>
         </div>
      </div>

      <div class="max-w-full rounded overflow-hidden shadow-lg" v-if="pokemonResult">
         <div v-if="pokemonResult" class="mb-10 bg-gray-800 text-white p-10">
            <p class="text-4xl text-center capitalize font-bold mb-10">{{ pokemonResult.name }}</p>

            <div class="flex justify-evenly">
               <div>
                  <p class="text-2xl text-center capitalize mb-10">Latest {{ pokemonResult.name }} voice</p>
                  <audio controls>
                     <source :src="pokemonResult.cries.latest" type="audio/ogg" />
                     <source :src="pokemonResult.cries.latest" type="audio/mpeg" />
                     Your browser does not support the audio element.
                  </audio>
               </div>

               <div>
                  <p class="text-2xl text-center capitalize mb-10">Legacy {{ pokemonResult.name }} voice</p>
                  <audio controls>
                     <source :src="pokemonResult.cries.legacy" type="audio/ogg" />
                     <source :src="pokemonResult.cries.legacy" type="audio/mpeg" />
                     Your browser does not support the audio element.
                  </audio>
               </div>
            </div>
         </div>

         <div v-else>
            <p class="text-2xl text-center capitalize">Data will be presented here</p>
         </div>

         <div class="flex justify-around">
            <div>
               <p class="text-2xl text-center font-medium">Shiny Type</p>
               <div class="flex justify-between">
                  <img class="w-80 h-80" :src="pokemonSprites.back_shiny" alt="" />
                  <img class="w-80 h-80" :src="pokemonSprites.front_shiny" alt="" />
               </div>
            </div>

            <div>
               <p class="text-2xl text-center font-medium">Normal Type</p>
               <div class="flex justify-between">
                  <img class="w-80 h-80" :src="pokemonSprites.back_default" alt="" />
                  <img class="w-80 h-80" :src="pokemonSprites.front_default" alt="" />
               </div>
            </div>
         </div>

         <div class="px-6 py-4">
            <div>
               <h3 class="capitalize text-2xl font-semibold leading-6 text-gray-900">{{ pokemonResult.name }}'s Information</h3>
               <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div v-for="(stat, index) in stats" :key="index" class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                     <dt class="capitalize truncate text-sm font-medium text-gray-500">{{ stat.stat.name }}</dt>
                     <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ stat.base_stat }}</dd>
                  </div>
               </dl>
            </div>
         </div>

         <div class="px-6 py-4">
            <div class="font-bold text-4xl mb-10 capitalize">{{ pokemonResult.name }}'s Moves:</div>
            <div v-if="moves">
               <Moves :moves="moves" />
            </div>
         </div>

         <div class="px-6 pt-4 pb-2">
            <div class="font-bold text-4xl mb-10 capitalize">{{ pokemonResult.name }} Appeared in these Games:</div>

            <span v-for="(gameIndex, index) in gameIndices" :key="index" :style="{ backgroundColor: bgColorChanger(gameIndex.version.name) }" class="capitalize inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ gameIndex.version.name }}</span>
         </div>
      </div>
   </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { usePokemonStore } from '../../stores/pokemon'
import debounce from 'lodash.debounce'
import Moves from './Moves/Moves.vue'

const pokemonName = ref('')
const pokemonResult = ref(null)
const pokemonSprites = reactive({
   back_default: '',
   back_shiny: '',
   front_default: '',
   front_shiny: ''
})
const stats = ref([])
const gameIndices = ref([])
const moves = ref([])

const pokemonStore = usePokemonStore()

const fetchPokemon = async (name) => {
   await pokemonStore.fetchPokemon(name)
   const fetchedPokemon = pokemonStore.getPokemon

   pokemonResult.value = fetchedPokemon
   updateSprites(fetchedPokemon.sprites)
   stats.value = fetchedPokemon.stats
   moves.value = fetchedPokemon.moves
   gameIndices.value = fetchedPokemon.game_indices

   console.log(fetchedPokemon)
}

const updateSprites = (sprites) => {
   pokemonSprites.back_default = sprites.back_default
   pokemonSprites.back_shiny = sprites.back_shiny
   pokemonSprites.front_default = sprites.front_default
   pokemonSprites.front_shiny = sprites.front_shiny
}

const bgColorChanger = (colorName) => {
   const colors = {
      red: '#ff0000',
      blue: '#0000ff',
      yellow: '#ffff00',
      gold: '#ffd700',
      silver: '#c0c0c0',
      crystal: '#d8d8d8',
      ruby: '#e0115f',
      sapphire: '#0f52ba',
      emerald: '#50c878',
      firered: '#ff4000',
      leafgreen: '#00ff00',
      diamond: '#b9f2ff',
      pearl: '#ffdde6',
      platinum: '#e5e4e2',
      heartgold: '#ffd700',
      soulsilver: '#c0c0c0',
      black: '#000000',
      white: '#ffffff',
      'black-2': '#333333',
      'white-2': '#cccccc'
   }

   return colors[colorName] || '#ffffff'
}

const debouncedSearch = debounce(() => {
   console.log('Searching for:', pokemonName.value)

   if (pokemonName.value) {
      fetchPokemon(pokemonName.value)
   } else {
      pokemonResult.value = null
   }
}, 2000)

watch(pokemonName, debouncedSearch)
</script>

<style lang="scss" scoped></style>

import { reactive, ref, watch, defineComponent } from 'vue'
import { usePokemonStore } from '../../stores/pokemon'
import debounce from 'lodash.debounce'
import Moves from './Moves/Moves.vue'

export default defineComponent({
   components: {
      Moves
   },

   setup() {
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
      const isLoading = ref(false)

      const pokemonStore = usePokemonStore()

      const fetchPokemon = async (name) => {
         isLoading.value = true
         try {
            await pokemonStore.fetchPokemon(name)
            const fetchedPokemon = pokemonStore.getPokemon

            pokemonResult.value = fetchedPokemon
            updateSprites(fetchedPokemon.sprites)
            stats.value = fetchedPokemon.stats
            moves.value = fetchedPokemon.moves
            gameIndices.value = fetchedPokemon.game_indices
         } catch (error) {
            console.error(error)
         } finally {
            isLoading.value = false
         }
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

      return { fetchPokemon, bgColorChanger, isLoading, pokemonName, pokemonResult, pokemonSprites, stats, moves, gameIndices }
   }
})

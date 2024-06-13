<template>
   <div class="container">
      <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Search Pokemon</label>
      <div class="relative mt-2 flex items-center mb-10">
         <input type="text" name="search" id="search" class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" v-model="pokemonName" />
         <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <kbd class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">⌘K</kbd>
         </div>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center mb-10">
         <div class="loader"></div>
      </div>

      <div class="max-w-full rounded overflow-hidden shadow-lg" v-if="pokemonResult && !isLoading">
         <div class="mb-10 bg-gray-800 text-white p-10">
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

         <div class="bg-white">
            <div class="mx-auto max-w-2xl px-4 py-10 sm:px-6 py-10 lg:max-w-7xl lg:px-8">
               <div>
                  <h2 class="text-lg font-medium text-gray-900 capitalize text-center">{{ pokemonResult.name }} Shiny / Normal</h2>
               </div>
               <div class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                  <div class="group relative">
                     <div class="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                        <img :src="pokemonSprites.front_shiny" class="w-52 h-52 mx-auto object-cover object-center" />
                     </div>
                  </div>

                  <div class="group relative">
                     <div class="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                        <img :src="pokemonSprites.back_shiny" class="w-52 h-52 mx-auto object-cover object-center" />
                     </div>
                  </div>

                  <div class="group relative">
                     <div class="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                        <img :src="pokemonSprites.front_default" class="w-52 h-52 mx-auto object-cover object-center" />
                     </div>
                  </div>

                  <div class="group relative">
                     <div class="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                        <img :src="pokemonSprites.back_default" class="w-52 h-52 mx-auto object-cover object-center" />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!-- <div class="flex justify-around">
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
         </div> -->

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

<script src="./Pokemon.js"></script>

<style src="./Pokemon.css" scoped></style>

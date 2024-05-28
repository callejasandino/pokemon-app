<template>
   <div class="container">
      <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Search Item</label>
      <div class="relative mt-2 flex items-center mb-10">
         <input type="text" name="search" id="search" class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" v-model="itemName" />
         <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <kbd class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">⌘K</kbd>
         </div>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center mb-10">
         <div class="loader"></div>
      </div>

      <div class="p-10 bg-gray-800">
         <div class="text-center capitalize text-4xl font-semibold text-white">
            {{ item.name }}
         </div>

         <div class="">
            <img :src="item.sprites.default" alt="" class="w-40 h-40 mx-auto" />
         </div>
      </div>
   </div>
</template>

<script src="./Item.js"></script>

<style lang="scss" scoped></style>

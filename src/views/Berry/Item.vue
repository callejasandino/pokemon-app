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

      <div v-if="item">
         <div class="p-10 bg-gray-800 mb-10">
            <div class="text-center capitalize text-4xl font-semibold text-white mb-5">{{ item.name }}</div>
            <div class="text-center capitalize text-xl font-semibold text-white">({{ item.category.name }})</div>

            <div v-if="item.sprites">
               <img :src="item.sprites.default" alt="" class="w-40 h-40 mx-auto" />
            </div>
         </div>

         <div class="mb-10">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Attributes:</h3>
            <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
               <div v-for="attribute in item.attributes" :key="attribute" class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt class="truncate text-sm font-medium text-gray-500 capitalize">{{ attribute.name }}</dt>
               </div>
            </dl>
         </div>

         <div>
            <h3 class="text-base font-semibold leading-6 text-gray-900 mb-10">Description in Different Languages:</h3>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
               <div v-for="description in item.flavor_text_entries" :key="description" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                  <div class="min-w-0 flex-1">
                     <button @click="showItemInformation(description.language.name, description.text)" class="focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true" />
                        <p class="text-sm font-medium text-gray-900 text-left">{{ description.language.name }}</p>
                        <p class="truncate text-sm text-gray-500 text-left">{{ description.text }}</p>
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <ItemDescription v-if="itemLanguage && itemDescription" :language="itemLanguage" :description="itemDescription" />
      </div>
   </div>
</template>

<script src="./Item.js"></script>

<style lang="scss" scoped></style>

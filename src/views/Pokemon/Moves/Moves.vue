<template>
   <div class="px-4 sm:px-6 lg:px-8">
      <div></div>
      <div class="mt-8 flow-root">
         <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
               <table class="min-w-full divide-y divide-gray-300">
                  <thead>
                     <tr>
                        <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-md font-semibold text-gray-900 sm:pl-0 text-center">Name</th>
                        <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-md font-semibold text-gray-900 text-center">Level to Learn</th>
                        <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-md font-semibold text-gray-900 text-center">Learned Through</th>
                        <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-md font-semibold text-gray-900 text-center">Move Appeared in these Games</th>
                        <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-md font-semibold text-gray-900 text-center">Additional Information</th>
                     </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                     <template v-for="move in paginatedItems" :key="move.id">
                        <tr v-for="(detail, index) in move.version_group_details" :key="index">
                           <td v-if="index === 0" :rowspan="move.version_group_details.length" class="text-lg whitespace-nowrap py-2 pl-4 pr-3 text-gray-500 sm:pl-0 capitalize text-center">{{ move.move.name }}</td>
                           <td class="text-lg whitespace-nowrap px-2 py-2 font-medium text-gray-900 capitalize text-center">{{ detail.level_learned_at }}</td>
                           <td class="text-lg whitespace-nowrap px-2 py-2 text-gray-900 capitalize text-center">{{ detail.move_learn_method.name }}</td>
                           <td class="text-lg whitespace-nowrap px-2 py-2 text-gray-500 capitalize text-center">{{ detail.version_group.name }}</td>
                           <td v-if="index === 0" :rowspan="move.version_group_details.length" class="text-lg whitespace-nowrap px-2 py-2 text-gray-500 text-center">
                              <button type="button" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize" @click="fetchMove(move.move.name)">View {{ move.move.name }}</button>
                           </td>
                        </tr>
                     </template>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   </div>

   <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div class="flex flex-1 justify-between sm:hidden">
         <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" @click.prevent="prevPage">Previous</a>
         <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" @click.prevent="nextPage">Next</a>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
         <div>
            <p class="text-sm text-gray-700">
               Showing
               {{ (currentPage - 1) * pageSize + 1 }}
               to
               {{ currentPage * pageSize > moves.length ? moves.length : currentPage * pageSize }}
               of
               {{ moves.count }}
               results
            </p>
         </div>
         <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
               <a href="#" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" @click.prevent="prevPage">
                  <span class="sr-only">Previous</span>
                  <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
               </a>

               <a v-for="page in totalPages" :key="page" href="#" aria-current="page" class="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" :class="[currentPage === page ? 'bg-blue-500 text-white' : ' text-gray-700']" @click.prevent="goToPage(page)">{{ page }}</a>

               <a href="#" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" @click.prevent="nextPage">
                  <span class="sr-only">Next</span>
                  <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
               </a>
            </nav>
         </div>
      </div>
   </div>

   <MoveInformation v-if="moveInformation" :information="moveInformation" />
</template>

<script src="./Moves.js"></script>

<style lang="scss" scoped></style>

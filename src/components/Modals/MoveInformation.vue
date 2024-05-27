<template>
   <TransitionRoot as="template" :show="isModalOpen">
      <Dialog class="relative z-10" @close="isModalOpen = false">
         <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
         </TransitionChild>

         <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
               <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                  <DialogPanel class="mx-auto relative transform overflow-x-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl h-1/2 max-h-[900px] sm:p-6">
                     <div class="font-bold text-4xl mb-10 capitalize">Other Information: {{ information.name }}</div>

                     <div class="w-full mb-10" v-if="information.accuracy">
                        <h3 class="text-lg font-semibold leading-6 text-gray-900">Accuracy</h3>
                        <dl class="mt-5 gap-5 sm:grid-cols-3">
                           <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 text-center">
                              <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ information.accuracy }}</dd>
                           </div>
                        </dl>
                     </div>

                     <div class="w-full mb-10" v-if="information.generation.name">
                        <h3 class="text-lg font-semibold leading-6 text-gray-900">Generation</h3>
                        <dl class="mt-5 gap-5 sm:grid-cols-3">
                           <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 text-center">
                              <dd class="uppercase mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ information.generation.name }}</dd>
                           </div>
                        </dl>
                     </div>

                     <div class="w-full mb-10" v-if="information.power">
                        <h3 class="text-lg font-semibold leading-6 text-gray-900">Power</h3>
                        <dl class="mt-5 gap-5 sm:grid-cols-3">
                           <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 text-center">
                              <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ information.power }}</dd>
                           </div>
                        </dl>
                     </div>

                     <div class="w-full mb-10" v-if="information.pp">
                        <h3 class="text-lg font-semibold leading-6 text-gray-900">PP</h3>
                        <dl class="mt-5 gap-5 sm:grid-cols-3">
                           <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 text-center">
                              <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ information.pp }}</dd>
                           </div>
                        </dl>
                     </div>

                     <div class="w-full mb-10" v-if="information.type.name">
                        <h3 class="text-lg font-semibold leading-6 text-gray-900">Type</h3>
                        <dl class="mt-5 gap-5 sm:grid-cols-3">
                           <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 text-center">
                              <dd class="capitalize mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ information.type.name }}</dd>
                           </div>
                        </dl>
                     </div>

                     <h3 class="text-lg font-semibold leading-6 text-gray-900" v-if="information.names">Different Names:</h3>
                     <div class="w-full mb-10" v-for="name in information.names" :key="name">
                        <dl class="mt-5 gap-5 sm:grid-cols-3">
                           <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 text-center">
                              <dt class="truncate text-sm font-medium text-gray-500">{{ name.language.name }}</dt>
                              <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ name.name }}</dd>
                           </div>
                        </dl>
                     </div>
                  </DialogPanel>
               </TransitionChild>
            </div>
         </div>
      </Dialog>
   </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import { ref, watch } from 'vue'

const props = defineProps({
   information: {
      type: Object,
      required: true
   }
})

let isModalOpen = ref(false)

watch(
   () => props.information,
   (newValue) => {
      if (newValue !== null) {
         isModalOpen.value = true
         console.log(isModalOpen.value)
         console.log(props.information)
      } else {
         isModalOpen.value = false
      }
   },
   { immediate: true }
) // Immediate watch to handle initial value

// console.log(props.moveInformation)
</script>

<style lang="scss" scoped></style>

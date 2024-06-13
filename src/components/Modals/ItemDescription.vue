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
                     <div class="font-bold text-4xl mb-10 capitalize">Item Information: ({{ language }})</div>

                     <div class="w-full mb-10">
                        <dl class="mt-5 gap-5 sm:grid-cols-3">
                           <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 text-center">
                              <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ description }}</dd>
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
   language: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   }
})

const isModalOpen = ref(false)

watch(
   () => props.language,
   (newValue) => {
      if (newValue !== null) {
         isModalOpen.value = true
      } else {
         isModalOpen.value = false
      }
   },
   { immediate: true }
)
</script>

<style lang="scss" scoped></style>

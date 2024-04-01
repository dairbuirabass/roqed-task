<template>
  <div class="mx-4 flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center pb-4">
    <label for="table-search" class="sr-only">Search</label>
    <div class="relative mr-4">
        <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input v-model="search" type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
    </div>
    <button @click="$emit('search', search)"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Search
      </button>
  </div>
  <div class="flex overflow-x-auto mx-auto p-4">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">ID</th>
          <th scope="col" class="px-6 py-3">Title</th>
          <th scope="col" class="px-6 py-3">Size</th>
          <th scope="col" class="px-6 py-3">Extension</th>
          <th scope="col" class="px-6 py-3">Path</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in entries" :key="index"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="px-6 py-4">{{ entry.id }}</td>
          <td class="flex justify-between items-center px-6 py-4">
            <a :href="getFileUrl(entry.path)" class="underline">
                {{ entry.title }}
            </a>
            <img
              v-if="entry.thumbnailPath"
              class="h-auto max-w-xl rounded-lg shadow-xl dark:shadow-gray-800"
              :src="getFileUrl(entry.thumbnailPath)"
              alt="thumbnail">
          </td>
          <td class="px-6 py-4">{{ formatSize(entry.size) }}</td>
          <td class="px-6 py-4">{{ entry.extension }}</td>
          <td class="px-6 py-4">{{ entry.path }}</td>
          <td class="px-6 py-4">
            <a @click.prevent="$emit('editRow', entry.id)" href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              Edit
            </a>
            <a @click.prevent="openDeleteRowModal(entry.id)" href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <PopupModal
        :key="deleteRowId"
        :show="openModal"
        text="Are you sure you want to delete this product?"
        @submitModal="submitDeleteRowModal"
        @closeModal="closeDeleteRowModal">
    </PopupModal>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, defineEmits } from 'vue'
import PopupModal from '@/Components/PopupModal.vue'

const props = defineProps({
  entries: Object,
  searchValue: String
});

const search = ref('')
const deleteRowId = ref()
let openModal = false

const emit = defineEmits(['search', 'editRow', 'deleteRow']);

onBeforeMount(() => {
  search.value = props.searchValue
})

function getFileUrl(path) {
    return window.location.origin + '/storage/' + path
}

function formatSize(size) {
    let kilobyte = 1024;
    let megabyte = kilobyte * 1024;

    if (size < kilobyte) {
        return size + ' B';
    } else if (size < megabyte) {
        return Math.round(size / kilobyte, 2) + ' KB';
    } else {
        return Math.round(size / megabyte, 2) + ' MB';
    }
}

function openDeleteRowModal(entryId) {
    deleteRowId.value = entryId
    openModal = true
}

function closeDeleteRowModal() {
    deleteRowId.value = null
    openModal = false
}

function submitDeleteRowModal() {
    emit('deleteRow', parseInt(deleteRowId.value));
}
</script>

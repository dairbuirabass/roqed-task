<template>
  <div class="relative overflow-x-auto">
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
          <td class="px-6 py-4">
            <a :href="getFileUrl(entry.path)">
                {{ entry.title }}
            </a>
          </td>
          <td class="px-6 py-4">{{ formatSize(entry.size) }}</td>
          <td class="px-6 py-4">{{ entry.extension }}</td>
          <td class="px-6 py-4">{{ entry.path }}</td>
          <td class="px-6 py-4">
            <a @click="$emit('editRow', entry.id)" href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              Edit
            </a>
            <a @click="$emit('deleteRow', entry.id)" href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  entries: Object
});

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
</script>

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
          <td class="px-6 py-4">{{ entry.title }}</td>
          <td class="px-6 py-4">{{ entry.size }}</td>
          <td class="px-6 py-4">{{ entry.extension }}</td>
          <td class="px-6 py-4">{{ entry.path }}</td>
          <td class="px-6 py-4">
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            <a @click="$emit('deleteRow', entry.id)" href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
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
</script>

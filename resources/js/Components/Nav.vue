<template>
  <nav aria-label="Table navigation">
    <ul class="inline-flex -space-x-px text-base h-10">
      <li v-for="n in lastPage">
        <a @click="$emit('setPage', n)" href="#" :aria-current="(n == currentPage) ? 'page' : ''"
          :class="(n == currentPage) ? 'flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'">
          {{ n }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
  const props = defineProps({
    currentPage: Number,
    lastPage: Number,
  });
</script>

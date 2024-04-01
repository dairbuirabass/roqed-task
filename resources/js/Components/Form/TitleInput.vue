<template>
  <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Title
  </label>
  <input @input="updateInputValue" v-model="titleValue" type="text" id="base-input"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
</template>

<script setup>
  import { ref, defineEmits, onMounted } from 'vue'

  const titleValue = ref('')

  const props = defineProps({
    title: String,
  });

  const emit = defineEmits(['updateTitle']);

  onMounted(() => {
    if (props.title) {
      titleValue.value = props.title
    }
  })

  function updateInputValue() {
    emit('updateTitle', titleValue.value);
  }
</script>

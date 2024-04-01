<template>
  <div @drop.prevent="handleDrop" @dragover.prevent @dragenter.prevent="dragEnter" @dragleave.prevent="dragLeave"
    class="flex flex-col items-center justify-center w-full">
    <label for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      :class="isDragOver ? 'border-blue-400 bg-blue-100' : 'border-gray-300 bg-white'">
      <div class="flex flex-col items-center justify-center pointer-events-none pt-5 pb-6">
        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
        </svg>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or
          drag and drop</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
      </div>
      <input ref="fileInput" @change="updateInputValue" id="dropzone-file" type="file" class="hidden" />
    </label>
    <div v-if="fileName" class="w-full">
      <h3>File "{{ fileName }}" is selected</h3>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineEmits } from 'vue'

  const isDragOver = ref(false);
  const fileInput = ref(null);
  const fileName = ref(null);

  const emit = defineEmits(['changeFile']);

  function updateInputValue() {
    emit('changeFile', fileInput.value.files);
    if (fileInput.value.files.length > 0) {
      fileName.value = fileInput.value.files[0].name;
    }
  }

  const handleDrop = (event) => {
    isDragOver.value = false;
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      fileName.value = files[0].name;
      emit('changeFile', files);
    }
  };

  const dragEnter = () => {
    isDragOver.value = true;
  };

  const dragLeave = () => {
    isDragOver.value = false;
  };
</script>

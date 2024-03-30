<template>
  <form @submit.prevent="submitForm" class="max-w-lg mx-auto">
    <div class="mb-5">
      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Base
        input</label>
      <input v-model="title" type="text" id="base-input"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>
    <div>
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload
        file</label>
      <input ref="fileRef"
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="user_avatar_help" id="user_avatar" type="file">
      <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful
        to confirm your are logged into your account</div>
    </div>
    <button type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create
      new entity</button>
  </form>
</template>

<script setup>
import { defineModel, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'

import { useEntryStore } from '../stores'

const router = useRouter();

const { entry, loading, error } = storeToRefs(useEntryStore())
const { fetchEntry, createEntry } = useEntryStore()

const props = defineProps({
  id: String
});

const title = defineModel()
const fileRef = ref()

onMounted(() => {
  if (props.id) {
    fetchEntry(props.id)
    .then((res) => {
      console.log(res)
    })
  } else {
    return
  }
})


function submitForm() {
  const files = fileRef.value.files

  // Validate file is selected
  if (files.length == 0) {
    alert('No file selected.') // TODO implement messages
    return
  }
  const fileReader = new FileReader()
  fileReader.readAsDataURL(files[0])
  let file = files[0]

  // Validate file size does not exceed 8 Mb
  const maxFileSize = 8
  const fileSizeInMB = file.size / 1024 / 1024

  if (fileSizeInMB > maxFileSize) {
    alert('File size should not exceed 8 Mb.') // TODO implement messages
    return
  }

  // Submit data
  let formData = new FormData()
  formData.append('title', title.value)
  formData.append('file', file)
  createEntry(formData)
    .then((res) => {
      if (res.data.success) {
        router.push({ name: 'home' }) // TODO implement messages
      } else {
        alert('Reqesut failed with message:' + res.data.error) // TODO implement messages
      }
    })
}
</script>

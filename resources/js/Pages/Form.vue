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
			<input @change="onFilePicked" ref=file
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
import { defineModel } from 'vue'
import { storeToRefs } from 'pinia'

import { useEntryStore } from '../stores'

const { loading, error } = storeToRefs(useEntryStore())
const { createEntry } = useEntryStore()

const title = defineModel()
let file = null

function onFilePicked(event) {
	const files = event.target.files
	const fileReader = new FileReader()
	fileReader.readAsDataURL(files[0])
	file = files[0]
}

function submitForm() {
	let formData = new FormData();
	formData.append('title', title.value);
	formData.append('file', file);
    console.log(title.value)
	createEntry(formData)
}
</script>

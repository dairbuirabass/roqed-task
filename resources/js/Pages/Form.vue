<template>
  <div id="progress-bar"></div> <!-- File upload progress bar -->
  <form class="max-w-lg mx-auto">
    <div class="mb-5">
      <TitleInput :key="componentKey" :title @updateTitle="updateTitle"></TitleInput>
    </div>
    <div>
      <FileInput @changeFile="changeFile"></FileInput>
    </div>
    <div class="mt-5 md:flex md:items-center md:justify-between">
      <button @click="handleSubmitButton" type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {{ id ? 'Update entity' : 'Create new entity' }}
      </button>
      <button v-if="id" @click="openPopupModal('delete')" type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        Delete entry
      </button>
    </div>
    <PopupModal :key="entityId" :text=modalText :buttonStyle=buttonStyle
      @submitModal="submitModal" @closeModal="closeModal">
    </PopupModal>
  </form>
</template>

<script setup>
  import { ref, onBeforeMount } from 'vue'
  import { useRouter } from 'vue-router'
  import progressBar from 'progressbar.js'

  import { useEntryStore } from '../stores'

  import TitleInput from '@/Components/Form/TitleInput.vue'
  import FileInput from '@/Components/Form/FileInput.vue'
  import PopupModal from '@/Components/PopupModal.vue'

  const router = useRouter()

  const { fetchEntry, createEntry, updateEntry, deleteEntry } = useEntryStore()

  const props = defineProps({
    id: String
  })

  const componentKey = ref(0)
  const title = ref('')
  const files = ref(null)
  const entityId = ref()
  let action = null
  let modalText = null
  let buttonStyle = undefined

  onBeforeMount(() => {
    if (props.id) {
      fetchEntry(props.id)
        .then((res) => {
          title.value = res.title
          // TO DO improve key handling
          componentKey.value = 1
        })
    } else {
      return
    }
  })

  function updateTitle(newTitle) {
    title.value = newTitle
  }

  function changeFile(newFile) {
    files.value = newFile
  }

  function handleSubmitButton() {
    if (props.id) {
      openPopupModal('update')
    } else {
      submitForm()
    }
  }

  function submitModal() {
    if (action == 'update') {
      submitForm()
    } else if (action == 'delete') {
      submitDelete()
    }
  }

  function submitForm() {
    const isEdit = props.id
    let hasFiles = false

    if (files.value) {
      hasFiles = !(files.value.length == 0)
    }

    // Validate if file is selected
    if (!isEdit && !hasFiles) {
      alert('No file selected.')
      return
    }

    let formData = new FormData()
    formData.append('title', title.value)

    if (hasFiles) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files.value[0])
      let file = files.value[0]

      // Validate file size does not exceed 8 Mb
      const maxFileSize = 8
      const fileSizeInMB = file.size / 1024 / 1024

      if (fileSizeInMB > maxFileSize) {
        alert('File size should not exceed 8 Mb.')
        return
      }

      formData.append('file', file)
    }

    // Animate progress bar
    const bar = new progressBar.Line('#progress-bar', { easing: 'easeInOut' })
    bar.animate(1)

    if (isEdit) {
      updateEntry(props.id, formData)
        .then((res) => {
          if (!res.data.success) {
            alert('Request failed with message:' + res.data.error)
          }
          router.push({ name: 'home' })
        })
    } else {
      createEntry(formData)
        .then((res) => {
          if (!res.data.success) {
            alert('Request failed with message:' + res.data.error)
          }
          router.push({ name: 'home' })
        })
    }
  }

  function submitDelete() {
    deleteEntry(props.id)
      .then((res) => {
        if (!res.data.success) {
          alert('Request failed with message:' + res.data.error)
        }
        router.push({ name: 'home' })
      })
  }

  function openPopupModal(actionType) {
    entityId.value = props.id
    action = actionType
    if (action == 'update') {
      modalText = 'Are you sure you want to update this entity?'
      buttonStyle = "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    } else if (action == 'delete') {
      modalText = 'Are you sure you want to delete this entity?'
    }
  }

  function closeModal() {
    entityId.value = ''
    modalText = undefined
    buttonStyle = undefined
  }
</script>

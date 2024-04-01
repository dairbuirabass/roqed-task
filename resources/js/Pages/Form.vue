<template>
  <form class="max-w-lg mx-auto">
    <div class="mb-5">
      <TitleInput :key="componentKey" :title @updateTitle="updateTitle"></TitleInput>
    </div>
    <div>
      <FileInput @changeFile="changeFile"></FileInput>
    </div>
    <div class="mt-5 md:flex md:items-center md:justify-between">
      <button @click="openPopupModal('update')" type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {{ id ? 'Update entity' : 'Create new entity' }}
      </button>
      <button v-if="id" @click="openPopupModal('delete')" type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        Delete entry
      </button>
    </div>
    <PopupModal
        :key="modalVisibility"
        :show="openModal"
        :text=modalText
        :buttonStyle=buttonStyle
        @submitModal="submitModal"
        @closeModal="closeModal">
    </PopupModal>
  </form>
</template>

<script setup>
  import { ref, onMounted, onBeforeMount } from 'vue'
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia'

  import { useEntryStore } from '../stores'

  import TitleInput from '@/Components/Form/TitleInput.vue'
  import FileInput from '@/Components/Form/FileInput.vue'
  import PopupModal from '@/Components/PopupModal.vue'

  const router = useRouter();

  const { entry, loading, error } = storeToRefs(useEntryStore())
  const { fetchEntry, createEntry, updateEntry, deleteEntry} = useEntryStore()

  const props = defineProps({
    id: String
  });

  const componentKey = ref(0);
  const title = ref('')
  const files = ref(null)
  const modalVisibility = ref(false);
  let openModal = false
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

  function submitForm() {
    const isEdit = props.id
    let hasFiles = false

    if (files.value) {
        hasFiles = !(files.value.length == 0)
    }

    // Validate file is selected
    if (!isEdit && !hasFiles) {
      alert('No file selected.') // TODO implement messages
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
        alert('File size should not exceed 8 Mb.') // TODO implement messages
        return
      }

      formData.append('file', file)
    }

    if (isEdit) {
      updateEntry(props.id, formData)
        .then((res) => {
          if (res.data.success) {
            router.push({ name: 'home' }) // TODO implement messages
          } else {
            alert('Reqesut failed with message:' + res.data.error) // TODO implement messages
          }
        })
    } else {
        createEntry(formData)
    }
  }

  function submitModal() {
    if (action == 'update') {
        submitForm()
    } else if (action == 'delete') {
        submitDelete()
    }
  }

  function submitDelete() {
    deleteEntry(props.id)
    .then((res) => {
        router.push({ name: 'home' }) // TODO implement messages
    })
  }

  function openPopupModal(actionType) {
    modalVisibility.value = true
    openModal = true
    action = actionType
    if (action == 'update') {
        modalText = 'Are you sure you want to update this product?'
        buttonStyle = "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    } else if (action == 'delete') {
        modalText = 'Are you sure you want to delete this product?'
    }
  }

  function closeModal() {
    modalVisibility.value = false
    openModal = false
    modalText = false
    buttonStyle = undefined
  }
</script>

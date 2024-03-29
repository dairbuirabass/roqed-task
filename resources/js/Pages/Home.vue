<template>
    <div>
        <p v-if="loading">Loading posts...</p>
        <p v-if="error">{{ error.message }}</p>
        <Table v-if="entries" :entries  @openDeleteModal="openDeleteModal"></Table>
        <Nav :currentPage :lastPage @setPage="setPage"></Nav>
        <Modal ref=modal @deleteRow="deleteRow"></Modal>
    </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'

  import { useEntryStore } from '../stores'

  import Modal from '@/Components/Modal.vue'
  import Nav from '@/Components/Nav.vue'
  import Table from '@/Components/Table.vue'

  const modal = ref()
  const { entries, currentPage, lastPage, entry, loading, error, deleteModalVisibility } = storeToRefs(useEntryStore())
  const { fetchEntries, setCurrentPage, setEntry, setDeleteModalVisibility, deleteEntry } = useEntryStore()

  onMounted(() => {
    fetchEntries()
  })

  function openDeleteModal(entryId) {
    setDeleteModalVisibility(true)
    setEntry(entryId)
    modal.value.showModal()
  }

  function setPage(page) {
    setCurrentPage(page)
    fetchEntries()
    // router.push({ name: 'home', params: { 'p': page } })
  }

  function deleteRow() {
    deleteEntry()
  }
</script>

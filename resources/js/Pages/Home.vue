<template>
    <div>
        <p v-if="loading">Loading posts...</p>
        <p v-if="error">{{ error.message }}</p>
        <RouterLink to="/form">Entry creation</RouterLink>
        <Table v-if="entries" :entries @deleteRow="deleteRow"></Table>
        <Nav :currentPage :lastPage @setPage="setPage"></Nav>
    </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { storeToRefs } from 'pinia'

  import { useEntryStore } from '../stores'

  import Nav from '@/Components/Nav.vue'
  import Table from '@/Components/Table.vue'

  const { entries, currentPage, lastPage, loading, error } = storeToRefs(useEntryStore())
  const { fetchEntries, setCurrentPage, deleteEntry } = useEntryStore()

  onMounted(() => {
    fetchEntries()
  })

  function deleteRow(entryId) {
    deleteEntry(entryId)
  }

  function setPage(page) {
    setCurrentPage(page)
    fetchEntries()
  }
</script>

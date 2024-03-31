<template>
    <div>
        <p v-if="loading">Loading posts...</p>
        <p v-if="error">{{ error.message }}</p>
        <Table v-if="entries" :entries @deleteRow="deleteRow" @editRow="editRow"></Table>
        <Nav :currentPage :lastPage :total :from :to @setPage="setPage"></Nav>
    </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia'

  import { useEntryStore } from '../stores'

  import Nav from '@/Components/Nav.vue'
  import Table from '@/Components/Table.vue'

  const router = useRouter();

  const { entries, currentPage, lastPage, total, from, to, loading, error } = storeToRefs(useEntryStore())
  const { fetchEntries, setCurrentPage, deleteEntry } = useEntryStore()

  onMounted(() => {
    fetchEntries()
  })

  function deleteRow(entryId) {
    deleteEntry(entryId)
  }

  function editRow(entryId) {
    router.push({ name: 'formEdit', params: { 'id': entryId } })
  }

  function setPage(page) {
    setCurrentPage(page)
    fetchEntries()
  }
</script>

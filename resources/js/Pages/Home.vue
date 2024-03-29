<template>
    <div>
        <p v-if="loading">Loading posts...</p>
        <p v-if="error">{{ error.message }}</p>
        <Table v-if="entries" :entries @openDeleteModal="openDeleteModal"></Table>
        <Nav :currentPage :lastPage @setPage="setPage"></Nav>
    </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useEntryStore } from '../stores'

  import Nav from '@/Components/Nav.vue'
  import Table from '@/Components/Table.vue'

  const route = useRoute(),
        router = useRouter()
  const { entries, currentPage, lastPage, loading, error } = storeToRefs(useEntryStore())
  const { fetchEntries, setCurrentPage } = useEntryStore()

//   if (route.query['p']) {
//     setPage(route.query['p'])
//   }

  fetchEntries()

  function openDeleteModal(entryId) {
    console.log(entryId)
  }

  function setPage(page) {
    setCurrentPage(page)
    fetchEntries()
    // router.push({ name: 'home', params: { 'p': page } })
  }
</script>

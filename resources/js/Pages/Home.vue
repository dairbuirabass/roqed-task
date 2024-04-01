<template>
  <div>
    <Table v-if="entries" :entries :searchValue="search" @search="submitSearch" @deleteRow="deleteRow"
      @editRow="editRow"></Table>
    <Nav :currentPage :lastPage :total :from :to @setPage="setPage"></Nav>
  </div>
</template>

<script setup>
  import { onBeforeMount, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia'

  import { useEntryStore } from '../stores'

  import Nav from '@/Components/Nav.vue'
  import Table from '@/Components/Table.vue'

  const route = useRoute();
  const router = useRouter();

  const { entries, search, currentPage, lastPage, total, from, to } = storeToRefs(useEntryStore())
  const { fetchEntries, setSearch, setCurrentPage, deleteEntry } = useEntryStore()

  onBeforeMount(() => {
    setSearch(route.query.search)
    fetchEntries()
  })

  onMounted(() => {
    fetchEntries()
  })

  function submitSearch(searchString) {
    setSearch(searchString)
    router.push({ name: 'home', query: { 'search': searchString } })
    fetchEntries()
  }

  function deleteRow(entryId) {
    deleteEntry(entryId)
      .then(() => fetchEntries())
  }

  function editRow(entryId) {
    router.push({ name: 'formEdit', params: { 'id': entryId } })
  }

  function setPage(page) {
    setCurrentPage(page)
    fetchEntries()
  }
</script>

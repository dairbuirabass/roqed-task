<template>
    <div>
        <h1 className="text-xl font-bold underline">Home page</h1>
        <Table :entries="entries"></Table>
    </div>
</template>

<script setup>
    import axios from 'axios'
    import { ref, onMounted } from 'vue'
    import Table from '@/Components/Table.vue'

    const entries = ref([])
    const getEntries = () => {
        axios.get('api/entries')
        .then((res) => {
            entries.value = res.data.data
        })
        .catch(error => console.log(error))
    }

    onMounted(() => getEntries())
</script>

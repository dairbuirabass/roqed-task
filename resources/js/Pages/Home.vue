<template>
    <div>
        <h1 className="text-xl font-bold underline">Home page</h1>
        <ul>
            <li v-for="(entry, index) in entries" :key="index">
                {{ entry.title }}
            </li>
        </ul>
    </div>
</template>

<script setup>
    import axios from 'axios'
    import { ref, onMounted } from 'vue'

    const entries = ref([])
    const getEntries = () => {
        axios.get('api/entries')
        .then(res => entries.value = res.data)
        .catch(error => console.log(error))
    }

    onMounted(() => getEntries())
</script>

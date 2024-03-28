<template>
    <table class="table-auto">
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Size</th>
                <th>Extension</th>
                <th>Path</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(entry, index) in entries" :key="index">
                <td>{{ entry.id }}</td>
                <td>{{ entry.title }}</td>
                <td>{{ entry.size }}</td>
                <td>{{ entry.extension }}</td>
                <td>{{ entry.path }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
const props = defineProps({
    entries: Object,
});
</script>

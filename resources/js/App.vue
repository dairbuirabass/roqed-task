<template>
    <Menu></Menu>
    <router-view v-slot="{ Component, route }">
        <div :key="route.name">
            <Component :is="Component" />
        </div>
    </router-view>
</template>

<script setup>
  import Menu from '@/Components/Menu.vue'
</script>

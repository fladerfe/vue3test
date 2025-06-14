<script setup>
import MyFilter from '@/components/MyFilter.vue'
import MyActiveFilters from '@/components/MyActiveFilters.vue'
import MyForm from '@/components/MyForm.vue'
import MySorting from '@/components/MySorting.vue'

const { tabIndex = 0 } = defineProps(['tabIndex'])
</script>

<template>
  <div class="p-3 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
    <MyForm
      v-if="tabIndex === 0"
    />
    <MySorting
      v-if="tabIndex === 1"
    />
    <MyFilter
      v-if="tabIndex === 2"
    />
    <MyActiveFilters
      v-if="tabIndex === 3"
    />
  </div>
</template>
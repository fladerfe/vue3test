<script setup>
import { computed } from 'vue'
import FiltersString from './FiltersString.vue'

import { useUserStore } from '@/stores/users'

const usersStore = useUserStore()


const filterOptions = usersStore.filterOptions

const isRulesEmpty = computed(() => {
  return !filterOptions.include.length && !filterOptions.exclude.length
})
</script>

<template>
  <h2 v-if="isRulesEmpty">
    There is no active filters
  </h2>
  <div v-else>
    <h2>Active Filters</h2>
    <div  class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table      
        class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">
              Rule
            </th>
            <th scope="col" class="px-6 py-3">
              Value
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <FiltersString 
            v-for="(item, idx) of filterOptions.include"
            :key="item"
            :item="item"
            rule="Include"
            @deleteRule="usersStore.deleteFilter('include', idx)"
          />
          <FiltersString 
            v-for="(item, idx) of filterOptions.exclude"
            :key="item"
            :item="item"
            rule="Exclude"
            @deleteRule="usersStore.deleteFilter('exclude', idx)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>
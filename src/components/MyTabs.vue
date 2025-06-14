<script setup>
const { tabIndex } = defineProps(['tabIndex'])

const tabs = ['Add User', 'Sorting', 'Add Filter', 'Active Filters']
defineEmits(['changeTab'])
</script>

<template>
  <ul class="flex flex-row emd:flex-col w-full emd:w-[200px] md:space-y md:space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400">
    <li
      v-for="(item, idx) of tabs"
      :key="idx"
      @click="$emit('changeTab', idx)"
      class="w-auto emd:w-full inline p-4 border-b-2 emd:border-b-0 emd:border-r-2 border-transparent hover:text-gray-600 hover:border-gray-300 cursor-pointer"
      :class="{'text-blue-600! border-blue-600!': idx === tabIndex}"
        >
        {{ item }}
    </li>
  </ul>
</template>
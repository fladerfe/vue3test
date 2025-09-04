<script setup>
  import { useUserStore } from '@/stores/users'

  const usersStore = useUserStore()
  
  function isBtnActive(param) {
    return !!usersStore.sortBy.find(item => item === param)
  }
</script>


<template>
  <div>
    <h2 class="mb-[10px]">Select the sorting param</h2>
    <div class="inline-flex rounded-md shadow-xs" role="group">
      <button
        v-for="param of usersStore.takeFields"
        :key="param"
        @click="usersStore.setSortOptions(param)"
        type="button"
        class="px-4 py-2 text-sm font-medium text-gray-900 bg-white first:border last:border border-t border-b first:rounded-s-lg last:rounded-e-lg border-gray-200 hover:bg-gray-100 hover:text-blue-700 cursor-pointer"
        :class="{'text-white! bg-blue-700! hover:text-gray-100! hover:bg-blue-800!': isBtnActive(param) }"
      >
        {{ param }}
      </button>
    </div>
    <div class="mt-3" v-if="!usersStore.sortBy.length">Sort order is empty</div>
    <div class="mt-3" v-else>
      <div>Sort order:</div>
      <ul
        class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
        <li
          v-for="(item, idx) of usersStore.sortBy"
          :key="item"
          class="w-full px-4 py-2 border-b border-gray-200 first:rounded-t-lg last:rounded-b-lg flex justify-between"
        >
          <p>{{ `${idx + 1}` }}. {{ item }}</p>
          <button
            @click="usersStore.setSortOptions(item)"
            class="px-1 cursor-pointer text-blue-700">x</button>
        </li>
      </ul>
    </div>
  </div>
</template>
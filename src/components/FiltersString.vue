<script setup>
const { item = {}, rule = ''} = defineProps(['item', 'rule'])
defineEmits(['deleteRule'])
</script>

<template>
  <tr
    class="odd:bg-white align-top even:bg-gray-50 border-b border-gray-200"
  >
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {{ rule }}
    </th>
    <td class="px-6 py-4">
      <p
        v-for="(value, key) in item"
        :key="key"
      >
        <strong>{{ key }}:</strong> {{ value }}
      </p>
    </td>
    <td class="px-6 py-4">
      <button
        @click="$emit('deleteRule')"
        class="font-medium text-blue-600 hover:underline cursor-pointer"
      >
        Delete
      </button>
    </td>
  </tr>
</template>
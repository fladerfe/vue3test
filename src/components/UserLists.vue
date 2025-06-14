<script setup>
import { useUserStore } from '@/stores/users'
const usersStore = useUserStore()
const fields = usersStore.takeFields
</script>

<template>
  <div class="relative overflow-x-auto">
    <h2 v-if="!usersStore.users.length" class="text-center pb-[20px] text-[25px] text-blue-800 font-bold">User list is empty</h2>
    <div v-else>
      <h2 class="text-center pb-[20px] text-[25px] text-blue-800 font-bold">User List</h2>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              v-for="item of fields"
              :key="item"
              scope="col"
              class="px-6 py-3"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <TransitionGroup name="list" tag="tbody">
          <tr
            v-for="user of usersStore.filteredAndSortedUsers"
            :key="user.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <td
                v-for="item of fields"
                :key="`${user.id + user[item]}`"
                class="px-6 py-4"
              >
                {{ user[item] }}
              </td>
          </tr>
        </TransitionGroup>
      </table>
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
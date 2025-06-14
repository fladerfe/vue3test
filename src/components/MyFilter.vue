<script setup>
import { ref, computed, onMounted } from 'vue'

import { useUserStore } from '@/stores/users'

const usersStore = useUserStore()
const fields = usersStore.takeFields

const newRule = ref({
  rule: 'include',
  fields: []
})
const message = ref(null)

function initLine() {
  if (newRule.value.fields.length === fields.length) {
    return
  }
  const activeKeys = newRule.value.fields.map(item => item[0])
  const newField = fields.find(elem => {
    return !activeKeys.includes(elem)
  })
  newRule.value.fields = [...newRule.value.fields, [newField, '']]
}

function submitRule() {
  try {
    const type = newRule.value.rule
    const rule = Object.fromEntries(newRule.value.fields)
    usersStore.addFilter(type, rule)
    newRule.value.fields = []
    initLine()
    message.value = 'The rule has been added, check active filters'
  } catch {
    message.value = 'An error occurred.'
  } finally {
    setTimeout(() => {
      message.value = null
    }, 2500);
  }
}

function deleteLine(idx) {
  newRule.value.fields = [...newRule.value.fields.slice(0, idx), ...newRule.value.fields.slice(idx + 1)]
}

const isAddBtnDisabled = computed(() => {
  return fields.length === newRule.value.fields.length
})
const isDeleteBtnDisabled = computed(() => {
  return newRule.value.fields.length <= 1
})

function isFieldDisabled(item, idx) {
  if (newRule.value.fields[idx][0] === item) {
    return false
  }

  return !!newRule.value.fields.find(key => key[0] === item)
}
onMounted(() => {
  initLine()
})
</script>

<template>
  <div class="h-full">
    <form @submit.prevent="submitRule" class="flex flex-col midsm:flex-row h-full">
      <div>
        <div for="rules" class="block text-sm font-medium text-gray-900 mb-2">Select an rule</div>
        <div class="w-full midsm:w-[150px] mr-[20px] flex flex-row midsm:flex-col justify-between gap-[10px]">
          <select
            v-model="newRule.rule"
            id="rules"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 midsm:mb-[5px]">
            <option selected value="include">Include</option>
            <option value="exclude">Exclude</option>
          </select>
          <button
            :disabled="isAddBtnDisabled"
            @click="initLine"
            type="button"
            class="w-[150px] text-blue-700 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-[5px] py-2.5 midsm:mr-[10px]"
          >Add line</button>
          <button class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-[150px] px-5 py-2.5 text-center cursor-pointer">Add  rule</button> 
        </div>
      </div>      
      <div class="max-w-[530px]">
        <div for="rules" class="block text-sm font-medium text-gray-900 mb-2">Select an field</div>
        <div class="flex w-full flex-wrap">
          <div
            v-for="([key], idx) of newRule.fields"
            :key="key"
            class="w-full mb-[5px] last:mb-0"
          >
            <div class="flex justify-between">
              <select
                v-model="newRule.fields[idx][0]"
                id="rules"
                class="w-[90px] md:w-[120px] mr-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                <option
                  v-for="elem of fields"
                  :key="elem"
                  :value="elem"
                  :disabled="isFieldDisabled(elem, idx)"
                >
                  {{ elem }}
                </option>
              </select>
              <input
                v-model="newRule.fields[idx][1]"
                type="text"
                id="first_name"
                class="w-full md:w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-[10px] md:mr-[30px]"
                placeholder="value"
                required
              />
              <button
                :disabled="isDeleteBtnDisabled"
                @click="deleteLine(idx)"
                type="button"
                class="w-auto text-blue-700 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-[10px] py-2.5"
              >
                Delete
              </button>
            </div>
          </div>
          <h2 v-if="message" class="text-blue-600 mt-[5px]">{{ message }}</h2>
        </div>    
      </div>
    </form>
  </div>
</template>
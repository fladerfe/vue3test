<script setup>
  import { ref, watch } from 'vue'
  import { useUserStore } from '@/stores/users'

  const usersStore = useUserStore()
  const fields = usersStore.config.fields
  const formData = ref({})
  const message = ref(null)
  const maxId = ref(100)

  fields.forEach((key) => {
    formData.value[key.id] = {value: '', error: false}
    watch(() => formData.value[key.id], (newVal) => {
      if (key.validation) {
        formData.value[key.id].error = newVal.value !== '' ? !key.validation(newVal.value) : false
      }     
    }, {deep: true})
  });
  
  function submit() {
    if (validateForm()) return
    try {      
      const newUser = {id: String(maxId.value++)}
      for (let key in formData.value) {
        newUser[key] = formData.value[key].value
        formData.value[key].value = ''
      }
      usersStore.addUser(newUser)
      message.value = 'The user was added successfully.'
    } catch {
      message.value = 'An error occurred.'
    } finally {
      setTimeout(() => {
        message.value = null
      }, 2500);
    }
  }
  function validateForm() {    
    return Object.values(formData.value).some(field => field.error)
  }
</script>

<template>
  <form
    v-on:submit.prevent="submit"
    autocomplete="off"
  >
    <h2>Fill the form</h2>
    <div class="flex w-auto flex-wrap max-w-[700px]">
      <div
        v-for="(value, key) in formData"
        :key="key"
        class="relative z-0 mb-5 group max-w-auto pr-[10px]"
      >
        <input
          v-model="formData[key].value"
          :name="`floating_${key}`"
          :id="`floating_${key}`"
          class="w-[300px] block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          :class="{'border-red-500': formData[key].error}"
          placeholder=""
          required
        />
        <label 
          :for="`floating_${key}`" 
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          :class="{'text-red-500': formData[key].error}"
        >
          {{ key }}
        </label>
      </div>
    </div>
    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center cursor-pointer"
    >
      Add user
    </button>
    <h2 v-if="message" class="mt-[5px] text-blue-600">{{ message }}</h2>
  </form>
</template>
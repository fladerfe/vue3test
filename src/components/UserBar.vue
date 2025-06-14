<script setup>
  import MyTabsContent from '@/components/MyTabsContent.vue'
  import MyTabs from '@/components/MyTabs.vue'
  import { ref } from 'vue'
  
  const tabIndex = ref(0)
</script>

<template>
  <div class="flex flex-col emd:flex-row">
    <MyTabs
      :tab-index="tabIndex"
      @changeTab="val => tabIndex = val"
    />
    <MyTabsContent
      :tab-index="tabIndex"
    />
  </div>
</template>
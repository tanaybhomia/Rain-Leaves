<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SoundCard from '@/components/SoundCard.vue'
import { KeyIcon } from '@heroicons/vue/24/solid'

const soundsByCategory = ref({})

onMounted(async () => {
  try {
    const response = await fetch('/sounds.json')
    if (!response.ok) {
      throw new Error('Failed to load sounds.json')
    }
    const soundsData = await response.json()

    // Grouping sounds by categories
    soundsByCategory.value = soundsData.sounds.reduce((acc, sound) => {
      if (!acc[sound.category]) {
        acc[sound.category] = []
      }
      acc[sound.category].push(sound)
      return acc
    }, {})
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <div class="categories-container align-middle items-center flex flex-col">
    <div
      v-for="(sounds, category) in soundsByCategory"
      :key="category"
      class="category-section text-textPrimary font-heading"
    >
      <h2 class="category-title text-2xl text-textPrimary">{{ category }}</h2>
      <div class="sounds-grid grid grid-cols-3 gap-5 mx-20 my-10">
        <SoundCard v-for="sound in sounds" :key="sound.name" :sound="sound"></SoundCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container for all categories */
.categories-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Individual category section */
.category-section {
  text-align: center;
  margin: 2rem 0;
  font-family: 'Your-Font-Here', sans-serif; /* Replace with your desired font */
}

/* Category title */
.category-title {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-family: 'Source Serif 4';
}

/* Sounds grid */
.sounds-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns for larger screens */
  gap: 1.25rem; /* Gap between cards */
  margin: 2.5rem 5rem; /* Adjust margins to center and add spacing */
}

/* Responsive design adjustments */
@media (max-width: 768px) {
  .sounds-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for medium screens */
    margin: 2rem 3rem; /* Reduce margins */
  }
}

@media (max-width: 480px) {
  .sounds-grid {
    grid-template-columns: 1fr; /* 1 column for small screens */
    margin: 1.5rem 1.5rem; /* Further reduce margins */
  }
}
</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SoundCard from './components/SoundCard.vue'
import HomeView from '@/views/HomeView.vue'
import { ref, provide, onMounted } from 'vue'
</script>

<template>
  <div class="min-h-screen bg-gray-950 relative overflow-hidden">
    <div
      class="herosection flex flex-col items-center gap-10 justify-between rounded-lg py-10 px-5"
    >
      <div class="flex flex-col text-center align-center items-center gap-5 m-20">
        <div
          class="logo bg-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg"
        >
          <span class="text-black font-semibold text-xl">RL</span>
        </div>

        <div class="heading text-2xl text-white font-bold">Rain & Leaves</div>
      </div>
    </div>

    <div class="maincontainer p-10 mx-auto flex flex-col gap-10 max-w-5xl py-5">
      <div class="favourites align-middle text-center">
        <h1 class="text-textPrimary font-heading text-2xl mb-5">Favourites</h1>
      </div>

      <div class="allSounds">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
/***** General Layout Adjustments *****/
:root {
  --spacing-lg: 2rem; /* Large spacing for sections */
  --spacing-md: 1.5rem; /* Medium spacing */
  --spacing-sm: 1rem; /* Small spacing */
}

/***** Gradient Background Styling *****/
.gradient {
  height: 600px;
  width: 600px;
  background: radial-gradient(
    circle,
    rgba(121, 199, 253, 0.2) 0%,
    rgba(119, 221, 119, 0.1) 40%,
    rgba(0, 0, 0, 0) 70%
  );
  border-radius: 50%;
  filter: blur(70px);
}

/***** Hero Section Styling *****/
.herosection {
  padding: var(--spacing-lg) var(--spacing-md); /* Responsive padding */
}

.logo {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: #000;
  border: 2px solid white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/***** Heading Styling *****/
.heading {
  font-size: 2.5rem;
  font-weight: 500;
  color: #fff;
  font-family: 'Source Serif 4';
  text-align: center; /* Center aligns for better appearance */
  margin-bottom: var(--spacing-md);
}

/***** Main Container Styling *****/
.maincontainer {
  max-width: 1200px; /* Centers the content and prevents it from stretching */
  margin: 0 auto; /* Horizontal auto-center */
  padding: var(--spacing-lg) var(--spacing-md);
  box-sizing: border-box; /* Ensures padding is inside the element */
}

.favourites h1 {
  margin-bottom: var(--spacing-sm);
}

.allSounds {
  padding: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

/***** Responsive Adjustments *****/
@media (max-width: 768px) {
  .heading {
    font-size: 2rem;
  }

  .logo {
    height: 48px;
    width: 48px;
    font-size: 1rem;
  }

  .herosection {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-md);
  }

  .maincontainer {
    padding: var(--spacing-md);
  }
}
</style>

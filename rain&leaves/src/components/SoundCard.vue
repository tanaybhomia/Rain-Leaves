<script setup lang="ts">
import { Howler, Howl } from 'howler'
import { ref, onMounted, onUnmounted, watch, markRaw, computed } from 'vue'
import { CloudIcon } from '@heroicons/vue/24/solid'
import { HelpCircle } from 'lucide-vue-next'

const props = defineProps({
  sound: {
    type: Object,
    required: true,
  },
})

const IconComponent = ref(markRaw(HelpCircle))

async function loadIcon() {
  try {
    // Convert icon type to PascalCase for Lucide naming convention
    const iconName = props.sound.icontype
      .split('-')
      .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
      .join('')

    console.log('Attempting to load icon:', iconName) // Debug log

    // Dynamically import icon using the @lucide alias
    const icon = await import(`../../node_modules/lucide-vue-next/dist/esm/icons/${iconName}.js`)

    IconComponent.value = markRaw(icon.default)
    console.log('Icon loaded successfully:', iconName) // Debug log
  } catch (error) {
    console.error('Import error:', error) // Debug log
    IconComponent.value = markRaw(HelpCircle) // Fallback icon
  }
}

const isPlaying = ref(false)
const volume = ref(50)
let soundInstance: Howl | null = null
const isLoaded = ref(false)
const hasError = ref(false)
const isPlayed = ref([])

function initializeSound() {
  if (props.sound?.file && !soundInstance) {
    try {
      soundInstance = new Howl({
        src: [props.sound.file], // Uses path directly from public folder
        volume: volume.value / 100,
        html5: true,
        loop: true,
        format: ['mp3'],
        onload: () => {
          console.log('Sound loaded successfully:', props.sound.name)
          isLoaded.value = true
          hasError.value = false
        },
        onloaderror: (id, error) => {
          console.error('Error loading sound:', error)
          hasError.value = true
          isLoaded.value = false
        },
        onplayerror: (id, error) => {
          console.error('Error playing sound:', error)
          hasError.value = true
          // Try to recover
          if (soundInstance) {
            soundInstance.once('unlock', () => {
              soundInstance?.play()
            })
          }
        },
        onplay: () => {
          isPlaying.value = true
        },
        onpause: () => {
          isPlaying.value = false
        },
        onend: () => {
          isPlaying.value = false
        },
        onstop: () => {
          isPlaying.value = false
        },
      })
    } catch (error) {
      console.error('Error initializing sound:', error)
      hasError.value = true
    }
  }
}

function togglePlay(event: Event) {
  event.preventDefault()

  if (!soundInstance) {
    initializeSound()
    if (!soundInstance) return
  }

  try {
    if (isPlaying.value) {
      soundInstance.pause()
    } else {
      soundInstance.play()
    }
  } catch (error) {
    console.error('Error toggling play state:', error)
    hasError.value = true
  }
}

function handleVolumeChange(event: Event) {
  event.stopPropagation()
  if (soundInstance) {
    soundInstance.volume(volume.value / 100)
  }
}

onMounted(() => {
  // Initialize Howler
  if (!Howler.ctx) {
    Howler.autoUnlock = true
  }

  initializeSound()
  loadIcon()
})

onUnmounted(() => {
  if (soundInstance) {
    soundInstance.unload()
    soundInstance = null
  }
})
</script>

<template>
  <div
    class="maincard p-2"
    @click="togglePlay"
    :class="{
      error: hasError,
      playing: isPlaying,
    }"
  >
    <div class="soundIcon">
      <component
        :is="IconComponent"
        class="w-12 h-12"
        :class="{
          'text-gray-700': !isPlaying,
          'text-green-500': isPlaying,
        }"
        :stroke-width="1.5"
      />
    </div>
    <div class="soundName">
      <p class="text-textPrimary font-sans">{{ sound.name }}</p>
      <p v-if="hasError" class="text-red-500 text-sm">Failed to load sound</p>
    </div>
    <div class="volSlider" @click.stop>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        v-model="volume"
        @input="handleVolumeChange"
        class="slider w-full h-2 bg-gray-300 rounded-lg cursor-pointer accent-green-500"
        :disabled="hasError"
      />
    </div>
  </div>
</template>

<style scoped>
.maincard {
  height: 150px;
  width: 170px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  align-self: center;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
}

.icon-container {
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
}

.icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.maincard.error {
  border-color: #ef4444;
}

.maincard.playing {
  border-color: #e4e4e7;
}

.soundicon {
  transition: all 0.3s ease;
}

.slider {
  appearance: none;
  outline: none;
  width: 120px;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  height: 16px;
  width: 16px;
  background-color: #27272a;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.slider::-moz-range-thumb {
  height: 16px;
  width: 16px;
  background-color: #27272a;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.1);
}

.slider:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.soundName {
  text-align: center;
}
</style>

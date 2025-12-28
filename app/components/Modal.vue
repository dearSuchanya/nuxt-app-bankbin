<template>
  <Teleport to="body">
    <dialog ref="dialogRef" class="modal" :class="{ 'modal-open': modelValue }">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{{ title }}</h3>
        <button @click="close" class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
          <X class="w-4 h-4" />
        </button>
        <div class="py-4">
          <slot />
        </div>
        <div v-if="$slots.footer" class="modal-action">
          <slot name="footer" />
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="close">close</button>
      </form>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: boolean
  title: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const dialogRef = ref<HTMLDialogElement>()

const close = () => {
  emit('update:modelValue', false)
}

onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.modelValue) close()
  }
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => window.removeEventListener('keydown', handleEscape))
})
</script>

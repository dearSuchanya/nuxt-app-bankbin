<template>
  <ClientOnly>
    <Teleport to="body">
      <div class="toast toast-end toast-bottom z-50">
        <TransitionGroup name="toast">
          <div
            v-for="toast in toasts"
            :key="toast.id"
            :class="['alert shadow-lg', alertClasses[toast.type]]"
          >
            <component :is="toastIcons[toast.type]" class="w-5 h-5" />
            <span>{{ toast.message }}</span>
            <button @click="remove(toast.id)" class="btn btn-ghost btn-xs btn-circle">
              <X class="w-3 h-3" />
            </button>
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-vue-next'

const { toasts, remove } = useToast()

const alertClasses: Record<string, string> = {
  success: 'alert-success',
  error: 'alert-error',
  warning: 'alert-warning',
  info: 'alert-info',
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>

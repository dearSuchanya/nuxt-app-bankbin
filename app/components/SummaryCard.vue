<template>
  <div class="card bg-base-100 border border-base-300">
    <div class="card-body p-5">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-base-content/50 uppercase tracking-wider">{{ title }}</p>
          <p class="text-2xl font-bold mt-1">{{ formattedValue }}</p>
          <p v-if="subtitle" class="text-xs text-base-content/40 mt-0.5">{{ subtitle }}</p>
        </div>
        <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', bgClasses[color]]">
          <component :is="icon" :class="['w-5 h-5', iconClasses[color]]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

const props = defineProps<{
  title: string
  value: number | string
  subtitle?: string
  icon: Component
  color?: 'primary' | 'info' | 'success' | 'warning'
  format?: 'number' | 'currency' | 'weight'
}>()

const color = props.color || 'primary'

const formattedValue = computed(() => {
  if (typeof props.value === 'string') return props.value
  
  switch (props.format) {
    case 'currency':
      return `฿${props.value.toLocaleString('th-TH', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
    case 'weight':
      return `${props.value.toLocaleString('th-TH', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} kg`
    default:
      return props.value.toLocaleString('th-TH')
  }
})

const bgClasses: Record<string, string> = {
  primary: 'bg-primary/10',
  info: 'bg-info/10',
  success: 'bg-success/10',
  warning: 'bg-warning/10',
}

const iconClasses: Record<string, string> = {
  primary: 'text-primary',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
}
</script>

// Toast composable for global toast notifications
// Uses process.client check to avoid SSR serialization issues

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

// Store only serializable data
const toastState = reactive<{ items: Toast[] }>({ items: [] })
let toastId = 0

const addToast = (message: string, type: Toast['type'] = 'success', duration = 4000) => {
  if (import.meta.client) {
    const id = ++toastId
    toastState.items.push({ id, message, type })
    
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }
}

const removeToast = (id: number) => {
  const index = toastState.items.findIndex(t => t.id === id)
  if (index > -1) {
    toastState.items.splice(index, 1)
  }
}

export const useToast = () => {
  // Return computed ref for toasts and methods
  const toasts = computed(() => toastState.items)
  
  return {
    toasts,
    success: (message: string) => addToast(message, 'success'),
    error: (message: string) => addToast(message, 'error'),
    warning: (message: string) => addToast(message, 'warning'),
    info: (message: string) => addToast(message, 'info'),
    remove: removeToast,
  }
}

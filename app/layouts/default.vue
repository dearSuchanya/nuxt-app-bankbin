<template>
  <div class="drawer lg:drawer-open">
    <input id="mobile-drawer" type="checkbox" class="drawer-toggle" v-model="mobileMenuOpen" />
    
    <!-- Main Content -->
    <div class="drawer-content flex flex-col min-h-screen bg-base-200">
      <!-- Mobile Header -->
      <header class="lg:hidden fixed top-0 left-0 right-0 z-50 navbar bg-base-100 shadow-sm">
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Recycle class="w-4 h-4 text-primary-content" />
            </div>
            <span class="font-semibold">Waste Bank</span>
          </div>
        </div>
        <div class="flex-none">
          <label for="mobile-drawer" class="btn btn-ghost btn-square drawer-button lg:hidden">
            <Menu class="w-5 h-5" />
          </label>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="pt-16 lg:pt-0 flex-1">
        <div class="p-4 lg:p-8 max-w-7xl mx-auto">
          <slot />
        </div>
      </main>

      <!-- Toast Container -->
      <Toast />
    </div>

    <!-- Drawer Sidebar -->
    <div class="drawer-side z-50">
      <label for="mobile-drawer" class="drawer-overlay"></label>
      <aside class="bg-base-100 w-64 min-h-full flex flex-col border-r border-base-300">
        <!-- Logo -->
        <div class="p-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Recycle class="w-5 h-5 text-primary-content" />
            </div>
            <div>
              <h1 class="font-bold">Waste Bank</h1>
              <p class="text-base-content/50 text-xs">ธนาคารขยะ</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <ul class="menu flex-1 w-full px-4 gap-1">
          <li v-for="item in navItems" :key="item.path" class="w-full">
            <NuxtLink 
              :to="item.path"
              @click="mobileMenuOpen = false"
              :class="[
                'flex items-center gap-3 w-full',
                isActive(item.path) ? 'active bg-primary text-primary-content' : ''
              ]"
            >
              <component :is="item.icon" class="w-5 h-5" />
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Footer -->
        <div class="p-4">
          <div class="text-xs text-base-content/40 px-4">Version 1.0</div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Recycle, LayoutDashboard, Users, Tag, ArrowDownToLine, History, Menu } from 'lucide-vue-next'

const route = useRoute()
const mobileMenuOpen = ref(false)
const { currentTheme, initTheme } = useTheme()

onMounted(() => {
  initTheme()
})

const navItems = [
  { name: 'แดชบอร์ด', path: '/', icon: LayoutDashboard },
  { name: 'จัดการสมาชิก', path: '/members', icon: Users },
  { name: 'ตั้งราคาขยะ', path: '/prices', icon: Tag },
  { name: 'รับฝากขยะ', path: '/deposit', icon: ArrowDownToLine },
  { name: 'ประวัติธุรกรรม', path: '/history', icon: History },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

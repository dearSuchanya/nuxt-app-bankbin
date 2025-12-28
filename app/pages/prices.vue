<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold">ตั้งราคารับซื้อ</h1>
        <p class="text-base-content/50 text-sm mt-0.5">กำหนดราคารับซื้อขยะแต่ละประเภท (บาท/กก.)</p>
      </div>
      <button
        @click="saveAllPrices"
        :disabled="!hasChanges"
        class="btn"
        :class="hasChanges ? 'btn-primary' : 'btn-disabled'"
      >
        <Check class="w-4 h-4" />
        บันทึกทั้งหมด
        <span v-if="changedCount > 0" class="badge badge-sm">{{ changedCount }}</span>
      </button>
    </div>

    <!-- Price List -->
    <div class="card bg-base-100 border border-base-300">
      <div class="divide-y divide-base-200">
        <div 
          v-for="wasteType in wasteTypesStore.wasteTypes" 
          :key="wasteType.id" 
          class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
          :class="editPrices[wasteType.id] !== wasteType.pricePerKg ? 'bg-primary/5' : 'hover:bg-base-50'"
        >
          <!-- Waste Type Info -->
          <div class="flex items-center gap-4 flex-1 min-w-0">
            <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <component :is="getIcon(wasteType.icon)" class="w-5 h-5 text-primary" />
            </div>
            <div class="min-w-0">
              <p class="font-medium truncate">{{ wasteType.name }}</p>
              <p class="text-xs text-base-content/50">{{ wasteType.id }}</p>
            </div>
          </div>

          <!-- Price Input with +/- buttons -->
          <div class="flex items-center gap-2">
            <div class="join">
              <button 
                @click="decreasePrice(wasteType.id)" 
                class="btn btn-square join-item"
                :disabled="(editPrices[wasteType.id] ?? 0) <= 0"
              >
                <Minus class="w-4 h-4" />
              </button>
              <div class="join-item flex items-center px-4 bg-base-100 border border-base-300 min-w-[100px] justify-center">
                <span class="text-base-content/50 mr-1">฿</span>
                <input
                  v-model.number="editPrices[wasteType.id]"
                  type="number"
                  step="0.5"
                  min="0"
                  class="w-16 text-center font-bold text-lg bg-transparent outline-none"
                />
              </div>
              <button 
                @click="increasePrice(wasteType.id)" 
                class="btn btn-square join-item"
              >
                <Plus class="w-4 h-4" />
              </button>
            </div>
            
            <!-- Changed indicator -->
            <div class="w-6 flex justify-center">
              <span 
                v-if="editPrices[wasteType.id] !== wasteType.pricePerKg" 
                class="w-2 h-2 bg-primary rounded-full"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Changed notice -->
    <div v-if="hasChanges" class="alert alert-info">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span class="text-sm">มี {{ changedCount }} รายการที่แก้ไข กดปุ่ม "บันทึกทั้งหมด" เพื่อบันทึก</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Package, Wine, FileText, Cylinder, Wrench, Check, Plus, Minus } from 'lucide-vue-next'
import { useWasteTypesStore } from '~/stores/wasteTypes'

const wasteTypesStore = useWasteTypesStore()
const toast = useToast()

const editPrices = ref<Record<string, number>>({})

onMounted(() => {
  wasteTypesStore.wasteTypes.forEach(w => {
    editPrices.value[w.id] = w.pricePerKg
  })
})

const iconMap: Record<string, any> = {
  'bottle': Package,
  'wine': Wine,
  'file-text': FileText,
  'cylinder': Cylinder,
  'wrench': Wrench,
}

const getIcon = (iconName: string) => iconMap[iconName] || Package

const hasChanges = computed(() => {
  return wasteTypesStore.wasteTypes.some(w => editPrices.value[w.id] !== w.pricePerKg)
})

const changedCount = computed(() => {
  return wasteTypesStore.wasteTypes.filter(w => editPrices.value[w.id] !== w.pricePerKg).length
})

const increasePrice = (id: string) => {
  editPrices.value[id] = (editPrices.value[id] || 0) + 1
}

const decreasePrice = (id: string) => {
  const currentPrice = editPrices.value[id] ?? 0
  if (currentPrice > 0) {
    editPrices.value[id] = currentPrice - 1
  }
}

const saveAllPrices = () => {
  let savedCount = 0
  wasteTypesStore.wasteTypes.forEach(w => {
    const newPrice = editPrices.value[w.id] ?? 0
    if (newPrice !== w.pricePerKg) {
      wasteTypesStore.updatePrice(w.id, newPrice)
      savedCount++
    }
  })
  
  if (savedCount > 0) {
    toast.success(`บันทึกราคา ${savedCount} รายการสำเร็จ`)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold">รับฝากขยะ</h1>
      <p class="text-base-content/50 text-sm mt-0.5">บันทึกการรับซื้อขยะจากสมาชิก</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Form Section -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Step 1: Select Member -->
        <div class="card bg-base-100 border border-base-300">
          <div class="card-body p-5">
            <div class="flex items-center gap-2 mb-4">
              <div class="badge badge-primary badge-lg">1</div>
              <h2 class="font-semibold">เลือกสมาชิก</h2>
            </div>
            
            <select v-model="form.memberId" class="select select-bordered w-full">
              <option value="">-- เลือกสมาชิก --</option>
              <option v-for="member in membersStore.members" :key="member.id" :value="member.id">
                {{ member.name }} ({{ member.id }})
              </option>
            </select>
          </div>
        </div>

        <!-- Step 2: Select Waste Type -->
        <div class="card bg-base-100 border border-base-300">
          <div class="card-body p-5">
            <div class="flex items-center gap-2 mb-4">
              <div class="badge badge-primary badge-lg">2</div>
              <h2 class="font-semibold">เลือกประเภทขยะ</h2>
            </div>
            
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="wasteType in wasteTypesStore.wasteTypes"
                :key="wasteType.id"
                @click="form.wasteTypeId = wasteType.id"
                :class="[
                  'btn btn-outline h-auto py-3 flex-col items-start',
                  form.wasteTypeId === wasteType.id ? 'btn-primary' : ''
                ]"
              >
                <span class="text-sm font-medium">{{ wasteType.name }}</span>
                <span class="text-primary text-sm">฿{{ wasteType.pricePerKg }}/kg</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Step 3: Input Weight -->
        <div class="card bg-base-100 border border-base-300">
          <div class="card-body p-5">
            <div class="flex items-center gap-2 mb-4">
              <div class="badge badge-primary badge-lg">3</div>
              <h2 class="font-semibold">ระบุน้ำหนัก</h2>
            </div>
            
            <div class="join w-full">
              <input
                v-model.number="form.weight"
                type="number"
                step="0.1"
                min="0"
                class="input input-bordered join-item flex-1 text-lg font-semibold"
                placeholder="0.00"
              />
              <span class="btn btn-ghost join-item pointer-events-none">kg</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Section -->
      <div class="lg:col-span-1">
        <div class="card sticky top-20" style="background: oklch(0.283 0.141 291.089); color: white;">
          <div class="card-body p-5">
            <h3 class="card-title text-base mb-4">สรุปรายการ</h3>
            
            <div class="space-y-2 text-sm">
              <div class="flex justify-between py-2 border-b border-white/10">
                <span class="opacity-60">สมาชิก</span>
                <span>{{ selectedMember?.name || '-' }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-white/10">
                <span class="opacity-60">ประเภท</span>
                <span>{{ selectedWasteType?.name || '-' }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-white/10">
                <span class="opacity-60">ราคา</span>
                <span>{{ selectedWasteType ? `฿${selectedWasteType.pricePerKg}/kg` : '-' }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-white/10">
                <span class="opacity-60">น้ำหนัก</span>
                <span>{{ form.weight ? `${form.weight} kg` : '-' }}</span>
              </div>
              <div class="flex justify-between py-3">
                <span class="opacity-60">ยอดรวม</span>
                <span class="text-2xl font-bold">฿{{ calculatedTotal.toFixed(0) }}</span>
              </div>
            </div>
            
            <button
              @click="handleSubmit"
              :disabled="!isFormValid"
              class="btn btn-block mt-4"
              :class="isFormValid ? 'bg-white text-primary hover:bg-white/90 border-0' : 'btn-disabled'"
            >
              ยืนยันธุรกรรม
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMembersStore } from '~/stores/members'
import { useWasteTypesStore } from '~/stores/wasteTypes'
import { useTransactionsStore } from '~/stores/transactions'

const membersStore = useMembersStore()
const wasteTypesStore = useWasteTypesStore()
const transactionsStore = useTransactionsStore()
const toast = useToast()

const form = ref({ memberId: '', wasteTypeId: '', weight: 0 })

const selectedMember = computed(() => membersStore.getMemberById(form.value.memberId))
const selectedWasteType = computed(() => wasteTypesStore.getWasteTypeById(form.value.wasteTypeId))
const calculatedTotal = computed(() => {
  if (!selectedWasteType.value || !form.value.weight) return 0
  return selectedWasteType.value.pricePerKg * form.value.weight
})
const isFormValid = computed(() => form.value.memberId && form.value.wasteTypeId && form.value.weight > 0)

const handleSubmit = () => {
  if (!isFormValid.value || !selectedWasteType.value) return
  transactionsStore.addTransaction(form.value.memberId, form.value.wasteTypeId, form.value.weight, selectedWasteType.value.pricePerKg)
  membersStore.updateBalance(form.value.memberId, calculatedTotal.value)
  toast.success(`บันทึกธุรกรรมสำเร็จ ฿${calculatedTotal.value.toFixed(0)}`)
  form.value = { memberId: '', wasteTypeId: '', weight: 0 }
}
</script>

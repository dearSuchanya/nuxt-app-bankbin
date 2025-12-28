<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold">ประวัติธุรกรรม</h1>
      <p class="text-base-content/50 text-sm mt-0.5">ดูประวัติการรับซื้อขยะทั้งหมด</p>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3">
      <select v-model="filters.memberId" class="select select-bordered select-sm">
        <option value="">สมาชิกทั้งหมด</option>
        <option v-for="member in membersStore.members" :key="member.id" :value="member.id">
          {{ member.name }}
        </option>
      </select>
      <select v-model="filters.wasteTypeId" class="select select-bordered select-sm">
        <option value="">ขยะทุกประเภท</option>
        <option v-for="wasteType in wasteTypesStore.wasteTypes" :key="wasteType.id" :value="wasteType.id">
          {{ wasteType.name }}
        </option>
      </select>
      <button v-if="filters.memberId || filters.wasteTypeId" @click="clearFilters" class="btn btn-ghost btn-sm">
        ล้างตัวกรอง
      </button>
    </div>

    <!-- Transactions -->
    <div class="card bg-base-100 border border-base-300">
      <div class="card-body p-0">
        <div class="p-4 border-b border-base-300 flex items-center justify-between">
          <span class="text-sm text-base-content/50">{{ filteredTransactions.length }} รายการ</span>
          <span class="font-semibold">รวม ฿{{ totalFiltered.toFixed(0) }}</span>
        </div>
        
        <!-- Desktop Table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>รหัส</th>
                <th>วันที่</th>
                <th>สมาชิก</th>
                <th>ประเภท</th>
                <th class="text-right">น้ำหนัก</th>
                <th class="text-right">เงิน</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in filteredTransactions" :key="transaction.id" class="hover">
                <td><span class="font-mono text-xs text-base-content/50">{{ transaction.id }}</span></td>
                <td class="text-base-content/60">{{ formatDate(transaction.timestamp) }}</td>
                <td class="font-medium">{{ getMemberName(transaction.memberId) }}</td>
                <td>
                  <span class="badge badge-primary badge-sm">{{ getWasteTypeName(transaction.wasteTypeId) }}</span>
                </td>
                <td class="text-right">{{ transaction.weight.toFixed(1) }} kg</td>
                <td class="text-right font-semibold">฿{{ transaction.totalAmount.toFixed(0) }}</td>
              </tr>
              <tr v-if="filteredTransactions.length === 0">
                <td colspan="6" class="text-center text-base-content/40 py-12">ไม่พบธุรกรรม</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="md:hidden divide-y divide-base-200">
          <div v-for="transaction in filteredTransactions" :key="transaction.id" class="p-4">
            <div class="flex items-center justify-between mb-2">
              <div>
                <span class="font-medium">{{ getMemberName(transaction.memberId) }}</span>
                <span class="text-xs text-base-content/40 ml-2">{{ transaction.id }}</span>
              </div>
              <span class="font-bold text-primary">฿{{ transaction.totalAmount.toFixed(0) }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <span class="badge badge-primary badge-sm">{{ getWasteTypeName(transaction.wasteTypeId) }}</span>
                <span class="text-base-content/50">{{ transaction.weight.toFixed(1) }} kg</span>
              </div>
              <span class="text-base-content/50">{{ formatDate(transaction.timestamp) }}</span>
            </div>
          </div>
          <div v-if="filteredTransactions.length === 0" class="p-8 text-center text-base-content/40">
            ไม่พบธุรกรรม
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

const filters = ref({ memberId: '', wasteTypeId: '' })

const filteredTransactions = computed(() => {
  let result = transactionsStore.allTransactionsSorted
  if (filters.value.memberId) result = result.filter(t => t.memberId === filters.value.memberId)
  if (filters.value.wasteTypeId) result = result.filter(t => t.wasteTypeId === filters.value.wasteTypeId)
  return result
})

const totalFiltered = computed(() => filteredTransactions.value.reduce((sum, t) => sum + t.totalAmount, 0))
const clearFilters = () => { filters.value = { memberId: '', wasteTypeId: '' } }
const getMemberName = (id: string) => membersStore.getMemberById(id)?.name || '-'
const getWasteTypeName = (id: string) => wasteTypesStore.getWasteTypeById(id)?.name || '-'
const formatDate = (d: string) => new Date(d).toLocaleDateString('th-TH', { day: '2-digit', month: 'short' })
</script>

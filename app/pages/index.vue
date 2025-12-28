<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold">แดชบอร์ด</h1>
      <p class="text-base-content/50 text-sm mt-0.5">ภาพรวมระบบธนาคารขยะ</p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard
        title="สมาชิก"
        :value="membersStore.totalMembers"
        subtitle="คน"
        :icon="Users"
        color="primary"
      />
      <SummaryCard
        title="ขยะรวม"
        :value="transactionsStore.totalWasteCollected"
        format="weight"
        :icon="Recycle"
        color="info"
      />
      <SummaryCard
        title="จ่ายเงิน"
        :value="transactionsStore.totalMoneyPaid"
        format="currency"
        :icon="Banknote"
        color="success"
      />
      <SummaryCard
        title="ธุรกรรม"
        :value="transactionsStore.transactions.length"
        subtitle="รายการ"
        :icon="ClipboardList"
        color="warning"
      />
    </div>

    <!-- Recent Transactions -->
    <div class="card bg-base-100 border border-base-300">
      <div class="card-body p-0">
        <div class="p-5 border-b border-base-300 flex items-center justify-between">
          <h2 class="card-title text-base">ธุรกรรมล่าสุด</h2>
          <NuxtLink to="/history" class="btn btn-ghost btn-sm text-primary">
            ดูทั้งหมด
            <ArrowRight class="w-4 h-4" />
          </NuxtLink>
        </div>

        <!-- Desktop Table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>วันที่</th>
                <th>สมาชิก</th>
                <th>ประเภท</th>
                <th class="text-right">น้ำหนัก</th>
                <th class="text-right">เงิน</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in transactionsStore.recentTransactions" :key="transaction.id" class="hover">
                <td class="text-base-content/60">{{ formatDate(transaction.timestamp) }}</td>
                <td class="font-medium">{{ getMemberName(transaction.memberId) }}</td>
                <td>
                  <span class="badge badge-primary badge-sm">{{ getWasteTypeName(transaction.wasteTypeId) }}</span>
                </td>
                <td class="text-right">{{ transaction.weight.toFixed(1) }} kg</td>
                <td class="text-right font-semibold">฿{{ transaction.totalAmount.toFixed(0) }}</td>
              </tr>
              <tr v-if="transactionsStore.recentTransactions.length === 0">
                <td colspan="5" class="text-center text-base-content/40 py-12">ยังไม่มีธุรกรรม</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="md:hidden divide-y divide-base-200">
          <div v-for="transaction in transactionsStore.recentTransactions" :key="transaction.id" class="p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium">{{ getMemberName(transaction.memberId) }}</span>
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
          <div v-if="transactionsStore.recentTransactions.length === 0" class="p-8 text-center text-base-content/40">
            ยังไม่มีธุรกรรม
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Users, Recycle, Banknote, ClipboardList, ArrowRight } from 'lucide-vue-next'
import { useMembersStore } from '~/stores/members'
import { useWasteTypesStore } from '~/stores/wasteTypes'
import { useTransactionsStore } from '~/stores/transactions'

const membersStore = useMembersStore()
const wasteTypesStore = useWasteTypesStore()
const transactionsStore = useTransactionsStore()

const getMemberName = (memberId: string) => membersStore.getMemberById(memberId)?.name || '-'
const getWasteTypeName = (wasteTypeId: string) => wasteTypesStore.getWasteTypeById(wasteTypeId)?.name || '-'
const formatDate = (d: string) => new Date(d).toLocaleDateString('th-TH', { day: '2-digit', month: 'short' })
</script>

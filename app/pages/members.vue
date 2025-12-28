<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold">จัดการสมาชิก</h1>
        <p class="text-base-content/50 text-sm mt-0.5">ลงทะเบียนและจัดการข้อมูลสมาชิก</p>
      </div>
      <button @click="showAddModal = true" class="btn">
        <Plus class="w-4 h-4" />
        เพิ่มสมาชิก
      </button>
    </div>

    <!-- Members Table -->
    <div class="card bg-base-100 border border-base-300">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>รหัส</th>
              <th>ชื่อ</th>
              <th>โทรศัพท์</th>
              <th class="text-right">ยอดสะสม</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in membersStore.members" :key="member.id" class="hover">
              <td><span class="font-mono text-xs text-base-content/50">{{ member.id }}</span></td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar placeholder">
                    <div class="bg-primary text-primary-content w-8 rounded-full">
                      <span class="text-xs">{{ member.name.charAt(0) }}</span>
                    </div>
                  </div>
                  <span class="font-medium">{{ member.name }}</span>
                </div>
              </td>
              <td class="text-base-content/60">{{ member.phoneNumber }}</td>
              <td class="text-right font-semibold">฿{{ member.totalPoints.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Member Modal -->
    <Modal v-model="showAddModal" title="เพิ่มสมาชิกใหม่">
      <div class="space-y-4">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">ชื่อ-นามสกุล</span>
          </label>
          <input v-model="newMember.name" type="text" class="input input-bordered w-full" placeholder="กรอกชื่อ-นามสกุล" />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">เบอร์โทรศัพท์</span>
          </label>
          <input v-model="newMember.phoneNumber" type="tel" class="input input-bordered w-full" placeholder="081-234-5678" />
        </div>
      </div>
      <template #footer>
        <button @click="showAddModal = false" class="btn btn-ghost">ยกเลิก</button>
        <button @click="handleAddMember" class="btn btn-primary">บันทึก</button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { useMembersStore } from '~/stores/members'

const membersStore = useMembersStore()
const toast = useToast()

const showAddModal = ref(false)
const newMember = ref({ name: '', phoneNumber: '' })

const handleAddMember = () => {
  if (!newMember.value.name || !newMember.value.phoneNumber) return
  membersStore.registerMember(newMember.value.name, newMember.value.phoneNumber)
  toast.success('เพิ่มสมาชิกสำเร็จ')
  newMember.value = { name: '', phoneNumber: '' }
  showAddModal.value = false
}
</script>

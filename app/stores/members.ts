import { defineStore } from 'pinia'

export interface Member {
    id: string
    name: string
    phoneNumber: string
    totalPoints: number
}

export const useMembersStore = defineStore('members', {
    state: () => ({
        members: [
            { id: 'M001', name: 'สมชาย ใจดี', phoneNumber: '081-234-5678', totalPoints: 450 },
            { id: 'M002', name: 'สมหญิง รักษ์โลก', phoneNumber: '082-345-6789', totalPoints: 320 },
            { id: 'M003', name: 'มานะ พากเพียร', phoneNumber: '083-456-7890', totalPoints: 180 },
            { id: 'M004', name: 'วิไล สดใส', phoneNumber: '084-567-8901', totalPoints: 520 },
            { id: 'M005', name: 'ประสิทธิ์ ยั่งยืน', phoneNumber: '085-678-9012', totalPoints: 275 },
        ] as Member[]
    }),

    getters: {
        getMemberById: (state) => (id: string) => {
            return state.members.find(m => m.id === id)
        },
        totalMembers: (state) => state.members.length,
    },

    actions: {
        registerMember(name: string, phoneNumber: string) {
            const newId = `M${String(this.members.length + 1).padStart(3, '0')}`
            this.members.push({
                id: newId,
                name,
                phoneNumber,
                totalPoints: 0
            })
            return newId
        },

        updateBalance(memberId: string, amount: number) {
            const member = this.members.find(m => m.id === memberId)
            if (member) {
                member.totalPoints += amount
            }
        }
    }
})

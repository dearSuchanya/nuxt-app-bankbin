import { defineStore } from 'pinia'

export interface Transaction {
    id: string
    memberId: string
    wasteTypeId: string
    weight: number
    totalAmount: number
    timestamp: string
}

export const useTransactionsStore = defineStore('transactions', {
    state: () => ({
        transactions: [
            { id: 'T001', memberId: 'M001', wasteTypeId: 'W001', weight: 5.5, totalAmount: 27.5, timestamp: '2024-12-20T10:30:00' },
            { id: 'T002', memberId: 'M002', wasteTypeId: 'W003', weight: 8.0, totalAmount: 24, timestamp: '2024-12-21T14:15:00' },
            { id: 'T003', memberId: 'M003', wasteTypeId: 'W004', weight: 2.0, totalAmount: 50, timestamp: '2024-12-22T09:00:00' },
            { id: 'T004', memberId: 'M001', wasteTypeId: 'W002', weight: 10.0, totalAmount: 20, timestamp: '2024-12-23T11:45:00' },
            { id: 'T005', memberId: 'M004', wasteTypeId: 'W001', weight: 12.0, totalAmount: 60, timestamp: '2024-12-24T16:20:00' },
            { id: 'T006', memberId: 'M002', wasteTypeId: 'W005', weight: 3.5, totalAmount: 28, timestamp: '2024-12-25T13:30:00' },
            { id: 'T007', memberId: 'M005', wasteTypeId: 'W003', weight: 15.0, totalAmount: 45, timestamp: '2024-12-26T10:00:00' },
            { id: 'T008', memberId: 'M003', wasteTypeId: 'W001', weight: 7.0, totalAmount: 35, timestamp: '2024-12-26T14:00:00' },
            { id: 'T009', memberId: 'M004', wasteTypeId: 'W004', weight: 4.0, totalAmount: 100, timestamp: '2024-12-27T09:30:00' },
            { id: 'T010', memberId: 'M001', wasteTypeId: 'W005', weight: 6.0, totalAmount: 48, timestamp: '2024-12-27T15:45:00' },
        ] as Transaction[]
    }),

    getters: {
        recentTransactions: (state) => {
            return [...state.transactions]
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .slice(0, 5)
        },
        allTransactionsSorted: (state) => {
            return [...state.transactions]
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        },
        totalWasteCollected: (state) => {
            return state.transactions.reduce((sum, t) => sum + t.weight, 0)
        },
        totalMoneyPaid: (state) => {
            return state.transactions.reduce((sum, t) => sum + t.totalAmount, 0)
        },
        transactionsByMember: (state) => (memberId: string) => {
            return state.transactions.filter(t => t.memberId === memberId)
        },
        transactionsByWasteType: (state) => (wasteTypeId: string) => {
            return state.transactions.filter(t => t.wasteTypeId === wasteTypeId)
        }
    },

    actions: {
        addTransaction(memberId: string, wasteTypeId: string, weight: number, pricePerKg: number) {
            const newId = `T${String(this.transactions.length + 1).padStart(3, '0')}`
            const totalAmount = weight * pricePerKg

            this.transactions.push({
                id: newId,
                memberId,
                wasteTypeId,
                weight,
                totalAmount,
                timestamp: new Date().toISOString()
            })

            return { id: newId, totalAmount }
        }
    }
})

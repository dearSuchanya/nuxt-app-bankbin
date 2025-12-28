import { defineStore } from 'pinia'

export interface WasteType {
    id: string
    name: string
    pricePerKg: number
    icon: string
}

export const useWasteTypesStore = defineStore('wasteTypes', {
    state: () => ({
        wasteTypes: [
            { id: 'W001', name: 'ขวดพลาสติก', pricePerKg: 5, icon: 'bottle' },
            { id: 'W002', name: 'แก้ว/ขวดแก้ว', pricePerKg: 2, icon: 'wine' },
            { id: 'W003', name: 'กระดาษ/กล่องกระดาษ', pricePerKg: 3, icon: 'file-text' },
            { id: 'W004', name: 'กระป๋องอลูมิเนียม', pricePerKg: 25, icon: 'cylinder' },
            { id: 'W005', name: 'เหล็ก/โลหะ', pricePerKg: 8, icon: 'wrench' },
        ] as WasteType[]
    }),

    getters: {
        getWasteTypeById: (state) => (id: string) => {
            return state.wasteTypes.find(w => w.id === id)
        }
    },

    actions: {
        updatePrice(wasteTypeId: string, newPrice: number) {
            const wasteType = this.wasteTypes.find(w => w.id === wasteTypeId)
            if (wasteType) {
                wasteType.pricePerKg = newPrice
            }
        }
    }
})

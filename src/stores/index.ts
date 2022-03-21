import { defineStore } from 'pinia'
import { getApiList } from '@/server'
import type {
    RootObject,
    Children,
    ChinaAdd,
    ChinaTotal,
    StatisGradeCityDetail
} from './type'

export const useStore = defineStore({
    id: 'counter',
    state: () => ({
        list: <RootObject>{},
        item: <Children[]>[],
        chinaAdd: <ChinaAdd>{},
        chinaTotal: <ChinaTotal>{},
        cityDetail: <StatisGradeCityDetail[]>[]
    }),
    actions: {
        async getList() {
            const result = await getApiList()
            this.list = result
            this.cityDetail = this.list.data.statisGradeCityDetail.slice(0, 10)
            this.chinaAdd = this.list.data.diseaseh5Shelf.chinaAdd
            this.chinaTotal = this.list.data.diseaseh5Shelf.chinaTotal
        }
    },
    getters: {}
})

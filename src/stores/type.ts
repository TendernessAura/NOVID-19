export interface ChinaTotal {
    confirm: number
    heal: number
    importedCase: number
    localConfirm: number
    local_acc_confirm: number
    dead: number
    localConfirmH5: number
    nowConfirm: number
    suspect: number
    noInfect: number
    showlocalinfeciton: number
    noInfectH5: number
    nowSevere: number
    showLocalConfirm: number
}

export interface ChinaAdd {
    importedCase: number
    localConfirm: number
    noInfectH5: number
    localConfirmH5: number
    confirm: number
    dead: number
    suspect: number
    noInfect: number
    heal: number
    nowConfirm: number
    nowSevere: number
}

export interface ShowAddSwitch {
    nowSevere: boolean
    localConfirm: boolean
    all: boolean
    confirm: boolean
    dead: boolean
    heal: boolean
    localinfeciton: boolean
    suspect: boolean
    nowConfirm: boolean
    importedCase: boolean
    noInfect: boolean
}

export interface Today {
    confirm: number
    isUpdated: boolean
}

export interface Total {
    showRate: boolean
    heal: number
    showHeal: boolean
    wzz: number
    provinceLocalConfirm: number
    nowConfirm: number
    confirm: number
    dead: number
}

export interface Today {
    confirm: number
    confirmCuts: number
    isUpdated: boolean
    tip: string
    wzz_add: number
}

export interface Total {
    wzz: number
    provinceLocalConfirm: number
    nowConfirm: number
    confirm: number
    dead: number
    showRate: boolean
    heal: number
    showHeal: boolean
}

export interface Today {
    confirm: number
    confirmCuts: number
    isUpdated: boolean
}

export interface Total {
    dead: number
    showRate: boolean
    heal: number
    showHeal: boolean
    wzz: number
    provinceLocalConfirm: number
    nowConfirm: number
    confirm: number
}

export interface Children {
    name: string
    today: Today
    total: Total
}

export interface Children {
    name: string
    today: Today
    total: Total
    children: Children[]
}

export interface AreaTree {
    name: string
    today: Today
    total: Total
    children: Children[]
}

export interface Diseaseh5Shelf {
    lastUpdateTime: string
    chinaTotal: ChinaTotal
    chinaAdd: ChinaAdd
    isShowAdd: boolean
    showAddSwitch: ShowAddSwitch
    areaTree: AreaTree[]
}

export interface StatisGradeCityDetail {
    province: string
    confirmAdd: number
    confirm: number
    heal: number
    grade: string
    date: string
    city: string
    nowConfirm: number
    dead: number
    sdate: string
    syear: number
}

export interface Data {
    diseaseh5Shelf: Diseaseh5Shelf
    statisGradeCityDetail: StatisGradeCityDetail[]
}

export interface RootObject {
    ret: number
    info: string
    data: Data
}

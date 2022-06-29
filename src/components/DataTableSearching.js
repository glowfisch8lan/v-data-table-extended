/**
 * @class DataTableSort Данный класс используется сортировки
 */
export default class DataTableOptions {
    constructor(config) {
            this.search = null
            this.enable = config?.enable ?? true
    }
}
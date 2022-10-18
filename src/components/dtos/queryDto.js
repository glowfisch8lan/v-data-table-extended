import DataTableSearching from '../DataTableSearching'

export default class QueryDto {
    constructor(params) {
        this.options = params?.options || []
        this.sorting = params?.sorting || []
        this.searching = params?.searching || new DataTableSearching({
            enable: false
        })
        this.filters = params?.filters || []
    }

    static build(params) {
        return new QueryDto(params)
    }
}
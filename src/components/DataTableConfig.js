export default class DataTableConfig {
    constructor(config) {
        this.actions = {
            edit: config?.actions?.edit ?? false,
            delete: config?.actions?.delete ?? false,
            view: config?.actions?.view ?? false,
            create: config?.actions?.create ?? false,
            deleteAll: config?.actions?.deleteAll ?? false,
            editAll: config?.actions?.editAll ?? false,
            checkbox: config?.actions?.checkbox ?? false,
        }
        this.settings = {
            enable: config?.settings?.enable ?? false
        }

        /*        this.search = config?.search.show || false
                this.globalSearch = config?.search.globalSearch || false*/
    }
}
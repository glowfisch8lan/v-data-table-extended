/**
 * @class DataTableOptions Данный класс используется для передачи данных пагинации в компонент таблицы
 */
export default class DataTableOptions
{
    constructor(options) {
        this.totalItems = options?.totalItems ?? 0
        this.totalPages = options?.totalPages ?? 0
        this.page = options?.page ?? 1
        this.itemsPerPage = options?.itemsPerPage ?? 20
    }
}
import DataTableOptions from "../DataTableOptions";


/**
 * С помощью данного миксина настраиваем дополнительные возможности таблицы. Под опциями в данном контексте следует понимать отображение компонента
 */
export default {
    props: {
        perPage: {
            type: Number,
            default: null
        }
    },
    created() {
        if (this.perPage) {
            this.dto.options.itemsPerPage = this.perPage
        }
    },
    computed: {
        settings() {
            return {
                dense: false,
            }
        },
    },
}
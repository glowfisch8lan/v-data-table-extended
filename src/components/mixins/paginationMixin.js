/**
 * С помощью данного миксина осуществляется пагинация
 */
export default {
    props: {
        pagination: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        itemsPerPage() {
            return this.dto.options.itemsPerPage
        },
        page: {
            get() {
                return this.dto.options.page;
            },
            set(newValue) {
                this.dto.options.page = newValue
            }
        },
    },
    watch: {
        /** Страница должна обновляться постоянно */
        page() {
            this.update()
        },
    },
    methods: {
        refresh(resetPage) {
            if (resetPage) {
                this.dto.options.page = 1
            }
            this.update()
        }
    }
}
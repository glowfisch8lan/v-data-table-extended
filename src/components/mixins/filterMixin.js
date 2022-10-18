export default {
    props: {
        opacityFilter: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        filterFunc(field, value) {
            if (this.inFilter(field, value)) {
                this.dto.filters = this.dto.filters.filter((filter) => {
                    return filter.value !== value && filter.type !== field
                })
            } else {
                let filter = {};
                filter.field = field
                filter.value = value
                this.dto.filters.push(filter)
            }
            this.dto.options.page = 1;
            this.update()
        },
        inFilter(field, value) {
            let a = this.dto.filters.find((filter) => {
                return filter.value === value && filter.field === field
            })
            return Boolean(a ?? false);
        },
        isOpacityFiltered(item) {
            if (this.opacityFilter.length === 0) {
                return false;
            }
            return this.opacityFilter.find((id) => item.id === id)
        }
    }
}
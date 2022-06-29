import DataTableSort from '../DataTableSort'
export default {
    props: {
        sort: {
            type: Boolean,
            default: false
        },
/*        sorting:{
            type: Object,
            default: () => new DataTableSort()
        },*/
    },
    data() {
        return {
            sorting: new DataTableSort()
        }
    },
    watch: {
        sorting: {
            handler(){
                this.dto.sorting = this.sorting
            },
            deep: true,
        }
    },
    methods: {
        sortBy(header) {

            if (this.sort === false) {
                return;
            }

            if (header.sort === false) {
                return;
            }

            if (!this.api) {
                console.log('API отключен')
                return;
            }

            let field = header.value
            if (this.sorting.sortRow !== field) {
                this.sorting.sortType = null
                this.sorting.sortRow = null;
            }

            switch (this.sorting.sortType) {
                case null:
                    this.sorting.sortType = 'asc'
                    this.sorting.sortRow = field;
                    break;
                case 'asc':
                    this.sorting.sortType = 'desc'
                    this.sorting.sortRow = field;
                    break;
                case 'desc':
                    this.sorting.sortType = null
                    this.sorting.sortRow = null;
                    break;
            }

            this.update()
        },
    }
}
import DataTableSearching from '../DataTableSearching'

export default {
    props: {
        search:{
            type: Boolean,
            default: false
        },
    },
    methods: {
        searchGlobal() {
            this.page = 1
            this.$emit('search', this.searching);
            this.update()
            /*this.dto.searching.search = null*/

        }
    }
}
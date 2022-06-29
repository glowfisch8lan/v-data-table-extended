import DataTableOptions from "../DataTableOptions";


/**
 * С помощью данного миксина настраиваем дополнительные возможности таблицы. Под опциями в данном контексте следует понимать отображение компонента
 */
export default {
    props: {
/*        options: {
            type: Object,
            default: () => new DataTableOptions()
        },*/
    },
    data() {
        return {
            settingsOpen: false,
        }
    },
    created() {
        /*        let options = localStorage.getItem('options-'+this.$route.name)
                if (options) {
                    this.$emit('optionsUpdate', JSON.parse(options))
                }*/
    },
    computed: {
        settings() {
            return {
                dense: false,
                /*        editableHeader: this.useEditableHeader,*/
            }
        },
    },
    watch: {
        options: {
            handler() {
                /*                if (this.settingsOpen) {
                                    localStorage.setItem('options-'+this.$route.name, JSON.stringify(this.options));
                                }*/
            },
            deep: true
        },
    },
}
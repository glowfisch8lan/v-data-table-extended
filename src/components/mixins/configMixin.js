import DataTableConfig from "../DataTableConfig";

export default {
    props: {
        config: {
            type: Object,
            default: () => new DataTableConfig()
        }
    },
    data() {
        return {
            actions: this.config.actions,
        }
    },
}
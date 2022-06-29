export default {
    props: {
        actionsWidth: {
            type: String,
            default: '250px'
        }
    },
    created() {
        if (this.config.actions ?? false) {
            this.actions = this.config.actions
        }
    },
    data() {
        return {
            actions: {},
            dialogEditAllOpen: false
        }
    },
    methods: {
        getActionsWidth() {
            //todo сделать автокалькулятор ширины
            return this.actionsWidth
        },
        deleteItem(item, deleteMode) {
            if (deleteMode) {
                this.$emit('click-delete', item)
                this.dialogDeleteConfirm = false;
                return;
            }
            this.itemDelete = item;
            this.dialogDeleteConfirm = true;
        },
        editItem(item) {
            this.$emit('click-edit', item)
        },
        viewItem(item) {
            this.$emit('click-view', item)
        },
        createItem() {
            this.$emit('click-create')
        },
        editAllOpenDialog() {
            this.dialogEditAllOpen = true
        },
        editAllCloseDialog() {
            this.dialogEditAllOpen = false
        }
    }
}
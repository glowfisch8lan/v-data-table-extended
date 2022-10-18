export default {
    props: {
        checkbox: {
            type:Object,
            default: null
        }
    },
    methods: {
        selectAllCheckbox() {
            if (this.isSelectedAllCheckbox) {
                this.checkbox.ids = []
            } else {
                this.checkbox.ids = this.data.map((item) => item.id)
            }
        },
        requireCheckbox() {
            if (!this.isEnableCheckbox) {
                throw new Error('Необходимо включить чекбоксы!');
            }
            return true;
        }
    },
    computed: {
        isSelectedAllCheckbox() {
            return this.checkbox.ids.length === this.data.length;
        },
        isEnableCheckbox() {
            return this.checkbox !== null
        }
    }
/*    computed: {
        checkboxSelected() {
            return this.checkboxModels;
        }
    },
    data() {
        return {
            checkboxSelectedAll: false,
        }
    },
    watch: {
        checkboxModels() {
            /!*      if (this.checkboxModels.length === this.data.length) {
                    this.checkboxSelectedAll = true;
                  } else {
                    this.checkboxSelectedAll = false;
                  }*!/
        }
    }*/
}
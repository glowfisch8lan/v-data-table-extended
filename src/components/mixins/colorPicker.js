export default {
    methods: {
        getColor(int) {

            switch (int) {
                case 1:
                    return 'blue darken-2';
                case 2:
                    return 'red darken-3'
                case 3:
                    return 'deep-orange darken-1'
                default:
                    return 'blue-grey darken-1'
            }
        },
        getPallet() {
            return [
                {
                    id: 1,
                    color: 'Синий'
                },
                {
                    id: 2,
                    color: 'Красный'
                },
                {
                    id: 3,
                    color: 'Оранжевый'
                },
            ]
        }
    }
}
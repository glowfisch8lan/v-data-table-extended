Данный компонент расширяет основные возможности Vuetify и предоставляет удобный RAD способ формирования кастомизированной таблицы
Для работы компонента требуется Vuex и созданная шина событий Vue

Props:
````
:table-title="" Заголовок таблицы
disable-overflow-loading - отключить прелоадер встроенный
````
1. Минимальный набор для отображения данных

````
<template>
    ...
        <v-data-table-extended
            :headers="headers"
            :data="data"
            :config="dataTableConfig"
        >
        </v-data-table-extended>
    ...
</template>
````

````
<script>
import {VDataTableExtended, Config} from 'v-data-table-extended';
export default {
    ...
    components: {
        VDataTableExtended
    },
    ...
    date() {
        return {
        ...
              headers: [ {text: '#',value: 'id'} ],
              data: [ {id: 1} ],
              dataTableConfig: new Config({
                    store: this.$store,
                    eventBus: this.$eventBus
              }),
        ...
        }
    }
</script>
````
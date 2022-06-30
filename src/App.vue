<template>
  <v-container>
    <data-table-component
        :headers="headers"
        :data="data"
        :config="dataTableConfig"
    >
    </data-table-component>
  </v-container>
</template>

<script>
import DataTableComponent from '../dist/v-data-table-extended.esm';
import {Config} from '../dist/v-data-table-extended.esm';

export default {
  name: 'App',
  components: {
    DataTableComponent
  },
  computed: {
    headers() {
      return [
        {
          text: '',
          value: 'checkbox'
        },
        {
          text: '#',
          value: 'id',
          width: '10'
        },
        {
          text: 'Наименование',
          value: 'name',
        },
        {
          text: 'Теги',
          value: 'tags',
          sort: false,
          filters: this.tags
        },
        {
          text: '',
          value: 'actions'
        }
      ]
    }
  },
  data() {
    return {
      data: [
        {
          id: 1,
          name: 'Товар',
          tags: 1,
        }
      ],
      dataTableConfig: new Config({
        store: this.$store,
        eventBus: this.$eventBus
      }),
    }
  },
};
</script>

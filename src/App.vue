<template>
  <v-app>
      <v-container>
        <v-data-table-extended
            :headers="headers"
            :data="data"
            disable-title
            :config="dataTableConfig"
            expanded-enable
        >
          <template v-slot:expanded="{ item }">
            <div>
              Счета
            </div>
          </template>
        </v-data-table-extended>
      </v-container>
  </v-app>
</template>

<script>
import {VDataTableExtended, Config, VDataTableExtendedCheckbox} from '../dist/v-data-table-extend.esm'
//import VDataTableExtended from '../src/components/DataTableComponent';
//import Config from '../src/components/DataTableConfig'

export default {
  name: 'App',
  components: {
   VDataTableExtended
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
          width: '10',
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
        },
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
          expanded: {
            id: 1,
            name: 'name',
            img: 'https://avatars.mds.yandex.net/i?id=38b9cde70eb2765b85c65a9fe18c35c8-5115383-images-thumbs&n=13&exp=1'
          }
        }
      ],
      dataTableConfig: new Config({
        actions: {
          create: true,
          delete: true,
          edit: true
        },
        settings: {
          enable: true
        },
        store: this.$store,
        eventBus: this.$eventBus
      }),
    }
  },
};
</script>

<template>
  <div>
      <v-card class="d-flex" flat>
        <h2 class="pl-2" v-if="!disableTitle">{{ tableTitle }}</h2>

        <v-spacer></v-spacer>
        <div style="width:25vw">
          <v-text-field
              v-if="search"
              v-model="dto.searching.search"
              prepend-icon="mdi-magnify"
              label="Поиск"
              hide-details
              @keyup.enter="searchGlobal()"
          >
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon
                         @click="searchGlobal"
                         v-bind="attrs"
                         v-on="on">
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </template>
                <span>Глобальный поиск</span>
              </v-tooltip>
            </template>
          </v-text-field>
        </div>

        <div class="d-flex align-end">
          <div v-if="config.settings.enable">
            <v-btn icon @click="settingsOpen = !settingsOpen">
              <v-icon>mdi-cogs</v-icon>
            </v-btn>
            <!--  Настройки  -->
            <v-dialog
                transition="dialog-top-transition"
                max-width="600"
                v-model="settingsOpen"
            >
              <template v-slot:default="settingsOpen">
                <v-card>
                  <v-toolbar
                      dark
                      color="primary"
                  >Настройки
                  </v-toolbar>
                  <v-card-text>
                    <div class="text-h2 pa-12">
                      <!--                    <v-checkbox
                                              label="Компактно"
                                              v-model="settings.dense"
                                          ></v-checkbox>-->
                      <!--                    <v-checkbox
                                              label="Редактируемая шапка"
                                              v-model="settings.editableHeader"
                                          ></v-checkbox>-->
                      <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="6"
                        >
                          <v-select
                              v-if="!perPage"
                              :items="[5,10,15,20,50,100]"
                              v-model="dto.options.itemsPerPage"
                              @change="refresh(true)"
                              label="Кол-во записей на странице"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <slot name="settings"></slot>
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <!--                  <v-btn
                                          color="primary"
                                          text
                                          @click="saveSettings"
                                      >
                                        <v-icon>mdi-content-save</v-icon>
                                        Сохранить
                                      </v-btn>-->
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </div>
        </div>
      </v-card>
      <!-- :search="dto.searching.search" убрал так как поиск должен быть только глобальным без внутренней выборки-->
      <v-data-table
          class="elevation-1 mt-4"
          :headers="headers || []"
          :items="data || []"
          :loading="loading"

          :items-per-page="itemsPerPage"
          :dense="settings.dense"
          hide-default-header
          hide-default-footer

          :key="uiKey"
      >
        <!--Template при отсутствии данных в таблице-->
        <template v-slot:no-data>
          <div><span v-if="!loading">Нет данных</span></div>
        </template>

        <template v-slot:no-results>
          <span v-if="!loading">Не найдено</span>
        </template>

        <template v-slot:progress>
          <v-overlay :value="loading" v-if="!disableOverflowLoading">
            <v-progress-circular
                indeterminate
                size="128"
            ></v-progress-circular>
          </v-overlay>
        </template>

        <!--Template шапки таблицы - Десктопные устройства-->
        <template v-slot:header="{ props: { headers } }" v-if="isLargeDesktop || isDesktop">
          <thead>
          <tr>
            <!--Checkbox-->
            <template v-if="isEnableCheckbox">
              <th :width="10">
                <v-checkbox :value="isSelectedAllCheckbox" @change="selectAllCheckbox"></v-checkbox>
              </th>
            </template>
            <!--Основные ячейки-->
            <template v-for="(h, index) in headers">
              <th v-if="(h.enable ||  typeof h.enable === 'undefined') && h.text.length > 0"
                  :key="index">

                <portal :to="`header` + index" :disabled="true">
                  <slot name="header" v-bind:header="h">

                    <!--Всплывающая подсказка-->
                    <v-tooltip bottom :disabled="h.tooltip ||  typeof h.tooltip !== 'undefined'">

                      <template v-slot:activator="{ on, attrs }">
                        <div
                            v-bind="attrs" v-on="on"
                            class="v-list-item--link d-inline"
                        >
                          <!--Сортировка-->
                          <div @click="sortBy(h)">
                            <span v-html="settings.dense ? truncate(h.text ,10, '...') : h.text"></span>
                            <v-icon small v-if="sorting.sortRow === h.value">
                              {{
                                (sorting.sortType === 'asc') ? 'mdi-sort-bool-ascending' : 'mdi-sort-bool-descending'
                              }}
                            </v-icon>
                          </div>
                          <!--Фильтрация-->
                          <v-menu offset-y :close-on-content-click="false"
                                  v-if="h.filters ||  typeof h.filters !== 'undefined'">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon x-small v-bind="attrs" v-on="on">
                                <v-icon>mdi-filter</v-icon>
                              </v-btn>
                            </template>

                            <v-card elevation="0" class="white pa-2" max-width="20vw">
                              <v-chip
                                  :color="inFilter(h.value, filter.value) ? getColor(filter.color_id) : 'grey lighten-1'"
                                  text-color="white"
                                  class="ml-2 mt-2"
                                  v-for="(filter, hindex) in h.filters"
                                  :key="hindex"
                                  filter @click="filterFunc(h.value, filter.value)">{{ filter.text }}
                              </v-chip>
                            </v-card>

                          </v-menu>
                        </div>
                      </template>

                      <div class="pa-2 text-center" style="max-width:250px">
                        <span v-html="h.text"></span>
                      </div>

                    </v-tooltip>
                  </slot>
                </portal>


                <v-edit-dialog v-if="false">
                  <portal-target :name="`header` + index"></portal-target>
                  <template v-slot:input>
                    <v-text-field v-model="h.text"></v-text-field>
                  </template>
                </v-edit-dialog>

              </th>
            </template>
            <!--Кнопки-действия - убрать в компонент-->
            <th v-if="Object.values(actions).find((item) => item === true)" :width="getActionsWidth">
              <v-col class="text-right">
                <slot name="actions.create" v-if="actions.create">
                  <v-btn icon small @click="createItem" class="mr-1">
                    <v-icon>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                  <!--                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn icon small class="mr-1" v-bind="attrs" v-on="on">
                                        <v-icon>
                                          mdi-dots-vertical
                                        </v-icon>
                                      </v-btn>
                                    </template>
                                    <v-list>
                                      <v-list-item>
                                        <v-list-item-content>
                                          <v-btn text>
                                            <v-icon>
                                              mdi-format-list-group
                                            </v-icon>
                                            Пакетное изменение
                                          </v-btn>
                                        </v-list-item-content>
                                      </v-list-item>
                                    </v-list>
                                  </v-menu>-->


                </slot>

                <v-btn icon v-if="actions.editAll && requireCheckbox()" @click="editAllOpenDialog"
                       :disabled="checkbox.ids.length === 0">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>

                <v-btn icon v-if="actions.deleteAll && requireCheckbox()" :disabled="checkbox.ids.length === 0">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
                <slot name="header.action.append"></slot>
              </v-col>
            </th>
          </tr>
          </thead>
        </template>

        <!--Template шапки таблицы - Мобильные устройства-->
        <template v-slot:header="{ props: { headers } }" v-else>
          <div v-if="Object.values(actions).find((item) => item === true)" :width="getActionsWidth">
            <v-col class="text-right">
              <slot name="actions.create" v-if="actions.create">
                <v-btn icon small @click="createItem" class="mr-1">
                  <v-icon>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </slot>
              <v-btn icon small v-if="actions.deleteAll">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
              <slot name="header.action.append"></slot>
            </v-col>
            <v-divider></v-divider>
          </div>
        </template>

        <!--Template содержимого таблицы - Десктопные устройства-->
        <template v-slot:item="{ item, index, headers }" v-if="isLargeDesktop || isDesktop">
          <template v-show="!loading" :class="{ 'opacity' : isOpacityFiltered(item) }">
            <tr>
              <td v-if="isEnableCheckbox">
                <v-checkbox v-model="checkbox.ids" multiple :value="item.id"></v-checkbox>
              </td>
              <template v-for="header in Object.values(headers)">
                <td :width="header.width" :key="header.id" v-if="(header.enable || true) && header.text.length > 0">
                  <slot name="column" v-bind:item="item" v-bind:header="header">
                    <v-tooltip bottom :disabled="header.tooltip ||  typeof header.tooltip !== 'undefined'">
                      <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on">
                          <div
                              v-html="settings.dense ? truncate(_.get(item, header.value, '') ,15, '...') : _.get(item, header.value, '')"></div>
                        </div>
                      </template>
                      <div class="pa-2 text-center" style="max-width:250px">
                        <span v-html="_.get(item, header.value, '')"></span>
                      </div>
                    </v-tooltip>
                  </slot>
                </td>
              </template>
              <td v-if="Object.values(actions).find((item) => item === true) || expandedEnable"
                  :width="getActionsWidth">
                <v-col class="text-right">
                  <slot name="action.prepend" v-bind:item="item"></slot>
                  <v-btn icon color="green darken-3" class="mr-1"
                         v-if="actions.view"
                         @click="viewItem(item)">
                    <v-icon>
                      mdi-eye
                    </v-icon>
                  </v-btn>
                  <v-btn icon color="primary" class="mr-1" v-if="actions.edit" @click="editItem(item)">
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  <v-btn icon color="red darken-3" v-if="actions.delete" @click="deleteItem(item)">
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                  <slot name="action.append" v-bind:item="item"></slot>
                  <v-btn icon @click="expand(item, index)" v-if="expandedEnable">
                    <v-icon v-if="isExpanded(index)">mdi-menu-up</v-icon>
                    <v-icon v-else>mdi-menu-down</v-icon>
                  </v-btn>
                </v-col>
              </td>
            </tr>
            <tr v-show="expandedEnable && isExpanded(index)">
              <td :colspan="headers.length + 1">
                <slot name="expanded" v-bind:item="item"></slot>
              </td>
            </tr>
          </template>

          <!--        <tr>
                    <v-card elevation="0">
                      <v-card-text>
                        <image-viewer :item=""></image-viewer>
                      </v-card-text>
                    </v-card>
                  </tr>-->

        </template>
        <!--Template содержимого таблицы - Мобильные устройства-->
        <template v-slot:item="{ item, index, headers }" v-else>
          <v-card class="mb-6">
            <v-card-text>
              <template v-for="header in Object.values(headers)">
                <div :width="header.width" :key="header.id" v-if="(header.enable || true) && header.text.length > 0">
                  <slot name="column" v-bind:item="item" v-bind:header="header">
                    <div>
                      <strong>{{ header.text }}:</strong>
                      <span v-html="_.get(item, header.value, '')"></span>
                    </div>
                  </slot>
                </div>
              </template>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions>
              <div v-if="Object.values(actions).find((item) => item === true)" :width="getActionsWidth">
                <v-col class="text-right">
                  <slot name="action.prepend" v-bind:item="item"></slot>
                  <v-btn icon color="green darken-3" class="mr-4"
                         v-if="actions.view"
                         @click="viewItem(item)">
                    <v-icon>
                      mdi-eye
                    </v-icon>
                  </v-btn>
                  <v-btn icon color="primary" class="mr-4" v-if="actions.edit" @click="editItem(item)">
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  <v-btn icon color="red darken-3" v-if="actions.delete" @click="deleteItem(item)">
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                  <slot name="action.append" v-bind:item="item"></slot>
                </v-col>
              </div>
            </v-card-actions>
          </v-card>
        </template>

        <!--Template добавление данных перед содержимым таблиццы-->
        <template v-slot:body.prepend="{ headers, items }">
          <slot name="body.prepend" v-bind:headers="headers" v-bind:items="items"></slot>
        </template>
        <!--Template добавление данных после содержимым таблиццы-->
        <template v-slot:body.append="{ headers, items }">
          <slot name="body.append" v-bind:headers="headers" v-bind:items="items">
          </slot>
        </template>

      </v-data-table>
      <!--Пагинатор-->
      <div class="text-center pt-2 pb-2" v-if="pagination && dto.options.totalPages > 0">
        <v-pagination
            v-model="dto.options.page"
            total-visible="10"
            :disabled="loading"
            :length="dto.options.totalPages"
        ></v-pagination>
      </div>
      <!--Диалоговое окно подтверждения удаления записи-->
      <v-dialog v-model="dialogDeleteConfirm" max-width="290">
        <v-card>
          <v-card-title class="text-h5">Удаление</v-card-title>
          <v-card-text>Вы действительно хотите удалить?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="darken-1"
                text
                @click="dialogDeleteConfirm = false"
            >
              Нет
            </v-btn>
            <v-btn
                color="red darken-1"
                text
                @click="deleteItem(itemDelete, true)"
            >
              Да
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--Диалоговое окно редактирования всех записей-->
      <v-dialog v-model="dialogEditAllOpen" max-width="768vh">
        <v-card>
          <v-card-title class="text-h5"></v-card-title>
          <v-card-text>
            <slot name="action.edit-all.text"></slot>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
/**
 * headers: {
 * text: '#',
 * value: 'id',
 * width: '25px',
 * enable: false|true,
 * tooltip: false|true,
 * },
 *
 *
 *
 *  Props:
 * @property {array} this.data - required
 * @property {array} this.headers - required
 * @property  {boolean} this.loading  - required
 * @property {boolean} this.dense
 * @property {boolean} this.actionsWidth Ширина колонки с кнопками
 * @typedef  {DataTableConfig}  this.config - Конфигурация таблицы
 * @typedef  {string}  this.table-title - Заголовок таблицы
 *
 * Events:
 * @event click-view -
 * @event click-edit -
 * @event click-delete -
 * @event click-deleteAll -
 * @event click-create -
 * @event update - Получение новых данных при пагинации
 * @event search(value) Поиск через API
 * Для работы следует в компоненте, где используется таблица создать свойства filters (объект класа Filters)
 *
 */

import searchingMixin from "./mixins/searchingMixin";
import actionsMixin from "./mixins/actionsMixin";
import sortMixin from "./mixins/sortMixin";
import deleteMixin from "./mixins/deleteMixin";
import truncateMixin from "./mixins/truncateMixin";
import lodashMixin from "./mixins/lodashMixin";
import paginationMixin from "./mixins/paginationMixin";
import configMixin from "./mixins/configMixin";
import optionsMixin from "./mixins/optionsMixin";
import breakpointMixin from "./mixins/breakpointMixin";
import QueryDto from "./dtos/queryDto";
import checkboxMixin from "./mixins/checkboxMixin";
import filterMixin from "./mixins/filterMixin";
import DialogEditAll from './components/DialogEditAll.vue'
import colorPicker from "./mixins/colorPicker";
import settingsMixin from "./mixins/settingsMixin";


export default {
  name: "List",
  components: {DialogEditAll},
  mixins: [
    configMixin,
    searchingMixin,
    optionsMixin,
    breakpointMixin,
    lodashMixin,
    sortMixin,
    deleteMixin,
    truncateMixin,
    paginationMixin,
    actionsMixin,
    checkboxMixin,
    filterMixin,
    colorPicker,
    settingsMixin

  ],
  props: {
    tableTitle: {
      type: String,
      default: 'Таблица'
    },
    disableOverflowLoading: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    },
    api: {
      type: Boolean,
      default: false
    },
    expandedEnable: {
      default: false,
      type: Boolean
    },
    disableTitle: {
      default: false,
      type: Boolean,
    },
  },
  created() {
    if (this.config.eventBus === null || this.config.store === null) {
      throw new Error('Не указан EventBus и Vuex Store в конфигурации таблицы!')
    }

    /** Когда необходимо обновить данные */
    this.config.eventBus.$on('data-table-component-refresh', dto => {
      this.update()
    });

    /** Когда необходимо синхроинизровать dto */
    this.config.eventBus.$on('data-table-component-sync-dto', dto => {
      this.dto = Object.assign(this.dto, dto)
    });

    if (this.api) {
      this.update()
    }
  },
  data() {
    return {
      expanded$: {},
      uiKey: 0,
      dto: QueryDto.build({
        options: this.options,
        sorting: this.sorting,
        searching: this.searching,
      })
    }
  },
  computed: {
    loading() {
      return this.config.store.state.loading
    },
    expanded() {
      return this.expanded$;
    }
  },
  methods: {
    refreshUI() {
      this.uiKey += 1
    },
    isExpanded(index) {
      return this.expanded.hasOwnProperty(index)
    },
    expand(item, index) {
      if (this.expanded === false) {
        return;
      }
      if (this.expanded.hasOwnProperty(index)) {
        delete this.expanded$[index];
      } else {
        this.expanded$[index] = item
      }

      this.refreshUI()
    },
    update() {
      if (this.isEnableCheckbox) {
        this.checkbox.ids = []
      }
      this.$emit('update', this.dto)
    }
  }
}
</script>

<style scoped lang="css">
/*.opacity {
  opacity: 0.5
}*/
</style>
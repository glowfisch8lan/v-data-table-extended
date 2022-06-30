import _ from 'lodash';

/**
 * @class DataTableSort Данный класс используется сортировки
 */
class DataTableOptions {
  constructor(config) {
    this.search = null;
    this.enable = config?.enable ?? true;
  }

}

var searchingMixin = {
  props: {
    search: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    searchGlobal() {
      this.page = 1;
      this.$emit('search', this.searching);
      this.update();
      /*this.dto.searching.search = null*/
    }

  }
};

var actionsMixin = {
  props: {
    actionsWidth: {
      type: String,
      default: '250px'
    }
  },

  created() {
    if (this.config.actions ?? false) {
      this.actions = this.config.actions;
    }
  },

  data() {
    return {
      actions: {},
      dialogEditAllOpen: false
    };
  },

  methods: {
    getActionsWidth() {
      //todo сделать автокалькулятор ширины
      return this.actionsWidth;
    },

    deleteItem(item, deleteMode) {
      if (deleteMode) {
        this.$emit('click-delete', item);
        this.dialogDeleteConfirm = false;
        return;
      }

      this.itemDelete = item;
      this.dialogDeleteConfirm = true;
    },

    editItem(item) {
      this.$emit('click-edit', item);
    },

    viewItem(item) {
      this.$emit('click-view', item);
    },

    createItem() {
      this.$emit('click-create');
    },

    editAllOpenDialog() {
      this.dialogEditAllOpen = true;
    },

    editAllCloseDialog() {
      this.dialogEditAllOpen = false;
    }

  }
};

/**
 * @class DataTableSort Данный класс используется сортировки
 */
class DataTableOptions$1 {
  constructor(options) {
    this.sortRow = null;
    this.sortType = null;
  }

}

var sortMixin = {
  props: {
    sort: {
      type: Boolean,
      default: false
    }
    /*        sorting:{
                type: Object,
                default: () => new DataTableSort()
            },*/

  },

  data() {
    return {
      sorting: new DataTableOptions$1()
    };
  },

  watch: {
    sorting: {
      handler() {
        this.dto.sorting = this.sorting;
      },

      deep: true
    }
  },
  methods: {
    sortBy(header) {
      if (this.sort === false) {
        return;
      }

      if (header.sort === false) {
        return;
      }

      if (!this.api) {
        console.log('API отключен');
        return;
      }

      let field = header.value;

      if (this.sorting.sortRow !== field) {
        this.sorting.sortType = null;
        this.sorting.sortRow = null;
      }

      switch (this.sorting.sortType) {
        case null:
          this.sorting.sortType = 'asc';
          this.sorting.sortRow = field;
          break;

        case 'asc':
          this.sorting.sortType = 'desc';
          this.sorting.sortRow = field;
          break;

        case 'desc':
          this.sorting.sortType = null;
          this.sorting.sortRow = null;
          break;
      }

      this.update();
    }

  }
};

var deleteMixin = {
  data() {
    return {
      itemDelete: null,
      dialogDeleteConfirm: false
    };
  }

};

function truncate(text, length, clamp) {
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
}

var truncateMixin = {
  methods: {
    truncate(text, length, clamp) {
      return truncate(text, length, clamp);
    }

  }
};

var lodashMixin = {
  computed: {
    _() {
      return _;
    }

  }
};

/**
 * С помощью данного миксина осуществляется пагинация
 */
var paginationMixin = {
  props: {
    pagination: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    itemsPerPage() {
      return this.dto.options.itemsPerPage;
    },

    page: {
      get() {
        return this.dto.options.page;
      },

      set(newValue) {
        this.dto.options.page = newValue;
      }

    }
  },
  watch: {
    /** Страница должна обновляться постоянно */
    page() {
      this.update();
    }

  },
  methods: {
    refresh(resetPage) {
      if (resetPage) {
        this.dto.options.page = 1;
      }

      this.update();
    }

  }
};

/**
 * Данный класс используется как конфигурация
 */
class DataTableConfig {
  constructor(config) {
    this.actions = {
      edit: config?.actions?.edit ?? false,
      delete: config?.actions?.delete ?? false,
      view: config?.actions?.view ?? false,
      create: config?.actions?.create ?? false,
      deleteAll: config?.actions?.deleteAll ?? false,
      editAll: config?.actions?.editAll ?? false,
      checkbox: config?.actions?.checkbox ?? false
    };
    this.settings = {
      enable: config?.settings?.enable ?? false
    };
    this.store = config?.store ?? null;
    this.eventBus = config?.eventBus ?? null;
    /*        this.search = config?.search.show || false
            this.globalSearch = config?.search.globalSearch || false*/
  }

}

var configMixin = {
  props: {
    config: {
      type: Object,
      default: () => new DataTableConfig()
    }
  },

  data() {
    return {
      actions: this.config.actions
    };
  }

};

/**
 * С помощью данного миксина настраиваем дополнительные возможности таблицы. Под опциями в данном контексте следует понимать отображение компонента
 */

var optionsMixin = {
  props: {
    perPage: {
      type: Number,
      default: null
    }
  },

  created() {
    if (this.perPage) {
      this.dto.options.itemsPerPage = this.perPage;
    }
  },

  computed: {
    settings() {
      return {
        dense: false
      };
    }

  }
};

var breakpointMixin = {
  computed: {
    isNotMobile() {
      return !this.isMobile;
    },

    isMobile() {
      return this.breakpoint === 'xs';
    },

    isLaptop() {
      return this.breakpoint === 'md';
    },

    isDesktop() {
      return this.breakpoint === 'lg';
    },

    isLargeDesktop() {
      return this.breakpoint === 'xl';
    },

    breakpoint() {
      return this.$vuetify.breakpoint.name;
    }

  }
};

class QueryDto {
  constructor(params) {
    this.options = params?.options || [];
    this.sorting = params?.sorting || [];
    this.searching = params?.searching || new DataTableOptions({
      enable: false
    });
    this.filters = params?.filters || [];
  }

  static build(params) {
    return new QueryDto(params);
  }

}

var checkboxMixin = {
  props: {
    checkbox: {
      type: Object,
      default: null
    }
  },
  methods: {
    selectAllCheckbox() {
      if (this.isSelectedAllCheckbox) {
        this.checkbox.ids = [];
      } else {
        this.checkbox.ids = this.data.map(item => item.id);
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
      return this.checkbox !== null;
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

};

var filterMixin = {
  props: {
    opacityFilter: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    filterFunc(field, value) {
      if (this.inFilter(field, value)) {
        this.dto.filters = this.dto.filters.filter(filter => {
          return filter.value !== value && filter.type !== field;
        });
      } else {
        let filter = {};
        filter.field = field;
        filter.value = value;
        this.dto.filters.push(filter);
      }

      this.dto.options.page = 1;
      this.update();
    },

    inFilter(field, value) {
      let a = this.dto.filters.find(filter => {
        return filter.value === value && filter.field === field;
      });
      return Boolean(a ?? false);
    },

    isOpacityFiltered(item) {
      if (this.opacityFilter.length === 0) {
        return false;
      }

      return this.opacityFilter.find(id => item.id === id);
    }

  }
};

//
//
//
//
var script = {
  name: "DialogEditAll"
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  const options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  let hook;

  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      const originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      const existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

const isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

function createInjector(context) {
  return (id, style) => addStyle(id, style);
}

let HEAD;
const styles = {};

function addStyle(id, css) {
  const group = isOldIE ? css.media || 'default' : id;
  const style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    let code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      const index = style.ids.size - 1;
      const textNode = document.createTextNode(code);
      const nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div")
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-634d56fe_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"DialogEditAll.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-634d56fe";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

var colorPicker = {
  methods: {
    getColor(int) {
      switch (int) {
        case 1:
          return 'blue darken-2';

        case 2:
          return 'red darken-3';

        case 3:
          return 'deep-orange darken-1';

        default:
          return 'blue-grey darken-1';
      }
    },

    getPallet() {
      return [{
        id: 1,
        color: 'Синий'
      }, {
        id: 2,
        color: 'Красный'
      }, {
        id: 3,
        color: 'Оранжевый'
      }];
    }

  }
};

/**
 * С помощью данного миксина настраиваем дополнительные возможности таблицы. Под опциями в данном контексте следует понимать отображение компонента
 */

var settingsMixin = {
  props: {
    /*        options: {
                type: Object,
                default: () => new DataTableOptions()
            },*/
  },

  data() {
    return {
      settingsOpen: false
    };
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
        dense: false
        /*        editableHeader: this.useEditableHeader,*/

      };
    }

  },
  watch: {
    options: {
      handler() {
        /*                if (this.settingsOpen) {
                            localStorage.setItem('options-'+this.$route.name, JSON.stringify(this.options));
                        }*/
      },

      deep: true
    }
  }
};

//
var script$1 = {
  name: "List",
  components: {
    DialogEditAll: __vue_component__
  },
  mixins: [configMixin, searchingMixin, optionsMixin, breakpointMixin, lodashMixin, sortMixin, deleteMixin, truncateMixin, paginationMixin, actionsMixin, checkboxMixin, filterMixin, colorPicker, settingsMixin],
  props: {
    tableTitle: {
      type: String,
      default: 'Таблица'
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
    }
  },

  created() {
    if (this.config.eventBus === null || this.config.store === null) {
      throw new Error('Не указан EventBus и Vuex Store в конфигурации таблицы!');
    }
    /** Когда необходимо обновить данные */


    this.config.eventBus.$on('data-table-component-refresh', dto => {
      this.update();
    });
    /** Когда необходимо синхроинизровать dto */

    this.config.eventBus.$on('data-table-component-sync-dto', dto => {
      this.dto = Object.assign(this.dto, dto);
    });

    if (this.api) {
      this.update();
    }
  },

  data() {
    return {
      dto: QueryDto.build({
        options: this.options,
        sorting: this.sorting,
        searching: this.searching
      })
    };
  },

  computed: {
    loading() {
      return this.config.store.state.loading;
    }

  },
  methods: {
    update() {
      if (this.isEnableCheckbox) {
        this.checkbox.ids = [];
      }

      this.$emit('update', this.dto);
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c(
        "v-card",
        { staticClass: "d-flex pa-2", attrs: { flat: "" } },
        [
          _c("h2", { staticClass: "pl-2" }, [_vm._v(_vm._s(_vm.tableTitle))]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "div",
            { staticStyle: { width: "25vw" } },
            [
              _vm.search
                ? _c("v-text-field", {
                    attrs: {
                      "prepend-icon": "mdi-magnify",
                      label: "Поиск",
                      "hide-details": "",
                    },
                    on: {
                      keyup: function ($event) {
                        if (
                          !$event.type.indexOf("key") &&
                          _vm._k(
                            $event.keyCode,
                            "enter",
                            13,
                            $event.key,
                            "Enter"
                          )
                        ) {
                          return null
                        }
                        return _vm.searchGlobal()
                      },
                    },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "prepend",
                          fn: function () {
                            return [
                              _c(
                                "v-tooltip",
                                {
                                  attrs: { bottom: "" },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "activator",
                                        fn: function (ref) {
                                          var on = ref.on;
                                          var attrs = ref.attrs;
                                          return [
                                            _c(
                                              "v-btn",
                                              _vm._g(
                                                _vm._b(
                                                  {
                                                    attrs: { icon: "" },
                                                    on: {
                                                      click: _vm.searchGlobal,
                                                    },
                                                  },
                                                  "v-btn",
                                                  attrs,
                                                  false
                                                ),
                                                on
                                              ),
                                              [
                                                _c("v-icon", [
                                                  _vm._v("mdi-magnify"),
                                                ]),
                                              ],
                                              1
                                            ),
                                          ]
                                        },
                                      },
                                    ],
                                    null,
                                    false,
                                    1761025398
                                  ),
                                },
                                [
                                  _vm._v(" "),
                                  _c("span", [_vm._v("Глобальный поиск")]),
                                ]
                              ),
                            ]
                          },
                          proxy: true,
                        },
                      ],
                      null,
                      false,
                      2256994258
                    ),
                    model: {
                      value: _vm.dto.searching.search,
                      callback: function ($$v) {
                        _vm.$set(_vm.dto.searching, "search", $$v);
                      },
                      expression: "dto.searching.search",
                    },
                  })
                : _vm._e(),
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "d-flex align-end" }, [
            _vm.config.settings.enable
              ? _c(
                  "div",
                  [
                    _c(
                      "v-btn",
                      {
                        attrs: { icon: "" },
                        on: {
                          click: function ($event) {
                            _vm.settingsOpen = !_vm.settingsOpen;
                          },
                        },
                      },
                      [_c("v-icon", [_vm._v("mdi-cogs")])],
                      1
                    ),
                    _vm._v(" "),
                    _c("v-dialog", {
                      attrs: {
                        transition: "dialog-top-transition",
                        "max-width": "600",
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "default",
                            fn: function (settingsOpen) {
                              return [
                                _c(
                                  "v-card",
                                  [
                                    _c(
                                      "v-toolbar",
                                      { attrs: { dark: "", color: "primary" } },
                                      [_vm._v("Настройки\n              ")]
                                    ),
                                    _vm._v(" "),
                                    _c("v-card-text", [
                                      _c(
                                        "div",
                                        { staticClass: "text-h2 pa-12" },
                                        [
                                          _c(
                                            "v-row",
                                            [
                                              _c(
                                                "v-col",
                                                {
                                                  attrs: {
                                                    cols: "12",
                                                    sm: "6",
                                                    md: "6",
                                                  },
                                                },
                                                [
                                                  !_vm.perPage
                                                    ? _c("v-select", {
                                                        attrs: {
                                                          items: [
                                                            5, 10, 15, 20, 50,
                                                            100,
                                                          ],
                                                          label:
                                                            "Кол-во записей на странице",
                                                        },
                                                        on: {
                                                          change: function (
                                                            $event
                                                          ) {
                                                            return _vm.refresh(
                                                              true
                                                            )
                                                          },
                                                        },
                                                        model: {
                                                          value:
                                                            _vm.dto.options
                                                              .itemsPerPage,
                                                          callback: function (
                                                            $$v
                                                          ) {
                                                            _vm.$set(
                                                              _vm.dto.options,
                                                              "itemsPerPage",
                                                              $$v
                                                            );
                                                          },
                                                          expression:
                                                            "dto.options.itemsPerPage",
                                                        },
                                                      })
                                                    : _vm._e(),
                                                ],
                                                1
                                              ),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _vm._t("settings"),
                                        ],
                                        2
                                      ),
                                    ]),
                                    _vm._v(" "),
                                    _c("v-card-actions", {
                                      staticClass: "justify-center",
                                    }),
                                  ],
                                  1
                                ),
                              ]
                            },
                          },
                        ],
                        null,
                        true
                      ),
                      model: {
                        value: _vm.settingsOpen,
                        callback: function ($$v) {
                          _vm.settingsOpen = $$v;
                        },
                        expression: "settingsOpen",
                      },
                    }),
                  ],
                  1
                )
              : _vm._e(),
          ]),
        ],
        1
      ),
      _vm._v(" "),
      _c("v-data-table", {
        staticClass: "elevation-1 mt-4",
        attrs: {
          headers: _vm.headers || [],
          items: _vm.data || [],
          loading: _vm.loading,
          "items-per-page": _vm.itemsPerPage,
          dense: _vm.settings.dense,
          "hide-default-header": "",
          "hide-default-footer": "",
        },
        scopedSlots: _vm._u(
          [
            {
              key: "no-data",
              fn: function () {
                return [
                  _c("div", [
                    !_vm.loading
                      ? _c("span", [_vm._v("Нет данных")])
                      : _vm._e(),
                  ]),
                ]
              },
              proxy: true,
            },
            {
              key: "no-results",
              fn: function () {
                return [
                  !_vm.loading ? _c("span", [_vm._v("Не найдено")]) : _vm._e(),
                ]
              },
              proxy: true,
            },
            {
              key: "progress",
              fn: function () {
                return [
                  _c(
                    "v-overlay",
                    { attrs: { value: _vm.loading } },
                    [
                      _c("v-progress-circular", {
                        attrs: { indeterminate: "", width: "10", size: "128" },
                      }),
                    ],
                    1
                  ),
                ]
              },
              proxy: true,
            },
            _vm.isLargeDesktop || _vm.isDesktop
              ? {
                  key: "header",
                  fn: function (ref) {
                    var headers = ref.props.headers;
                    return [
                      _c("thead", [
                        _c(
                          "tr",
                          [
                            _vm.isEnableCheckbox
                              ? [
                                  _c(
                                    "th",
                                    { attrs: { width: 10 } },
                                    [
                                      _c("v-checkbox", {
                                        attrs: {
                                          value: _vm.isSelectedAllCheckbox,
                                        },
                                        on: { change: _vm.selectAllCheckbox },
                                      }),
                                    ],
                                    1
                                  ),
                                ]
                              : _vm._e(),
                            _vm._v(" "),
                            _vm._l(headers, function (h, index) {
                              return [
                                (h.enable || typeof h.enable === "undefined") &&
                                h.text.length > 0
                                  ? _c(
                                      "th",
                                      { key: index },
                                      [
                                        _c(
                                          "portal",
                                          {
                                            attrs: {
                                              to: "header" + index,
                                              disabled: true,
                                            },
                                          },
                                          [
                                            _vm._t(
                                              "header",
                                              function () {
                                                return [
                                                  _c(
                                                    "v-tooltip",
                                                    {
                                                      attrs: {
                                                        bottom: "",
                                                        disabled:
                                                          h.tooltip ||
                                                          typeof h.tooltip !==
                                                            "undefined",
                                                      },
                                                      scopedSlots: _vm._u(
                                                        [
                                                          {
                                                            key: "activator",
                                                            fn: function (ref) {
                                                              var on = ref.on;
                                                              var attrs =
                                                                ref.attrs;
                                                              return [
                                                                _c(
                                                                  "div",
                                                                  _vm._g(
                                                                    _vm._b(
                                                                      {
                                                                        staticClass:
                                                                          "v-list-item--link d-inline",
                                                                      },
                                                                      "div",
                                                                      attrs,
                                                                      false
                                                                    ),
                                                                    on
                                                                  ),
                                                                  [
                                                                    _c(
                                                                      "div",
                                                                      {
                                                                        on: {
                                                                          click:
                                                                            function (
                                                                              $event
                                                                            ) {
                                                                              return _vm.sortBy(
                                                                                h
                                                                              )
                                                                            },
                                                                        },
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "span",
                                                                          {
                                                                            domProps:
                                                                              {
                                                                                innerHTML:
                                                                                  _vm._s(
                                                                                    _vm
                                                                                      .settings
                                                                                      .dense
                                                                                      ? _vm.truncate(
                                                                                          h.text,
                                                                                          10,
                                                                                          "..."
                                                                                        )
                                                                                      : h.text
                                                                                  ),
                                                                              },
                                                                          }
                                                                        ),
                                                                        _vm._v(
                                                                          " "
                                                                        ),
                                                                        _vm
                                                                          .sorting
                                                                          .sortRow ===
                                                                        h.value
                                                                          ? _c(
                                                                              "v-icon",
                                                                              {
                                                                                attrs:
                                                                                  {
                                                                                    small:
                                                                                      "",
                                                                                  },
                                                                              },
                                                                              [
                                                                                _vm._v(
                                                                                  "\n                          " +
                                                                                    _vm._s(
                                                                                      _vm
                                                                                        .sorting
                                                                                        .sortType ===
                                                                                        "asc"
                                                                                        ? "mdi-sort-bool-ascending"
                                                                                        : "mdi-sort-bool-descending"
                                                                                    ) +
                                                                                    "\n                        "
                                                                                ),
                                                                              ]
                                                                            )
                                                                          : _vm._e(),
                                                                      ],
                                                                      1
                                                                    ),
                                                                    _vm._v(" "),
                                                                    h.filters ||
                                                                    typeof h.filters !==
                                                                      "undefined"
                                                                      ? _c(
                                                                          "v-menu",
                                                                          {
                                                                            attrs:
                                                                              {
                                                                                "offset-y":
                                                                                  "",
                                                                                "close-on-content-click": false,
                                                                              },
                                                                            scopedSlots:
                                                                              _vm._u(
                                                                                [
                                                                                  {
                                                                                    key: "activator",
                                                                                    fn: function (
                                                                                      ref
                                                                                    ) {
                                                                                      var on =
                                                                                        ref.on;
                                                                                      var attrs =
                                                                                        ref.attrs;
                                                                                      return [
                                                                                        _c(
                                                                                          "v-btn",
                                                                                          _vm._g(
                                                                                            _vm._b(
                                                                                              {
                                                                                                attrs:
                                                                                                  {
                                                                                                    icon: "",
                                                                                                    "x-small":
                                                                                                      "",
                                                                                                  },
                                                                                              },
                                                                                              "v-btn",
                                                                                              attrs,
                                                                                              false
                                                                                            ),
                                                                                            on
                                                                                          ),
                                                                                          [
                                                                                            _c(
                                                                                              "v-icon",
                                                                                              [
                                                                                                _vm._v(
                                                                                                  "mdi-filter"
                                                                                                ),
                                                                                              ]
                                                                                            ),
                                                                                          ],
                                                                                          1
                                                                                        ),
                                                                                      ]
                                                                                    },
                                                                                  },
                                                                                ],
                                                                                null,
                                                                                true
                                                                              ),
                                                                          },
                                                                          [
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "v-card",
                                                                              {
                                                                                staticClass:
                                                                                  "white pa-2",
                                                                                attrs:
                                                                                  {
                                                                                    elevation:
                                                                                      "0",
                                                                                    "max-width":
                                                                                      "20vw",
                                                                                  },
                                                                              },
                                                                              _vm._l(
                                                                                h.filters,
                                                                                function (
                                                                                  filter,
                                                                                  hindex
                                                                                ) {
                                                                                  return _c(
                                                                                    "v-chip",
                                                                                    {
                                                                                      key: hindex,
                                                                                      staticClass:
                                                                                        "ml-2 mt-2",
                                                                                      attrs:
                                                                                        {
                                                                                          color:
                                                                                            _vm.inFilter(
                                                                                              h.value,
                                                                                              filter.value
                                                                                            )
                                                                                              ? _vm.getColor(
                                                                                                  filter.color_id
                                                                                                )
                                                                                              : "grey lighten-1",
                                                                                          "text-color":
                                                                                            "white",
                                                                                          filter:
                                                                                            "",
                                                                                        },
                                                                                      on: {
                                                                                        click:
                                                                                          function (
                                                                                            $event
                                                                                          ) {
                                                                                            return _vm.filterFunc(
                                                                                              h.value,
                                                                                              filter.value
                                                                                            )
                                                                                          },
                                                                                      },
                                                                                    },
                                                                                    [
                                                                                      _vm._v(
                                                                                        _vm._s(
                                                                                          filter.text
                                                                                        ) +
                                                                                          "\n                          "
                                                                                      ),
                                                                                    ]
                                                                                  )
                                                                                }
                                                                              ),
                                                                              1
                                                                            ),
                                                                          ],
                                                                          1
                                                                        )
                                                                      : _vm._e(),
                                                                  ],
                                                                  1
                                                                ),
                                                              ]
                                                            },
                                                          },
                                                        ],
                                                        null,
                                                        true
                                                      ),
                                                    },
                                                    [
                                                      _vm._v(" "),
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "pa-2 text-center",
                                                          staticStyle: {
                                                            "max-width":
                                                              "250px",
                                                          },
                                                        },
                                                        [
                                                          _c("span", {
                                                            domProps: {
                                                              innerHTML: _vm._s(
                                                                h.text
                                                              ),
                                                            },
                                                          }),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                ]
                                              },
                                              { header: h }
                                            ),
                                          ],
                                          2
                                        ),
                                        _vm._v(" "),
                                         _vm._e(),
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                              ]
                            }),
                            _vm._v(" "),
                            Object.values(_vm.actions).find(function (item) {
                              return item === true
                            })
                              ? _c(
                                  "th",
                                  { attrs: { width: _vm.getActionsWidth } },
                                  [
                                    _c(
                                      "v-col",
                                      { staticClass: "text-right" },
                                      [
                                        _vm.actions.create
                                          ? _vm._t(
                                              "actions.create",
                                              function () {
                                                return [
                                                  _c(
                                                    "v-btn",
                                                    {
                                                      staticClass: "mr-1",
                                                      attrs: {
                                                        icon: "",
                                                        small: "",
                                                      },
                                                      on: {
                                                        click: _vm.createItem,
                                                      },
                                                    },
                                                    [
                                                      _c("v-icon", [
                                                        _vm._v(
                                                          "\n                  mdi-plus\n                "
                                                        ),
                                                      ]),
                                                    ],
                                                    1
                                                  ),
                                                ]
                                              }
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.actions.editAll &&
                                        _vm.requireCheckbox()
                                          ? _c(
                                              "v-btn",
                                              {
                                                attrs: {
                                                  icon: "",
                                                  disabled:
                                                    _vm.checkbox.ids.length ===
                                                    0,
                                                },
                                                on: {
                                                  click: _vm.editAllOpenDialog,
                                                },
                                              },
                                              [
                                                _c("v-icon", [
                                                  _vm._v(
                                                    "\n                mdi-pencil\n              "
                                                  ),
                                                ]),
                                              ],
                                              1
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.actions.deleteAll &&
                                        _vm.requireCheckbox()
                                          ? _c(
                                              "v-btn",
                                              {
                                                attrs: {
                                                  icon: "",
                                                  disabled:
                                                    _vm.checkbox.ids.length ===
                                                    0,
                                                },
                                              },
                                              [
                                                _c("v-icon", [
                                                  _vm._v(
                                                    "\n                mdi-delete\n              "
                                                  ),
                                                ]),
                                              ],
                                              1
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm._t("header.action.append"),
                                      ],
                                      2
                                    ),
                                  ],
                                  1
                                )
                              : _vm._e(),
                          ],
                          2
                        ),
                      ]),
                    ]
                  },
                }
              : {
                  key: "header",
                  fn: function (ref) {
                    var headers = ref.props.headers;
                    return [
                      Object.values(_vm.actions).find(function (item) {
                        return item === true
                      })
                        ? _c(
                            "div",
                            { attrs: { width: _vm.getActionsWidth } },
                            [
                              _c(
                                "v-col",
                                { staticClass: "text-right" },
                                [
                                  _vm.actions.create
                                    ? _vm._t("actions.create", function () {
                                        return [
                                          _c(
                                            "v-btn",
                                            {
                                              staticClass: "mr-1",
                                              attrs: { icon: "", small: "" },
                                              on: { click: _vm.createItem },
                                            },
                                            [
                                              _c("v-icon", [
                                                _vm._v(
                                                  "\n                mdi-plus\n              "
                                                ),
                                              ]),
                                            ],
                                            1
                                          ),
                                        ]
                                      })
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.actions.deleteAll
                                    ? _c(
                                        "v-btn",
                                        { attrs: { icon: "", small: "" } },
                                        [
                                          _c("v-icon", [
                                            _vm._v(
                                              "\n              mdi-delete\n            "
                                            ),
                                          ]),
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm._t("header.action.append"),
                                ],
                                2
                              ),
                              _vm._v(" "),
                              _c("v-divider"),
                            ],
                            1
                          )
                        : _vm._e(),
                    ]
                  },
                },
            _vm.isLargeDesktop || _vm.isDesktop
              ? {
                  key: "item",
                  fn: function (ref) {
                    var item = ref.item;
                    var index = ref.index;
                    var headers = ref.headers;
                    return [
                      _c(
                        "tr",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: !_vm.loading,
                              expression: "!loading",
                            },
                          ],
                          class: { opacity: _vm.isOpacityFiltered(item) },
                        },
                        [
                          _vm.isEnableCheckbox
                            ? _c(
                                "td",
                                [
                                  _c("v-checkbox", {
                                    attrs: { multiple: "", value: item.id },
                                    model: {
                                      value: _vm.checkbox.ids,
                                      callback: function ($$v) {
                                        _vm.$set(_vm.checkbox, "ids", $$v);
                                      },
                                      expression: "checkbox.ids",
                                    },
                                  }),
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._l(Object.values(headers), function (header) {
                            return [
                              (header.enable || true) && header.text.length > 0
                                ? _c(
                                    "td",
                                    {
                                      key: header.id,
                                      attrs: { width: header.width },
                                    },
                                    [
                                      _vm._t(
                                        "column",
                                        function () {
                                          return [
                                            _c(
                                              "v-tooltip",
                                              {
                                                attrs: {
                                                  bottom: "",
                                                  disabled:
                                                    header.tooltip ||
                                                    typeof header.tooltip !==
                                                      "undefined",
                                                },
                                                scopedSlots: _vm._u(
                                                  [
                                                    {
                                                      key: "activator",
                                                      fn: function (ref) {
                                                        var on = ref.on;
                                                        var attrs = ref.attrs;
                                                        return [
                                                          _c(
                                                            "div",
                                                            _vm._g(
                                                              _vm._b(
                                                                {},
                                                                "div",
                                                                attrs,
                                                                false
                                                              ),
                                                              on
                                                            ),
                                                            [
                                                              _c("div", {
                                                                domProps: {
                                                                  innerHTML:
                                                                    _vm._s(
                                                                      _vm
                                                                        .settings
                                                                        .dense
                                                                        ? _vm.truncate(
                                                                            _vm._.get(
                                                                              item,
                                                                              header.value,
                                                                              ""
                                                                            ),
                                                                            15,
                                                                            "..."
                                                                          )
                                                                        : _vm._.get(
                                                                            item,
                                                                            header.value,
                                                                            ""
                                                                          )
                                                                    ),
                                                                },
                                                              }),
                                                            ]
                                                          ),
                                                        ]
                                                      },
                                                    },
                                                  ],
                                                  null,
                                                  true
                                                ),
                                              },
                                              [
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "pa-2 text-center",
                                                    staticStyle: {
                                                      "max-width": "250px",
                                                    },
                                                  },
                                                  [
                                                    _c("span", {
                                                      domProps: {
                                                        innerHTML: _vm._s(
                                                          _vm._.get(
                                                            item,
                                                            header.value,
                                                            ""
                                                          )
                                                        ),
                                                      },
                                                    }),
                                                  ]
                                                ),
                                              ]
                                            ),
                                          ]
                                        },
                                        { item: item, header: header }
                                      ),
                                    ],
                                    2
                                  )
                                : _vm._e(),
                            ]
                          }),
                          _vm._v(" "),
                          Object.values(_vm.actions).find(function (item) {
                            return item === true
                          })
                            ? _c(
                                "td",
                                { attrs: { width: _vm.getActionsWidth } },
                                [
                                  _c(
                                    "v-col",
                                    { staticClass: "text-right" },
                                    [
                                      _vm._t("action.prepend", null, {
                                        item: item,
                                      }),
                                      _vm._v(" "),
                                      _vm.actions.view
                                        ? _c(
                                            "v-btn",
                                            {
                                              staticClass: "mr-1",
                                              attrs: {
                                                icon: "",
                                                color: "green darken-3",
                                              },
                                              on: {
                                                click: function ($event) {
                                                  return _vm.viewItem(item)
                                                },
                                              },
                                            },
                                            [
                                              _c("v-icon", [
                                                _vm._v(
                                                  "\n                mdi-eye\n              "
                                                ),
                                              ]),
                                            ],
                                            1
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.actions.edit
                                        ? _c(
                                            "v-btn",
                                            {
                                              staticClass: "mr-1",
                                              attrs: {
                                                icon: "",
                                                color: "primary",
                                              },
                                              on: {
                                                click: function ($event) {
                                                  return _vm.editItem(item)
                                                },
                                              },
                                            },
                                            [
                                              _c("v-icon", [
                                                _vm._v(
                                                  "\n                mdi-pencil\n              "
                                                ),
                                              ]),
                                            ],
                                            1
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.actions.delete
                                        ? _c(
                                            "v-btn",
                                            {
                                              attrs: {
                                                icon: "",
                                                color: "red darken-3",
                                              },
                                              on: {
                                                click: function ($event) {
                                                  return _vm.deleteItem(item)
                                                },
                                              },
                                            },
                                            [
                                              _c("v-icon", [
                                                _vm._v(
                                                  "\n                mdi-delete\n              "
                                                ),
                                              ]),
                                            ],
                                            1
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm._t("action.append", null, {
                                        item: item,
                                      }),
                                    ],
                                    2
                                  ),
                                ],
                                1
                              )
                            : _vm._e(),
                        ],
                        2
                      ),
                    ]
                  },
                }
              : {
                  key: "item",
                  fn: function (ref) {
                    var item = ref.item;
                    var index = ref.index;
                    var headers = ref.headers;
                    return [
                      _c(
                        "v-card",
                        { staticClass: "mb-6" },
                        [
                          _c(
                            "v-card-text",
                            [
                              _vm._l(Object.values(headers), function (header) {
                                return [
                                  (header.enable || true) &&
                                  header.text.length > 0
                                    ? _c(
                                        "div",
                                        {
                                          key: header.id,
                                          attrs: { width: header.width },
                                        },
                                        [
                                          _vm._t(
                                            "column",
                                            function () {
                                              return [
                                                _c("div", [
                                                  _c("strong", [
                                                    _vm._v(
                                                      _vm._s(header.text) + ":"
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("span", {
                                                    domProps: {
                                                      innerHTML: _vm._s(
                                                        _vm._.get(
                                                          item,
                                                          header.value,
                                                          ""
                                                        )
                                                      ),
                                                    },
                                                  }),
                                                ]),
                                              ]
                                            },
                                            { item: item, header: header }
                                          ),
                                        ],
                                        2
                                      )
                                    : _vm._e(),
                                ]
                              }),
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _c("v-divider", { staticClass: "mx-4" }),
                          _vm._v(" "),
                          _c("v-card-actions", [
                            Object.values(_vm.actions).find(function (item) {
                              return item === true
                            })
                              ? _c(
                                  "div",
                                  { attrs: { width: _vm.getActionsWidth } },
                                  [
                                    _c(
                                      "v-col",
                                      { staticClass: "text-right" },
                                      [
                                        _vm._t("action.prepend", null, {
                                          item: item,
                                        }),
                                        _vm._v(" "),
                                        _vm.actions.view
                                          ? _c(
                                              "v-btn",
                                              {
                                                staticClass: "mr-4",
                                                attrs: {
                                                  icon: "",
                                                  color: "green darken-3",
                                                },
                                                on: {
                                                  click: function ($event) {
                                                    return _vm.viewItem(item)
                                                  },
                                                },
                                              },
                                              [
                                                _c("v-icon", [
                                                  _vm._v(
                                                    "\n                  mdi-eye\n                "
                                                  ),
                                                ]),
                                              ],
                                              1
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.actions.edit
                                          ? _c(
                                              "v-btn",
                                              {
                                                staticClass: "mr-4",
                                                attrs: {
                                                  icon: "",
                                                  color: "primary",
                                                },
                                                on: {
                                                  click: function ($event) {
                                                    return _vm.editItem(item)
                                                  },
                                                },
                                              },
                                              [
                                                _c("v-icon", [
                                                  _vm._v(
                                                    "\n                  mdi-pencil\n                "
                                                  ),
                                                ]),
                                              ],
                                              1
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.actions.delete
                                          ? _c(
                                              "v-btn",
                                              {
                                                attrs: {
                                                  icon: "",
                                                  color: "red darken-3",
                                                },
                                                on: {
                                                  click: function ($event) {
                                                    return _vm.deleteItem(item)
                                                  },
                                                },
                                              },
                                              [
                                                _c("v-icon", [
                                                  _vm._v(
                                                    "\n                  mdi-delete\n                "
                                                  ),
                                                ]),
                                              ],
                                              1
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm._t("action.append", null, {
                                          item: item,
                                        }),
                                      ],
                                      2
                                    ),
                                  ],
                                  1
                                )
                              : _vm._e(),
                          ]),
                        ],
                        1
                      ),
                    ]
                  },
                },
            {
              key: "body.prepend",
              fn: function (ref) {
                var headers = ref.headers;
                var items = ref.items;
                return [
                  _vm._t("body.prepend", null, {
                    headers: headers,
                    items: items,
                  }),
                ]
              },
            },
            {
              key: "body.append",
              fn: function (ref) {
                var headers = ref.headers;
                var items = ref.items;
                return [
                  _vm._t("body.append", null, {
                    headers: headers,
                    items: items,
                  }),
                ]
              },
            },
          ],
          null,
          true
        ),
      }),
      _vm._v(" "),
      _vm.pagination && _vm.dto.options.totalPages > 0
        ? _c(
            "div",
            { staticClass: "text-center pt-2 pb-2" },
            [
              _c("v-pagination", {
                attrs: {
                  "total-visible": "10",
                  disabled: _vm.loading,
                  length: _vm.dto.options.totalPages,
                },
                model: {
                  value: _vm.dto.options.page,
                  callback: function ($$v) {
                    _vm.$set(_vm.dto.options, "page", $$v);
                  },
                  expression: "dto.options.page",
                },
              }),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { "max-width": "290" },
          model: {
            value: _vm.dialogDeleteConfirm,
            callback: function ($$v) {
              _vm.dialogDeleteConfirm = $$v;
            },
            expression: "dialogDeleteConfirm",
          },
        },
        [
          _c(
            "v-card",
            [
              _c("v-card-title", { staticClass: "text-h5" }, [
                _vm._v("Удаление"),
              ]),
              _vm._v(" "),
              _c("v-card-text", [_vm._v("Вы действительно хотите удалить?")]),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "darken-1", text: "" },
                      on: {
                        click: function ($event) {
                          _vm.dialogDeleteConfirm = false;
                        },
                      },
                    },
                    [_vm._v("\n          Нет\n        ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "red darken-1", text: "" },
                      on: {
                        click: function ($event) {
                          return _vm.deleteItem(_vm.itemDelete, true)
                        },
                      },
                    },
                    [_vm._v("\n          Да\n        ")]
                  ),
                ],
                1
              ),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { "max-width": "768vh" },
          model: {
            value: _vm.dialogEditAllOpen,
            callback: function ($$v) {
              _vm.dialogEditAllOpen = $$v;
            },
            expression: "dialogEditAllOpen",
          },
        },
        [
          _c(
            "v-card",
            [
              _c("v-card-title", { staticClass: "text-h5" }),
              _vm._v(" "),
              _c("v-card-text", [_vm._t("action.edit-all.text")], 2),
            ],
            1
          ),
        ],
        1
      ),
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-23266372_0", { source: "\n.opacity {\r\n  opacity: 0.5\n}\r\n", map: {"version":3,"sources":["/home/admin/projects/vue/v-data-table-extended/src/components/DataTableComponent.vue"],"names":[],"mappings":";AAwjBA;EACA;AACA","file":"DataTableComponent.vue","sourcesContent":["<template>\r\n  <div>\r\n    <v-card class=\"d-flex pa-2\" flat>\r\n      <h2 class=\"pl-2\">{{ tableTitle }}</h2>\r\n\r\n      <v-spacer></v-spacer>\r\n      <div style=\"width:25vw\">\r\n        <v-text-field\r\n            v-if=\"search\"\r\n            v-model=\"dto.searching.search\"\r\n            prepend-icon=\"mdi-magnify\"\r\n            label=\"Поиск\"\r\n            hide-details\r\n            @keyup.enter=\"searchGlobal()\"\r\n        >\r\n          <template v-slot:prepend>\r\n            <v-tooltip bottom>\r\n              <template v-slot:activator=\"{ on, attrs }\">\r\n                <v-btn icon\r\n                       @click=\"searchGlobal\"\r\n                       v-bind=\"attrs\"\r\n                       v-on=\"on\">\r\n                  <v-icon>mdi-magnify</v-icon>\r\n                </v-btn>\r\n              </template>\r\n              <span>Глобальный поиск</span>\r\n            </v-tooltip>\r\n          </template>\r\n        </v-text-field>\r\n      </div>\r\n      <div class=\"d-flex align-end\">\r\n        <div v-if=\"config.settings.enable\">\r\n          <v-btn icon @click=\"settingsOpen = !settingsOpen\">\r\n            <v-icon>mdi-cogs</v-icon>\r\n          </v-btn>\r\n          <!--  Настройки  -->\r\n          <v-dialog\r\n              transition=\"dialog-top-transition\"\r\n              max-width=\"600\"\r\n              v-model=\"settingsOpen\"\r\n          >\r\n            <template v-slot:default=\"settingsOpen\">\r\n              <v-card>\r\n                <v-toolbar\r\n                    dark\r\n                    color=\"primary\"\r\n                >Настройки\r\n                </v-toolbar>\r\n                <v-card-text>\r\n                  <div class=\"text-h2 pa-12\">\r\n                    <!--                    <v-checkbox\r\n                                            label=\"Компактно\"\r\n                                            v-model=\"settings.dense\"\r\n                                        ></v-checkbox>-->\r\n                    <!--                    <v-checkbox\r\n                                            label=\"Редактируемая шапка\"\r\n                                            v-model=\"settings.editableHeader\"\r\n                                        ></v-checkbox>-->\r\n                    <v-row>\r\n                      <v-col\r\n                          cols=\"12\"\r\n                          sm=\"6\"\r\n                          md=\"6\"\r\n                      >\r\n                        <v-select\r\n                            v-if=\"!perPage\"\r\n                            :items=\"[5,10,15,20,50,100]\"\r\n                            v-model=\"dto.options.itemsPerPage\"\r\n                            @change=\"refresh(true)\"\r\n                            label=\"Кол-во записей на странице\"\r\n                        ></v-select>\r\n                      </v-col>\r\n                    </v-row>\r\n                    <slot name=\"settings\"></slot>\r\n                  </div>\r\n                </v-card-text>\r\n                <v-card-actions class=\"justify-center\">\r\n                  <!--                  <v-btn\r\n                                        color=\"primary\"\r\n                                        text\r\n                                        @click=\"saveSettings\"\r\n                                    >\r\n                                      <v-icon>mdi-content-save</v-icon>\r\n                                      Сохранить\r\n                                    </v-btn>-->\r\n                </v-card-actions>\r\n              </v-card>\r\n            </template>\r\n          </v-dialog>\r\n        </div>\r\n      </div>\r\n    </v-card>\r\n\r\n    <!-- :search=\"dto.searching.search\"-->\r\n    <v-data-table\r\n        class=\"elevation-1 mt-4\"\r\n        :headers=\"headers || []\"\r\n        :items=\"data || []\"\r\n        :loading=\"loading\"\r\n\r\n        :items-per-page=\"itemsPerPage\"\r\n        :dense=\"settings.dense\"\r\n        hide-default-header\r\n        hide-default-footer\r\n    >\r\n      <!--Template при отсутствии данных в таблице-->\r\n      <template v-slot:no-data>\r\n        <div><span v-if=\"!loading\">Нет данных</span></div>\r\n      </template>\r\n\r\n      <template v-slot:no-results>\r\n        <span v-if=\"!loading\">Не найдено</span>\r\n      </template>\r\n\r\n      <template v-slot:progress>\r\n        <v-overlay :value=\"loading\">\r\n          <v-progress-circular\r\n              indeterminate\r\n              width=\"10\"\r\n              size=\"128\"\r\n          ></v-progress-circular>\r\n        </v-overlay>\r\n      </template>\r\n\r\n      <!--Template шапки таблицы - Десктопные устройства-->\r\n      <template v-slot:header=\"{ props: { headers } }\" v-if=\"isLargeDesktop || isDesktop\">\r\n        <thead>\r\n        <tr>\r\n          <!--Checkbox-->\r\n          <template v-if=\"isEnableCheckbox\">\r\n            <th :width=\"10\">\r\n              <v-checkbox :value=\"isSelectedAllCheckbox\" @change=\"selectAllCheckbox\"></v-checkbox>\r\n            </th>\r\n          </template>\r\n          <!--Основные ячейки-->\r\n          <template v-for=\"(h, index) in headers\">\r\n            <th v-if=\"(h.enable ||  typeof h.enable === 'undefined') && h.text.length > 0\"\r\n                :key=\"index\">\r\n\r\n              <portal :to=\"`header` + index\" :disabled=\"true\">\r\n                <slot name=\"header\" v-bind:header=\"h\">\r\n\r\n                  <!--Всплывающая подсказка-->\r\n                  <v-tooltip bottom :disabled=\"h.tooltip ||  typeof h.tooltip !== 'undefined'\">\r\n\r\n                    <template v-slot:activator=\"{ on, attrs }\">\r\n                      <div\r\n                          v-bind=\"attrs\" v-on=\"on\"\r\n                          class=\"v-list-item--link d-inline\"\r\n                      >\r\n                        <!--Сортировка-->\r\n                        <div @click=\"sortBy(h)\">\r\n                          <span v-html=\"settings.dense ? truncate(h.text ,10, '...') : h.text\"></span>\r\n                          <v-icon small v-if=\"sorting.sortRow === h.value\">\r\n                            {{ (sorting.sortType === 'asc') ? 'mdi-sort-bool-ascending' : 'mdi-sort-bool-descending' }}\r\n                          </v-icon>\r\n                        </div>\r\n                        <!--Фильтрация-->\r\n                        <v-menu offset-y :close-on-content-click=\"false\"\r\n                                v-if=\"h.filters ||  typeof h.filters !== 'undefined'\">\r\n                          <template v-slot:activator=\"{ on, attrs }\">\r\n                            <v-btn icon x-small v-bind=\"attrs\" v-on=\"on\">\r\n                              <v-icon>mdi-filter</v-icon>\r\n                            </v-btn>\r\n                          </template>\r\n\r\n                          <v-card elevation=\"0\" class=\"white pa-2\" max-width=\"20vw\">\r\n                            <v-chip\r\n                                :color=\"inFilter(h.value, filter.value) ? getColor(filter.color_id) : 'grey lighten-1'\"\r\n                                text-color=\"white\"\r\n                                class=\"ml-2 mt-2\"\r\n                                v-for=\"(filter, hindex) in h.filters\"\r\n                                :key=\"hindex\"\r\n                                filter @click=\"filterFunc(h.value, filter.value)\">{{ filter.text }}\r\n                            </v-chip>\r\n                          </v-card>\r\n\r\n                        </v-menu>\r\n                      </div>\r\n                    </template>\r\n\r\n                    <div class=\"pa-2 text-center\" style=\"max-width:250px\">\r\n                      <span v-html=\"h.text\"></span>\r\n                    </div>\r\n\r\n                  </v-tooltip>\r\n                </slot>\r\n              </portal>\r\n\r\n\r\n              <v-edit-dialog v-if=\"false\">\r\n                <portal-target :name=\"`header` + index\"></portal-target>\r\n                <template v-slot:input>\r\n                  <v-text-field v-model=\"h.text\"></v-text-field>\r\n                </template>\r\n              </v-edit-dialog>\r\n\r\n            </th>\r\n          </template>\r\n          <!--Кнопки-действия - убрать в компонент-->\r\n          <th v-if=\"Object.values(actions).find((item) => item === true)\" :width=\"getActionsWidth\">\r\n            <v-col class=\"text-right\">\r\n              <slot name=\"actions.create\" v-if=\"actions.create\">\r\n                <v-btn icon small @click=\"createItem\" class=\"mr-1\">\r\n                  <v-icon>\r\n                    mdi-plus\r\n                  </v-icon>\r\n                </v-btn>\r\n                <!--                <v-menu offset-y>\r\n                                  <template v-slot:activator=\"{ on, attrs }\">\r\n                                    <v-btn icon small class=\"mr-1\" v-bind=\"attrs\" v-on=\"on\">\r\n                                      <v-icon>\r\n                                        mdi-dots-vertical\r\n                                      </v-icon>\r\n                                    </v-btn>\r\n                                  </template>\r\n                                  <v-list>\r\n                                    <v-list-item>\r\n                                      <v-list-item-content>\r\n                                        <v-btn text>\r\n                                          <v-icon>\r\n                                            mdi-format-list-group\r\n                                          </v-icon>\r\n                                          Пакетное изменение\r\n                                        </v-btn>\r\n                                      </v-list-item-content>\r\n                                    </v-list-item>\r\n                                  </v-list>\r\n                                </v-menu>-->\r\n\r\n\r\n              </slot>\r\n\r\n              <v-btn icon v-if=\"actions.editAll && requireCheckbox()\" @click=\"editAllOpenDialog\"\r\n                     :disabled=\"checkbox.ids.length === 0\">\r\n                <v-icon>\r\n                  mdi-pencil\r\n                </v-icon>\r\n              </v-btn>\r\n\r\n              <v-btn icon v-if=\"actions.deleteAll && requireCheckbox()\" :disabled=\"checkbox.ids.length === 0\">\r\n                <v-icon>\r\n                  mdi-delete\r\n                </v-icon>\r\n              </v-btn>\r\n              <slot name=\"header.action.append\"></slot>\r\n            </v-col>\r\n          </th>\r\n        </tr>\r\n        </thead>\r\n      </template>\r\n\r\n      <!--Template шапки таблицы - Мобильные устройства-->\r\n      <template v-slot:header=\"{ props: { headers } }\" v-else>\r\n        <div v-if=\"Object.values(actions).find((item) => item === true)\" :width=\"getActionsWidth\">\r\n          <v-col class=\"text-right\">\r\n            <slot name=\"actions.create\" v-if=\"actions.create\">\r\n              <v-btn icon small @click=\"createItem\" class=\"mr-1\">\r\n                <v-icon>\r\n                  mdi-plus\r\n                </v-icon>\r\n              </v-btn>\r\n            </slot>\r\n            <v-btn icon small v-if=\"actions.deleteAll\">\r\n              <v-icon>\r\n                mdi-delete\r\n              </v-icon>\r\n            </v-btn>\r\n            <slot name=\"header.action.append\"></slot>\r\n          </v-col>\r\n          <v-divider></v-divider>\r\n        </div>\r\n      </template>\r\n\r\n      <!--Template содержимого таблицы - Десктопные устройства-->\r\n      <template v-slot:item=\"{ item, index, headers }\" v-if=\"isLargeDesktop || isDesktop\">\r\n        <tr v-show=\"!loading\" :class=\"{ 'opacity' : isOpacityFiltered(item) }\">\r\n          <td v-if=\"isEnableCheckbox\">\r\n            <v-checkbox v-model=\"checkbox.ids\" multiple :value=\"item.id\"></v-checkbox>\r\n          </td>\r\n          <template v-for=\"header in Object.values(headers)\">\r\n            <td :width=\"header.width\" :key=\"header.id\" v-if=\"(header.enable || true) && header.text.length > 0\">\r\n              <slot name=\"column\" v-bind:item=\"item\" v-bind:header=\"header\">\r\n                <v-tooltip bottom :disabled=\"header.tooltip ||  typeof header.tooltip !== 'undefined'\">\r\n                  <template v-slot:activator=\"{ on, attrs }\">\r\n                    <div v-bind=\"attrs\" v-on=\"on\">\r\n                      <div\r\n                          v-html=\"settings.dense ? truncate(_.get(item, header.value, '') ,15, '...') : _.get(item, header.value, '')\"></div>\r\n                    </div>\r\n                  </template>\r\n                  <div class=\"pa-2 text-center\" style=\"max-width:250px\">\r\n                    <span v-html=\"_.get(item, header.value, '')\"></span>\r\n                  </div>\r\n                </v-tooltip>\r\n              </slot>\r\n            </td>\r\n          </template>\r\n\r\n          <td v-if=\"Object.values(actions).find((item) => item === true)\" :width=\"getActionsWidth\">\r\n            <v-col class=\"text-right\">\r\n              <slot name=\"action.prepend\" v-bind:item=\"item\"></slot>\r\n              <v-btn icon color=\"green darken-3\" class=\"mr-1\"\r\n                     v-if=\"actions.view\"\r\n                     @click=\"viewItem(item)\">\r\n                <v-icon>\r\n                  mdi-eye\r\n                </v-icon>\r\n              </v-btn>\r\n              <v-btn icon color=\"primary\" class=\"mr-1\" v-if=\"actions.edit\" @click=\"editItem(item)\">\r\n                <v-icon>\r\n                  mdi-pencil\r\n                </v-icon>\r\n              </v-btn>\r\n              <v-btn icon color=\"red darken-3\" v-if=\"actions.delete\" @click=\"deleteItem(item)\">\r\n                <v-icon>\r\n                  mdi-delete\r\n                </v-icon>\r\n              </v-btn>\r\n              <slot name=\"action.append\" v-bind:item=\"item\"></slot>\r\n            </v-col>\r\n          </td>\r\n        </tr>\r\n        <!--        <tr>\r\n                  <v-card elevation=\"0\">\r\n                    <v-card-text>\r\n                      <image-viewer :item=\"\"></image-viewer>\r\n                    </v-card-text>\r\n                  </v-card>\r\n                </tr>-->\r\n\r\n      </template>\r\n      <!--Template содержимого таблицы - Мобильные устройства-->\r\n      <template v-slot:item=\"{ item, index, headers }\" v-else>\r\n        <v-card class=\"mb-6\">\r\n          <v-card-text>\r\n            <template v-for=\"header in Object.values(headers)\">\r\n              <div :width=\"header.width\" :key=\"header.id\" v-if=\"(header.enable || true) && header.text.length > 0\">\r\n                <slot name=\"column\" v-bind:item=\"item\" v-bind:header=\"header\">\r\n                  <div>\r\n                    <strong>{{ header.text }}:</strong>\r\n                    <span v-html=\"_.get(item, header.value, '')\"></span>\r\n                  </div>\r\n                </slot>\r\n              </div>\r\n            </template>\r\n          </v-card-text>\r\n\r\n          <v-divider class=\"mx-4\"></v-divider>\r\n\r\n          <v-card-actions>\r\n            <div v-if=\"Object.values(actions).find((item) => item === true)\" :width=\"getActionsWidth\">\r\n              <v-col class=\"text-right\">\r\n                <slot name=\"action.prepend\" v-bind:item=\"item\"></slot>\r\n                <v-btn icon color=\"green darken-3\" class=\"mr-4\"\r\n                       v-if=\"actions.view\"\r\n                       @click=\"viewItem(item)\">\r\n                  <v-icon>\r\n                    mdi-eye\r\n                  </v-icon>\r\n                </v-btn>\r\n                <v-btn icon color=\"primary\" class=\"mr-4\" v-if=\"actions.edit\" @click=\"editItem(item)\">\r\n                  <v-icon>\r\n                    mdi-pencil\r\n                  </v-icon>\r\n                </v-btn>\r\n                <v-btn icon color=\"red darken-3\" v-if=\"actions.delete\" @click=\"deleteItem(item)\">\r\n                  <v-icon>\r\n                    mdi-delete\r\n                  </v-icon>\r\n                </v-btn>\r\n                <slot name=\"action.append\" v-bind:item=\"item\"></slot>\r\n              </v-col>\r\n            </div>\r\n          </v-card-actions>\r\n        </v-card>\r\n      </template>\r\n\r\n      <!--Template добавление данных перед содержимым таблиццы-->\r\n      <template v-slot:body.prepend=\"{ headers, items }\">\r\n        <slot name=\"body.prepend\" v-bind:headers=\"headers\" v-bind:items=\"items\"></slot>\r\n      </template>\r\n      <!--Template добавление данных после содержимым таблиццы-->\r\n      <template v-slot:body.append=\"{ headers, items }\">\r\n        <slot name=\"body.append\" v-bind:headers=\"headers\" v-bind:items=\"items\">\r\n        </slot>\r\n      </template>\r\n\r\n    </v-data-table>\r\n\r\n    <!--Пагинатор-->\r\n    <div class=\"text-center pt-2 pb-2\" v-if=\"pagination && dto.options.totalPages > 0\">\r\n      <v-pagination\r\n          v-model=\"dto.options.page\"\r\n          total-visible=\"10\"\r\n          :disabled=\"loading\"\r\n          :length=\"dto.options.totalPages\"\r\n      ></v-pagination>\r\n    </div>\r\n\r\n    <!--Диалоговое окно подтверждения удаления записи-->\r\n    <v-dialog v-model=\"dialogDeleteConfirm\" max-width=\"290\">\r\n      <v-card>\r\n        <v-card-title class=\"text-h5\">Удаление</v-card-title>\r\n        <v-card-text>Вы действительно хотите удалить?</v-card-text>\r\n        <v-card-actions>\r\n          <v-spacer></v-spacer>\r\n          <v-btn\r\n              color=\"darken-1\"\r\n              text\r\n              @click=\"dialogDeleteConfirm = false\"\r\n          >\r\n            Нет\r\n          </v-btn>\r\n          <v-btn\r\n              color=\"red darken-1\"\r\n              text\r\n              @click=\"deleteItem(itemDelete, true)\"\r\n          >\r\n            Да\r\n          </v-btn>\r\n        </v-card-actions>\r\n      </v-card>\r\n    </v-dialog>\r\n\r\n    <!--Диалоговое окно редактирования всех записей-->\r\n    <v-dialog v-model=\"dialogEditAllOpen\" max-width=\"768vh\">\r\n      <v-card>\r\n        <v-card-title class=\"text-h5\"></v-card-title>\r\n        <v-card-text>\r\n          <slot name=\"action.edit-all.text\"></slot>\r\n        </v-card-text>\r\n      </v-card>\r\n    </v-dialog>\r\n\r\n  </div>\r\n</template>\r\n\r\n<script>\r\n/**\r\n * headers: {\r\n * text: '#',\r\n * value: 'id',\r\n * width: '25px',\r\n * enable: false|true,\r\n * tooltip: false|true,\r\n * },\r\n *\r\n *\r\n *\r\n *  Props:\r\n * @property {array} this.data - required\r\n * @property {array} this.headers - required\r\n * @property  {boolean} this.loading  - required\r\n * @property {boolean} this.dense\r\n * @property {boolean} this.actionsWidth Ширина колонки с кнопками\r\n * @typedef  {DataTableConfig}  this.config - Конфигурация таблицы\r\n * @typedef  {string}  this.table-title - Заголовок таблицы\r\n *\r\n * Events:\r\n * @event click-view -\r\n * @event click-edit -\r\n * @event click-delete -\r\n * @event click-deleteAll -\r\n * @event click-create -\r\n * @event update - Получение новых данных при пагинации\r\n * @event search(value) Поиск через API\r\n * Для работы следует в компоненте, где используется таблица создать свойства filters (объект класа Filters)\r\n *\r\n */\r\n\r\nimport searchingMixin from \"./mixins/searchingMixin\";\r\nimport actionsMixin from \"./mixins/actionsMixin\";\r\nimport sortMixin from \"./mixins/sortMixin\";\r\nimport deleteMixin from \"./mixins/deleteMixin\";\r\nimport truncateMixin from \"./mixins/truncateMixin\";\r\nimport lodashMixin from \"./mixins/lodashMixin\";\r\nimport paginationMixin from \"./mixins/paginationMixin\";\r\nimport configMixin from \"./mixins/configMixin\";\r\nimport optionsMixin from \"./mixins/optionsMixin\";\r\nimport breakpointMixin from \"./mixins/breakpointMixin\";\r\nimport QueryDto from \"./dtos/queryDto\";\r\nimport checkboxMixin from \"./mixins/checkboxMixin\";\r\nimport filterMixin from \"./mixins/filterMixin\";\r\nimport DialogEditAll from './components/DialogEditAll.vue'\r\nimport colorPicker from \"./mixins/colorPicker\";\r\nimport settingsMixin from \"./mixins/settingsMixin\";\r\n\r\nexport default {\r\n  name: \"List\",\r\n  components: {DialogEditAll},\r\n  mixins: [\r\n    configMixin,\r\n    searchingMixin,\r\n    optionsMixin,\r\n    breakpointMixin,\r\n    lodashMixin,\r\n    sortMixin,\r\n    deleteMixin,\r\n    truncateMixin,\r\n    paginationMixin,\r\n    actionsMixin,\r\n    checkboxMixin,\r\n    filterMixin,\r\n    colorPicker,\r\n    settingsMixin\r\n\r\n  ],\r\n  props: {\r\n    tableTitle: {\r\n      type: String,\r\n      default: 'Таблица'\r\n    },\r\n    data: {\r\n      type: Array,\r\n      default: () => []\r\n    },\r\n    headers: {\r\n      type: Array,\r\n      default: () => []\r\n    },\r\n    api: {\r\n      type: Boolean,\r\n      default: false\r\n    },\r\n  },\r\n  created() {\r\n    if (this.config.eventBus === null || this.config.store === null) {\r\n      throw new Error('Не указан EventBus и Vuex Store в конфигурации таблицы!')\r\n    }\r\n\r\n    /** Когда необходимо обновить данные */\r\n    this.config.eventBus.$on('data-table-component-refresh', dto => {\r\n      this.update()\r\n    });\r\n    /** Когда необходимо синхроинизровать dto */\r\n    this.config.eventBus.$on('data-table-component-sync-dto', dto => {\r\n      this.dto = Object.assign(this.dto, dto)\r\n    });\r\n    if (this.api) {\r\n      this.update()\r\n    }\r\n  },\r\n  data() {\r\n    return {\r\n      dto: QueryDto.build({\r\n        options: this.options,\r\n        sorting: this.sorting,\r\n        searching: this.searching,\r\n      })\r\n    }\r\n  },\r\n  computed: {\r\n    loading() {\r\n      return this.config.store.state.loading\r\n    },\r\n  },\r\n  methods: {\r\n    update() {\r\n      if (this.isEnableCheckbox) {\r\n        this.checkbox.ids = []\r\n      }\r\n      this.$emit('update', this.dto)\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.opacity {\r\n  opacity: 0.5\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

/**
 * @class DataTableSort Данный класс используется сортировки
 */
class DataTableOptions$2 {
  constructor() {
    this.ids = [];
  }

}

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VDataTableExtended', __vue_component__$1);
}
const plugin = {
  install
};
let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

export { DataTableConfig as Config, __vue_component__$1 as VDataTableExtended, DataTableOptions$2 as VDataTableExtendedCheckbox, install };

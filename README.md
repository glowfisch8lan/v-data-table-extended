Компонент Таблица:

1. Минимальный набор для отображения данных

````
<template>
    ...
        <data-table-component
            :headers="headers"
            :data="data"
            :config="dataTableConfig"
        >
        </data-table-component>
    ...
</template>
````

````
<script>
    date() {
        return {
        ...
              headers: [ {text: '#',value: 'id'} ],
              data: [ {id: 1} ],
              dataTableConfig: new DataTableConfig(),
        ...
        }
    }
</script>
````

<h3>Дальнейшее использование требует реализации API!</h3>
<b>[Обязательно] Подключение API</b><br>
Для передачи данных между участками кода используется <b>QueryDto</b>. В метод <b>build</b> которого передается объект с
данными. Если у вас отсутствует сортировка, пагинация или поиск на странице, то вам следует не передавать в объект те
или иные значения. Система автоматически подставит вместо этого null. <br><br>

Endpoint должен возвращать items => '',

Чтобы подключить к таблице API следует встроить в код следующие строки:

````
<template>
...
    <data-table-component
        ...
        @update="update"
        >
    </data-table-component>
...
</template>
````

````
<script>
    ...
      computed: {
        queryDto() {
          return QueryDto.build({
            options: this.options,
            sorting: this.sorting,
            searching: this.searching,
          })
        }
      },
      created() {
        this.update(this.queryDto)
      },
    ...
</script>
````

````
<script>
    ...
    mixins: {
        ...
        fetchMixin,
        ...
    }
    ...
</script>
````

````
<script>
    methods: {
    ...
        update(queryDto) {
            this.fetch(this.url, queryDto)
        },
    ...
    }
</script>
````

<b>[Опционально] Пагинация</b>

````
<template>
    ...
    <data-table-component
        ...
        pagination
        :options="options"
        @options="optionsUpdate"
        ...
    >
    </data-table-component>
    ...
</template>
````

````
<script>
    ...
    data() {
        return {
          options: new DataTableOptions(),
        }
    },
    methods: {
        ...
        optionsUpdate(value) {
          this.options = value;
        },
        ...
    }
</script>
````

<b>[Опционально] Сортировка</b>

````
<template>
    ...
    <data-table-component
        ...
        :sorting="sorting"
        @click-sort="sortBy"
    >
    </data-table-component>
    ...
</template>
````

````
<script>
    ...
    data() {
        return {
            ...
            sorting: new DataTableSort()
            ...
        }
    }
    ...
</script>
````

````
<script>
    ...
    methods: {
        ...
        sortBy(sorting) {
          this.sorting = sorting
          this.update(this.queryDto)
        },
        ...
    }
    ...
</script>
````

<b>[Опционально] Поиск</b>

````
<template>
    ...
    <data-table-component
        ...
        @search="search">
    </data-table-component>
    ...
</template>
````

````
#<script> => created
...
  created() {
    this.update(this.queryDto)
  },
  data() {
  return {
        searching: new DataTableSearching(),
        }
        }
...
````

````
#<script> => methods
...
    search(value) {
      this.searching.search = value
    },
...
````

<b>[Опционально] Кнопки-действия</b>
<br>
<p>По-умолчанию все кнопки выключены. Существует две группы кнопок - в Шапке и непосредственно в строках с данными, 
для управления записями. </p>
<p>
В шапке есть три типичные операции CRUD - Создать, Редактировать и Удалить.
Редактирование и Удаление работает для всех записей, выделенных чекбоксами - это Пакетное редактирование/удаление.

````
<template>
    ...
        <data-table-component
            ...
            @click-view="viewItem"
            @click-create="createItem"
            @click-edit="editItem"
            @click-delete="deleteItem"
            ...
        >
        </data-table-component>
    ...
</template>
````

````
<script>
    ...
    date() {
        return {
        ...
          dataTableConfig: new DataTableConfig({
            actions: {
              edit: true,
              view: true,
              create: true,
              editAll: true,
              deleteAll: true,
            }
          }),
        ...
        }
    }
    ...
    methods: {
        /** ACTIONS */
        createItem() {
        },
        viewItem(item) {
        },
        deleteItem(item) {
        },
        editItem(item) {
        },
    }
</script>
````

<b>[Опционально] Чекбоксы</b>
<p>
Использование чекбоксов позволяет применять такие функции как "Пакетное редактирование"
и "Пакетное удаление".
</p>
<p>
Вышеназванные методы следует реализовать отдельно в каждом модуле посредством директивы <b>slot</b>
</p>

````
<template>
    ...
        <data-table-component
            ...
            :checkbox="checkbox"
            ...
        >
        </data-table-component>
    ...
</template>
````

4. Фильтрация


6. Настройки


9. Кастомизация
   <template v-slot:column="{ item, header }">
   <div v-if="header.value === 'tags'">
   <v-chip-group>
   <v-chip text-color="white" :color='getColor(chip.color_id)' v-for="chip in _.get(item, header.value, '')"
   :key="chip.id">{{ chip.name }}
   </v-chip>
   </v-chip-group>
   </div>
   </template>
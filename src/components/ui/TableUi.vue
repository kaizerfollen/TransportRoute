<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    :domLayout="'autoHeight'"
    :gridOptions="activeTab === 'routes' ? gridOptionsRoutes : gridOptionsStops"
    :key="activeTab"
    @cellClicked="onCellClicked"
  />
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { AgGridVue } from 'ag-grid-vue';

export default {
  name: 'TableUi',
  components: {
    AgGridVue,
  },

  computed: {
    ...mapGetters({
      tableDataRoutes: 'data/routes',
      tableDataStops: 'data/stops',
      activeTab: 'activeTab',
    }),

    gridOptionsRoutes() {
      return {
        columnDefs: [
          {
            headerName: 'Имя',
            field: 'name',
            flex: 1,
          },
          {
            headerName: 'Кол-во остановок',
            field: 'stop_count',
            flex: 1,
          },
        ],
        rowData: this.tableDataRoutes,
        getContextMenuItems: this.getContextMenuItems,
      };
    },

    gridOptionsStops() {
      return {
        columnDefs: [
          {
            headerName: 'Имя',
            field: 'name',
            flex: 1,
          },
          {
            headerName: 'Кол-во маршрутов',
            field: 'routes_count',
            flex: 1,
          },
          {
            headerName: 'Направление',
            field: 'forward',
            flex: 1,
          },
        ],
        rowData: this.tableDataStops,
      };
    },
  },

  methods: {
    ...mapMutations({
      showRoute: 'data/SHOW_ROUTE',
      showStop: 'data/SHOW_STOP',
      setActiveRoute: 'SET_ACTIVE_ROUTE',
    }),

    onCellClicked(params) {
      if (params.data.type === 'route') {
        this.showRoute(params.data);
      } else {
        this.showStop(params.data);
      }
    },

    getContextMenuItems(params) {
      return [
        {
          name: 'Подробно',
          action: () => {
            this.setActiveRoute(params.node.data);
            this.$router.push({ path: `/route/${params.node.data.id}` });
          },
        },
      ];
    },
  },
};
</script>

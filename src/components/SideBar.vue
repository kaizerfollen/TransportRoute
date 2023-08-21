<template>
  <div class="sidebar">
    <Tabs
      :tabs="tabs"
      :active-tab="activeTab"
      @change-tab="changeTab"
    />
    <TableUi
      class="table"
      :active-tab="activeTab"
    />
  </div>
</template>

<script>

import Tabs from './ui/TabsUi.vue';
import TableUi from './ui/TableUi.vue';

export default {
  name: 'SideBar',
  components: {
    Tabs,
    TableUi,
  },
  data() {
    return {
      loadingCellRenderer: null,
      rowData: [],
      tabs: [
        {
          name: 'Маршруты',
          value: 'routes',
          id: 1,
        },
        {
          name: 'Остановки',
          value: 'stop',
          id: 2,
        },
      ],
      activeTab: 'routes',
    };
  },
  methods: {
    changeTab(value) {
      this.activeTab = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  padding: 12px;
  .table {
    overflow: scroll;
    height: calc(100% - 60px);
  }
}
</style>

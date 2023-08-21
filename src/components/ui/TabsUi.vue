<template>
  <div class="tabs">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="tab"
    >
      <Button
        :name="tab.name"
        :active="activeTab === tab.value"
        :type="'button'"
        @onClick="changeTab(tab.value)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Button from './ButtonUi.vue';

export default {
  name: 'TabsUi',
  components: {
    Button,
  },
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapGetters({
      activeTab: 'activeTab',
    }),
  },

  methods: {
    ...mapMutations({
      setActivetab: 'SET_ACTIVE_TAB',
      resetStops: 'data/RESET_STOPS',
      resetRoutes: 'data/RESET_ROUTES',
    }),

    changeTab(value) {
      this.setActivetab(value);
      if (value === 'stop') {
        this.resetStops();
      } else {
        this.resetRoutes();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  justify-content: space-around;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #181d1f12;
  .tab {
    border-radius: 4px;
  }
}
</style>

<template>
  <div v-if="isLoading" class="loader">
    <LoaderUi />
  </div>
  <div v-else class="layout-container">
    <SideBar class="left-side" />
    <MapComponent class="right-side" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SideBar from '../components/SideBar.vue';
import MapComponent from '../components/map/MapComponent.vue';
import LoaderUi from '../components/ui/LoaderUi.vue';

export default {
  name: 'MainView',
  components: {
    SideBar,
    MapComponent,
    LoaderUi,
  },

  data() {
    return {
      polyline: null,
    };
  },

  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
    }),
  },
  methods: {
    ...mapActions({
      getData: 'data/GET_DATA',
    }),
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  height: 100vh;
}
.left-side {
  flex: 1;
}
.right-side {
  flex: 3;
}
</style>

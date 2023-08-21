<template>
  <div class="map-component">
    <l-map ref="map" style="height: 100vh; width: 100%" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" />
      <l-marker
        v-for="(stop, index) in stopMarkersMap"
        :key="'stop' + index"
        :lat-lng="stop.points"
      >
        <l-icon
          :icon-url="stop.forward ?
            require('../../assets/markers/MarkerStraightIcon.svg') :
            require('../../assets/markers/MarkerBackIcon.svg')"
          :iconAnchor="[13, 21]"
        />
        <l-tooltip>
          {{ stop.name }}
        </l-tooltip>
      </l-marker>

      <template v-if="activeTab === 'routes'">
        <l-polyline
          v-for="(route, index) in routesPolylinesMap"
          :key="'route' + index"
          :color="'black'"
          :lat-lngs="route.points"
          @click="showPolyline(route)"
        >
          <l-tooltip>
            {{ route.name }}
          </l-tooltip>
        </l-polyline>
      </template>

    </l-map>
  </div>
</template>

<script>
import L from 'leaflet';
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'MapComponents',

  computed: {
    ...mapState({
      zoom: 'zoomMap',
      center: 'centerMap',
      url: 'url',
    }),

    ...mapGetters({
      data: 'data/data',
      routesPolylinesMap: 'data/routesPolylinesMap',
      stopMarkersMap: 'data/stopMarkersMap',
      activeTab: 'activeTab',
    }),
  },

  watch: {
    routesPolylinesMap(newVal) {
      if (Array.isArray(newVal) && newVal[0] && newVal[0].length === 0) return;

      if (newVal.length === 1) {
        const map = this.$refs.map.mapObject;
        const polyline = L.polyline(newVal[0].points);
        const polylineBounds = polyline.getBounds();
        map.fitBounds(polylineBounds);
      } else {
        const points = newVal.map((el) => {
          if (!el.points) return [];
          return el.points;
        }).flat();

        const map = this.$refs.map.mapObject;
        const bounds = new L.LatLngBounds(points);
        map.fitBounds(bounds);
      }
    },

    stopMarkersMap(newVal) {
      if (newVal.length === 1) {
        const map = this.$refs.map.mapObject;
        const marker = L.marker(newVal[0].points);
        map.setView(marker.getLatLng(), 15);
      } else {
        const points = newVal.map((el) => {
          if (!el.points) return [];
          return el.points;
        });

        const map = this.$refs.map.mapObject;
        const bounds = new L.LatLngBounds(points);
        map.fitBounds(bounds);
      }
    },
  },

  methods: {
    ...mapMutations({
      showRoute: 'data/SHOW_ROUTE',
    }),

    showPolyline(route) {
      this.showRoute(route);
    },
  },
};

</script>

<style lang="scss" scoped>
.map-component {
  height: 100%;
  width: 100%;
}
</style>

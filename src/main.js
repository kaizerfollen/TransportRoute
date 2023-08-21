import Vue from 'vue';
import {
  LMap,
  LTileLayer,
  LMarker,
  LPolyline,
  LGeoJson,
  LFeatureGroup,
  LIcon,
  LTooltip,
} from 'vue2-leaflet';
import App from './App.vue';
import store from './store';

import 'leaflet/dist/leaflet.css';

// eslint-disable-next-line import/order
import { Icon } from 'leaflet';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'ag-grid-enterprise';

import router from './router';

Vue.config.productionTip = false;
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-polyline', LPolyline);
Vue.component('l-geo-json', LGeoJson);
Vue.component('l-feature-group', LFeatureGroup);
Vue.component('l-icon', LIcon);
Vue.component('l-tooltip', LTooltip);

// eslint-disable-next-line no-underscore-dangle
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  // eslint-disable-next-line global-require
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  // eslint-disable-next-line global-require
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  // eslint-disable-next-line global-require
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');

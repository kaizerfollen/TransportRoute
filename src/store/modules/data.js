import axios from '@/plugins/axios';

const deafultState = {
  data: [],
  routes: [],
  stops: [],
};

const getters = {
  data: (state) => state.data,

  routesPolylinesMap: (state) => state.routes.map((route) => {
    if (route.Points && route.Points.length) {
      return {
        points: route.Points.map((el) => ([el.Lat, el.Lon])),
        name: route.Name,
        id: route.ID,
      };
    }
    return [];
  }),

  stopMarkersMap: (state) => state.stops.map((el) => ({
    points: [el.Lat, el.Lon],
    forward: el.Forward,
    name: el.Name,
    id: el.ID,
  })),

  routes: (state) => state.data.map((route) => ({
    name: route.Name,
    stop_count: route.Stops.length,
    id: route.ID,
    points: route.Points ? route.Points.map((point) => ([point.Lat, point.Lon])) : [],
    stops: route.Stops,
    description: route.Description,
    type: 'route',
  })),

  stops: (state) => state.data.reduce((result, route) => {
    const stopsForRoute = route.Stops.map((stop) => {
      const routesCount = state.data.filter((r) => r.Stops.some((s) => s.ID === stop.ID)).length;

      return {
        name: stop.Name,
        lat: stop.Lat,
        lon: stop.Lon,
        forward: stop.Forward ? 'Прямое' : 'Обратное',
        routes_count: routesCount,
        route_id: stop.RouteID,
        id: stop.ID,
      };
    });
    return [...result, ...stopsForRoute];
  }, []),
};

// const arr = [
//   {
//     ID: 10605,
//     Name: 122,
//     Description: 'Кола-Кильдинстрой',
//     Points: [
//       {
//         RouteID: 10605,
//         Lat: 68.8892754224929,
//         Lon: 33.04898858070374,
//         Forward: true,
//       },
//       {
//         RouteID: 10606,
//         Lat: 68.8892754224929,
//         Lon: 33.04898858070374,
//         Forward: true,
//       },
//     ],
//     Stops: [
//       {
//         ID: 9667,
//         RouteID: 10605,
//         Forward: true,
//         Name: 'Станция Кола',
//         Lat: 68.88935069748057,
//         Lon: 33.04883079999999,
//       },
//       {
//         ID: 9668,
//         RouteID: 10605,
//         Forward: true,
//         Name: 'Станция HJU>',
//         Lat: 68.88935069744342,
//         Lon: 33.23423432435555,
//       },
//       {
//         ID: 9668,
//         RouteID: 10606,
//         Forward: true,
//         Name: 'Станция HJU>',
//         Lat: 68.88935069744342,
//         Lon: 33.23423432435555,
//       },
//     ],
//   },
//   {
//     ID: 10606,
//     Name: 122,
//     Description: 'Кола-Кильдинстрой',
//     Points: [
//       {
//         RouteID: 10605,
//         Lat: 68.8892754224929,
//         Lon: 33.04898858070374,
//         Forward: true,
//       },
//       {
//         RouteID: 10606,
//         Lat: 68.8892754224929,
//         Lon: 33.04898858070374,
//         Forward: true,
//       },
//     ],
//     Stops: [
//       {
//         ID: 9667,
//         RouteID: 10605,
//         Forward: true,
//         Name: 'Станция Кола',
//         Lat: 68.88935069748057,
//         Lon: 33.04883079999999,
//       },
//       {
//         ID: 9668,
//         RouteID: 10605,
//         Forward: true,
//         Name: 'Станция HJU>',
//         Lat: 68.88935069744342,
//         Lon: 33.23423432435555,
//       },
//       {
//         ID: 9668,
//         RouteID: 10606,
//         Forward: true,
//         Name: 'Станция HJU>',
//         Lat: 68.88935069744342,
//         Lon: 33.23423432435555,
//       },
//     ],
//   },
// ];

const actions = {
  async GET_DATA({ commit }) {
    try {
      commit('SET_LOADING', true, { root: true });
      const { data } = await axios.get('/routes_data');
      commit('SET_DATA', data);
    } catch (err) {
      commit('SET_ERRORS', err, { root: true });
    } finally {
      commit('SET_LOADING', false, { root: true });
    }
  },
};

const mutations = {
  SET_DATA(state, payload) {
    state.data = payload;
    state.routes = payload;

    state.stops = payload.flatMap((stop) => {
      if (stop.Stops && stop.Stops.length) {
        return stop.Stops;
      }
      return [];
    });
  },

  SHOW_ROUTE(state, payload) {
    state.routes = state.data.filter((el) => el.ID === payload.id);
  },

  SHOW_STOP(state, payload) {
    const [route] = state.data.filter((el) => el.ID === payload.route_id);
    const [stop] = route.Stops.filter((el) => el.ID === payload.id);
    state.stops = [stop];
  },

  RESET_STOPS(state) {
    state.stops = state.data.flatMap((stop) => {
      if (stop.Stops && stop.Stops.length) {
        return stop.Stops;
      }
      return [];
    });
  },

  RESET_ROUTES(state) {
    state.routes = state.data;
  },
};

export default {
  namespaced: true,
  state: deafultState,
  actions,
  mutations,
  getters,
};

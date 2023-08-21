<template>
  <div class="route-info">
    <div class="description">
      <h2 class="title">Информация о маршруте</h2>
      <p class="text">
        Имя маршрута: <span>{{ activeRoute.name }}</span>
      </p>
      <p class="text">
        Описание: <span>{{ activeRoute.description }}</span>
      </p>
      <p class="text">
        Кол-во остановок в прямом направлении: <span>{{ totalStop.countStopStraight.length }}</span>
      </p>
      <p class="text">
        Кол-во остановок в обратном направлении: <span>{{ totalStop.countStopBack.length }}</span>
      </p>
      <ButtonUi class="btn-back" :name="'Назад'" :type="'button'" @onClick="goBack" />
    </div>
    <div class="stop">
      <div class="stop__straight">
        <h3 class="sub-title">Остановки в прямом направлении:</h3>
        <ul>
          <li v-for="stop in totalStop.countStopStraight" :key="stop.ID" class="straight">
            {{ stop.Name }}
          </li>
        </ul>
      </div>
      <div class="stop__back">
        <h3 class="sub-title">Остановки в обратном направлении:</h3>
        <ul>
          <li v-for="stop in totalStop.countStopBack" :key="stop.ID" class="back">
            {{ stop.Name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ButtonUi from '../components/ui/ButtonUi.vue';

export default {
  name: 'RouteView',

  components: {
    ButtonUi,
  },

  computed: {
    ...mapGetters({
      activeRoute: 'activeRoute',
    }),

    totalStop() {
      const countStopStraight = this.activeRoute.stops.filter((el) => el.Forward);
      const countStopBack = this.activeRoute.stops.filter((el) => !el.Forward);

      return {
        countStopStraight,
        countStopBack,
      };
    },
  },

  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.route-info {
  display: flex;
  justify-content: space-between;

  .description {
    width: 100%;
    padding: 20px;
    .title {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .text {
      margin-bottom: 5px;

      span {
        font-weight: bold;
      }
    }

    .btn-back {
      margin-top: 18px;
    }
  }

  .stop {
    display: flex;
    width: 100%;
    padding: 20px;

    &__straight {
      margin-right: 10px;
      color: blue;
    }

    &__back {
      color: red;
    }

    &__straight, &__back {
      padding: 10px;
      border: 1px solid #ccc;
      width: 50%;

      .sub-title {
        font-size: 18px;
        margin-bottom: 10px;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>

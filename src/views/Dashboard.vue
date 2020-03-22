<template>
  <div class="container">
    <div class="row justify-content-center">
      <div v-if="user.data.emailVerified" class="col-md-8">
        <Points></Points>
      </div>
      <div v-else class="col-md-8">
        <div class="card">
          <div class="card-header">Dashboard</div>
          <div class="card-body">
            <div class="alert" role="alert">
              Para ter acesso aos seus pontos, verifique seu email e confirme sua conta!
            </div>
          </div>
        </div>
      </div>
      <div v-if="user.data.emailVerified" class="col-lg-6">
        <Benefits class="card-space h-100"></Benefits>
      </div>
      <div v-if="user.data.emailVerified" class="col-lg-6">
        <Rewards class="card-space h-100"></Rewards>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import Points from '@/components/Points.vue';
import Benefits from '@/components/Benefits.vue';
import Rewards from '@/components/Rewards.vue';

@Component({
  components: {
    Benefits,
    Points,
    Rewards,
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
  },
})
export default class Dashboard extends Vue {}
</script>

<style lang="scss" scoped>
  .card-space {
    margin-top: 16px;
    @include media-breakpoint-up(md) {
      margin-top: 32px;
    }
  }
</style>

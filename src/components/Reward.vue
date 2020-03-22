<template>
  <div class="card">
    <img class="card-img-top" :src="reward.image" :alt="reward.name">
    <div class="card-body">
      <h5 class="card-title">{{ reward.name }}</h5>
      <p v-if="reward.description" class="card-text">{{ reward.description }}</p>
      <p class="card-text">Pontos: {{ reward.points }}</p>
    </div>
    <div class="card-footer d-flex justify-content-center align-items-center">
      <button @click.prevent="acquireReward" class="btn btn-primary">Reinvidicar</button>
    </div>
    <Modal :alert="alert"></Modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Modal from '@/components/Modal.vue';
import { RewardStateInterface } from '@/store/Rewards/RewardsStateInterface';

@Component({
  computed: {
    ...mapGetters({
      points: 'user/points',
    }),
  },
  components: {
    Modal,
  },
})
export default class Reward extends Vue {
    @Prop(Object) readonly reward!: RewardStateInterface;

    protected alert: {
      open: boolean;
      title: string;
      description: string;
      class: string;
    } = {
      open: false,
      title: '',
      description: '',
      class: '',
    };

    protected points!: number;

    protected async acquireReward(): Promise<void> {
      try {
        await this.$store.dispatch('rewards/setUserReward', this.reward.id);
        this.alert = {
          open: true,
          title: 'Ora, ora!',
          description: `Você acabou de reinvidicar ${this.reward.name}!<br>Você receberá mais informaçōes sobre sua reinvindicação.`,
          class: 'info',
        };
      } catch (e) {
        console.error(e);
      }
    }
}
</script>

<style lang="scss" scoped>
  .card-footer {
    background-color: inherit;
  }
</style>

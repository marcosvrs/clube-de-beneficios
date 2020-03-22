<template>
  <div class="card">
    <img class="card-img-top" :src="benefit.image" :alt="benefit.name">
    <div class="card-body">
      <h5 class="card-title">{{ benefit.name }}</h5>
      <p v-if="benefit.description" class="card-text">{{ benefit.description }}</p>
      <p class="card-text">Pontos: {{ benefit.points }}</p>
    </div>
    <div class="card-footer d-flex justify-content-center align-items-center">
      <button @click.prevent="acquireBenefit" class="btn btn-primary">Adquirir</button>
    </div>
    <Modal :alert="alert"></Modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BenefitStateInterface } from '@/store/Benefits/BenefitsStateInterface';
import { mapGetters } from 'vuex';
import Modal from '@/components/Modal.vue';

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
export default class Benefit extends Vue {
    @Prop(Object) readonly benefit!: BenefitStateInterface;

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

    protected async acquireBenefit(): Promise<void> {
      if (this.points >= this.benefit.points) {
        try {
          await this.$store.dispatch('benefits/setUserBenefit', this.benefit.id);
          this.alert = {
            title: 'Parabéns!',
            description: `Você acabou de adquirir ${this.benefit.name}!<br>Você receberá mais informaçōes sobre sua aquisição.`,
            class: 'success',
            open: true,
          };

          return;
        } catch (e) {
          console.error(e);
        }
      }
      this.alert = {
        open: true,
        title: 'Nananinanão!',
        description: 'Infelizmente você não tem pontos o suficiente para essa acquisição.<br>'
          + 'Tente reinvidicar alguns pontos!',
        class: 'error',
      };
    }
}
</script>

<style lang="scss" scoped>
  .card-footer {
    background-color: inherit;
  }
</style>

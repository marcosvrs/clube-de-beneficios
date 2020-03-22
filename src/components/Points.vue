<template>
  <div class="card">
    <div class="card-header">Olá, {{user.data.displayName}}!</div>
    <div class="card-body">
      Bem vinda ao Clube de Benefícios - MV!<br>
      Temos o prazer em te-la como integrante desse clube.<br>
      Siga em tempo real seus pontos aculumados:
      <span>{{points}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  computed: {
    ...mapGetters({
      user: 'user/user',
      points: 'user/points',
    }),
  },
})
export default class Points extends Vue {
    protected intervalNumber = 0;

    protected async mounted(): Promise<void> {
      try {
        await this.$store.dispatch('user/setPointsRef');
        this.$nextTick(() => {
          this.intervalNumber = window.setInterval(this.countDown.bind(this), 1000);
        });
      } catch (e) {
        console.error(e);
      }
    }

    protected async countDown(): Promise<void> {
      try {
        await this.$store.dispatch('user/addUserPointsRef', 0.01);
      } catch (e) {
        console.error(e);
      }
    }

    protected destroyed(): void {
      window.clearInterval(this.intervalNumber);
    }
}
</script>

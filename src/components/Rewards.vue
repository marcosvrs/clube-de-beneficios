<template>
  <div class="card">
    <div class="card-header">Reivindique seus pontos!</div>
    <div class="card-body">
      Caso você queira receber alguns pontos extras, escolha uma de nossas opçōes de recompensas:
    </div>
    <div v-if="rewards.length" class="card-body">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-2">
        <div class="col mb-4" v-for="reward in rewards" :key="reward.id">
          <Reward class="h-100" :reward="reward"></Reward>
        </div>
      </div>
    </div>
    <div class="card-body" v-else>
      Em breve, mais opçōes para você reivindicar seus pontos.
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import Reward from '@/components/Reward.vue';

@Component({
  components: {
    Reward,
  },
  computed: {
    ...mapGetters({
      rewards: 'rewards/items',
    }),
  },
})
export default class Rewards extends Vue {
  protected async mounted(): Promise<void> {
    try {
      this.$store.dispatch('rewards/setRewardsRef');
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

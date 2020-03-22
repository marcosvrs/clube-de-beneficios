<template>
  <div class="card">
    <div class="card-header">Troque seus pontos!</div>
    <div v-if="benefits.length" class="card-body">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-2">
        <div class="col mb-4" v-for="benefit in benefits" :key="benefit.id">
          <Benefit class="h-100" :benefit="benefit"></Benefit>
        </div>
      </div>
    </div>
    <div class="card-body" v-else>Em breve, mais opçōes para a troca de seus pontos.</div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import Benefit from '@/components/Benefit.vue';

@Component({
  components: {
    Benefit,
  },
  computed: {
    ...mapGetters({
      benefits: 'benefits/items',
    }),
  },
})
export default class Benefits extends Vue {
  protected async mounted(): Promise<void> {
    try {
      await this.$store.dispatch('benefits/setBenefitsRef');
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

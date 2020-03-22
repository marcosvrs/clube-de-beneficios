<template>
    <div class="container">

    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  computed: {
    ...mapGetters({
      requests: 'requests/item',
    }),
  },
})
export default class AdminDashboard extends Vue {

}
</script>

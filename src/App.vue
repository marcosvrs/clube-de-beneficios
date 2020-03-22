<template>
  <div>
    <Navbar></Navbar>
    <main>
      <router-view>
        Bem-Vindo ao Clube de Beneficios - MV.
        Entre com sua conta ou Cadastre-se.
      </router-view>
    </main>
  </div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
  main {
    display: flex;
  }
</style>

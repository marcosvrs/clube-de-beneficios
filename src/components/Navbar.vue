<template>
  <div class="container">
    <nav class="navbar navbar-expand-md navbar-light">
      <router-link to="/" class="navbar-brand"><span>Clube de Benefícios - MV</span><small
        class="text-muted">Conquistado seu coração</small></router-link>
      <button class="navbar-toggler" type="button" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label :class="{active: showMobileNavbar}"
        @click="showMobileNavbar = !showMobileNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
        <div class="collapse navbar-collapse show" id="navbarSupportedContent"
             v-if="showMobileNavbar">
          <ul class="navbar-nav mr-auto"></ul>
          <ul class="navbar-nav ml-auto">
            <template v-if="user.loggedIn">
              <li class="nav-item active">
                <span class="navbar-text nav-item-user">{{user.data.displayName}}</span>
              </li>
              <li class="nav-item">
                <a class="nav-link nav-item-logout" @click.prevent="signOut">Sair</a>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link to="login" class="nav-link">Entrar</router-link>
              </li>
              <li class="nav-item">
                <router-link to="register" class="nav-link">Cadastrar</router-link>
              </li>
            </template>
          </ul>
        </div>
      </transition>
    </nav>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
  },
})
export default class Navbar extends Vue {
    protected showMobileNavbar = true;

    protected signOut = async (): Promise<void> => {
      try {
        await this.$store.dispatch('user/logout');
      } catch (e) {
        console.error(e);
      }
    };

    protected enter = (element: HTMLElement): void => {
      const { width } = getComputedStyle(element);

      element.style.setProperty('width', width);
      element.style.setProperty('position', 'absolute');
      element.style.setProperty('visibility', 'hidden');
      element.style.setProperty('height', 'auto');

      const { height } = getComputedStyle(element);

      element.style.setProperty('width', null);
      element.style.setProperty('position', null);
      element.style.setProperty('visibility', null);
      element.style.setProperty('height', '0');

      // Force repaint to make sure the
      // animation is triggered correctly.
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height;

      // Trigger the animation.
      // We use `requestAnimationFrame` because we need
      // to make sure the browser has finished
      // painting after setting the `height`
      // to `0` in the line above.
      requestAnimationFrame(() => {
        element.style.setProperty('height', height);
      });
    };

    protected afterEnter = (element: HTMLElement): void => {
      element.style.setProperty('height', 'auto');
    };

    protected leave = (element: HTMLElement): void => {
      const { height } = getComputedStyle(element);

      element.style.setProperty('height', height);

      // Force repaint to make sure the
      // animation is triggered correctly.
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height;

      requestAnimationFrame(() => {
        element.style.setProperty('height', '0');
      });
    };
}
</script>

<style lang="scss" scoped>
  * {
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  .collapse:not(.show) {
    @include media-breakpoint-up(md) {
      display: inherit;
    }
  }

  .expand-enter-active,
  .expand-leave-active {
    transition: height .5s ease-in-out;
    overflow: hidden;
  }

  .expand-enter,
  .expand-leave-to {
    height: 0;
  }

  .navbar-brand {
    .text-muted {
      margin-left: 8px;
    }

    @include media-breakpoint-down(md) {
      display: flex !important;
      flex-direction: column;
      .text-muted {
        margin-left: 0;
      }
    }
  }

  .navbar-toggler {
    margin-left: auto;
  }

  .nav-item-user::after {
    @include media-breakpoint-up(sm) {
      content: '-';
      margin-left: 4px;
    }
  }

  .nav-item-logout {
    cursor: pointer;
  }
</style>

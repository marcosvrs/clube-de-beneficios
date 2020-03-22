<template>
  <div class="modal fade" :class="[{ show: alert.open }, alert.class]" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ alert.title }}</h5>
          <button @click.prevent="close" type="button" class="close" data-dismiss="modal"
                  aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p v-html="alert.description"></p>
        </div>
        <div class="modal-footer">
          <button @click.prevent="close" type="button" class="btn btn-secondary"
                  data-dismiss="modal">
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
    @Prop(Object) readonly alert!: {
      open: boolean;
      title: string;
      description: string;
      class: string;
    };

    protected close(): void {
      this.alert.open = false;
    }
}
</script>

<style lang="scss" scoped>
  .show {
    display: block !important;
  }

  .info {
    .modal-content {
      @extend .bg-light;

      .modal-header {
        @extend .text-white;
        @extend .bg-info;
      }

      .modal-body {
        @extend .text-info;
      }

      .btn {
        @extend .btn-info;
      }
    }
  }

  .success {
    .modal-content {
      .modal-header {
        @extend .text-white;
        @extend .bg-success;
      }

      .modal-body {
        @extend .text-success;
      }

      .btn {
        @extend .btn-success;
      }
    }
  }

  .error {
    .modal-content {
      .modal-header {
        @extend .text-white;
        @extend .bg-danger;
      }

      .modal-body {
        @extend .text-danger;
      }

      .btn {
        @extend .btn-danger;
      }
    }
  }
</style>

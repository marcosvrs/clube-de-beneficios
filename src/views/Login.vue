<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Entrar</div>
          <div class="card-body">
            <div v-if="success || error" :class="{'alert-danger': error, 'alert-success': success}"
                 class="alert alert-success alert-dismissible fade show" role="alert">
              {{success}}{{error}}
              <button @click.prevent="success = null, error = null" type="button" class="close"
                      data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="email" class="col-md-3 col-lg-4 col-form-label text-md-right">Email</label>
                <div class="col-md-8 col-lg-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="password" class="col-md-3 col-lg-4 col-form-label text-md-right">Senha</label>
                <div class="col-md-8 col-lg-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>
              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-3 offset-lg-4 col-lg-6 d-flex justify-content-between">
                  <button type="submit" class="btn btn-primary">Entrar</button>
                  <button type="button" @click.prevent="resetPassword"
                          class="btn btn-secondary">
                    Resetar Senha
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
    protected form: {
      email: null | string;
      password: null | string;
    } = {
      email: null,
      password: null,
    };

    protected error: string | null = null;

    protected success: string | null = null;

    protected async resetPassword(): Promise<void> {
      try {
        await this.$store.dispatch('user/reset', {
          userEmail: this.form.email,
        });
        this.error = null;
        this.success = 'Um link foi enviado ao seu email para os próximos passos.';
      } catch (err) {
        this.success = null;
        this.error = err ? err.message : null;
      }
    }

    protected async submit(): Promise<void> {
      try {
        await this.$store.dispatch('user/login', {
          userEmail: this.form.email,
          userPassword: this.form.password,
        });
      } catch (err) {
        this.success = null;
        this.error = err ? err.message : null;
      }
    }
}
</script>

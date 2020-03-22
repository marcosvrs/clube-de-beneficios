<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Cadastrar</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
              {{error}}
              <button @click.prevent="error = null" type="button" class="close"
                      data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="name" class="col-md-3 col-lg-4 col-form-label text-md-right">Nome</label>
                <div class="col-md-8 col-lg-6">
                  <input
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    value
                    required
                    autofocus
                    v-model="form.name"
                  />
                </div>
              </div>
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
                <div class="col-md-8 offset-md-3 offset-lg-4 col-lg-6">
                  <button type="submit" class="btn btn-primary">Cadastrar</button>
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
export default class Register extends Vue {
    protected form: {
      name: null | string;
      email: null | string;
      password: null | string;
    } = {
      name: null,
      email: null,
      password: null,
    };

    protected error: string | null = null;

    protected async submit(): Promise<void> {
      try {
        await this.$store.dispatch('user/register', {
          userEmail: this.form.email,
          userPassword: this.form.password,
          userName: this.form.name,
        });
      } catch (err) {
        this.error = err ? err.message : null;
      }
    }
}
</script>

<script>
export default {

  data() {
    return {
      username: '',
      password: '',
    }
  },
  created() {

  },
  mounted() {
    //      this.$auth.refreshAuth()
    //      this.accountSettings = this.$auth.user
    // var _this = this;
  },
  methods: {
    Login() {
      this.$axios.post('auth/login', {
        username: this.username,
        password: this.password,
      }).then((res) => {
        this.$auth.setAuth(res.data)
        //          Vue.$toast('Welcome ' + res.data.username)
        this.$helper.track('Index', 'Success', this.username)

        if (this.$route.query && this.$route.query.redirect) {
          // this.$router.push(this.$route.query.redirect)
          window.location = this.$route.query.redirect
        }
        else {
          console.log(this.$router.path)
          if (this.$route.path === '/login')
            this.$router.push()
          // hard redirect if we use it as component
          else
            window.location.reload()
          // window.location = this.$auth.getLoginRedirect()
          // this.$router.push(this.$auth.getLoginRedirect())

          this.$root.$emit('bv::hide::modal', 'login')
          // todo: soft redirect is not reactive for user at this moment
          //                        this.$router.push({
          // path: '/p/3',
          //                            query: {
          //                                t: +new Date()
          //                            }
          //                        })
        }
      },
      (error) => {
        this.$helper.track('Index', 'Fail', error)
      },
      )
    },

  },
}
</script>

<template>
  <b-modal id="login" title="" :hide-header="true" :hide-footer="true" size="sm" class="" modal-class="dsht">
    <div class="mx-auto">
      <!-- or offset-sm-3 -->
      <section class="card">
        <div class="card-body">
          <b-button type="button" to="/signup" class="w-100 mt-0 mb-4" variant="primary">
            {{
              $t('components.headerBarCreateNewAccount') }}
          </b-button>

          <!-- <hr/> -->
          <h6 class="text-center">
            {{ $t('components.headerBarLogin') }}
          </h6>

          <form
            method="POST" accept-charset="UTF-8" enctype="multipart/form-data"
            @submit.prevent="Login()"
          >
            <!-- description="We'll convert your name to lowercase automatically." or feedback="Feedback" -->
            <b-form-fieldset label-for="username-modal" :label="$t('components.headerBarPhone')">
              <!-- phone , email or username -->
              <b-form-input
                id="username-modal" v-model="username"
                :placeholder="$t('components.headerBarPhonePlaceholder')" required
                autofocus
              />
            </b-form-fieldset>

            <b-form-fieldset label-for="password-modal" :label="$t('components.headerBarPassword')">
              <b-form-input
                id="password-modal" v-model="password" :placeholder="$t('components.headerBarPassword')"
                required type="password"
              />
            </b-form-fieldset>

            <b-button-group class="mt-4 btn-block">
              <b-button class="w-100 " variant="primary" type="submit">
                {{
                  $t('components.headerBarLogin') }}
              </b-button>
              <!-- <b-button class="w-50 " variant="outline-primary" href="/connect/twitter">ورود توسط توییتر <span -->
              <!-- class="icon-twitter"></span></b-button> -->
            </b-button-group>
          </form>
        </div>
      </section>

      <h6 class="text-center mt-2">
        <router-link to="/login/forget" rel="nofollow">
          {{ $t('components.headerBarPasswordForget') }}
        </router-link>
      </h6>
    </div>
  </b-modal>
</template>

<script>
// import {directive as onClickaway} from "vue-clickaway";

export default {
  directives: {
    // onClickaway: onClickaway
  },
  props: ['apps'],
  // components: {PageSettingsModal},
  data() {
    return {
      newApp: {},
      showAppSlug: false,
      privateApp: false,
    }
  },
  methods: {
    addApp() {
      let params = { title: 'Untitled' }
      if (this.newApp.title)
        params = this.newApp

      this.$axios.post('/apps', params).then(
        (res) => {
          this.apps.unshift(res.data)
          this.$toast('App was created successfully!', 'success')
          this.$root.$emit('bv::hide::modal', 'new-app')
          // replace instead of push to hard redirect
          window.location = `${this.$options.filters.appEditURL(res.data)}page/__`
          this.newApp = {}
        })
    },
  },

}
</script>

<template>
  <b-modal
    id="new-app" title="" :hide-header="false" size="sm" hide-backdrop
    content-class="modal-draggable" ok-title="Create" modal-class="dsht" @ok="addApp"
  >
    <!--                                    <p class=""> -->
    <!--                                        -->
    <!--                                    </p> -->
    <form @submit.prevent="addApp">
      <b-form-fieldset label="">
        <b-form-input
          v-model="newApp.title"
          class="w-100"
          placeholder="App Title"
          required
          autofocus
          @input="(val) => newApp.slug = $options.filters.slugify(val)"
        />
      </b-form-fieldset>

      <span class="text-muted sm22all">Path: </span>
      <template v-if="!showAppSlug">
        <span class="text-muted">{{ newApp.slug }}
          <a href="#" @click.prevent="showAppSlug = true">Change</a>
        </span>
      </template>
      <template v-else>
        <b-form-input
          v-model="newApp.slug"
          size="sm"
          class="w-auto d-inline-block"
          placeholder="URL Path"
          @input="(val) => newApp.slug = $options.filters.slugify(val)"
          @blur="showAppSlug = false"
        />
      </template>

      <!--            <b-form-checkbox class="text-right m-2 mt-3" v-model="privateApp" -->
      <!--                             name="check-button" switch> -->
      <!--                Private -->
      <!--            </b-form-checkbox> -->

      <!--            <b-form-fieldset v-if="privateApp" label=""> -->
      <!--                <select class="custom-select w-auto" v-model="newApp.permission" -->
      <!--                        name="view" required> -->
      <!--                    <option :value="null" :selected="(!newApp.permission)">Who can see -->
      <!--                        it? -->
      <!--                    </option> -->
      <!--                    <option value="Default">Members Only</option> -->
      <!--                    <option value="Default">Me Only</option> -->

      <!--                </select> -->
      <!--            </b-form-fieldset> -->
    </form>
    <!--                                    <div slot="modal-footer"> -->
    <!--                                        <b-button -->
    <!--                                            variant="secondary" -->
    <!--                                            class="mx-1" -->
    <!--                                            type="button" -->
    <!--                                            @click="$root.$emit('bv::hide::modal', 'new-page')" -->
    <!--                                        > -->
    <!--                                            <span class="icon-left-1"/> -->
    <!--                                            {{ $t('components.headerBarBack') }} -->
    <!--                                        </b-button> -->

    <!--                                        <b-button -->
    <!--                                            variant="primary" -->
    <!--                                            class="" -->
    <!--                                            type="button" -->
    <!--                                            @click="addPage" -->
    <!--                                        > -->
    <!--                                            <span class="icon-ok "/> -->
    <!--                                            Create -->
    <!--                                        </b-button> -->
    <!--                                    </div> -->
  </b-modal>
</template>

<script>
// import {directive as onClickaway} from "vue-clickaway";

export default {
  directives: {
    // onClickaway: onClickaway
  },
  props: ['pages'],
  // components: {PageSettingsModal},
  data() {
    return {
      newPage: {},
      showPageSlug: false,
      privatePage: false,
    }
  },
  methods: {
    addPage() {
      let params = { title: 'Untitled' }
      if (this.newPage.title)
        params = this.newPage

      // params.slug= this.$helper.pathToSlug(params.slug) will be done in backend

      this.$axios.post('/pages', params).then(
        (res) => {
          this.pages.unshift(res.data)
          this.$toast('Page was created successfully!', 'success')
          this.$root.$emit('bv::hide::modal', 'new-page')
          this.$router.push(this.$options.filters.pageEditURL(res.data, this.$currentApp))
          this.newPage = {}
        })
    },
  },

}
</script>

<template>
  <b-modal
    id="new-page" title="" :hide-header="false" size="sm" hide-backdrop
    content-class="modal-draggable" ok-title="Create" modal-class="dsht" @ok="addPage"
  >
    <!--                                    <p class=""> -->
    <!--                                        -->
    <!--                                    </p> -->
    <form @submit.prevent="addPage">
      <b-form-fieldset label="">
        <b-form-input
          v-model="newPage.title"
          class="w-100"
          placeholder="Page Title"
          required
          autofocus
          @input="(val) => newPage.slug = $options.filters.slugify(val)"
        />
      </b-form-fieldset>

      <span class="text-muted small">{{ $currentApp | appURL(true) }}</span><template v-if="!showPageSlug">
        <span class="text-mu2ted">/{{ newPage.slug }}
          <a href="#" @click.prevent="showPageSlug = true">Change</a>
        </span>
      </template>
      <template v-else>
        <b-form-input
          v-model="newPage.slug"
          size="sm"
          class="w-auto d-inline-block"
          placeholder="URL Path"
          @input="(val) => newPage.slug = $options.filters.slugify(val)"
          @blur="showPageSlug = false"
        />

        <span class="text-muted">Enter '/' for home page path.</span>
      </template>

      <!--            <b-form-checkbox class="text-right m-2 mt-3" v-model="privatePage" -->
      <!--                             name="check-button" switch> -->
      <!--                Private -->
      <!--            </b-form-checkbox> -->

      <!--            <b-form-fieldset v-if="privatePage" label=""> -->
      <!--                <select class="custom-select w-auto" v-model="newPage.permission" -->
      <!--                        name="view" required> -->
      <!--                    <option :value="null" :selected="(!newPage.permission)">Who can see -->
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

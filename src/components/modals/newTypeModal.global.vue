<script>
// import {directive as onClickaway} from "vue-clickaway";

export default {
  directives: {
    // onClickaway: onClickaway
  },
  props: ['types'],
  // components: {TypeSettingsModal},
  data() {
    return {
      newType: {
        template: '',
      },
      showTypeSlug: false,
      privateType: false,
    }
  },
  methods: {
    addType() {
      if (!this.newType.title)
        this.newType.title = 'Untitled'

      // params.slug= this.$helper.pathToSlug(params.slug) will be done in backend

      this.$axios.post('/types', this.newType).then(
        (res) => {
          this.types.unshift(res.data)
          this.$toast('Type was created successfully!', 'success')
          this.$root.$emit('bv::hide::modal', 'new-type')
          this.$router.push(this.$options.filters.typeEditURL(res.data, this.$currentApp))
          this.newType = {
            template: '',
          }
        })
    },
  },

}
</script>

<template>
  <b-modal
    id="new-type" title="" :hide-header="false" size="sm" hide-backdrop
    content-class="modal-draggable" ok-title="Create" modal-class="dsht" @ok="addType"
  >
    <!--                                    <p class=""> -->
    <!--                                        -->
    <!--                                    </p> -->
    <form @submit.prevent="addType">
      <b-form-fieldset label="">
        <b-form-input
          v-model="newType.title"
          class="w-100"
          placeholder="Type Title"
          required
          autofocus
          @input="(val) => newType.slug = $options.filters.slugify(val)"
        />
      </b-form-fieldset>

      <span class="text-muted small">{{ $currentApp | appURL(true) }}</span>
      <template v-if="!showTypeSlug">
        <span class="text-mu2ted">/{{ newType.slug }}
          <a href="#" @click.prevent="showTypeSlug = true">Change</a>
        </span>
      </template>
      <template v-else>
        <b-form-input
          v-model="newType.slug"
          size="sm"
          class="w-auto d-inline-block"
          placeholder="URL Path"
          @input="(val) => newType.slug = $options.filters.slugify(val)"
          @blur="showTypeSlug = false"
        />

        <span class="text-muted">Enter '/' for home type path.</span>
      </template>

      <!--            <b-form-fieldset -->
      <!--                label="Type Template" -->
      <!--            > -->
      <!--                :options="[{text:'&#45;&#45; Status &#45;&#45;',value:''}, {text:'Spam',value:'spam'}]" -->
      <div class="mt-3 mb-2 small">
        Template
      </div>
      <b-form-radio-group
        v-model="newType.template"
        buttons

        button-variant="outline-primary"
        :options="[{ text: 'Client', value: 'client' }, { text: 'Product', value: 'product' }, { text: 'Custom', value: '' }]"
      />
      <!--            </b-form-fieldset> -->

      <div class="mt-2">
        <b-form-checkbox v-model="newType.withNote" name="check-button" size="xs" switch>
          Enable Note
        </b-form-checkbox>

        <b-form-checkbox
          v-show="newType.template.includes('product')" v-model="newType.withInventory"
          name="check-button" size="xs" switch
        >
          Enable Inventory Management
        </b-form-checkbox>

        <b-form-checkbox
          v-show="newType.template.includes('client')" v-model="newType.withInvoice"
          name="check-button" size="xs" switch
        >
          Enable Invoice
        </b-form-checkbox>
      </div>
      <!--            <b-form-checkbox class="text-right m-2 mt-3" v-model="privateType" -->
      <!--                             name="check-button" switch> -->
      <!--                Private -->
      <!--            </b-form-checkbox> -->

      <!--            <b-form-fieldset v-if="privateType" label=""> -->
      <!--                <select class="custom-select w-auto" v-model="newType.permission" -->
      <!--                        name="view" required> -->
      <!--                    <option :value="null" :selected="(!newType.permission)">Who can see -->
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
    <!--                                            @click="$root.$emit('bv::hide::modal', 'new-type')" -->
    <!--                                        > -->
    <!--                                            <span class="icon-left-1"/> -->
    <!--                                            {{ $t('components.headerBarBack') }} -->
    <!--                                        </b-button> -->

    <!--                                        <b-button -->
    <!--                                            variant="primary" -->
    <!--                                            class="" -->
    <!--                                            type="button" -->
    <!--                                            @click="addType" -->
    <!--                                        > -->
    <!--                                            <span class="icon-ok "/> -->
    <!--                                            Create -->
    <!--                                        </b-button> -->
    <!--                                    </div> -->
  </b-modal>
</template>

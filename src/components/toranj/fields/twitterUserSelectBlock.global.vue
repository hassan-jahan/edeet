<script>
// import 'vue-multiselect/dist/vue-multiselect.min.css'
// import Multiselect from 'vue-multiselect'
// import iMultiselect from './../../helpers/iMultiselect'

import fieldMixin from '../fieldMixin'

// import blockMixin from '../toranj/blockMixin'

export default {
  mixins: [fieldMixin],
  // components: {iMultiselect},

  // props: ['name'],
  inheritAttrs: false,

  data() {
    return {
      usernameOrId: '',
      isBusy: false,
    }
  },
  watch: {},
  // {
  // edit: {
  //     type: Object,
  //     // default: {show:false}
  // },
  // current: {
  //     type: String,
  //     required: true
  // }
  // },

  created() {
    this.settingsForm = { component: 'form', children: [...this.commonSettings.children] } // change in future for better performance
  },
  mounted() {

  },
  methods: {

    findUser(term) {
      if (term.length <= 2)
        return
      this.isBusy = true
      this.$axios.get(`connections/twitter/find-user?usernameOrId=${this.usernameOrId}`).then((res) => {
        console.log(res)
        this.change()
        this.value = res.data
        this.isBusy = false
      }).catch((e) => {
        this.isBusy = false
      })
    },

    change(newVal) {
      if (!this.isDirty) // todo: NOT  tested for all components. For default (with formula) that can be change
        this.isDirty = true
    },
  },
}
</script>

<template>
  <field-wrapper
    :block="block" :parent="parent" :index="index" v-if="ShowIf(block)" :options="options"
    :footer-add="true" right-slot-pos="outside"
    left-slot-pos="outside"
    :hide-features="[]"
    style="position: relative;"
    :settings-form="settingsForm"
    :scope="scope"
  >
    <!--        TODO: Validation | MORE COMPONENT | Tabs | formgroup inline | floating labels -->

    <div v-if="isView" class="form-group toranj-view">
      <div v-if="showViewLabels" class="toranj-label">
        {{ block.label }}:
      </div>

      {{ value }}
    </div>

    <b-form-group
      v-else
      :label-for="`${block.id}-input`"
      :disabled="block.disabled"
    >
      <template #label>
        <!-- add a span or simple if options.edit {{block.label}} or rewrite form group using label-editable -->
        <!--                <span-editable name="label" :block="block" :options="options" :editor="false"> -->
        <!--                    Enter Label -->
        <!--                </span-editable> -->
        {{ block.label }}
        <span v-if="block.required" class="required">*</span>
      </template>

      <form action="" @submit.prevent="findUser">
        <b-input-group prepend="@" class="mt-3">
          <b-form-input v-model="usernameOrId" :min-length="1" required />

          <b-input-group-append>
            <b-button type="submit" variant="info" @click="findUser">
              Select
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </form>
      <!--            :readonly="options.edit" -->
      <template #description>
        <!--                <span-editable name="description" :block="block" :options="options" :editor="true">Enter Description -->
        <!--                </span-editable> -->
        <p v-html="block.description" />
      </template>

      <loading v-show="isBusy" class="m-2 p-1 " />

      <div v-if="value && !isBusy" class="card my-3 mx-2 border p-2">
        <div class="media">
          <div class="media-aside align-self-start">
            <img
              :src="value.profile_image_url.replace('_normal.', '_bigger.')"
              alt="" width="64" height="64" class="rounded"
            >
          </div>
          <div class="media-body my-0 mx-2 ">
            <span class="big">{{ value.name }}</span> <span class="text-muted">@{{
              value.username
            }}</span>
            <p>
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>

      {{ value }}

      <!--            value: -->
      <!--            {{ value }} -->
    </b-form-group>
  </field-wrapper>
</template>

<style>
.multiselect__tags {
    /*background: transparent;*/
}

.multiselect__option--selected.multiselect__option--highlight {
    background: #ccc;
}

.multiselect__input,
.multiselect__single {
    border-radius: 0;
}

.multiselect__tags {
    border-radius: 0;
}

.multiselect__input {
    height: 1.9375rem !important;
    padding: 0.125rem 0.125rem !important;
    box-shadow: none !important;
}

.multiselect__input:focus {
    box-shadow: none !important;
    background: #fff !important;
}

.multiselect__tag {
    line-height: 1.4;
    /*background: green*/
}

.multiselect__tag-icon {
    line-height: 24px;
}

/*form-control form-control-sm*/
</style>

<script>
import 'vue-multiselect/dist/vue-multiselect.min.css'
import fieldMixin from '../fieldMixin'
import iMultiselect from './../../helpers/iMultiselect.vue'

// import blockMixin from '../toranj/blockMixin'

export default {
  components: { IMultiselect: iMultiselect },
  mixins: [fieldMixin],

  // props: ['name'],
  inheritAttrs: false,

  data() {
    return {
      settingsForm: {},
      newUser: '',
      userOptions: [],
      tempModel: false,
      isBusy: false,
    }
  },
  watch: {
    tempModel(newVal) {
      console.log('changess', this.block.getOnlyIds)
      if (!this.block.getOnlyIds) {
        this.value = newVal
      }
      else {
        if (this.block.multiple)
          this.value = this.$helper.pluckArray(newVal, 'id')
        else if (newVal.id)
          this.value = newVal.id
        // else //empty or so
        //     this.value = newVal
      }
    },
  }, // {
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
    setTimeout(() => {
      if (!this.block.getOnlyIds || this.block.defined) {
        this.tempModel = this.value
        return
      }

      // this.$helper.pluckArray()
      console.log('va', this.value)

      const IdListString = Array.isArray(this.value) && this.value.length ? this.value.join(',') : this.value
      console.log('IdListString', IdListString)

      if (!IdListString)
        return

      this.isBusy = true
      this.$axios.get('users/', { params: { 'id:in': IdListString } }).then((res) => {
        console.log(res)
        this.tempModel = res.data
        this.isBusy = false
      },
      (err) => {
        this.isBusy = false
      })
    }, 1000)
  },
  methods: {
    addUser(newUser) {
      // for tag only not used here to create new user
      this.userOptions.push(newUser)
      if (!Array.isArray(this.value))
        this.value = []
      this.value.push(newUser)
      //        this.newPost.tags = JSON.stringify(this.arrayTags)
      console.log('add tag lannuch')
      //        console.log(this.newPost.tags)
    },
    findUser(term) {
      const params = {
        count: 4, // todo: CSS z-index problem for more tags
        // nickname: term
      }

      params['nickname|username|email:like'] = `%${term}%`

      if (term.length <= 2)
        return
      this.isBusy = true
      this.$axios.get('users/', { params }).then((res) => {
        console.log(res)
        this.userOptions = res.data
        this.isBusy = false
      })
    },
    selectedUser(selected) {
      // console.log(selected)

      // if (!this.block.getOnlyIds)
      //     return
      //
      // if (!Array.isArray(this.tempModel) && this.) this.value = [];
      // this.value.push(newUser);
      //
      // this.value.push
      // for (let item of selected) {
      //     console.log(item);
      // }
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
      <!--            @blur="Validate" -->
      <!--                :invalid-feedback="invalidFeedback" -->
      <!--                :valid-feedback="validFeedback" -->
      <!--                :state="state" -->

      <!--            <div class="mb-1"> -->
      <!--                &lt;!&ndash;                <span-editable name="label" :block="block" :options="options">sds</span-editable>&ndash;&gt; -->
      <!--                <label-editable name="label" :block="block" :options="options" :editor="false"> -->
      <!--                    Enter Label -->
      <!--                </label-editable> -->

      <!--            </div> -->

      <template #label>
        <!-- add a span or simple if options.edit {{block.label}} or rewrite form group using label-editable -->
        <!--                <span-editable name="label" :block="block" :options="options" :editor="false"> -->
        <!--                    Enter Label -->
        <!--                </span-editable> -->
        {{ block.label }}
        <span v-if="block.required" class="required">*</span>
      </template>

      <!-- usually for development to select or multiple select -->
      <IMultiselect
        v-if="block.defined && Array.isArray(block.values)" :id="`${block.id}-multiselect`"
        v-model="tempModel" :class="block.inputClasses"
        :name="block.slug"
        :tag-placeholder="$t('fields.userAddNew')" :placeholder="block.placeholder || block.label"
        :options="block.values" :multiple="block.multiple" :hide-selected="true"
        :close-on-select="true" :max="block.max || 20" :options-limit="50"
        :max-height="600" select-label="" deselect-label="" @tag="addUser"
        :show-no-results="true" :taggable="block.taggable" :disabled="block.disabled" track-by="id"
        label="nickname"
        @change="change"
      >
        <!--                <span slot="noResult">{{ $t("fields.tagNoResult") }}</span> -->
      </IMultiselect>

      <!--  dynamic user search single or multiple -->
      <IMultiselect
        v-else :id="`${block.id}-multiselect`" v-model="tempModel" :class="block.inputClasses"
        :name="block.slug" :tag-placeholder="$t('fields.userAddNew')"
        :placeholder="block.placeholder || block.label" :options="userOptions"
        :multiple="block.multiple" track-by="id" label="nickname"
        :hide-selected="true" :close-on-select="true" :max="schema.max || 20"
        :options-limit="50" :max-height="600" select-label=""
        deselect-label="" :show-no-results="true" :taggable="false" :loading="isBusy"
        :internal-search="false" :disabled="block.disabled" :show-labels="false" @tag="addUser"
        @search-change="findUser"
        @select="selectedUser"
        @change="change"
      >
        <!--                <template slot="options" slot-scope="props"> -->
        <!--                    {{props}} -->
        <!--                    <img v-if="props.option.avatar" class="option__image" :src="props.option.avatar" -->
        <!--                                                                alt="Avatar" width="40"/> -->
        <!--                    <div class="option__desc"> -->
        <!--                        <span class="option__title">{{ props.option.nickname }}</span> -->
        <!--                        <span class="option__small">{{ props.option.username }}</span> -->
        <!--                    </div> -->
        <!--                </template> -->

        <!--                <span slot="noResult">{{ $t("fields.tagNoResult") }}</span> -->
      </IMultiselect>

      <!--            :readonly="options.edit" -->
      <template #description>
        <!--                <span-editable name="description" :block="block" :options="options" :editor="true">Enter Description -->
        <!--                </span-editable> -->
        <p v-html="block.description" />
      </template>
      <!--            value: -->
      <!--            {{ value }} -->
    </b-form-group>

    <!--        <template v-slot:menu-item> -->
    <!--            <b-dropdown-item @click.prevent="$root.$emit('bv::show::popover', 'upload-popover-'+block.id)"> -->
    <!--                Upload / Replace -->
    <!--            </b-dropdown-item> -->
    <!--        </template> -->

    <!--        <template v-slot:menu-right> -->
    <!--            <b-btn size="xs" @click.prevent="$root.$emit('bv::show::popover', 'upload-popover-'+block.id)"> -->
    <!--                <span class="iconify big" data-icon="bx:bx-cloud-upload" data-inline="false"></span> -->
    <!--            </b-btn> -->
    <!--        </template> -->
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

<script>
import fieldMixin from '../fieldMixin'

const iCodeMirror = () => import('@/components/helpers/iCodeMirror')
// import blockMixin from '../toranj/blockMixin'

export default {
  components: { ICodeMirror: iCodeMirror },
  mixins: [fieldMixin],
  // props: ['name'],
  inheritAttrs: false,
  data() {
    return {
      settingsForm: {},
      cmOptions: {

      },
    }
  },
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
  mounted() {

  },
  created() {
    this.settingsForm = { component: 'form', children: [...this.commonSettings.children] } // change in future for better performance
    this.cmOptions = {
      // mode: this.block.mode,
      ...this.block.cmOptions,
    }
  },
  methods: {},
}
</script>

<template>
  <field-wrapper
    :block="block" :parent="parent" :index="index" :options="options" v-if="ShowIf(block)"
    :footer-add="true" right-slot-pos="outside"
    left-slot-pos="outside"
    :hide-features="[]"
    style="position: relative;"
    :settings-form="settingsForm"
    :scope="scope"
  >
    <!--        TODO: Validation | MORE COMPONENT | Tabs | formgroup inline | floating labels -->

    <b-form-group
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
        <span-editable name="label" :block="block" :options="options" :editor="false">
          Enter Label
        </span-editable>
        <span v-if="block.required" class="required">*</span>
      </template>

      <!--            todo: required for code mirror!! -->
      <ICodeMirror
        :id="`${block.id}-input`"
        v-model="value"
        :class="block.inputClasses"
        :placeholder="block.placeholder"
        :options="cmOptions"
        :size="block.size || options.size"
      />

      <!--                @blur="Validate" -->

      <small v-if="block.maxLength && value" :class="value.length >= block.maxLength ? 'text-danger' : 'text-muted'">{{
        value.length
      }}
        / {{ block.maxLength }}</small>

      <!--            :readonly="options.edit" -->
      <template #description>
        <span-editable name="description" :block="block" :options="options" :editor="true">
          Enter Description
        </span-editable>
        <!--                <span class="required" v-if="block.required">*</span> -->
      </template>
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

</style>

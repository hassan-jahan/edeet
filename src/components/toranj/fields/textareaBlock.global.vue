<script>
import fieldMixin from '../fieldMixin'

// import blockMixin from '../toranj/blockMixin'
// const iSunEditor = () => import('../../helpers/iSunEditor.vue')
// import iSunEditor from '../../helpers/iSunEditor.vue'

export default {
  components: {
    // [process.client && 'iSunEditor']: () => import('./../../helpers/iSunEditor.vue'), not for vite
    ISunEditor: () => { if (process.client) { return import('./../../helpers/iSunEditor.vue') } },
    // [process.client && 'LTileLayer']: () => import('vue2-leaflet').LTileLayer,
  },
  mixins: [fieldMixin],
  // props: ['name'],
  inheritAttrs: false,
  data() {
    return {
      settingsForm: {},
      sunEditorOptions: {
        buttonList: [
          [
            // "undo",
            // "redo",
            // "font",

            // "paragraphStyle",
            'bold',
            // "underline",
            'italic',
            // "strike",
            'formatBlock',
            'fontSize',
            // "blockquote",

            // "subscript",
            // "superscript",
            // "hiliteColor",
            // "textStyle",
            'link',
            // "outdent",
            // "indent",
            'align',
            // "horizontalRule",
            'list',
            'removeFormat',
            // "lineHeight",
            'table',

            'image',
            // "video",
            'fontColor', // todo:

            // "audio",
            // "math",
            // "fullScreen",
            // "showBlocks",
            'codeView',
            // "preview",
            // "print",
            // "save",
            // "template"
          ],
        ],
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
    const settings = [
      {
        slug: 'rich',
        label: 'Rich Editor',
        component: 'checkbox',
        // values: [{text: 'Sunday', value: 0},{text: 'Monday', value: 1}],
        description: '',
        // 'showIf': {"slug": "type", "value": 'number'}
      },

    ]
    this.settingsForm = { component: 'form', children: [...this.commonSettings.children, ...settings] }
  },
  methods: {
    input() {
      if (!this.isDirty)
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

      <!--  block.type not numbers! but pasasword|url and so| -->
      <b-form-textarea
        v-if="!block.rich"
        :id="`${block.id}-input`"
        v-model="value"
        trim
        :name="block.slug"
        :required="block.required"
        :size="block.size || options.size"
        :placeholder="block.placeholder || block.label"
        :list="`${block.id}-suggestions`"
        :class="block.inputClasses"
        dir="auto"
        :maxlength="block.maxLength"
        :minlength="block.minLength"
        :readonly="block.readOnly"
        v-bind="$attrs"
        :rows="block.rows"
        :max-rows="(block.rows * 2) + 2"
        :formatter="block.formatter"
        :lazy-formatter="block.lazyFormatter"
        :spellcheck="true"
        @input="input"
      >
        <!--                @blur="Validate" -->
      </b-form-textarea>

      <div v-if="block.rich" style="border: 1px solid #dedede;padding: .5rem;">
        <client-only>
          <ISunEditor ref="sunEditor" v-model="value" :options="sunEditorOptions" />
        </client-only>
      </div>

      <small v-if="block.maxLength && value" :class="value.length >= block.maxLength ? 'text-danger' : 'text-muted'">{{
        value.length
      }}
        / {{ block.maxLength }}</small>

      <datalist v-if="block.values && block.values.length" :id="`${block.id}-suggestions`">
        <option v-for="val in block.values" :key="val">
          {{ val }}
        </option>
      </datalist>
      <!--            :readonly="options.edit" -->
      <template #description>
        <!--                <span-editable name="description" :block="block" :options="options" :editor="true">Enter Description -->
        <!--                </span-editable> -->
        <p v-html="block.description" />
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

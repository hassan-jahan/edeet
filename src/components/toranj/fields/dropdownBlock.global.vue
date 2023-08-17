<!-- fieldAwesome.vue -->
<script>
import fieldMixin from '../fieldMixin'

// import blockMixin from '../toranj/blockMixin'

export default {
  mixins: [fieldMixin],
  // props: ['name'],
  inheritAttrs: false,
  data() {
    return {
      settingsForm: {},
    }
  },
  created() {
    this.settingsForm = { component: 'form', children: [...this.commonSettings.children] } // change in future for better performance
    this.settingsForm.children.push({ // maybe it's html?
      slug: 'values',
      label: 'Options',
      component: 'textarea-array',
      required: false,
      rows: 5,
      description: 'One per line',
      placeholder: 'Option 1\nOption 2',
    })

    // if (!this.block.values || !this.block.values.length) {
    //     this.$set(this.block, 'values', ['Option 1', 'Option 2'])
    // }

    //      hideNoneSelectedText
  },
  methods: {
    change() {
      if (!this.isDirty)
        this.isDirty = true
    },
  },
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

      v-bind="$attrs" v-on="$listeners"
    >
      <!--            :label-cols-lg="block.horizental" -->
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

      <!--            <p v-html="block.description"></p> -->

      <b-form-select
        :id="`${block.id}-input`" v-model="value" :options="block.values" :size="block.size || options.size || 'md'"
        :name="block.slug"
        :required="block.required"
        dir="auto"
        v-bind="$attrs" v-on="$listeners" @change="change"
      >
        <template #first>
          <b-form-select-option :value="undefined" disabled>
            -- Select an option --
          </b-form-select-option>
        </template>
      </b-form-select>

      <template #description>
        <!--                <span-editable name="description" :block="block" :options="options" :editor="true">Enter Description -->
        <!--                </span-editable> -->
        <p v-html="block.description" />

        <!-- <span class="required" v-if="block.required">*</span> -->
      </template>
    </b-form-group>
  </field-wrapper>
</template>

<style>

</style>

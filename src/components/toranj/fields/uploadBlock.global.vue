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
      popoverShow: false,
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
    // this.commonSettings.children.push()
  },
  methods: {
    onClose() {
      this.$root.$emit('bv::hide::popover', `upload-popover-${this.block.id}`)
    },
    uploaded(val) {
      console.log(val)
      console.log('uploaded run')

      this.value = this.$options.filters.cdnURL(val)
      // this.block.src = this.$options.filters.cdnURL(val)
      console.log('uploaded run')
      console.log(this.block)
      // this.imgWidth = ''
      // this.imgHeight = ''
      // delete this.block.width
      // delete this.block.height
      this.$root.$emit('bv::hide::popover', `upload-popover-${this.block.id}`)
    },
    //    todo: implement dirty for file (when there is a default value for file but user want to change it)
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
    <!--        TODO: Validation | MORE COMPONENT | Tabs -->

    <b-form-group
      :label-for="`${block.id}-input`"
      :disabled="block.disabled"
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

      <b-btn
        v-if="!value" :id="`upload-popover-${block.id}`"
        @click.prevent="$root.$emit('bv::show::popover', `upload-popover-${block.id}`)"
      >
        Upload File
      </b-btn>

      <template v-if="value">
        <img
          v-if="value.endsWith('.jpg') || value.endsWith('.jpeg') || value.endsWith('.png') || value.endsWith('.gif')" :id="`upload-popover-${block.id}`"
          v-b-tooltip.hover.top.ds200="'Click to change'"
          :src="value"

          class="click-away-exception hover-reverse-opacity"
          style="max-height: 75px;max-width: 100px;border:2px solid #ccc;cursor: pointer"
          @click.prevent="$root.$emit('bv::show::popover', `upload-popover-${block.id}`)"
        >

        <a
          v-else :href="value" target="_blank"
          @click.prevent="$root.$emit('bv::show::popover', `upload-popover-${block.id}`)"
        >
          <span class="iconify text-muted" data-icon="entypo:attachment" data-inline="true" />
          File
        </a>

        <a class="small d-block" href="#" @click.prevent="value = ''">Remove</a>
      </template>

      <b-popover
        ref="popover"
        v-model:show="popoverShow"
        :target="`upload-popover-${block.id}`"
        placement="left"
        container="my-container"
        triggers="manual"
        custom-class="p-0-popover  dsht"
      >
        <template #title>
          <!-- <b-button @click="onClose" class="close" aria-label="Close"> -->
          <!-- <span class="d-inline-block" aria-hidden="true">&times;</span> -->
          <!-- </b-button> -->
          <!-- Interactive Content -->
        </template>

        <!-- <div> -->
        <b-btn-close
          class="mb-1 mr-1"
          size="xs"
          variant="secondary"
          @click="onClose"
        />

        <i-upload-zone
          class=" m-1 "
          url="/files/attach/upload"
          btn-class="btn btn-sm btn-info rounded-4"
          @update:files="uploaded"
        >
          <!--                    // todo: support mimtype validation and accept! -->
          <!--                    // security: can upload anything! -->
          <!--                    :validate-types="['image/png','image/jpg', 'image/jpeg', 'image/gif', 'image/svg+xml']" -->
          <!--                   security: svg has security risk 'image/svg+xml' -->
          <!--                val => $set(block,src,$options.filters.cdnURL(val)) -->
          Choose File
        </i-upload-zone>

        <!-- <b-button @click="onOk" size="sm" variant="primary">Ok</b-button> -->
        <!-- </div> -->
      </b-popover>

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

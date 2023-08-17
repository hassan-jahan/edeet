<script>
// import fMixin from './fMixin'
import blockMixin from '../blockMixin'

export default {
  // components: {LinkerModal},
  mixins: [blockMixin],
  // props: ['src'],
  data() {
    return {
      visible: false,
      settingsForm: {
        component: 'form',
        children: [
          {
            slug: 'text',
            label: 'Text',
            component: 'input-text',
            required: true,
            description: '',
          },
          {
            slug: 'variant',
            label: 'Color',
            component: 'select',
            values: ['primary', 'secondary', 'info', 'success', 'info', 'warning', 'danger', 'light', 'dark'],
            default: 'info', // todo: foreach map for each block and its settings field
            required: true,
            description: '',
            // 'buttons': true,
            // 'size': 'sm',
            // 'stacked': true,

          },
          {
            slug: 'size',
            label: 'Size',
            component: 'select',
            values: [{ text: 'Small', value: 'sm' }, { text: 'Medium', value: 'md' }, {
              text: 'Large',
              value: 'lg',
            }],
            // 'default': 'info', //todo: foreach map for each block and its settings field
            description: '',
            size: 'sm',
            // 'stacked': true,

          },
          {
            slug: 'outline',
            label: 'Outline',
            component: 'checkbox',
            description: '',
          },
          {
            slug: 'rounded',
            label: 'Rounded',
            component: 'checkbox',
            description: '',
          },

        ],
      },
    }
  },
  computed: {},
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

  },
  methods: {},
}
</script>

<template>
  <app-link
    v-if="!options.edit"
    :to="block.link"
    v-bind="$attrs"
    :class="btnClasses "
  >
    {{ block.text }}
  </app-link>

  <!--    todo: settings alt / lazy / responsive / rounded / border / class / size width height / inline / block / -->

  <widget-wrapper
    v-else :block="block" :parent="parent" :index="index" :options="options" :footer-add="false"
    right-slot-pos="outside" left-slot-pos="outside"
    :hide-features="[]"
    :settings-form="settingsForm"
  >
    <div>
      <div
        :class="visible ? null : 'collapsed'"
        :aria-expanded="visible ? 'true' : 'false'"
        aria-controls="collapse-4"
        @click="visible = !visible"
      >
        +
        <editable name="title" :block="block" :options="options" @click="visible = !visible">
          <h3> More Text</h3>
        </editable>
      </div>

      <b-collapse id="collapse-4" v-model="visible" class="mt-2">
        <b-card>
          <editable name="content" :block="block" :options="options">
            More content
          </editable>
        </b-card>
      </b-collapse>
    </div>

    <!--      -->

    <!--        <template v-slot:menu-right> -->
    <!--            <b-btn size="xs" :class="{'active': block.link}" -->
    <!--                   @click.prevent="$root.$emit('bv::show::modal', 'linker-'+block.id)"> -->
    <!--                <span class="iconify big" data-icon="bx:bx-link" data-inline="false"></span> -->
    <!--            </b-btn> -->
    <!--        </template> -->
  </widget-wrapper>
</template>

<style>

</style>

<script>
// import blockMixin from '../toranj/blockMixin'

export default {
  directives: {},
  // mixins: [blockMixin],
  inheritAttrs: false,
  props: ['block', 'parent', 'index', 'options', 'scope'], // parent can be an array or object with children same as action menus
  data() {
    return {
      settingsForm: {
        component: 'form',
        children: [
          {
            slug: 'title',
            label: 'Status Title',
            component: 'input-text',
            required: true,
            description: 'like: CEO Approval, Lab Result, etc.',
          },

          {
            slug: 'color',
            label: 'Color',
            component: 'color',
            gradient: false,
            transparent: false,
            preset: 'basic',
            options: ['#ff9900', '#1c5cc6', 'red', 'green', 'pink'],
            // 'required': true,
            description: '',
          },

          // {
          //     'slug': 'assignees',
          //     'label': 'Choose User',
          //     'component': 'user-select',
          //     'required': true,
          //     'defined': true,
          //     multiple: true,
          //     'getOnlyIds': true,
          //     'values': [{id: 1, nickname:'Aram'}, {id: 2, nickname:'Hassan'}, {id: 3, nickname:'Kenneth'}], //still buggy for objects
          //     // 'values': ['tasm','olii'], //not for array! use simple select iinstead
          //     'description': '',
          // },

          {
            slug: 'settings.nextLabel',
            label: 'OK Label',
            component: 'input-text',
            required: false,
            description: 'like: OK, Complete, Go to next Step etc.',
          },
          {
            slug: 'settings.successMessage',
            label: 'Success Message',
            component: 'input-text',
            required: false,
            description: 'When it was successfully ended from this status',
          },

          // {
          //     'slug': 'actions.sendBackLabel', or hasSendback
          //     'label': 'Send Back Label',
          //     'component': 'input-text',
          //     'required': false,
          //     'description': 'like: OK, Complete, Go to next Step etc.',
          // },
          {
            slug: 'slug',
            label: 'Slug',
            component: 'slug',
            classes: '',
            // 'prepend': process.env.protocol,
            // 'append': '.' + process.env.mainHost,
            required: true,
            description: 'In most cases, you don\'t need to change it',
            size: 'md',

          },
        ],
      },
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() { // it's ok no problem with created SSR
    // if not html add tag wrapper as html

  },
  methods: {},
}
</script>

<template>
  <status-wrapper
    :block="block" :parent="parent" :index="index" :options="options" :footer-add="true"
    right-slot-pos="outside" left-slot-pos="outside"
    :hide-features="['move']"
    :settings-form="settingsForm"
  >
    <template #menu-right>
      <!--            <b-btn size="xs" @click.prevent="$root.$emit('bv::show::modal', 'code-editor-'+block.id)"> -->
      <!--                <span class="iconify" data-icon="ion:code-slash" data-inline="true"></span> Code -->
      <!--            </b-btn> -->
    </template>

    <!-- &lt;!&ndash;        not recommended for outside change margin-left negative to make it work correctly &ndash;&gt; -->
    <!--               <template v-slot:menu-left> -->
    <!--                   <b-btn size="xs">TS</b-btn> -->
    <!--               </template> -->
    <div v-b-tooltip.top.ds500="'Click To Edit'" class="">
      {{ block.title }}
    </div>
  </status-wrapper>
</template>

<style>

</style>

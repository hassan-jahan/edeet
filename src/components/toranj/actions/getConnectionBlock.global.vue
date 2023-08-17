<script>
// import blockMixin from '../toranj/blockMixin'
import filtersTab from '../../helpers/filtersTab.vue'

export default {
  directives: {},
  // mixins: [blockMixin],
  components: { FiltersTab: filtersTab },
  inheritAttrs: false,
  props: ['block', 'parent', 'index', 'options', 'type', 'scope'], // parent can be an array or object with children same as action menus
  data() {
    return {
      // actionSettings: [],
      actionSettings: [
        // {
        //     'slug': 'disabled',
        //     'label': 'Disabled',
        //     'component': 'checkbox',
        //     'required': false,
        //     'description': 'Temporary disable this action.',
        // },

        {
          slug: 'title',
          label: 'Action Title',
          component: 'input-text',
          required: true,
          description: '',
          // 'showIf': '!disabled'
        },

        {
          slug: 'slug',
          label: 'Slug',
          // 'type': 'email',
          prepend: 'Slug Name: ',
          size: 'sm',
          component: 'slug',
          required: true,
          // 'maxLength': 20,
          exclude: '-:/',
          separator: '_',
          // 'description': 'Maximum 8 characters',
          // 'showIf': '!disabled'
        },
        {
          slug: 'provider',
          label: 'Provider',
          component: 'select',
          values: ['twitter'], // maybe to be reactive
          required: true,
          description: '',
          // 'showIf': {"slug": "type", "value": 'number'}
        },

        {
          slug: 'config',
          label: 'Config',
          component: 'input-text',
          required: false,
          description: '',
          // 'showIf': {"slug": "type", "value": 'number'}
        },

        {
          slug: 'userId',
          label: 'User ID',
          component: 'input-text',
          required: true,
          description: '',
          // 'showIf': {"slug": "type", "value": 'number'}
        },

        {
          slug: 'foreignId',
          label: 'Foreign ID',
          component: 'input-text',
          required: true,
          description: '',
          // 'showIf': {"slug": "type", "value": 'number'}
        },
        // {
        //     'slug': 'singlePost',
        //     'label': 'Get only first post with these filters',
        //     'component': 'checkbox',
        //     'description': '',
        //     // 'showIf': {"slug": "type", "value": 'number'}
        // },

      ],
      settingsForm: {
        component: 'form', children: [],
      },
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() { // it's ok no problem with created SSR
    // if not html add tag wrapper as html
    this.settingsForm.children = [...this.actionSettings]
  },
  methods: {},
}
</script>

<template>
  <action-wrapper
    :block="block" :parent="parent" :index="index" :options="options" :footer-add="true"
    right-slot-pos="inside" left-slot-pos="inside"
    :hide-features="['move']"
    :settings-form="settingsForm"
    :type="type"
    :scope="scope"
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
  </action-wrapper>
</template>

<style>

</style>

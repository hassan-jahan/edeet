<script>
// import blockMixin from '../toranj/blockMixin'

export default {
  directives: {},
  // mixins: [blockMixin],
  inheritAttrs: false,
  props: ['block', 'parent', 'index', 'options', 'type', 'scope'], // parent can be an array or object with children same as action menus
  data() {
    return {
      actionSettings: [],
      settingsForm: {
        component: 'form',
        children: [
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
            maxLength: 8,
            exclude: '-:/',
            separator: '_',
            description: 'Maximum 8 characters',
            // 'showIf': '!disabled'
          },

        ],
      },
    }
  },
  computed: {
    emailFields() {
      if (!Array.isArray(this.type.postFields))
        return []

      const arr = []
      this.type.postFields.forEach((item, index) => {
        // todo also bold type emails
        if (['input-text', 'hidden', 'textarea'].includes(item.component))
          arr.push({ text: item.label || item.slug, value: item.slug })
      })
      return arr
    },
  },
  watch: {},
  created() {
    this.actionSettings = [

      {
        slug: 'toWho',
        label: 'To',
        component: 'radio',
        idField: 'id',
        size: 'sm',
        values: [{ text: 'Post Creator', value: 'postCreator' }, {
          text: 'App Owner',
          value: 'appOwner',
        }, { text: 'Field', value: 'field' }, { text: 'Assignee', value: 'assignees' }, {
          text: 'Custom',
          value: 'custom',
        }],
        // todo: addToAssignee //maybe to be reactive
        // todo: default message not type it manually placeholder

        required: true,
        description: '',
        // 'showIf': {"slug": "type", "value": 'number'}
      },

      {
        slug: 'field',
        label: 'Field containing email',
        component: 'select',
        idField: 'id',
        values: this.emailFields, // maybe to be reactive
        required: true,
        description: '',
        showIf: { slug: 'toWho', value: 'field' },
      },
      {
        slug: 'email',
        label: 'Email Address',
        component: 'input-text',
        required: true,
        description: 'Separate by ,',
        showIf: { slug: 'toWho', value: 'custom' },
      },
      //
      // todo:default /templating / multiple
      // //logic to send if
      //
      {
        slug: 'subject',
        label: 'Subject',
        component: 'input-text',
        required: true,
        maxLength: 350,
        description: '',
        // "showIf": {"slug": "settings.noIndex", "value": false},

      },
      {
        slug: 'message',
        label: 'Message',
        component: 'textarea',
        required: true,
        rows: 5,
        rich: true,
        description: '',
        // "showIf": {"slug": "settings.noIndex", "value": false},
        // 'showIf': !this.thePage.settings || !this.thePage.settings.noIndex,
      },

      {
        slug: 'hasAction',
        label: 'Add call to action button',
        component: 'checkbox',
        // 'buttons': true,
        // stacked: true,
        variant: 'outline-dark',
        size: 'md',
        // values: [{text: 'Formatted', value: 'html'}, {text: 'RAW', value: 'raw'}],
        description: '',
        // 'showIf': {"slug": "type", "value": 'number'}
      },

      {
        slug: 'actionText',
        label: 'Action Button Text',
        component: 'input-text',
        required: true,
        // 'maxLength': 350,
        description: '',
        showIf: { slug: 'hasAction', op: 'neq', value: false },

      },
      {
        slug: 'actionLink',
        label: 'Action Link',
        component: 'input-text',
        required: true,
        // 'maxLength': 350,
        description: '',
        showIf: { slug: 'hasAction', op: 'neq', value: false },

      },

      {
        slug: 'schedule.enabled',
        label: 'Scheduled',
        component: 'checkbox',
        variant: 'outline-dark',
        description: '',
        // 'showIf': {"slug": "type", "value": 'number'}
      },

      {
        slug: 'schedule.baseDate',
        label: 'Base Date',
        component: 'select',
        required: true,
        size: 'sm',
        values: [
          // {text: 'Created Date', value: 'createdDate'},
          {
            text: 'Instant',
            value: '',
          },
          {
            text: 'Custom',
            value: 'custom',
          },
        ],
        // 'maxLength': 350,
        description: '',
        showIf: 'schedule.enabled && !schedule.repeat',

      },

      {
        slug: 'schedule.customBase',
        label: 'Field containing base Date',
        component: 'input-text',
        description: '',
        showIf: 'schedule.enabled && !schedule.repeat && schedule.baseDate ==\'custom\' ',
      },

      {
        slug: 'schedule.delay',
        label: 'Delay Amount',
        component: 'input-text',
        required: true,
        // type: ' number',
        append: 'Hour',
        // 'maxLength': 350,
        description: 'Can use formula e.g. ${24 * 10} for 10 days',
        showIf: 'schedule.enabled && !schedule.repeat',
      },
      // {
      //     'slug': 'scheduled.delayUnit',
      //     'label': 'Delay Amount',
      //     'component': 'input-text',
      //     'required': true,
      //     type: ' dropdown',
      //     'values': [
      //         // {text: 'Created Date', value: 'createdDate'},
      //         {
      //             text: 'Day',
      //             value: 'day'
      //         },
      //         {
      //             text: 'Hour',
      //             value: 'hour'
      //         },
      //     ],
      //     // 'maxLength': 350,
      //     'description': '',
      //     "showIf": {"slug": "scheduled", op: 'neq', "value": false},
      // },

      {
        slug: 'schedule.repeat',
        label: 'Repeat',
        component: 'checkbox',
        variant: 'outline-dark',
        description: '',
        showIf: { slug: 'schedule.enabled', op: 'neq', value: false },
      },

      {
        slug: 'schedule.every', // mins
        label: 'Every',
        component: 'select',
        // 'required': true,
        // type: ' dropdown',
        values: [
          // {text: 'Created Date', value: 'createdDate'},
          {
            text: 'Hour',
            value: 60,
          },
          {
            text: '6 Hour',
            value: 60 * 6,
          },

          {
            text: '12 Hour',
            value: 60 * 12,
          },

          {
            text: '24 Hour',
            value: 60 * 24,
          },

          {
            text: 'Custom',
            value: 'custom',
          },
        ],
        // 'maxLength': 350,
        description: '',
        showIf: { slug: 'schedule.repeat', op: 'neq', value: false },
      },

      {
        slug: 'schedule.pattern',
        label: 'Custom Pattern',
        component: 'input-text',
        required: false,
        // type: ' number',
        // 'append': 'Hour',
        // 'maxLength': 350,
        description: 'Can use formula e.g. ${24 * 10} for 10 days',
        showIf: 'schedule.repeat && (!schedule.every || schedule.every ==\'custom\')',
      },

      {
        slug: 'schedule.limit', // mins
        label: 'Limit Repeat',
        component: 'input-text',
        type: 'number',
        description: 'Limit number of repeat',
        showIf: 'schedule.repeat',
      },
    ]

    this.settingsForm.children = [...this.settingsForm.children, ...this.actionSettings]
  },
  mounted() { // it's ok no problem with created SSR
    // if not html add tag wrapper as html

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

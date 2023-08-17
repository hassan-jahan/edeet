<script>
// import blockMixin from '../toranj/blockMixin'

export default {
  // mixins: [blockMixin],
  props: ['block', 'parent', 'index', 'options', 'scope'], // parent can be an array or object with children same as action menus

  data() {
    return {
      settingsForm: {
        component: 'form',
        children: [
          // {
          //     'slug': 'transparent',
          //     'label': 'Transparent',
          //     'component': 'checkbox',
          //     // 'required': true,
          //     'description': 'Transparent',
          // },
          {
            slug: 'bgImg',
            label: 'Background Image',
            component: 'upload',
            // 'required': true,

            description: '',
          },
          {
            slug: 'bg',
            label: 'Background Color',
            component: 'color',
            gradient: true,
            transparent: true,
            preset: 'basic',
            options: [
              '#A463BF',
              'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
              'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))',
              'linear-gradient( 90.6deg,  rgba(59,158,255,1) -1.2%, rgba(246,135,255,1) 91.6% )',
            ],
            // 'required': true,
            description: '',
          },

          {
            slug: 'color',
            label: 'Text Color',
            component: 'color',
            preset: 'basic', // none| material| dark| light| text or array of custom colors
            // 'required': true,
            options: ['#fff', '#666', '#333'],

            description: '',
          },

          {
            slug: 'hasCustomCss',
            label: 'Custom CSS',
            component: 'checkbox',
            required: false,
            default: false,
            description: '',
            // "switch": true,
          },
          {
            slug: 'customCss',
            label: 'Custom CSS',
            // 'component': 'textarea',
            component: 'code-field',
            placeholder: `#${this.block.id} {\ncolor: red;\n}`, // with nim fasele

            required: false,
            // 'maxLength': '',
            description: 'Use !important to override',
            showIf: { slug: 'hasCustomCss', op: 'neq', value: false },

          },
        ],
      },

    }
  },

  created() {

  },
  methods: {},
}
</script>

<template>
  <section-wrapper
    class="dsht" :block="block" :parent="parent" :index="index" :options="options"
    right-slot-pos="" left-slot-pos=""
    :hide-features="[]"
    :settings-form="settingsForm"
  >
    <section class="jumbotron jumbotr2on-fluid m-0 bg-transparent" style="">
      <div class="container">
        <editable name="title" :block="block" :options="options">
          <h1 class="display-4">
            Title
          </h1>
        </editable>
        <editable name="lead" :block="block" :options="options">
          <p class="lead">
            This is a short description.
          </p>
        </editable>
      </div>
    </section>
  </section-wrapper>
</template>

<style>

</style>

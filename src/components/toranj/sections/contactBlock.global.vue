<script>
// import blockMixin from '../toranj/blockMixin'

export default {
  // mixins: [blockMixin],
  props: ['block', 'parent', 'index', 'options', 'scope'], // parent can be an array or object with children same as action menus

  data() {
    return {
      contactForm: {
        component: 'form',
        action: '',
        method: '',
        children: [
          // {
          //     'slug': 'transparent',
          //     'label': 'Transparent',
          //     'component': 'checkbox',
          //     // 'required': true,
          //     'description': 'Transparent',
          // },

          {
            slug: 'name',
            label: 'Full Name',
            component: 'input-text',
            required: true,
            description: '',
          },

          {
            slug: 'email',
            label: 'Email',
            type: 'email',
            component: 'input-text',
            required: true,
            description: '',
          },

          {
            slug: 'message',
            label: 'Message',
            component: 'textarea',
            required: true,
            minLength: 3,
            description: '',
          },
        ],
      },

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
            slug: 'boxed',
            label: 'Boxed Content',
            component: 'checkbox',
            required: false,
            default: false,
            description: '',
            // "switch": true,
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
      formData: {},
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
    <section class="jumbotron jumbotr2on-fluid m-0" style="">
      <div class="container">
        <div class="col-12 col-lg-7 mx-auto">
          <editable name="title" :block="block" :options="options">
            <h1 class="">
              Contact Us
            </h1>
          </editable>

          <editable name="description" :block="block" :options="options">
            Drop us a line! Please don't hesitate to ask us any questions.
          </editable>

          <div :class="`mt-2 ${block.boxed ? 'card p-3' : ''}`">
            <form-block
              v-if="contactForm" :block="contactForm" :model="formData" :parent="[]" :index="0"
              :options="{ edit: false }"
            />
          </div>
        </div>
        <!--                <html-tag-block :block='contactForm' :parent="[]" :index="0" -->
        <!--                            :options="{edit: true}"> -->
        <!--                </html-tag-block> -->
      </div>
    </section>
  </section-wrapper>
</template>

<style>

</style>

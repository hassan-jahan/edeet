<script>
// import blockMixin from '../toranj/blockMixin'

export default {
  // mixins: [blockMixin],
  props: ['block', 'parent', 'index', 'options', 'scope'], // parent can be an array or object with children same as action menus

  data() {
    return {
      isHidden: false,
      settingsForm: {
        component: 'form',
        children: [

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
            slug: 'fixed',
            label: 'Fixed to the top',
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

    }
  },

  created() {

  },
  methods: {
    close() {
      this.isHidden = true
    },
  },
}
</script>

<template>
  <section-wrapper
    class="dsht" :block="block" v-if="!isHidden" :parent="parent" :index="index"
    :options="options" right-slot-pos=""
    left-slot-pos=""
    :hide-features="[]"
    :settings-form="settingsForm"
  >
    <section class="  bg-info w-100 newsbar" style="">
      <div class="container ">
        <div class="p-2 text-center">
          <editable name="title" :block="block" :options="options">
            Latest News Here
          </editable>
        </div>
      </div>

      <b-btn-close
        class="mt-0 mr-2 float-right"
        size="xs"
        variant="dark"
        @click="close"
      />
    </section>
  </section-wrapper>
</template>

<style>
.newsbar p, .newsbar h2, .newsbar h3, .newsbar h4, .newsbar h5, .newsbar h6 {
    margin: 0;
    padding: 0;
}
</style>

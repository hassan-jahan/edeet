<script>
// import blockMixin from '../toranj/blockMixin'

export default {
  // mixins: [blockMixin],
  props: ['block', 'parent', 'index', 'options', 'scope'], // parent can be an array or object with children same as action menus

  data() {
    return {
      settingsForm: {},

    }
  },

  created() {
    this.settingsForm = {
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
          slug: 'color',
          label: 'Text Color',
          component: 'color',
          preset: 'basic', // none| material| dark| light| text or array of custom colors
          // 'required': true,
          options: ['#fff', '#666', '#333'],

          description: '',
        },

        {
          slug: 'bgImg',
          label: 'Background Image',
          component: 'upload',
          // 'required': true,

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

        {
            'slug': 'bg',
            'label': 'Background Color',
            'component': 'bg',
            'custom': true,
            'transparent': true,
            'preset': 'basic',
            'options': ['#fff', '#1c5cc6', 'linear-gradient( 143.3deg,  rgba(216,27,96,1) 33.1%, rgba(237,107,154,1) 74.9% )', 'linear-gradient( 90deg,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% );'],
            // 'required': true,
            'description': '',
        },
      ],
    }
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
    <section class="section-home" style=" ">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-8">
            <div class=" text-center">
              <editable name="title" :block="block" :options="options">
                <h1 class="display-4">
                  Lorem ipsum dolor sit amet
                </h1>
              </editable>

              <editable name="description" :block="block" :options="options">
                <p class="lead">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                  nonummy
                  nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim
                  ad
                  minim veniam
                </p>
              </editable>

<!--              <editable name="button" :block="block" :options="options">-->
<!--                <a class="btn btn-danger" href="/yyi">Buy Now</a>-->
<!--              </editable>-->

              <!--                            <editable name="helper" :block="block" :options="options"> -->
              <!--                                Small details. You may remove this. -->
              <!--                            </editable> -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </section-wrapper>
</template>

<style>
.section-home .row {
    min-height: calc(100vh - 78px);
}
</style>

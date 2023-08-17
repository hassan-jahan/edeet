<script>
// import blockMixin from '../toranj/blockMixin'

export default {
  // mixins: [blockMixin],
  props: ['block', 'parent', 'index', 'options', 'scope'], // parent can be an array or object with children same as action menus

  data() {
    return {
      style: {
        'color': this.block.color,
        'background': this.block.bg,
        '--footerLinkColor': this.block.linkColor || 'red',
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
            slug: 'reverse',
            label: 'Reverse Order',
            component: 'checkbox',
            required: false,
            default: false,
            description: '',
            // "switch": true,
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
            options: ['#fff', '#1c5cc6', 'linear-gradient( 143.3deg,  rgba(216,27,96,1) 33.1%, rgba(237,107,154,1) 74.9% )', 'linear-gradient( 90deg,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% );',
            ],
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
    <section
      class="py-4 py-lg-5 "
      :style="`--footerLinkColor: ${block.linkColor}`"
    >
      <div class="container">
        <div class="row align-items-center justify-content-between">
          <div :class="`col-12 col-md-7 col-lg-6 ${block.reverse ? 'order-lg-2 pl-5' : ''}`">
            <editable
              name="title"
              :block="block"
              :options="options"
            >
              <h2>
                Feature Title Here.
              </h2>
            </editable>

            <editable
              name="description"
              :block="block"
              :options="options"
            >
              <p class="lead">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                nonummy
                nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim
                ad
                minim veniam
              </p>
            </editable>
          </div>

          <div class="col-12 col-md-5 col-lg-6 py-3 order-1 text-center">
            <editable
              name="img"
              :block="block"
              :options="options"
            >
              <img
                src="@/assets/img/placeholder.svg" alt=""
                class="img-fluid"
              >
            </editable>
            <!--                            &lt;!&ndash;                        &ndash;&gt; -->
            <!--                            <img-editable name="lte277ss2st" :block="block" :options="options" src="" alt="" -->
            <!--                                          class="img-fluid mb-6 mb-md-0" width="400" height=""></img-editable> -->
          </div>
        </div> <!-- / .row -->
      </div> <!-- / .container -->
    </section>
  </section-wrapper>
</template>

<style>
.main-footer {
}

.main-footer a {
    /*color: #005dff;*/
    color: var(--footerLinkColor);
}

.main-footer ul li {
    /*vertical-align: middle;*/
    /*margin-right: 7px;*/
}

.main-footer .list li a {
    /*color: #141414;*/
}

/*@media (max-width: 767.98px) {*/
/*    .main-footer .title-footer {*/
/*        margin: 15px 0;*/
/*    }*/
/*}*/
</style>

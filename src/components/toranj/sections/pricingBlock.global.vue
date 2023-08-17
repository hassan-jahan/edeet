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

          {
            slug: 'cols',
            label: 'Columns',
            component: 'select',
            // 'required': true,
            values: [2, 3, 4],
            description: '',
          },

          {
            slug: 'specialPlan',
            label: 'Special Plan',
            component: 'radio',
            // 'required': true,
            values: ['None', 1, 2, 3, 4],
            description: 'Choose the popular or recommended plan',
          },

          {
            slug: 'specialPlanText',
            label: 'Special Plan Text',
            component: 'input-text',
            description: '',
            showIf: { slug: 'specialPlan', op: 'neq', value: 'None' },
          },

          {
            slug: 'specialPlanBg',
            label: 'Special Plan Background',
            component: 'color',
            gradient: true,
            transparent: false,
            preset: 'basic',
            options: ['green', '#1c5cc6'],
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
            slug: 'boxed',
            label: 'Boxed Content',
            component: 'checkbox',
            required: false,
            default: false,
            description: '',
            // "switch": true,
          },
          {
            slug: 'boxColor',
            label: 'Box Color',
            component: 'color',
            gradient: true,
            transparent: true,
            preset: 'basic',
            showIf: { slug: 'boxed', value: true },
            // 'showIf': !this.thePage.settings || !this.thePage.settings.noIndex,
          },

          {
            slug: 'shadowEffect',
            label: 'Shadow Effect',
            component: 'checkbox',
            required: false,
            default: false,
            description: '',
            showIf: { slug: 'boxed', value: true },

            // "switch": true,
          },

        ],
      },

    }
  },
  computed: {
    colsClass() {
      switch (this.block.cols) {
        case 2:
          return 'col-12 col-md-6 col-lg-6'
        case 4:
          return 'col-12 col-md-6 col-lg-3'
        case 3:
        default:
          return 'col-12 col-md-6 col-lg-4'
      }
    },
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
      class="py-4 py-lg-5 px-3"
      :style="`--footerLinkColor: ${block.linkColor}`"
    >
      <div class="container ">
        <!--                                <editable -->
        <!--                                    name="menu" -->
        <!--                                    :block="block" -->
        <!--                                    :options="options" -->

        <!--                                    item-classes="col-12 col-md-6 col-lg-4" -->
        <!--                                    :class="`row align-items-stretch`" -->
        <!--                                    :code="true" -->

        <!--                                > -->
        <editable name="title">
          <h3 class="p-3">
            Pricing
          </h3>
        </editable>

        <div
          class="row align-items-stretch justify-content-center22 text-center "
        >
          <!--            todo: drop down will be disabled if you move an item inside this row outside of this row maye drop down group for horizental and non-horizental
                    mx-1 py-1 may not work with moved item?
                    -->

          <div
            v-for="(col, index) in block.cols" :key="index"
            :class="`${colsClass} my-3 car22d ${block.boxed && block.shadowEffect ? 'hover-shadow hover-up' : ''}`"
          >
            <div class="card-body" :style="`${block.boxed ? `background: ${block.boxColor}` : ''}`">
              <!--                            <editable class="h1" :name="`icon`" :options="options"> -->
              <!--                                <span class="iconify" data-icon="dashicons:admin-page" data-inline="false"></span> -->
              <!--                            </editable> -->

              <editable
                :name="`title_${index + 1}`"
                :options="options"
              >
                <h4>
                  Silver
                </h4>
              </editable>

              <editable
                :name="`lead_${index + 1}`"
                :options="options"
              >
                <p class="lead">
                  Small Businesses
                </p>
              </editable>

              <div
                v-if=" block.specialPlan == index + 1"
                class="badge badge-success rounded"
                :style="`${block.specialPlanBg ? `background: ${block.specialPlanBg}` : ''}`"
              >
                {{ block.specialPlanText ? block.specialPlanText : 'Most Popular' }}
              </div>

              <div class="my-2">
                <editable
                  :name="`price_${index + 1}`"
                  :options="options"
                >
                  <h1>
                    $10 <span style="font-size: 16px;">/month</span>
                  </h1>
                </editable>
              </div>

              <editable
                :name="`features_${index + 1}`"
                :block="block"
                :options="options"
                :repeat-default="3"
                class="list-unstyled mt-1 "
                tag-name="ul"
              >
                <li>Feature</li>
              </editable>

              <editable :name="`button_${index + 1}`" :block="block" :options="options">
                <a class="btn btn-block" href="#/">Order Now</a>
              </editable>
            </div>
          </div>
        </div>

        <!--                    <div v-for="(i, index) in Array(block.cols)" class="col-12 col-md-6 col-lg-4"> -->

        <!--                    </div> -->
      </div> <!-- / .container -->
    </section>
  </section-wrapper>
</template>

<style>
/*@media (max-width: 767.98px) {*/
/*    .main-footer .title-footer {*/
/*        margin: 15px 0;*/
/*    }*/
/*}*/
</style>

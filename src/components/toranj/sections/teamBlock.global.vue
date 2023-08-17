
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
  methods: {

  },
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
            Our Team
          </h3>
        </editable>

        <repeater
          name="cards"
          :repeat-default="3"
          :item-classes="`${colsClass} text-center`"
          class="row align-items-stretch"
        >
          <!--            todo: drop down will be disabled if you move an item inside this row outside of this row maye drop down group for horizental and non-horizental
                    mx-1 py-1 may not work with moved item?
                    -->

          <div
            :class="`my-3 ${block.boxed ? 'card' : ''} ${block.boxed && block.shadowEffect ? 'hover-shadow hover-up' : ''}`"
            :style="`${block.boxed ? `background: ${block.boxColor}` : ''}`"
          >
            <div class="card-body">
              <editable name="icon" :options="options">
                <img src="" class="rounded-circle" width="100" height="100">
              </editable>

              <!--                           todo: IMPORTANT: no block to get block from repeater!! -->
              <editable
                name="name"
                class="mt-3"
                :options="options"
              >
                <h3>
                  John Smith
                </h3>
              </editable>

              <editable
                name="description"
                :options="options"
              >
                <p class="lead">
                  CEO / Co-Founder
                </p>
              </editable>
            </div>
          </div>
        </repeater>

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

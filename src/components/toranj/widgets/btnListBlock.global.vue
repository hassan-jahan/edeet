<script>
// import blockMixin from '../toranj/blockMixin'

const JUSTIFY = ['start', 'center', 'end', 'between', 'around']

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
          {
            slug: 'noGreyscale',
            label: 'Disable hover effect',
            component: 'checkbox',
            // 'required': true,
            description: '',
          },

          {
            slug: 'justify',
            label: 'Justify Content',
            component: 'select',
            // 'type':'radio',
            values: JUSTIFY,
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
            options: ['#fff', '#1c5cc6', '#ff88cc', 'linear-gradient( 143.3deg,  rgba(216,27,96,1) 33.1%, rgba(237,107,154,1) 74.9% )', 'linear-gradient( 90deg,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% );',
            ],
            // 'required': true,
            description: '',
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
  <widget-wrapper
    class="dsht" :block="block" :parent="parent" :index="index" :options="options"
    right-slot-pos="outside" left-slot-pos="outside"
    :hide-features="[]"
    :settings-form="settingsForm"
  >
    <editable
      name="children"
      :block="block"
      :options="options"
      item-classes=""
      :repeat-default="1"
      :class="`d-flex flex-row py-1 align-items-center ${block.justify ? `justify-content-${block.justify}` : 'justify-content-center'}`"
    >
      <!--            todo: drop down will be disabled if you move an item inside this row outside of this row maye drop down group for horizental and non-horizental
                    mx-1 py-1 may not work with moved item?
                    -->
      <!--            enter a component as default on add button -->

      <a href="#" class="btn btn-primary">Button Text</a>
    </editable>
  </widget-wrapper>
</template>

<style>
.greyscale-effect img, img.greyscale-effect {
    filter: grayscale(100%);
    opacity: .6;
    transition: all 0.3s ease;
}

.greyscale-effect img:hover, img.greyscale-effect:hover {
    filter: grayscale(10%);
    opacity: 1;
}

/*@media (max-width: 767.98px) {*/
/*    .main-footer .title-footer {*/
/*        margin: 15px 0;*/
/*    }*/
/*}*/
</style>

<script>
// import blockMixin from '../blockMixin'
const JUSTIFY = ['start', 'center', 'end', 'between', 'around']

export default {
  directives: {},
  // mixins: [blockMixin],
  inheritAttrs: false,
  props: ['block', 'parent', 'index', 'options', 'scope'], // parent can be an array or object with children same as action menus
  data() {
    return {
      justify: JUSTIFY,
      emptyAddWidgetId: '',
      settingsForm: {
        component: 'form',
        children: [
          {
            slug: 'justify',
            label: 'Justify Content',
            component: 'select',
            // 'type':'radio',
            values: JUSTIFY,
            // 'required': true,
            description: '',
          },
        ],
      },

    }
  },
  computed: {},
  watch: {
    'block.html': function (newVal) {
      // console.log(newVal)
    },
    // 'options.edit' (newVal) { //require for reactivity
    //     if (newVal) {
    //         this.inputContent = this.addWrapper(this.block.html)
    //     }
    // }
  },
  mounted() { // it's ok no problem with created SSR
    this.emptyAddWidgetId = `empty-${this.$helper.randomString(5)}`

    // if not html add tag wrapper as html
    if (!this.block.html) {
      const slots = this.$el.getElementsByClassName('slot-wrapper')
      if (slots && slots.length) {
        // this.block.html = slots[0].innerHTML || '<div><code>Click above to start coding!</code></div>'
        this.$set(this.block, 'html', slots[0].innerHTML || '<div class="pt-2"><p><code>Click above to start coding!</code></p></div>')

        // console.log(slots[0].innerHTML)
      } // may have several children
    }
  },
  methods: {},
}
</script>

<template>
  <widget-wrapper
    v-else :block="block" :parent="parent" :index="index" :options="options" :footer-add="true"
    right-slot-pos="outside" left-slot-pos="outside"
    :hide-features="[]"
    :settings-form="settingsForm"
  >
    <template #menu-right>
      <b-btn
        size="sm"
        @click.prevent="$root.$emit('bv::show::modal', `settings-${block.id}`)"
      >
        <span class="iconify" data-icon="ic:baseline-settings" data-inline="false" />
      </b-btn>

      <widget-wrapper
        :block="{ id: emptyAddWidgetId, component: 'empty-add' }" :parent="block.children" :index="block.children && block.children.length ? block.children.length : 0"
        :options="options" :footer-add="false"
        right-slot-pos="none" left-slot-pos="none"
        :hide-features="[]"
        :settings-form="{}"
        class="toranj-placeholder-widge22t"
      >
        <!--           todo: hide like footer add / change positin to absoulute or so to remove height -->

        <button
          v-b-tooltip.hover.top.window.ds850="'Add Item Inside'"
          class="btn btn-secondary btn-sm "
          style="margin-top:0px;"
          @click.prevent="$root.$emit('bv::show::popover', emptyAddWidgetId)"
        >
          <span class="iconify big" data-icon="dashicons:plus-alt2" data-inline="true" />
        </button>
        <!--            <a href="#" @click.prevent="$root.$emit('bv::show::popover', 'empty')">ss</a> -->
        <!--            JUST Empty to make open popover work -->
      </widget-wrapper>
    </template>

    <!--        should be children as standard for add button -->
    <editable
      name="children"
      :block="block"
      :options="options"
      item-classes="mx-1"
      :class="`d-flex flex-row py-1 justify-content-${block.justify}`"
    >
      <!--            todo: drop down will be disabled if you move an item inside this row outside of this row maye drop down group for horizental and non-horizental
            mx-1 py-1 may not work with moved item?
            -->
      <!--            enter a component as default on add button -->
    </editable>

    <!-- &lt;!&ndash;        not recommended for outside change margin-left negative to make it work correctly &ndash;&gt; -->
    <!--               <template v-slot:menu-left> -->
    <!--                   <b-btn size="xs">TS</b-btn> -->
    <!--               </template> -->
  </widget-wrapper>
</template>

<style>

</style>

<script>
// import { directive as onClickaway } from 'vue-clickaway'

export default {
  name: 'AddFieldPopover',
  props: ['targetId', 'parent', 'index', 'scope'],
  data() {
    return {
      // target: '',
      showAddFieldPopover: false,
      defaultFieldSettings: {
        label: 'Untitled Field',
      },
    }
  },
  // directives: { //doesn't work
  //     onClickaway: onClickaway
  // },
  created() {

    // this.$root.$on('openAddField', (blockId, parent, index) => {
    //     this.showAddFieldPopover = false
    //     console.log('blockId')
    //     console.log(blockId)
    //     console.log('parent')
    //     console.log(parent, index)
    //     this.target = blockId
    //     this.parent = parent
    //     this.index = index
    //
    //     setTimeout(() => { //wait to render popover
    //         this.showAddFieldPopover = true
    //     }, 250)
    //
    // })

    // this.showAddFieldPopover = true
    // this.$root.$emit('bv::show::popover', this.target)
  },
  methods: {

    Add(block) { // next to it
      const clone = JSON.parse(JSON.stringify(block))
      clone.id = `${clone.component}_${this.$helper.randomNumber(1, 999)}`
      if (!block.slug && block.label) {
        // Note: do not use component name in slug (because of -) __will be seen as meta
        clone.slug = `__${this.$options.filters.slugify(block.label, null, null, '_')}${this.$helper.randomNumber(1, 99)}`
      }
      else if (!block.slug) {
        clone.slug = `__${clone.id}`
      }

      console.log('parent and targetid', this.parent, this.targetId)
      this.parent.splice(this.index + 1 || this.parent.length, 0, clone)
      this.showAddFieldPopover = false

      this.$root.$emit('bv::show::modal', `settings-${clone.id}`)
      // this.clickAway()
      // this.layout.push(clone) //shallow or deep
    },
  },
}
</script>

<template>
  <b-popover
    v-if="targetId"
    :ref="targetId"
    v-model:show="showAddFieldPopover"
    class="p-0-popover"
    :target="targetId"
    triggers="manual"
    placement="bottom"
    custom-class="p-0-popover dsht"
  >
    <!--        v-on-clickaway="showAddFieldPopover=false" -->

    <!--          <div class="list-unstyled"> -->
    <!--              <li><a href="sd" class="dropdown-item">text</a></li> -->
    <!--              <li><a href="sd" class="dropdown-item">text</a></li> -->
    <!--              <li><a href="sd" class="dropdown-item">text</a></li> -->
    <!--          </div> -->

    <b-list-group flash style="max-height: 200px;min-width: 180px;overflow-y: scroll;">
      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'" href="#" class="px-3"
        @click.prevent="Add({ component: 'input-text', label: 'Text Field' })"
      >
        <span class="iconify" data-icon="ion:text" data-inline="true" /> Text Field
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'" href="#"
        class="px-3"
        @click.prevent="Add({ component: 'textarea', label: 'Multiline Field' })"
      >
        <span class="iconify" data-icon="ion:text" data-inline="true" /> Multiline Field
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'"
        href="#"
        class="px-3"
        @click.prevent="Add({ component: 'select', label: 'Choose one', values: ['Option 1', 'Option 2'] })"
      >
        <span class="iconify" data-icon="codicon:symbol" data-inline="true" /> Select
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'" href="#"
        class="px-3"
        @click.prevent="Add({ component: 'checkbox', label: 'Checkbox Field ' })"
      >
        <span class="iconify" data-icon="codicon:symbol" data-inline="true" /> Checkbox / Switch
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'" href="#"
        class="px-3"
        @click.prevent="Add({ component: 'date', label: 'Date Field' })"
      >
        <span class="iconify" data-icon="codicon:symbol" data-inline="true" /> Date Picker
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'" href="#"
        class="px-3"
        @click.prevent="Add({ component: 'action-button', label: 'Action Button' })"
      >
        <span class="iconify" data-icon="codicon:symbol" data-inline="true" /> Action Button
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'" href="#"
        class="px-3"
        @click.prevent="Add({ component: 'rate', label: 'Rating Field' })"
      >
        <span class="iconify" data-icon="codicon:symbol" data-inline="true" /> Rating
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'" href="#"
        class="px-3"
        @click.prevent="Add({ component: 'booking', label: 'Booking Field' })"
      >
        <span class="iconify" data-icon="codicon:symbol" data-inline="true" /> Booking
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'" href="#" class="px-3"
        @click.prevent="Add({ component: 'upload', label: 'File' })"
      >
        <span class="iconify" data-icon="codicon:symbol" data-inline="true" /> Upload File
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'"
        href="#"
        class="px-3"
        @click.prevent="Add({ component: 'post-select', label: 'Choose a Post', defined: false, taggable: false, getOnlyIds: true })"
      >
        <span class="iconify" data-icon="codicon:symbol" data-inline="true" />
        Data Selector
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'"
        href="#"
        class="px-3"
        @click.prevent="Add({ component: 'relation', label: 'Relation', defined: false, taggable: false, getOnlyIds: true })"
      >
        <span class="iconify" data-icon="codicon:symbol" data-inline="true" />
        Relation
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'"
        href="#"
        class="px-3"
        @click.prevent="Add({ component: 'relation-field', label: 'Relation Field' })"
      >
        <span class="iconify" data-icon="codicon:symbol" data-inline="true" />
        Relation Field
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'" href="#"
        class="px-3"
        @click.prevent="Add({ component: 'color', label: 'Color' })"
      >
        <span class="iconify" data-icon="ion:text" data-inline="true" /> Color
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'" href="#"
        class="px-3"
        @click.prevent="Add({ component: 'hidden', label: 'Calculated Field' })"
      >
        <span class="iconify" data-icon="ion:text" data-inline="true" /> Calculated Field
      </b-list-group-item>

      <!--            NOTE shoulnd't use - inside id and component name in order to avoid watch problems -->

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'" href="#"
        class="px-3"
        @click.prevent="Add({ component: 'small-number', label: 'Small Number' })"
      >
        <span class="iconify" data-icon="codicon:symbol" data-inline="true" /> Small Number
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'" href="#"
        class="px-3"
        @click.prevent="Add({ component: 'form-designer', label: 'Form Designer' })"
      >
        <span class="iconify" data-icon="ion:text" data-inline="true" /> Form Designer
      </b-list-group-item>

      <!--            <b-list-group-item href="#" @click.prevent="Add({component:'input-number'})" class="px-3" -->
      <!--                               v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'"> -->
      <!--                <span class="iconify" data-icon="noto:digit-one" data-inline="true"></span> Number Field -->
      <!--            </b-list-group-item> -->
    </b-list-group>
  </b-popover>
</template>

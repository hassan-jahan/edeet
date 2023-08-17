<script>
// import { directive as onClickaway } from 'vue-clickaway'

export default {
  name: 'AddStatusPopover',
  props: ['targetId', 'block', 'parent', 'index', 'scope'],
  data() {
    return {
      // target: '',
      showAddStatusPopover: false,
    }
  },
  // directives: { //doesn't work
  //     onClickaway: onClickaway
  // },
  created() {

    // this.$root.$on('openAddField', (blockId, parent, index) => {
    //     this.showAddFieldPopover = false
    //     console.log(parent, index)
    //     this.target = blockId
    //     this.parent = parent//
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
      // maybe use child mixin add not define another add this.$parent.add()
      const clone = JSON.parse(JSON.stringify(block))
      // clone.id = clone.component + '-' + this.$helper.randomNumber(1, 999)
      clone.id = this.$helper.randomString(6) // char 6 byte for shortIds for faster joins

      if (!block.slug && block.title)
        clone.slug = this.$options.filters.slugify(block.title, null, null, '_') + this.$helper.randomNumber(1, 999)
      else if (!block.slug)
        clone.slug = clone.id

      this.parent.splice(this.index + 1 || this.parent.length, 0, clone)
      this.showAddStatusPopover = false
      // this.layout.push(clone) //shallow or deep
    },
  },
}
</script>

<template>
  <b-popover
    v-if="targetId"
    :ref="targetId"
    v-model:show="showAddStatusPopover"
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
        @click.prevent="Add({ component: 'basic-status', title: 'Approval Status' })"
      >
        <span class="iconify" data-icon="ion:text" data-inline="true" /> Approval Status
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'" href="#" class="px-3"
        @click.prevent="Add({ component: 'basic-status', title: 'Send An Email/SMS/Slack' })"
      >
        <span class="iconify" data-icon="ion:text" data-inline="true" /> Send An Email/SMS
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'" href="#" class="px-3"
        @click.prevent="Add({ component: 'basic-status', title: 'Next Step' })"
      >
        <span class="iconify" data-icon="ion:text" data-inline="true" /> Send Message (Slack/WhatsApp/)
      </b-list-group-item>

      <b-list-group-item
        v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'" href="#" class="px-3"
        @click.prevent="Add({ component: 'basic-status', title: 'Next Step' })"
      >
        <span class="iconify" data-icon="ion:text" data-inline="true" /> Webhook API
      </b-list-group-item>

      <!--            <b-list-group-item href="#" @click.prevent="Add({component:'input-number'})" class="px-3" -->
      <!--                               v-b-tooltip.hover.right.viewport.html.ds500.v-warning="'Add it to the page'"> -->
      <!--                <span class="iconify" data-icon="noto:digit-one" data-inline="true"></span> Number Field -->
      <!--            </b-list-group-item> -->
    </b-list-group>
  </b-popover>
</template>

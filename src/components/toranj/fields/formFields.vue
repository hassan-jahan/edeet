<script>
import blockMixin from '../blockMixin'

export default {
  mixins: [blockMixin],
  props: ['block', 'parent', 'index', 'options', 'model', 'scope', 'type'], // parent can be an array or object with children same as action menus

  created() {
    if (this.block && !this.block.id)
      this.block.id = this.$helper.randomString(6)

    if (this.block && !this.block.children)
      this.block.children = []
  },
}
</script>

<template>
  <div class="">
    <draggable
      v-if="block.children && block.children.length"
      v-model="block.children"
      group="field"
      class="toranj-form"
      :disabled="!options.edit"
      handle=".widget-drag-handler"
      ghost-class="drop-placeholder"
    >
      <component
        :is="getComponent(field)"
        v-for="(field, index) in block.children"
        :key="field.id"
        :block="field"
        :parent="block.children"
        :model="model"
        :scope="scope"
        :class="`toranj-field toranj-${field.component} ${field.classes00 || ''}`"
        :index="index"
        :type="type"
        :options="options"
        :attrs="(index == 0) ? $attrs : ''"
      >
        <!--  used only to get default for the first item can also add an if index==0 -->
        <slot v-if="index == 0" />
      </component>
    </draggable>

    <div v-if="options.edit" class="text-center m-3" :class="[{ 'p-3': !block.children?.length }]">
      <div v-if="!block.children?.length" class="m-2 big text-muted">
        Click
        below to add your first block to the page.
      </div>
      <button
        :id="`add-field-to-${block.id}`"
        class="btn btn btn-success"
        @click.prevent="$root.$emit('bv::show::popover', `add-field-to-${block.id}`)"
      >
        <span
          class="iconify big" data-icon="dashicons:plus-alt2"
          data-inline="true"
        />
        Add Field
      </button>

      <!--            should always be bottom of co -->
      <addFieldPopover
        :target-id="`add-field-to-${block.id}`"
        :type="type"
        :parent="block.children"
      />
    </div>
  </div>
</template>

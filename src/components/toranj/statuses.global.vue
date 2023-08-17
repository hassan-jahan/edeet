<script>
import blockMixin from './blockMixin'

export default {
  mixins: [blockMixin],
  props: ['block', 'parent', 'index', 'options', 'type', 'scope', 'model'], // parent can be an array or object with children same as action menus

}
</script>

<template>
  <draggable
    v-if="parent && parent.length"
    group="status"
    class="toranj-statuses"
    :disabled="!options.edit"
    handle=".widget-drag-handler"
    ghost-class="drop-placeholder"
  >
    <component
      :is="getComponent(status)"
      v-for="(status, index) in parent"
      :key="status.id"
      :block="status"
      :parent="parent"
      :type="type"
      :scope="scope"
      :class="`toranj-status toranj-${status.component} ${status.classes00 || ''}`"
      :index="index"
      :options="options"
      :attrs="(index == 0) ? $attrs : ''"
    >
      <!--  used only to get default for the first item can also add an if index==0 -->
      <slot v-if="index == 0" />
    </component>
  </draggable>
</template>

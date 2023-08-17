<script>
export default {
  props: ['modalId', 'block', 'model', 'status', 'actions', 'scope', 'type', 'options'], // if posts was array we update it otherwise we skip it
  data() {
    return {
      actionsBlockId: 'status-actions',
      inputForm: [
        {
          slug: 'meta.hasInput',
          label: 'Has custom form',
          component: 'checkbox',
          required: false,
          default: false,
          description: '',
          // "switch": true,
        },
        {
          slug: 'inputForm',
          label: 'Input Form',
          component: 'form-designer',
          showIf: 'meta.hasInput',
        },
      ],
    }
  },
  computed: {},

  watch: {},
  created() {

  },
  mounted() {

  },
  methods: {

    Cancel() {
      this.$root.$emit('bv::hide::modal', this.modalId)
      // this.$emit("hideEditor", true);
    },

    Hide(bvModalEvent) {
      console.log('hide', this.actions, this.$refs)
      // for (let i = 0; i++; this.model.length) {
      //     if (!this.$refs['newStatusEmailForm-' + i].checkValidity()) {
      //         this.$refs['newStatusEmailForm-' + i].reportValidity()
      //
      //         // Prevent modal from closing
      //         bvModalEvent.preventDefault()
      //     }
      // }
    },

    Shown() {

    },

  },
}
</script>

<template>
  <b-modal
    :id="modalId" title="" :hide-header="false"
    :hide-footer="true" size="sm"
    scrollable content-class="modal-draggable"
    modal-class="dsht no-animation"
    hide-backdrop
    lazy
    @shown="Shown"
    @hide="Hide"
  >
    <p>{{ block.description }}</p>

    <actions
      :block="type" :parent="actions"
      :options="options"
      :index="0"
      :type="type"
      :scope="scope"
    />

    <div
      class="text-center m-3" :class="[{ 'p-5': !actions.length }]"
    >
      <div v-if="!actions.length" class="m-2 big text-muted">
        Click
        below
        to add your first
        action.
      </div>
      <button
        :id="`add-action-${actionsBlockId}`"
        class="btn btn btn-success"
        @click.prevent="$root.$emit('bv::show::popover', `add-action-${actionsBlockId}`)"
      >
        <span
          class="iconify big" data-icon="dashicons:plus-alt2"
          data-inline="true"
        />
        Add Action
      </button>
    </div>

    <formFields
      class="toranj-section" :model="model"
      :block="{ id: `new-action-input-form${block.id}`, children: inputForm }"
      :parent="[]" :index="0" :options="{ edit: false }" :scope="{}" :type="{}"
    />
    <!--            should always be bottom of co -->
    <addActionPopover
      :target-id="`add-action-${actionsBlockId}`"
      :block="{ id: actionsBlockId, children: actions }"
      :parent="actions"
    />

    <div v-if="$auth.isStaff() && options.edit" class="m-1">
      <pre class="ltr bg-dark text-white p-3">{{ actions }}</pre>
    </div>
  </b-modal>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

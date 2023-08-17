<script>
const statusList = {}

export default {
  props: ['modalId', 'model', 'scope', 'type'], // if posts was array we update it otherwise we skip it
  data() {
    return {
      // newEmail: {},
      // options: {edit: false},
      // emailSettings: [],
      actionTypeSettings: [],
      // tabCounter: 1,
      activeTab: 0,
      // emailData: {},
    }
  },
  computed: {
    formulaFields() {
      if (!this.scope.typeId_data || !Array.isArray(this.scope.typeId_data.postFields))
        return []

      const arr = []
      this.scope.typeId_data.postFields.forEach((item, index) => {
        // todo: autofill and hidden and default may not work correctly

        // if (['input-text', 'hidden', 'textarea'].includes(item.component))
        arr.push({
          component: 'input-text',
          type: 'text',
          default: item.useFormula ? item.formula : item.default, // set value
          slug: item.slug,
          label: item.label,
          // useFormula: item.useFormula,
          // formula: item.formula,

        })
      })
      return arr
    },

    // modalId() {
    //     // if (this.item && this.item.id && this.type && this.type.slug)
    //     return this.isEdit ? 'edit-post-' + this.post.id : 'new-post-' + this.type.slug
    //     // return false
    // }
  },

  watch: {},
  created() {
    if (!this.model || !Array.isArray(this.model))
      this.model = [{ id: this.$helper.randomString(3) }]
    else if (this.model && this.model.nextLabel) // old version object
      this.model = [{ id: this.$helper.randomString(3) }]

    this.actionTypeSettings = [

      {
        slug: 'typeId',
        label: 'Create Type',
        component: 'select-type',
        idField: 'id',
        values: [], // maybe to be reactive
        required: true,
        description: '',
        // 'showIf': {"slug": "type", "value": 'number'}
      },

    ]
  },
  mounted() {

  },
  methods: {
    deleteItem(index) {
      this.model.splice(index, 1)
    },

    // closeTab(x) {
    //     for (let i = 0; i < this.model.length; i++) {
    //         if (this.model[i] === x) {
    //             this.model.splice(i, 1)
    //         }
    //     }
    // },
    newTab() {
      this.model.push({ id: this.$helper.randomString(3) })
      setTimeout(() => {
        this.activeTab = this.model.length + 1
      }, 100)
    },

    Hide(bvModalEvent) {
      console.log('hide', this.model, this.$refs)
      for (let i = 0; i++; this.model.length) {
        if (!this.$refs[`newStatusEmailForm-${i}`].checkValidity()) {
          this.$refs[`newStatusEmailForm-${i}`].reportValidity()

          // Prevent modal from closing
          bvModalEvent.preventDefault()
        }
      }
    },
    Save() {
      if (!this.$refs.newStatusEmailForm.checkValidity()) {
        this.$refs.newStatusEmailForm.reportValidity()
        return
      }

      this.$root.$emit('bv::hide::modal', this.modalId)
    },
    Cancel() {
      this.$root.$emit('bv::hide::modal', this.modalId)
      // this.$emit("hideEditor", true);
    },
    SendTest() {
      if (!this.$refs.newEditForm.checkValidity()) {
        this.$refs.newEditForm.reportValidity()
        return
      }

      this.$axios.get('to preview send ', { params }).then((res) => {
        const items = res.data

        this.$toast('Email was sent successfully!', 'success')
      })
    },

    Shown() {

    }
    ,

  },
}
</script>

<template>
  <b-modal
    :id="modalId" title="" :hide-header="false"
    :hide-footer="true" size="md"
    scrollable content-class="modal-draggable"
    modal-class="dsht no-animation"
    hide-backdrop
    lazy
    @shown="Shown"
    @hide="Hide"
  >
    <b-card no-body>
      <b-tabs v-model="activeTab" card>
        <!-- Render Tabs, supply a unique `key` to each tab -->
        <b-tab v-for="(notification, index) in model" :key="`dyn-tab-${index}`" :title="`Email ${index + 1}`">
          <b-button
            v-b-tooltip.window.right.ds500="'Delete Item'" class="float-right mb-2"
            variant="outline-danger" size="sm" @click="deleteItem(index)"
          >
            <span class="iconify big" data-icon="bx:trash" data-inline="true" />
          </b-button>
          <div class="clearfix" />

          <form
            :ref="`newStatusEmailForm-${index}`"
            method="POST"
            accept-charset="UTF-8"
            enctype="multipart/form-data"
            autocomplete="off"
            @submit.prevent="Save"
          >
            <formFields
              class="toranj-section" :model="notification"
              :block="{ id: 'new-email-status', children: actionTypeSettings }"
              :parent="[]" :index="0" :options="{ edit: false }" :scope="scope"
            />

            <formFields
              class="toranj-section" :model="notification"
              :block="{ id: 'new-email-status', children: formulaFields }"
              :parent="[]" :index="0" :options="{ edit: false }" :scope="scope"
            />

            sss
            {{ scope }}
          </form>
        </b-tab>

        <!-- New Tab Button (Using tabs-end slot) -->
        <template #tabs-end>
          <b-nav-item role="presentation" href="#" class="" @click.prevent="newTab">
            <b>+</b>
          </b-nav-item>
        </template>

        <!-- Render this if no tabs -->
        <template #empty>
          <div class="text-center text-muted">
            There are no action<br>
            Add a new action using the <b>+</b> button above.
          </div>
        </template>
      </b-tabs>
    </b-card>

    <template #modal-footer="{ ok, cancel, hide }">
      <div class="d-flex justify-content-between w-100">
        <!--                <div class="text-right"> -->
        <!--                    <b-btn variant="secondary" @click.prevent="Cancel()">Cancel</b-btn> -->
        <!--                    <b-btn variant="secondary" @click.prevent="SendTest()">Send</b-btn> -->
        <!--                    <b-btn variant="primary" @click.prevent="SendTest()">Send Test</b-btn> -->
        <!--                </div> -->
      </div>
    </template>
  </b-modal>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

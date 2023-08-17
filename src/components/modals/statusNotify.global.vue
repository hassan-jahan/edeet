<script>
const statusList = {}

export default {
  props: ['modalId', 'model', 'scope', 'type'], // if posts was array we update it otherwise we skip it
  data() {
    return {
      // newEmail: {},
      // options: {edit: false},
      emailSettings: [],
      // tabCounter: 1,
      activeTab: 0,
      // emailData: {},
    }
  },
  computed: {
    emailFields() {
      if (!Array.isArray(this.type.postFields))
        return []

      const arr = []
      this.type.postFields.forEach((item, index) => {
        if (['input-text', 'hidden', 'textarea'].includes(item.component))
          arr.push({ text: item.label || item.slug, value: item.slug })
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
    else if (this.model && this.model.toWho) // old version object
      this.model = [{ id: this.$helper.randomString(3) }]

    this.emailSettings = [

      {
        slug: 'toWho',
        label: 'To',
        component: 'radio',
        idField: 'id',
        size: 'sm',
        values: [{ text: 'Post Creator', value: 'postCreator' }, {
          text: 'App Owner',
          value: 'appOwner',
        }, { text: 'Field', value: 'field' }, { text: 'Assignee', value: 'assignees' }, {
          text: 'Custom',
          value: 'custom',
        }],
        // todo: addToAssignee //maybe to be reactive
        // todo: default message not type it manually

        required: true,
        description: '',
        // 'showIf': {"slug": "type", "value": 'number'}
      },

      {
        slug: 'field',
        label: 'Field containing email',
        component: 'select',
        idField: 'id',
        values: this.emailFields, // maybe to be reactive
        required: true,
        description: '',
        showIf: { slug: 'toWho', value: 'field' },
      },
      {
        slug: 'email',
        label: 'Email Address',
        component: 'input-text',
        required: true,
        description: 'Separate by ,',
        showIf: { slug: 'toWho', value: 'custom' },
      },
      //
      // todo:default /templating / multiple
      // //logic to send if
      //
      {
        slug: 'subject',
        label: 'Subject',
        component: 'input-text',
        required: true,
        maxLength: 350,
        description: '',
        // "showIf": {"slug": "settings.noIndex", "value": false},

      },
      {
        slug: 'message',
        label: 'Message',
        component: 'textarea',
        required: true,
        rows: 5,
        description: '',
        // "showIf": {"slug": "settings.noIndex", "value": false},
        // 'showIf': !this.thePage.settings || !this.thePage.settings.noIndex,
      },

      {
        slug: 'hasAction',
        label: 'Add call to action button',
        component: 'checkbox',
        // 'buttons': true,
        // stacked: true,
        variant: 'outline-dark',
        size: 'md',
        // values: [{text: 'Formatted', value: 'html'}, {text: 'RAW', value: 'raw'}],
        description: '',
        // 'showIf': {"slug": "type", "value": 'number'}
      },

      {
        slug: 'actionText',
        label: 'Action Button Text',
        component: 'input-text',
        required: true,
        // 'maxLength': 350,
        description: '',
        showIf: { slug: 'hasAction', op: 'neq', value: false },

      },
      {
        slug: 'actionLink',
        label: 'Action Link',
        component: 'input-text',
        required: true,
        // 'maxLength': 350,
        description: '',
        showIf: { slug: 'hasAction', op: 'neq', value: false },

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
              :block="{ id: 'new-email-status', children: emailSettings }"
              :parent="[]" :index="0" :options="{ edit: false }"
            />
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
            There are no notifications<br>
            Add a new notifications using the <b>+</b> button above.
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

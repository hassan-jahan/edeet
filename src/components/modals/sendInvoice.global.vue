<script>
// todo: define color and custom filters for status?

const statusList = {}

export default {
  props: ['modalId', 'filters', 'params', 'url', 'type'], // if posts was array we update it otherwise we skip it
  data() {
    return {
      newInvoice: {},
      invoice: { invoice: {} }, // neccessary
      // options: {edit: false},
      invoiceSettings: [],
      emailData: {},
      invoiceLayout: [],
      options: { edit: true, test: '123' },
    }
  },
  computed: {
    emailFields() {
      if (!Array.isArray(this.type.postFields))
        return

      return this.type.postFields.map((item, index) => {
        if (['input-text', 'email', 'input-email'].includes(item.component))
          return { text: item.label, value: item.slug }
      })
    },

    // modalId() {
    //     // if (this.item && this.item.id && this.type && this.type.slug)
    //     return this.isEdit ? 'edit-post-' + this.post.id : 'new-post-' + this.type.slug
    //     // return false
    // }
  },

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
    SendTest() {
      if (!this.$refs.newEditForm.checkValidity()) {
        this.$refs.newEditForm.reportValidity()
        return
      }

      let params
      if (this.newEmail.selectedData == 'all') {
        params = { _sendEmail: this.newEmail }
      }
      else {
        params = { ...this.params }
        params._sendEmail = this.newEmail
      }

      this.$axios.get(this.url, { params }).then((res) => {
        const items = res.data
        this.isBusy = false

        this.$toast('Email was sent successfully!', 'success')
      },
      )
    },
    Send() {
      if (!this.$refs.newEditForm.checkValidity())
        this.$refs.newEditForm.reportValidity()
    },

    Shown() {
      this.invoiceLayout = [{
        component: 'invoice',
        slug: 'invoice',
        id: 'invoice-817',
        cards: [
        ],
      }]

      this.emailSettings = [
        {
          slug: 'field',
          label: 'Field containing email',
          component: 'select',
          idField: 'id',
          values: this.emailFields, // maybe to be reactive
          required: true,
          description: '',
          // 'showIf': {"slug": "type", "value": 'number'}
        },

        {
          slug: 'selectedData',
          label: 'Selected Data',
          component: 'select',
          // 'buttons': true,
          // stacked: true,
          variant: 'outline-dark',
          size: 'md',
          values: [{
            text: `Filtered Data  (${this.filters.length} filter)`, // or totalrows or this.filters.length
            value: 'filtered',
          }, {
            text: 'All',
            value: 'all',
          }],
          description: 'Max 2000 items at once',
          // 'showIf': this.filters.length
        },
        // {
        //     'slug': 'format',
        //     'label': 'Format',
        //     'component': 'select',
        //     // 'buttons': true,
        //     // stacked: true,
        //     'variant': "outline-dark",
        //     'size': 'md',
        //     values: [{text: 'Formatted', value: 'html'}, {text: 'RAW', value: 'raw'}],
        //     'description': '',
        //     // 'showIf': {"slug": "type", "value": 'number'}
        // },

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

    Create() {
      if (!this.$refs.newEditForm.checkValidity()) {
        this.$refs.newEditForm.reportValidity()
        return
      }

      // if (this.newPost && !this.newPost.title) {
      //     this.newPost.title = 'Untitled'
      // }
      this.newPost.typeId = this.type.id

      // params.slug= this.$helper.pathToSlug(params.slug) will be done in backend
      if (Array.isArray(this.posts))
        this.posts.unshift(this.newPost)

      this.$axios.post('/posts', this.newPost).then(
        (res) => {
          this.$toast('Item was created successfully!', 'success')
          this.$root.$emit('bv::hide::modal', this.modalId)
          this.$emit('hideEditor', true)

          this.newPost = { ...this.post } // initial values for create not needed for edit
        }).catch((error) => {
        if (Array.isArray(this.posts))
          this.posts.shift(this.newPost)
      })
    }
    ,

  },
}
</script>

<template>
  <b-modal
    :id="modalId" title="" :hide-header="false"
    :hide-footer="false" size="lg"
    scrollable content-class="modal-draggable"
    modal-class="dsht no-animation"
    hide-backdrop
    lazy
    @shown="Shown"
  >
    sdsd223
    {{ invoice }}

    <toranj
      v-model="invoiceLayout" class="dasht-body"

      :style="`--dasht-main-font: ${mainFont};--dasht-heading-font: ${headingFont}; --dasht-body-bg: ${bodyBg}; --dasht-body-color: ${bodyColor}`"

      :model="invoice"
      :options="options"
    />

    <form
      ref="newEditForm"
      method="POST"
      accept-charset="UTF-8"
      enctype="multipart/form-data"
      autocomplete="off"
      @submit.prevent="SendTest"
    >
      <formFields
        class="toranj-section" :model="newEmail"
        :block="{ id: 'new-email', children: emailSettings }"
        :parent="[]" :index="0" :options="{ edit: false }"
      />
    </form>

    <template #modal-footer="{ ok, cancel, hide }">
      <div class="d-flex justify-content-between w-100">
        <!--                <b-btn variant="link" class="text-info" @click.prevent="Send()">Send All</b-btn> -->
        <!--                  <b-btn variant="link" class="text-danger" @click.prevent="Delete()">Delete Page</b-btn> -->

        <div class="text-right">
          <b-btn variant="secondary" @click.prevent="Cancel()">
            Cancel
          </b-btn>
          <b-btn variant="secondary" @click.prevent="SendTest()">
            Send
          </b-btn>
          <b-btn variant="primary" @click.prevent="SendTest()">
            Send Test
          </b-btn>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>
// todo: define color and custom filters for status?

const statusList = {}

export default {
  props: ['modalId', 'filters', 'params', 'url', 'type', 'post', 'status'], // if posts was array we update it otherwise we skip it
  data() {
    return {
      newReminder: {},
      // options: {edit: false},
      reminderSettings: [],

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
    setReminder() {
      console.log('testt', this.$refs.newReminderForm.checkValidity(), this.newReminder)
      if (!this.$refs.newReminderForm.checkValidity()) {
        console.log('faslllsldsde validaty')
        this.$refs.newReminderForm.reportValidity()
        return
      }

      if (this.post && this.post.id) {
        this.newReminder.postId = this.post.id
        this.newReminder.typeId = this.post.typeId
        this.newReminder.statusId = this.post.statusId
      }

      this.newReminder.action = 'remind'
      this.newReminder.status = 'pending'

      this.$axios.post('tasks', this.newReminder).then((res) => {
        // const items = res.data

        this.$toast(`Reminder set for ${this.newReminder.applyDate}!`, 'success')
      },
      )
    },

    Shown() {
      this.reminderSettings = [
        {
          slug: 'title',
          label: 'Task Title',
          component: 'input-text',
          required: true,
          // 'maxLength': 350,
          description: '',
          // "showIf": {"slug": "hasAction", op: 'neq', "value": false},

        },
        {
          slug: 'date',
          label: 'Apply Date',
          component: 'date',
          futureOnly: true,
          required: true,
          description: '',
          // 'showIf': {"slug": "type", "value": 'number'}
        },

        {
          slug: 'time',
          label: 'Task Title',
          component: 'input-text',
          required: true,
          // 'maxLength': 350,
          description: '',
          // "showIf": {"slug": "hasAction", op: 'neq', "value": false},

        },

        {
          slug: 'content',
          label: 'Description',
          component: 'textarea',
          required: true,
          rows: 2,
          description: '',
          // "showIf": {"slug": "settings.noIndex", "value": false},
          // 'showIf': !this.thePage.settings || !this.thePage.settings.noIndex,
        },

        // {
        //     'slug': 'assignees',
        //     'label': 'Add call to action button',
        //     'component': 'checkbox',
        //     // 'buttons': true,
        //     // stacked: true,
        //     'variant': "outline-dark",
        //     'size': 'md',
        //     // values: [{text: 'Formatted', value: 'html'}, {text: 'RAW', value: 'raw'}],
        //     'description': '',
        //     // 'showIf': {"slug": "type", "value": 'number'}
        // },
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
    },

    Update() {
      const temp = { ...this.post }

      Object.assign(this.post, this.newPost)

      this.$http
        .post(`/posts/${this.post.id}`, this.newPost)
        .then(
          (res) => {
            this.$toast('Item was updated successfully!', 'success')
            this.$root.$emit('bv::hide::modal', this.modalId)
            this.$emit('hideEditor', true)
          },
          (error) => {
            Object.assign(this.post, temp) // todo: maybe assign({} , ...)
          },
        )
    }

    ,

  },
}
</script>

<template>
  <b-modal
    :id="modalId" title="" :hide-header="false"
    :hide-footer="false" size="sm"
    scrollable content-class="modal-draggable"
    modal-class="dsht no-animation"
    hide-backdrop
    lazy

    ok-title="Set Reminder"
    @cancel="Cancel"
    @shown="Shown"
  >
    <form
      ref="newReminderForm"
      method="POST"
      accept-charset="UTF-8"
      enctype="multipart/form-data"
      autocomplete="off"
      @submit.prevent="setReminder"
    >
      <formFields
        class="toranj-section" :model="newReminder"
        :block="{ id: 'new-reminder', children: reminderSettings }"
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
          <b-btn variant="primary" @click.prevent="setReminder">
            Set Reminder
          </b-btn>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

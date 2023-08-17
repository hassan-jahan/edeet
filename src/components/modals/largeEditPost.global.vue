<script>
import NotesNewsFeed from './NotesNewsFeed'

// todo: define color and custom filters for status?

const statusList = {}

export default {
  components: { NotesNewsFeed },

  props: ['post', 'type', 'status', 'posts', 'index', 'modalId', 'noteType'], // if posts was array we update it otherwise we skip it
  data() {
    return {
      newPost: {},
      options: { edit: false },
      metaString: {},
      newComment: {},
      comments: [],
      commentTypeFields: [{
        id: 'textarea-lxal',
        slug: 'message',
        label: 'Message',
        required: true,
        component: 'textarea',
        minLength: 3,
        description: '',
      }, {
        id: 'select-810',
        slug: 'actiontype',
        label: 'Action',
        values: ['Contact', 'Email', 'Reminder'],
        component: 'select',
      }, { id: 'upload-752', slug: 'files', label: 'Choose a File', component: 'upload' }],
    }
  },
  computed: {
    isEdit() {
      return this.post && this.post.id
    },
    hasNext() {
      if (this.isEdit && this.status)
        return this.status.next != '0'

      return false
    },
    // modalId() {
    //     // if (this.item && this.item.id && this.type && this.type.slug)
    //     return this.isEdit ? 'edit-post-' + this.post.id : 'new-post-' + this.type.slug
    //     // return false
    // }
  },

  watch: {},
  created() {
    if (this.status && Array.isArray(this.status.hiddenFields))
      this.options.hiddenFields = this.status.hiddenFields

    if (this.status && Array.isArray(this.status.readOnlyFields))
      this.options.readOnlyFields = this.status.readOnlyFields

    // require to show different post in one network
  },
  mounted() {
    this.newPost = { ...this.post } // init new comment shallow copy
    this.metaString = JSON.stringify(this.post.meta)
  },
  methods: {
    sidebarId(id) {
      return `view-notes-${id}`
    },
    Cancel() {
      this.$root.$emit('bv::hide::modal', this.modalId)
      this.$emit('hideEditor', true)
    },

    dataViewer(fields, note) {
      return this.$helper.readableFormData(fields, note, 'array')
    },

    createOrUpdate() {
      if (this.isEdit)
        this.Update()
      else
        this.Create()
    },

    Create() {
      if (this.newPost && !this.newPost.title)
        this.newPost.title = 'Untitled'

      this.newPost.typeId = this.type.id

      // params.slug= this.$helper.pathToSlug(params.slug) will be done in backend
      if (Array.isArray(this.posts))
        this.posts.unshift(this.newPost)

      this.$axios.post('/posts', this.newPost).then(
        (res) => {
          if (this.status && this.status.settings && this.status.settings.successMessage)
            this.$toast(this.status.settings.successMessage, 'success')
          else
            this.$toast('Item was created successfully!', 'success')

          this.$root.$emit('bv::hide::modal', this.modalId)
          this.$emit('hideEditor', true)

          this.newPost = {}
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
    },
    Next() {
      this.$http
        .post(`/posts/${this.post.id}/actions/next`, {})
        .then(
          (res) => {
            if (this.status.settings && this.status.settings.successMessage)
              this.$toast(this.status.settings.successMessage, 'success')
            else
              this.$toast('Item\'s status was updated successfully!', 'success')

            this.$root.$emit('bv::hide::modal', this.modalId)
            this.$emit('hideEditor', true)
          },
          (error) => {
          },
        )
    },

  },
}
</script>

<template>
  <b-modal
    :id="modalId" title="" :hide-header="false"
    :hide-footer="!hasNext" size="xl"
    scrollable content-class="modal-draggable model22-xlg"
    modal-class="dsht no-animation"
    hide-backdrop
    lazy
  >
    <div class="row">
      <div class="col-md-4">
        <div class="d-flex justify-content-between align-content-center">
          <div>
            <status-label :status-id="post.statusId" :status="status" />
            <span class="text-muted small">#{{ post.id }}</span>
          </div>

          <div>
            <a
              v-if="type.singlePage && type.singlePage.id" size="sm" variant="secondary"
              target="_blank" class="mx-1" :href="post | postURL(type.singlePage, $currentApp) "
            >
              View <span
                class="iconify text-muted" data-icon="feather:external-link"
                data-inline="true"
              />
            </a>
            <!-- {{post.status}} -->
            <!--                        <b-btn size="sm" class="mx-1" variant="outline-dark" v-if="post.status && post.status.next !='0' " @click.prevent="Next()">{{ (post.status.settings && post.status.settings.nextLabel) ? post.status.settings.nextLabel : 'Next Step' }}</b-btn> -->

            <b-btn
              size="sm" class="mx-1" variant="secondary"
              @click.prevent="$root.$emit('bv::show::modal', `edit-post-${post.id}`)"
            >
              Edit
            </b-btn>
          </div>
        </div>

        <div v-if="post.user" class="mb-3">
          <img
            v-if="post.user.avatar"
            v-b-tooltip.hover.viewport.ds150
            class=" mr-2 rounded-circle" :src="post.user.avatar | sizify('sm') | cdnURL" width="32"
            height="32"
            :title="post.user.nickname || `${post.user.firstName} ${post.user.lastName}`"
            :alt="post.user.nickname || `${post.user.firstName} ${post.user.lastName}`"
          >

          {{ post.user.nickname || `${post.user.firstName} ${post.user.lastName}` }}
        </div>

        <div class="mb-3">
          <b>Created At:</b> <span
            v-b-tooltip.hover.viewport.ds150
            :title="post.createdAt | moment('ddd D MMMM YYYY HH:mm (Z)')"
          >{{ post.createdAt | moment('D MMM YYYY HH:mm', '', false) }}</span>
        </div>

        <div v-if="post.updatedAt && post.updatedAt != post.createdAt" class="mb-3">
          <b>Updated At:</b> <span
            v-b-tooltip.hover.viewport.ds150
            :title="post.updatedAt | moment('ddd D MMMM YYYY HH:mm (Z)')"
          >{{ post.updatedAt | moment('D MMM YYYY HH:mm', '', false) }}</span>
        </div>

        <div
          v-for="(item, index) in dataViewer(type.postFields, post)"
          :key="item.slug" class="mb-3"
        >
          <template
            v-if="!['relation', 'upload', 'rate', 'action-button'].includes(item.field.component) || (item.field.component == 'relation' && item.field.editable)"
          >
            <b>{{ item.key }}:</b><br>
            {{ item.val }}
          </template>

          <template
            v-if="item && item.field.component == 'upload'"
          >
            <b>{{ item.key }}:</b><br>
            <a :href="item.val" class="text-muted" target="_blank">
              <img
                v-if=" item.val.endsWith('.jpg') || item.val.endsWith('.jpeg') || item.val.endsWith('.png') || item.val.endsWith('.gif')"
                :src="item.val" :alt="item.key" style="max-width:48px"
              >
            </a>

            <p>
              <a :href="item.val" class="text-muted" target="_blank">View <span
                class="iconify text-muted"
                data-icon="entypo:attachment"
                data-inline="true"
              /></a>
            </p>
          </template>

          <template
            v-if="item && item.field.component == 'rate'"
          >
            <b>{{ item.key }}:</b><br>
            <b-form-rating
              v-model="item.val"
              v-b-tooltip.top.hover.ds500="item.val"
              size="sm"

              :stars="item.field.max"
              :readonly="true"
              inline
              style="background-color: transparent !important;"

              :color="item.field.color || '#ff8800'"
              precision="1"

              :show-value="true"
            />
          </template>

          <template
            v-if="item && item.field.component == 'action-button'"
          >
            <b>{{ item.key }}:</b><br>
            <formFields
              class="action-button-field" :model="post"
              :block="{ id: `action-button-admin-large-edit-${item.field.slug}`, children: [item.field] }"
              :parent="[]" :index="0" :options="{ edit: false, view: true, size: 'sm' }" :scope="{}"
              :type="type"
            />
          </template>
        </div>
      </div>

      <div class="col-md-8">
        <!--                <div class="d-flex justify-content-between w-100"> -->
        <!--                    <div></div> -->
        <!--                    <b-btn size="sm" variant="outline-info" v-if="post.status && post.status.next !='0'" class="" -->
        <!--                           @click.prevent="Next()" -->
        <!--                    >{{ -->
        <!--                            (post.status.settings && post.status.settings.nextLabel) ? post.status.settings.nextLabel : 'Next Step' -->
        <!--                        }} -->
        <!--                    </b-btn> -->
        <!--                </div> -->

        <b-tabs no-body content-class="mt-3" lazy>
          <b-tab v-if="noteType && noteType.id" key="note" title="Note">
            <NotesNewsFeed
              :note-type="noteType" :notes="post.notes"
              :options="{}" :post="post"
            />
          </b-tab>

          <b-tab
            v-for="(relation, index) in type.relations" v-if="relation.slug != 'notes'"
            :key="relation.id" :title="relation.title"
          >
            <type-table :type-id="relation.typeId" :relation="relation" :related-post="post" />
          </b-tab>
        </b-tabs>
      </div>
    </div>

    <template #modal-footer="{ ok, cancel, hide }">
      <div class="d-flex justify-content-between w-100">
        <div />
        <div v-if="hasNext">
          <!--                    todo replace it with rejection or use different mmethods -->
          <b-btn variant="secondary" size="sm" class="" @click.prevent="hide()">
            Close
          </b-btn>

          <b-btn variant="primary" size="sm" class="" @click.prevent="Next()">
            {{
              (status.settings && status.settings.nextLabel) ? status.settings.nextLabel : 'Next Step'
            }}
          </b-btn>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

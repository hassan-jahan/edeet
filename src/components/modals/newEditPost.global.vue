<script>
// todo: define color and custom filters for status?

const statusList = {}

export default {
  name: 'NewEditPost',
  props: ['post', 'type', 'status', 'posts', 'index', 'modalId', 'scope'], // if posts was array we update it otherwise we skip it
  data() {
    return {
      newPost: {},
      options: { edit: false },
      metaString: {},
      newComment: {},
      comments: [],
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
      this.newPost = { ...this.post } // initial values for create not needed for edit
      this.$root.$emit('bv::hide::modal', this.modalId)
      this.$emit('hideEditor', true)
    },
    createOrUpdate() {
      if (!this.$refs.newEditForm.checkValidity()) {
        this.$refs.newEditForm.reportValidity()
        return
      }

      if (this.isEdit)
        this.Update()
      else
        this.Create()
    },

    Create() {
      // if (this.newPost && !this.newPost.title) {
      //     this.newPost.title = 'Untitled'
      // }
      this.newPost.typeId = this.type.id

      // params.slug= this.$helper.pathToSlug(params.slug) will be done in backend
      if (Array.isArray(this.posts))
        this.posts.unshift(this.newPost)

      this.$axios.post('/posts', this.newPost).then(
        (res) => {
          if (this.status && this.status && this.status.settings && this.status.settings.successMessage)
            this.$toast(this.status.settings.successMessage, 'success')
          else
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
    },
    Next() {
      this.$http
        .post(`/posts/${this.post.id}/actions/next`, {})
        .then(
          (res) => {
            if (this.status && this.status.settings && this.status.settings.successMessage)
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
    :hide-footer="false" size="md"
    scrollable content-class="modal-draggable"
    modal-class="dsht no-animation"
    hide-backdrop
    lazy
  >
    <div class="text-right">
      <span v-if="isEdit" class="text-muted small">#{{ post.id }}</span>
      <status-label :status-id="post.statusId" :status="status" />
      <!--            <a size="sm" variant="secondary" v-if="type.singlePage && type.singlePage.id" -->
      <!--               target="_blank" class="mx-1" :href="post | postURL(type.singlePage, $currentApp) " -->
      <!--            > -->
      <!--                View <span class="iconify text-muted" data-icon="feather:external-link" -->
      <!--                           data-inline="true" -->
      <!--            ></span> -->
      <!--            </a> -->
    </div>

    <form
      ref="newEditForm"
      method="POST"
      accept-charset="UTF-8"
      enctype="multipart/form-data"
      autocomplete="off"
      @submit.prevent="createOrUpdate()"
    >
      <!--            <div v-if="isEdit && type.noteType && type.noteType.id" class="d-flex" style="justify-content: end "> -->
      <!--                <b-btn size="sm" variant="secondary" -->
      <!--                       v-b-toggle:[sidebarId(post.id)]="" -->
      <!--                > -->
      <!--                    Notes -->
      <!--                </b-btn> -->
      <!--            </div> -->

      <formFields
        class="toranj-section" :model="newPost"
        :block="{ id: `new-edit-post${post.id}`, children: type.postFields }"
        :parent="[]" :index="0" :options="options" :scope="scope" :type="type"
      />

      <!--            <b-form-fieldset label="Meta"> -->
      <!--                <b-form-textarea -->
      <!--                    v-model="metaString" -->
      <!--                    :rows="4" -->
      <!--                    spellcheck="false" -->
      <!--                    dir="auto" -->
      <!--                    required -->
      <!--                    disabled -->
      <!--                /> -->
      <!--            </b-form-fieldset> -->
    </form>

    <template #modal-footer="{ ok, cancel, hide }">
      <div class="d-flex justify-content-between w-100">
        <div>
          <b-btn v-if="hasNext" variant="primary" class="" @click.prevent="Next()">
            {{ (status.settings && status.settings.nextLabel) ? status.settings.nextLabel : 'Next Step' }}
          </b-btn>
        </div>
        <!--                  <b-btn variant="link" class="text-danger" @click.prevent="Delete()">Delete Page</b-btn> -->

        <div class="text-right">
          <b-btn variant="secondary" @click.prevent="Cancel()">
            Cancel
          </b-btn>
          <b-btn variant="primary" @click.prevent="createOrUpdate()">
            Save
          </b-btn>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

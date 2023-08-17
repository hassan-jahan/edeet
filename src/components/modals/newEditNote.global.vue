<script>
import NotesNewsFeed from './NotesNewsFeed'

// todo: define color and custom filters for status?

const statusList = {}

export default {
  components: { NotesNewsFeed },
  props: ['post', 'type', 'noteType', 'status', 'index', 'modalId'], // if posts was array we update it otherwise we skip it
  data() {
    return {

    }
  },
  computed: {
    // modalId() {
    //     // if (this.item && this.item.id && this.type && this.type.slug)
    //     return this.isEdit ? 'edit-post-' + this.post.id : 'new-post-' + this.type.slug
    //     // return false
    // }
  },

  watch: {},

  // mounted() {
  //     // this.newPost = {...this.post}; //init new comment shallow copy
  //     // this.metaString = JSON.stringify(this.post.meta)
  // },
  methods: {
    Shown() {
      // if (this.status && Array.isArray(this.status.hiddenFields)) {
      //     this.options.hiddenFields = this.status.hiddenFields
      // }
      //
      // if (this.status && Array.isArray(this.status.readOnlyFields)) {
      //     this.options.readOnlyFields = this.status.readOnlyFields
      // }
      // require to show different post in one network

    },

    Cancel() {
      this.$root.$emit('bv::hide::modal', this.modalId)
      this.$emit('hideEditor', true)
    },

  },
}
</script>

<template>
  <b-sidebar
    :id="modalId" title="" :hide-header="false"
    :hide-footer="false" size="md"
    backdrop
    backdrop-variant="white"
    right
    shadow
    lazy
    sidebar-class="p-2"
    body-class="dsht p-2"
    @shown="Shown"
  >
    <h5 class="m-2">
      Notes {{ post.title }}
    </h5>

    <NotesNewsFeed
      :note-type="noteType"
      :options="{ edit: false }" :post="post"
    />
  </b-sidebar>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

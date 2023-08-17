<script>
export default {
  name: 'NotesNewsFeed',
  props: {
    noteType: {},
    // notes: {},
    type: {},
    options: {},
    post: {},
  },
  data() {
    return {
      newPost: {},
      // metaString: {},
      scope: {},
      notes: [],
      newNote: {},
      noteTypeFields: [{
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
  mounted() {
    this.setRelation()

    if (this.post.hasOwnProperty('notes')) {
      // console.log('hasnnotes')
      this.notes = this.post.notes
    }
    else {
      // console.log('has not nnotes')
      // this.$axios.get('types/' + this.noteType.id + `/posts?id=${this.post.id}&with=notes`).then(res => {
      this.$axios.get(`types/${this.post.typeId}/posts/${this.post.id}/notes?orderByDesc=createdAt`).then((res) => {
        this.notes = res.data
        // return res.data.balance

        // orderByDesc22=childRelations.createdAt
      },
      (error) => {
      })
    }
  },
  methods: {
    CreateComment() {
      // console.log('newComment', this.newComment)
      // if (this.newNote && !this.newNote.title) {
      //     this.newNote.title = 'Untitled'
      // }

      // let noteType = this.$helper.findObjectsInArray(this.type.relations, 'slug', 'note')

      this.newNote.typeId = this.noteType.id

      // params.slug= this.$helper.pathToSlug(params.slug) will be done in backend
      // if (Array.isArray(this.notes))

      // this.newNote.relatedPosts = { //not require anymore will be done dynamically
      //     id: this.post.id,
      //     // postId2: 36,
      //     relationType: 'notes'
      // }

      this.$axios.post('/posts', this.newNote).then(
        (res) => {
          this.$toast('Item was created successfully!', 'success')
          // this.$root.$emit('bv::hide::modal', this.modalId)
          // this.$emit("hideEditor", true);

          if (Array.isArray(this.notes))
            this.notes.unshift(res.data)

          this.newNote = Object.assign({}, {}, {})
          this.setRelation()
        }).catch((error) => {
        console.log(error)
        // if (Array.isArray(this.notes))
        //     this.notes.shift(this.newNote);
      })
    },

    dataViewer(note) {
      return this.$helper.readableFormData(this.noteType.postFields, note, 'array')
    },
    setRelation() {
      // get comments
      if (this.noteType && this.noteType.relations && this.noteType.relations.notes && this.noteType.relations.notes.fieldSlug)
      // this.newNote[this.noteType.relations.notes.fieldSlug] = this.post.id
        this.$set(this.newNote, this.noteType.relations.notes.fieldSlug, this.post.id)
    },
    Delete(item, index) {
      if (!confirm(`Are you sure to delete "${item.title ? item.title : ''}"?`))
        return

      let temp
      const itemTemp = { ...item }

      // if (this.posts && this.posts.length) {
      //     temp = {...this.posts} // cloning or JSON.parse(JSON.stringify(this.posts))
      //     this.posts.splice(this.index, 1)
      // }

      this.$axios.delete(`posts/${item.id}`).then((res) => {
        this.notes.splice(index, 1)
        // this.Shown() //reload
        this.$toast('Item was deleted successfully!', 'success')
        // this.$root.$emit('bv::refresh::table', this.type.slug + '-table')

        // this.$router.push(this.$options.filters.appEditURL(this.$currentApp))
      }).catch((err) => {

        // if (this.pages && this.pages.length)
        //     this.pages.splice(this.index, 0, temp[this.index])

      })
    },
  },
}
</script>

<template>
  <div>
    <app-link
      class="btn btn-secondary btn-sm float-right"
      :to="`${$options.filters.typeEditURL(noteType, $currentApp)}/workflow`"
    >
      <span class="iconify" data-icon="ic:baseline-settings" data-inline="true" />
    </app-link>

    <div class="clearfix" />
    <formFields
      class="toranj-section" :model="newNote"
      :block="{ id: `new-note-${post.id}`, children: noteType.postFields }"
      :parent="[]" :index="0" :options="options" :scope="scope" :type="noteType"
    />
    <b-btn variant="primary" @click.prevent="CreateComment">
      Add Note
    </b-btn>
    <div
      v-for="(note, index) in notes" v-if="notes.length"
      :key="note.id" class="mt-2 p-2 bg-secondary"
    >
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <div v-if="note.actiontype" class="badge badge-success">
            {{ note.actiontype }}
          </div>
        </div>

        <div>
          <span v-b-tooltip.hover.ds500 class="date" :title="note.createdAt | moment('ddd D MMMM YYYY HH:mm (Z)')">
            {{ note.createdAt | moment }}
          </span>

          <b-dropdown
            :key="`${note.id}-more`"
            class="mx-2"
            size="sm"
            variant="secondary"
            bou2ndary="window"
            right
          >
            <template #button-content>
              <span
                class="iconify" data-icon="fe:elipsis-v"
                data-inline="false"
              />
            </template>

            <!--                    @hideEditor="" -->
            <new-edit-post
              :type="noteType" :post="note" :status="note.status"
              :modal-id="`edit-post-${note.id}`" :scope="scope"
            />

            <b-dropdown-item @click="$root.$emit('bv::show::modal', `edit-post-${note.id}`)">
              Edit
            </b-dropdown-item>

            <b-dropdown-item @click="Delete(note, index)">
              Delete
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <!--            data viewer -->

      <div
        v-for="(item, index) in dataViewer(note)"
        :key="item.slug" class="small"
      >
        <template v-if="!['content', 'postId', 'actiontype'].includes(item.field.slug)">
          {{ item.field.label }}: <strong>{{ item.val }}</strong>
        </template>
      </div>

      <!--            <div v-if="note.title" class="mt-1"><strong>{{ note.title }}</strong></div> -->
      <p v-if="note.content" class="mt-1 store-newline">
        {{ note.content }}
      </p>
    </div>
  </div>
</template>

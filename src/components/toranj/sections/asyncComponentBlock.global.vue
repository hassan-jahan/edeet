<script>
// import fMixin from './fMixin'

// import blockMixin from '../toranj/blockMixin'
// import {RuntimeTemplateCompiler} from "vue-runtime-template-compiler"

const iCodeMirror = () => import('./../../helpers/iCodeMirror.vue')
// import iCodeMirror from "@/components/helpers/iCodeMirror";
// https://github.com/jonwatkins/vue-runtime-template-compiler todo: NOT NEED VUE COMPILE VERSION alias remove from nuxt config VERY BIG DECREASE SIZE WITH REMOVVING BUNDLEED VUE

export default {
  directives: {},
  components: { ICodeMirror: iCodeMirror },
  // mixins: [blockMixin],
  inheritAttrs: false,

  // components: {'runtime-template-new': RuntimeTemplateCompiler},
  props: ['block', 'parent', 'index', 'options', 'scope'], // parent can be an array or object with children same as action menus
  data() {
    return {
      test: '<div><p-editable :block="block" :options="options" name="sdsssssdw">Click above to start coding!</p-editable></div>',
      isCompiled: true,
      timeout: false,
      tempSavedPost: {},
      newPost: {
        content: '<div><p>Click above to start coding!</p></div>',
      },
      settingsForm: {},
      componentFields: [],
    }
  },
  computed: {
    canEdit() {
      if (this.newPost && this.newPost.appId)
        return (this.newPost.appId == this.$currentApp.id)

      if (!this.newPost || !this.newPost.appId)
        return true

      return false
    },

  },
  watch: {
    'newPost.content': function (newVal) {
      if (this.timeout)
        clearTimeout(this.timeout)

      this.isCompiled = false

      this.timeout = setTimeout(() => {
        this.isCompiled = true
        // console.log('time')
        // el.click()
      }, 500)
    },
    'newPost.settings_menu': function (newVal) {
      this.settingsForm = { component: 'form', children: newVal }
    },
    // 'block.html'(newVal) {
    //     if (this.timeout)
    //         clearTimeout(this.timeout)
    //
    //     this.isCompiled = false
    //
    //     this.timeout = setTimeout(() => {
    //         this.isCompiled = true
    //         // console.log('time')
    //         // el.click()
    //     }, 500)
    //     // el.click()
    //
    // },
    // 'options.edit' (newVal) { //require for reactivity
    //     if (newVal) {
    //         this.inputContent = this.addWrapper(this.block.html)
    //     }
    // }
  },
  mounted() {
    // this.block.post= this.block.id
  },
  created() {
    console.log('createdd', this.scope.asyncComponents)
    console.log('new post first 0 ', this.newPost)
    if (this.block.postId && Array.isArray(this.scope.asyncComponents) && this.scope.asyncComponents.length)
      this.newPost = this.$helper.findOneObjectInArray(this.scope.asyncComponents, 'id', this.block.postId)
    // console.log('newwww', this.newPost)

    if (this.block.post && this.block.post.id) { // provided post with object for adding
      this.newPost = JSON.parse(JSON.stringify(this.block.post))
      this.block.post = undefined // do not save it just show it!

      // console.log('new post123 ',this.newPost )
    }

    if (this.newPost && this.newPost.id) {
      this.tempSavedPost = { ...this.newPost }

      if (this.newPost && this.newPost.settings_menu && this.newPost.settings_menu.length)
        this.settingsForm = { component: 'form', children: this.newPost.settings_menu }
    }

    // modal ID error means there is no post to show it

    this.setComponentFields()
  },

  methods: {
    setComponentFields() {
      this.componentCodeFields = [

        {
          id: 'component_code',
          slug: 'content',
          label: '',
          // "showIf": "title > 10",
          component: 'code-field',
          size: 'lg',
          description: '',
          cmOptions: {
            readOnly: !this.canEdit,
          },

        },
      ]
      this.componentSettingsFields = [
        {
          id: 'component_title',
          slug: 'title',
          label: 'Title',
          component: 'input-text',
          description: '',
          readOnly: !this.canEdit,
        },
        {
          id: 'component_settings',
          slug: 'settings_menu',
          label: 'Settings Menu',
          component: 'form-designer',

        },
      ]
    },
    Submit() {
      // this.block.html = this.tempCode
      // todo fix this save type and post id

      this.CreateOrUpdate()
      this.$root.$emit('bv::hide::modal', `code-editor-${this.block.id}`)
    },

    CreateOrUpdate(shouldClone = false) {
      this.newPost.typeId = this.$currentApp.settings.componentType

      if (this.newPost && !this.newPost.title)
        this.newPost.title = 'Untitled'

      if (Array.isArray(this.posts))
        this.posts.unshift(this.newPost)

      if (shouldClone) {
        this.newPost.clonedFromPost = this.newPost.id
        this.newPost.clonedFromApp = this.newPost.appId
        this.newPost.id = undefined
        this.newPost.appId = undefined
        this.newPost.createdAt = undefined
        this.newPost.updatedAt = undefined
      }

      const url = (this.newPost && this.newPost.id && !shouldClone) ? `/posts/${this.newPost.id}` : '/posts/'

      this.$axios.post(url, this.newPost).then(
        (res) => {
          this.$toast('Item was created successfully!', 'success')
          // this.$root.$emit('bv::hide::modal', this.modalId)
          // this.$emit("hideEditor", true);

          if (res.data && res.data.id) { // new
            this.$set(this.block, 'postId', res.data.id)
            this.newPost.id = res.data.id
          }
          this.tempSavedPost = { ...this.newPost }

          // this.newPost = Object.assign({},  this.newPost, res.data) /// instead of `Object.assign(this.someObject, { a: 1, b: 2 })` to preserver reactivity
        }).catch((error) => {
        if (Array.isArray(this.posts))
          this.posts.shift(this.newPost)
      })
    },
    Cancel() {
      // todo: create another function for modal just for click on backdrop to cancel or show confirm message! you may loss your changes

      // todo: bug settings_form changes remain same with cancel
      // todo: clone doesn't work
      // todo: my component and gallery based on templateId
      // app creator based on template ID

      if (this.newPost.content != this.tempSavedPost.content || this.newPost.title != this.tempSavedPost.title || this.newPost.component_settings != this.tempSavedPost.component_settings)
        this.newPost = { ...this.tempSavedPost }

      this.$root.$emit('bv::hide::modal', `code-editor-${this.block.id}`)
    },

    Clone() {
      this.CreateOrUpdate(true)
      this.setComponentFields()
    },
  },
}
</script>

<template>
  <client-only v-if="!options.edit">
    <!--        <div v-html="block.html"/> -->
    <runtime-template v-if="newPost && newPost.content " :template="`<div>${newPost.content}</div>`" />
  </client-only>

  <section-wrapper
    v-else :block="block" :parent="parent" :index="index" :options="options" :footer-add="true"
    right-slot-pos="inside" left-slot-pos="inside"
    :hide-features="[]"
    :settings-form="settingsForm"
  >
    <template #menu-right>
      <b-btn size="xs" @click.prevent="$root.$emit('bv::show::modal', `code-editor-${block.id}`)">
        <span class="iconify" data-icon="ion:code-slash" data-inline="true" /> Code
      </b-btn>
    </template>

    <!-- &lt;!&ndash;        not recommended for outside change margin-left negative to make it work correctly &ndash;&gt; -->
    <!--               <template v-slot:menu-left> -->
    <!--                   <b-btn size="xs">TS</b-btn> -->
    <!--               </template> -->

    <template>
      <client-only>
        <runtime-template
          v-if="isCompiled && newPost && newPost.content"
          :template="`<div >${newPost.content}</div>`"
        />
      </client-only>
    </template>

    <b-modal
      :id="`code-editor-${block.id}` " title="" :hide-header="false" :hide-footer="true"
      size="lg"
      hide-backdrop
      scrollable
      content-class="modal-draggable"
      modal-class="dsht no-animation"
      body-class="pt-0"
    >
      <!--                                    <p class=""> -->
      <!--                                        -->
      <!--                                    </p> -->

      <div v-if="!canEdit" class="alert alert-secondary text-center mt-2" variant="warning">
        You can not edit an
        external component. You can clone it but you may miss future changes. <a
          href="#"
          @click.prevent="Clone()"
        >Click to Clone</a>
      </div>

      <b-tabs no-body sma22ll content-class="mt-3" align="right">
        <b-tab title="Code" active>
          <form @submit.prevent="">
            <formFields
              class="toranj-section" :model="newPost"
              :block="{ id: 'new-edit-component' - block.id, children: componentCodeFields }"
              :parent="[]" :index="0" :options="{ edit: false }" :scope="scope" :type="{}"
            />
          </form>
        </b-tab>

        <b-tab title="Settings">
          <div v-if="newPost && newPost.id" class="text-muted small text-right">
            #{{ newPost.id }}
          </div>

          <form @submit.prevent="">
            <formFields
              class="toranj-section" :model="newPost"
              :block="{ id: 'new-edit-component' - block.id, children: componentSettingsFields }"
              :parent="[]" :index="0" :options="{ edit: false }" :scope="scope" :type="{}"
            />
          </form>
        </b-tab>
      </b-tabs>

      <div class="d-flex justify-content-between mt-2">
        <div>
          <small>Remove "dsht" class to use your own CSS framework</small>
        </div>
        <div>
          <button
            class="btn btn btn-secondary btn-22sm  "
            @click.prevent="Cancel"
          >
            Cancel
          </button>
          <button
            class="btn btn btn-primary btn-22sm m-2"
            :disabled="!canEdit"
            @click.prevent="Submit"
          >
            <span class="iconify big" data-icon="mdi:check" data-inline="true" />

            Save
          </button>
        </div>
      </div>
    </b-modal>
  </section-wrapper>
</template>

<style>

</style>

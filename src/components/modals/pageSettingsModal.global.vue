<script>
export default {
  name: 'PageSettingsModal',
  props: ['page', 'pages', 'index'],
  data() {
    return {
      thePage: {
        // settings: {},
      },
      test: 'tst',
      generalForm: {
        component: 'form',
        children: [

          {
            slug: 'title',
            label: 'Page Title',
            component: 'input-text',
            required: true,
            description: '',
          },
          {
            slug: 'slug',
            label: 'Page Path',
            component: 'slug',
            classes: '',
            prepend: this.$options.filters.appURL(this.$currentApp, true),
            append: '',
            required: true,
            description: '',
            size: 'md',
            exclude: '/:',
            lower: true,

          },

          // {
          // "slug": "isPrivate",
          // "label": "test something",
          // "component": "checkbox",
          // "required": false,
          // "description": "",
          // "switch": "1",
          // },
        ],
      },
      appearanceForm: {
        component: 'form',
        children: [
          {
            slug: 'settings.mainFont',
            component: 'font',
            preset: '',
            label: 'Main Font',
            placeholder: 'Default App Font',
            description: '',
            options: '',
          },

          {
            slug: 'settings.headingFont',
            component: 'font',
            preset: '',
            label: 'Heading Font',
            placeholder: 'Default App Font',
            description: 'Font for headings (h1, h2, h3)',
            options: '',
          },

          {
            slug: 'settings.bodyBg',
            component: 'color',
            gradient: true,
            transparent: true,
            preset: 'basic',
            label: 'Body Background',
            description: '',
            options: '',
          },

          {
            slug: 'settings.bodyColor',
            label: 'Body Text Color',
            component: 'color',
            preset: 'basic', // none| material| dark| light| text or array of custom colors
            // 'required': true,
            options: ['#fff', '#666', '#333'],

            description: '',
          },

        ],
      },
      seoForm: {
        component: 'form',
        children: [
          {
            slug: 'settings.description',
            label: 'SEO Description',
            component: 'textarea',
            required: false,
            description: '',
            showIf: '(!settings || !settings.noIndex)',
            // "showIf": {"slug": "settings.noIndex", "op": "neq", "value": true},
            // 'showIf': !this.thePage.settings || !this.thePage.settings.noIndex,
          },
          {
            slug: 'settings.keywords',
            label: 'SEO Keywords (Separate with commas)',
            component: 'textarea',
            required: false,
            maxLength: 150,
            description: '',
            showIf: '(!settings || !settings.noIndex)',
            // "showIf": {"slug": "settings.noIndex", "op": "neq", "value": true},

          },

          {
            slug: 'settings.noIndex',
            label: 'Do not allow search engines to index page',
            component: 'checkbox',
            required: false,
            default: true,
            description: '',
            // "switch": true,
          },
          // {
          // "slug": "isPrivate",
          // "label": "test something",
          // "component": "checkbox",
          // "required": false,
          // "description": "",
          // "switch": "1",
          // },
        ],
      },
      headerForm: {
        component: 'form',
        children: [

          {
            slug: 'settings.headerCode',
            label: 'Add custom code to header',
            placeholder: 'e.g. <scrip‌t src=\'https://sample.com\'></‌script>', // with nim fasele
            component: 'code-field',
            // 'size': 'sm',
            // cmOptions:{},
            // 'required': false,//doesn't work
            // mode: 'html',
            // 'rows': 5,
            description: 'Add meta, style or script tags.',
            // "showIf": {"slug": "index","value":true},
          },
        ],
      },
    }
  },
  created() {

    // IMPORTANT:  using inline property :block={} cause lossing focus when the variable is rendered using {{thePage}} but using data defined fields cause showif expression stop working because of reactivity. Maybe use computed variables or inline property or somehow chnage showif

  },
  methods: {
    shown() {
      this.thePage = { ...this.page }
      this.thePage.slug = this.$helper.slugToPath(this.thePage.slug)
    },
    Update() {
      const temp = { ...this.page }

      this.thePage.layout = undefined // REQUIRE because we don't have access to page NEW layout for edit page so dont change it
      this.thePage.settings.headerCodeJson = this.$helper.generatePageHead({}, this.thePage)

      this.$axios.post(`pages/${this.page.id}`, this.thePage).then((res) => {
        // Vue.$toast(this.$t('messages.editPageSuccess'), 'success')
        this.$toast('Settings was saved successfully!', 'success')
        Object.assign(this.page, res.data)

        this.$root.$emit('bv::hide::modal', `page-settings-${this.page.id}`)
        this.$root.$emit('page-settings:updated', this.page)
      }).catch((e) => {
        // Obj ect.assign(this.page, temp)
      })
    },

    Delete() {
      if (!confirm(`Are you sure to delete "${this.page.title}"?`))
        return

      let temp
      const pageTemp = { ...this.page }

      if (this.pages && this.pages.length) {
        temp = { ...this.pages } // cloning or JSON.parse(JSON.stringify(this.posts))
        this.pages.splice(this.index, 1)
      }
      // this.$set(this.page,'slug', false)

      this.$axios.delete(`pages/${pageTemp.id}`).then((res) => {
        this.$toast('Page was deleted successfully!', 'success')

        this.$router.push(this.$options.filters.appEditURL(this.$currentApp))
      }).catch((err) => {
        // Object.assign(this.page, pageTemp)

        // this.page = {...pageTemp}

        if (this.pages && this.pages.length)
          this.pages.splice(this.index, 0, temp[this.index])
      })
    },
  },
}
</script>

<template>
  <b-modal
    :id="`page-settings-${page.id}` " title="" :hide-header="false"
    :hide-footer="false" size="md"
    hide-backdrop
    no-body
    ok-title="Save"
    content-class="modal-draggable modal-with-tabs "
    modal-class="dsht no-animation"
    @ok="Update"
    @shown="shown"
  >
    <form class="mt-n5" @submit.prevent="Update">
      <!-- {{thePage}} do not print as it may loss focus -->
      <b-tabs no-body sma22ll content-class="mt-3">
        <b-tab title="General" active>
          <formFields :model="thePage" :block="generalForm" :parent="[]" :index="0" :options="{ edit: false }" />

          <!--                                                title / slug / url / meta -->
          <!--                                                style / script / SEO title / share title / seo description / twitter / FB -->

          <!--                                                / color / fav / -->
        </b-tab>
        <b-tab title="Appearance">
          <!--                    <font-picker :api-key="'AIzaSyCmbrqrwSJQ9jpHJ3eWFGB1zT-0Zbyv3Ac'" :options="{}" :active2-font="{}" @cha2nge=""></font-picker> -->
          <formFields
            :model="thePage" :block="appearanceForm" :parent="[]" :index="0"
            :options="{ edit: false }"
          />
        </b-tab>
        <b-tab title="SEO">
          <formFields :model="thePage" :block="seoForm" :parent="[]" :index="0" :options="{ edit: false }" />
        </b-tab>
        <b-tab title="Header Code">
          <formFields :model="thePage" :block="headerForm" :parent="[]" :index="0" :options="{ edit: false }" />
        </b-tab>

        <!--                <b-tab title="Style"> -->

        <!--                    <b-form-fieldset label=""> -->
        <!--                        <b-form-textarea -->
        <!--                            v-model="page.style" -->
        <!--                            class="w-100" -->
        <!--                            placeholder="CSS Code Here..." -->
        <!--                        /> -->
        <!--                    </b-form-fieldset> -->

        <!--                </b-tab> -->
      </b-tabs>
    </form>
    <!-- TODO: separate form to enable default validation and also use submit form as @click for buttons using refs -->
    <template #modal-footer="{ cancel, ok }">
      <div class="d-flex justify-content-between w-100">
        <b-btn variant="link" class="text-danger" @click.prevent="Delete()">
          Delete Page
        </b-btn>

        <div>
          <b-btn variant="secondary" @click.prevent="cancel()">
            Cancel
          </b-btn>
          <b-btn variant="primary" @click.prevent="Update()">
            Save
          </b-btn>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<style scoped>
.modal-header {
    border-bottom: none !important
}

.header header.close {
    z-index: 500 !important
}
</style>

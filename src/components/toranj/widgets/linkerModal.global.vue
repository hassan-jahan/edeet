<script>
export default {
  name: 'LinkerModal',
  props: ['block', 'showText', 'options', 'scope'],
  data() {
    return {
      // linkList: null,
      suggestedLink: null,
    }
  },
  computed: {
    linkList() {
      let output = [{ text: '-- Pages --', value: null, disabled: true }]
      // {text: '', value: '', disabled: ''}
      if (this.options && Array.isArray(this.options.pages) && this.options.pages.length) {
        // console.log('pagge', this.options.pages)

        this.options.pages.forEach((page) => {
          output.push({ text: page.title, value: this.$helper.slugToPath(page.slug), disabled: false })
        })
      }
      const other = [
        { text: '-- Other --', value: '', disabled: true },
        { text: 'External Link', value: 'https://dasht.io' },
        { text: 'Email', value: 'mailto:info@dasht.io' },
        { text: 'Phone', value: 'tel:+1231231231' },
      ]

      return output = [...output, ...other]
    },
  },
  created() {
    if (this.block.link)
      this.suggestedLink = this.block.link
  },
  methods: {
    removeLink() {
      this.block.link = ''
      this.$root.$emit('bv::hide::modal', `linker-${this.block.id}`)
    },
    changeLink() {
      this.block.link = this.suggestedLink
    },

  },
}
</script>

<template>
  <b-modal
    :id="`linker-${block.id}` " title="Insert Link" :hide-header="false"
    :hide-footer="true" size="sm" hide-backdrop
    content-class="modal-draggable"
    modal-class="dsht no-animation"
  >
    <!--                                    <p class=""> -->
    <!--                                        -->
    <!--                                    </p> -->
    <form @submit.prevent="">
      <b-form-fieldset label="">
        <b-form-input
          v-if="showText"
          v-model="block.text"
          type="text"
          size="sm"
          class=""
          placeholder="Text Link"
        />
      </b-form-fieldset>

      <b-form-fieldset label="">
        <b-form-select
          v-if="linkList" v-model="suggestedLink" :options="linkList" name="list"
          :required="false"
          dir="auto"
          size="sm"
          class="w-100"
          @change="changeLink"
        >
          <!--                    <template v-slot:first> -->
          <!--                    <b-form-select-option value="" disabled> &#45;&#45; Select a Page &#45;&#45;</b-form-select-option> -->
          <!--                    </template> -->
        </b-form-select>
      </b-form-fieldset>

      <b-form-fieldset>
        <b-form-input
          v-model="block.link"
          type="url"
          size="sm"
          class=""
          placeholder="http:// or https://"
          autofocus
        />
      </b-form-fieldset>

      <b-form-fieldset label="">
        <b-form-checkbox v-model="block.blank" class="text-muted" size="sm" name="check-button" sw2itch>
          Open in new tab
        </b-form-checkbox>
      </b-form-fieldset>

      <div class="d-flex justify-content-between">
        <b-btn size="sm" @click.prevent="removeLink()">
          Remove Link
        </b-btn>
        <b-btn
          v-if="block.id" size="sm"
          @click.prevent="$root.$emit('bv::show::modal', `settings-${block.id}`)"
        >
          Settings
        </b-btn>
      </div>
    </form>
  </b-modal>
</template>

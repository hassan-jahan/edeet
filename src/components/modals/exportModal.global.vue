<script>
// import {directive as onClickaway} from "vue-clickaway";

export default {
  directives: {
    // onClickaway: onClickaway
  },
  // components: {PageSettingsModal},
  props: ['modalId', 'type', 'url', 'params', 'filters', 'totalRows'],

  data() {
    const d = new Date()
    const dateString = `${(`0${d.getDate()}`).slice(-2)}-${(`0${d.getMonth() + 1}`).slice(-2)}-${
            d.getFullYear()}_${(`0${d.getHours()}`).slice(-2)}-${(`0${d.getMinutes()}`).slice(-2)}`
    // 16-05-2015 09:50

    const slug = this.type.slug

    return {

      exportData: {
        fileName: `data_${slug}_${dateString}`,
        fileExt: 'csv',
        selectedData: 'all',
      },

      exportForm: {},

    }
  },
  methods: {
    shown() {
      this.exportForm = {
        component: 'form',
        children: [
          {
            slug: 'fileExt',
            label: 'Format',
            component: 'select',
            // 'buttons': true,
            // stacked: true,
            variant: 'outline-dark',
            size: 'md',
            values: [{ text: 'CSV', value: 'csv' }, { text: 'JSON', value: 'json' }],
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
          {
            slug: 'fileName',
            label: 'Exported File Name',
            component: 'input-text',
            required: true,
            description: '',
          },

        ],
      }
    },
    download() {
      let url = ''
      let params = {}
      console.log('this.exportData', this.exportData)
      if (this.exportData.selectedData == 'all') {
        params = { _export: JSON.stringify(this.exportData) }
      }
      else {
        params = { ...this.params }
        params._export = JSON.stringify(this.exportData)
      }

      // console.log('this.params', this.params)
      // console.log('params', params)

      url = `${this.$config.apiUrl}/${this.$getAppId(this.$route, '')}/${this.url}?${new URLSearchParams(params).toString()}`
      console.log('url', url)

      window.open(url, '_blank')

      this.$root.$emit('bv::hide::modal', this.modalId)
    },
  },

}
</script>

<template>
  <b-modal
    :id="modalId" title="" :hide-header="false" size="md" hide-backdrop
    content-class="modal-draggable" modal-class="dsht" ok-title="Download" scrollable @ok="download"
    @shown="shown"
  >
    <form @submit.prevent="download">
      <formFields
        :model="exportData" :block="exportForm" :parent="[]"
        :index="0"
        :options="{ edit: false }"
      />
    </form>
    <!--        <div slot="modal-footer"> -->
    <!--            <b-button -->
    <!--                variant="secondary" -->
    <!--                class="mx-1" -->
    <!--                type="button" -->
    <!--                @click="$root.$emit('bv::hide::modal', modalId)" -->
    <!--            > -->
    <!--                <span class="icon-left-1"/> -->
    <!--                {{ $t('components.headerBarBack') }} -->
    <!--            </b-button> -->

    <!--            <b-button -->
    <!--                variant="primary" -->
    <!--                class="" -->
    <!--                type="button" -->
    <!--                @click="addPage" -->
    <!--            > -->
    <!--                <span class="icon-ok "/> -->
    <!--                Create -->
    <!--            </b-button> -->
    <!--        </div> -->
  </b-modal>
</template>

<script>
export default {
  // mixins: [fieldMixin],
  props: ['block', 'parent', 'index', 'options', 'scope', 'model'], // parent can be an array or object with children same as action menus

  data() {
    return {
      invoiceOptions: { edit: false, view: true },
      invoice: {},
      invoiceItems: {},
      invoiceItemsBlock: { id: 'invoiceItems', component: 'invoiceItems', slug: 'invoice' },
      settingsForm: {
        component: 'form',
        children: [
          {
            slug: 'color',
            label: 'Text Color',
            component: 'color',
            preset: 'basic', // none| material| dark| light| text or array of custom colors
            // 'required': true,
            options: ['#fff', '#666', '#333'],

            description: '',
          },
          {
            slug: 'bgImg',
            label: 'Background Image',
            component: 'upload',
            // 'required': true,

            description: '',
          },

          {
            slug: 'bg',
            label: 'Background Color',
            component: 'color',
            gradient: true,
            transparent: true,
            preset: 'basic',
            options: ['#fff', '#1c5cc6', 'linear-gradient( 143.3deg,  rgba(216,27,96,1) 33.1%, rgba(237,107,154,1) 74.9% )', 'linear-gradient( 90deg,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% );',
            ],
            // 'required': true,
            description: '',
          },

          {
            slug: 'hasCustomCss',
            label: 'Custom CSS',
            component: 'checkbox',
            required: false,
            default: false,
            description: '',
            // "switch": true,
          },
          {
            slug: 'customCss',
            label: 'Custom CSS',
            // 'component': 'textarea',
            component: 'code-field',
            placeholder: `#${this.block.id} {\ncolor: red;\n}`, // with nim fasele

            required: false,
            // 'maxLength': '',
            description: 'Use !important to override',
            showIf: { slug: 'hasCustomCss', op: 'neq', value: false },

          },

        ],
      },
    }
  },
  computed: {},
  created() {
    // this.scope.invoice ={}
    const params = {
      with: 'type', // todo: CSS z-index problem for more tags
      // nickname: term
    }

    // params['id'] = '%' + term + '%'

    const idOrSlug = this.$route.params.id || this.$route.query.id
    // console.log(idOrSlug, this.$route) // params doesn't work

    if (idOrSlug) {
      this.$axios.get(`posts/${idOrSlug}`, { params }).then((res) => {
        // this.post = res.data;
        this.$set(this.scope, 'invoice', res.data)
      })
    }
  },
  mounted() {

  },
  methods: {

    printInvoice() {
      window.print()
    },

  },

}
</script>

<template>
  <section-wrapper
    class="dsht" :block="block" :parent="parent" :index="index" :options="options"
    right-slot-pos="" left-slot-pos=""
    :hide-features="[]"
    :scope="scope"
    :settings-form="settingsForm"
  >
    <section
      class="py-4 py-lg-5 "
      :style="`--footerLinkColor: ${block.linkColor}`"
    >
      <div class="container">
        <!-- {{scope}} -->

        <div class="header">
          <div class="d-flex justify-content-between">
            <editable name="title">
              <h1>Invoice</h1>
            </editable>
            <div>
              <b-btn class="mb-3" variant="outline-info" size="xs" @click.prevent="printInvoice()">
                Print
              </b-btn>
            </div>
          </div>

          <div class="d-flex justify-content-between">
            <div class="d-flex justify-content-between">
              <editable name="InvoiceId-title" class="mr-2">
                Invoice ID:
              </editable>
              <editable name="invoiceId">
                #2022-01-01
              </editable>
            </div>

            <div>
              <div class="d-flex justify-content-between">
                <editable name="createdAt-title" class="mr-2">
                  Issue Date:
                </editable>
                <editable name="createdAt">
                  2022-02-21
                </editable>
              </div>

              <div class="d-flex justify-content-between">
                <editable name="dueDate-title" class="mr-2">
                  Due Date:
                </editable>
                <editable name="dueDate">
                  2022-02-22
                </editable>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <editable name="company">
                <h4>From</h4>
                <p>Company Name</p>
                <p>Company Address</p>
              </editable>
            </div>
            <div class="col-md-6">
              <editable name="client">
                <h4>To</h4>
              </editable>
            </div>
          </div>
        </div>

        <!--                <formFields class="form" :model="newData" -->
        <!--                            :block="{id:'edit-field-' + cellId, children: $helper.findObjectsInArray(type.postFields, 'slug', slug)}" -->
        <!--                            :parent="[]" :index="0" :options="{edit:false}" -->
        <!--                /> -->

        <invoice-items-block
          :model="scope.invoice" :scope="scope" :block="invoiceItemsBlock" :parent="[]"
          :index="0"
          :options="invoiceOptions"
        />

        <div class="mt-3">
          <editable name="notes">
            <h5>Notes</h5>
            <p>Payment details or any other related data.</p>
          </editable>
        </div>

        <div class="mt-3">
          <editable name="terms">
            <h5>Terms</h5>
            <p>Terms and conditions that customers should know.</p>
          </editable>
        </div>

        <!--                <button v-on:click="printInvoice">Print Invoice</button> -->

        <!--                    <div v-for="(i, index) in Array(block.cols)" class="col-12 col-md-6 col-lg-4"> -->

        <!--                    </div> -->
      </div> <!-- / .container -->
    </section>
  </section-wrapper>
</template>

<style>
/*@media (max-width: 767.98px) {*/
/*    .main-footer .title-footer {*/
/*        margin: 15px 0;*/
/*    }*/
/*}*/
</style>

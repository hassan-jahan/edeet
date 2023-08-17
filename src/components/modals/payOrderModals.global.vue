<script>
export default {
  // components:{DrawerLayout},
  data() {
    return {
      balance: '',
      paymentMethod: 'stripe',
      order: {},
      invoice: {},
      newOrder: {},
    }
  },
  // props: ['newOrder'],
  created() {
    this.$root.$on('open-invoice', (newOrder) => {
      console.log('newOrder', newOrder)
      this.newOrder = newOrder
      this.$root.$emit('bv::show::modal', 'pay-order')
    })
  },
  methods: {
    openPayNow() {
      this.OrderPreview()
    },

    OrderPreview() {
      // set copons code and payment method
      // let newOrder = {meta: {'_appId': this.$currentApp.id}}

      this.$axios.get(`posts/${this.newOrder.postId}/order-preview`, { params: this.newOrder }).then((res) => {
        this.invoice = res.data
        // Object.assign(this.invoice, res.data)
        // this.$root.$emit('bv::show::modal', 'order-preview')
      })
    },
    CreateAndPayOrder() {
      // let newOrder = {meta: {'_appId': this.$currentApp.id}}
      this.$axios.post(`posts/${this.newOrder.postId}/order`, this.newOrder).then((res) => {
        this.order = res.data // amount | invoice | etc.
        // this.$root.$emit('bv::hide::modal', 'order-preview')
        // this.$root.$emit('bv::show::modal', 'pay-order')
        this.PayOrder(this.order)
      })
    },

    PayOrder(order) {
      const temp = { ...this.order } // shallow copy
      // order.status = status
      // is_ordered

      this.$axios.post(`orders/${order.id}/pay/${this.paymentMethod}/start`, {
        redirect: this.$route.path,
      }).then((res) => {
        if (res.data.url) {
          this.$toast(this.$t('messages.gatewayRedirecting'), 'success')

          setTimeout(() => {
            window.location = res.data.url
          }, 1500)
        }
        if (res.data.result == 'paid') {
          this.$toast(this.$t('messages.gatewayConfirmedPayment'), 'success')

          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect) // to iteself
            return
          }

          setTimeout(() => {
            this.$router.go()
          }, 3500)

          // this.$router.push('/billing')
        }

        // if balance and ok
        // this.$toast('پرداخت با موفقیت انجام شد', 'success')
      }, (error) => { // undo
        Object.assign(action, temp)
      })
      this.$root.$emit('bv::hide::modal', 'pay-order')
    },

    AddOrder() {
      this.$http.post(`post/${this.newOrder.postId}/order`, this.newOrder).then((res) => {
        this.order = res.data // amount | invoice | etc.
        // this.$root.$emit('bv::hide::modal', 'order-preview')
        // this.$root.$emit('bv::show::modal', 'pay-order')
      })
    }
    ,

  },
}
</script>

<template>
  <b-modal id="pay-order" title="" :hide-header="false" size="md" class="" modal-class="dsht" @shown="openPayNow">
    <div class="mt-3" dir="auto">
      <h5>{{ invoice.title }} </h5>

      <!--        <invoice-single :invoice="invoice"></invoice-single> -->

      <b-form-group class="text-center">
        <!-- below can be used with html -->
        <!--                :options="[{ text: 'ZarinPal', value: 'zarinpal' }, { text: 'Balance', value: 'balance' }, { text: 'paypal', value: 'paypal' }, { text: 'jeeb', value: 'jeeb' }, { text: 'Stripe', value: 'stripe' }]" -->

        <b-form-radio-group
          v-model="paymentMethod"
          :options="[{ text: 'Stripe', value: 'stripe' }, { text: 'Lemon', value: 'lemon' }]"
          buttons
          button-variant="outline-primary"
          size="sm"
        />
      </b-form-group>
    </div>
    <div><strong>Current Balance:</strong> {{ balance | number }}</div>

    <h6 class="mt-3">
      <Strong>Amount: {{ invoice.total | number }}</Strong>
    </h6>

    <div slot="modal-footer">
      <!--                <b-button variant="secondary" class="mx-1" type="button" -->
      <!--                          @click="$root.$emit('bv::hide::modal', 'pay-order') && $root.$emit('bv::show::modal', 'order-preview')"> -->
      <!--                    <span class="icon-left-1"></span> -->
      <!--                    بازگشت -->
      <!--                </b-button> -->

      <b-button
        variant="primary"
        class="" type="button" @click="CreateAndPayOrder()"
      >
        <span class="icon-ok " />
        Next
      </b-button>
    </div>
  </b-modal>
</template>

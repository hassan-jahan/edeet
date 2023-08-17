<script>
export default {
  // components:{DrawerLayout},
  data() {
    return {
      deposit: 1000,
      balance: '',
      method: 'stripe',
    }
  },

  methods: {

    openDeposit() {
      if (process.client && window && window.suggestedDepositAmount)
        this.deposit = window.suggestedDepositAmount

      this.$axios.get('payments/balance').then(
        (res) => {
          this.balance = res.data.balance
          return res.data.balance
        },
        (error) => {
        },
      )
    },

    AddCredit() {
      this.$toast(this.$t('messages.gatewayRedirecting'), 'success')

      this.$axios.post(`payments/${this.method}/start`, {

        amount: this.deposit,
        redirect: this.$route.path,

      }).then((res) => {
        window.location = res.data.url
      }, (error) => {
      })
    },

  },
}
</script>

<template>
  <b-modal id="deposit" title="" :hide-header="false" size="md" class="" modal-class="dsht" @shown="openDeposit">
    <!-- <p class="text-center">Get a chance to win a small gift card with a helpful feedback!</p> -->
    <h4>{{ $t('components.headerBarIncreaseCredit') }}</h4>

    <h6 class="mt-4">
      {{ $t('components.headerBarCurrentCredit') }} {{ balance | number }}
    </h6>

    <form class="mt-2 " @submit.prevent="AddCredit">
      <b-form-group class="text-center">
        <b-form-radio-group
          id="btn-radios-2"
          v-model="deposit"
          :options="[
            { text: '10', value: 10 }, { text: '25', value: 25 }, { text: '50', value: 50 }, { text: '100', value: 100 }]"
          buttons
          button-variant="outline-primary"
          size="sm"
        />
      </b-form-group>

      <b-form-group class="text-center">
        <b-form-radio-group
          id="btn-radios-2"
          v-model="method"
          :options="[{ text: 'Stripe', value: 'stripe' }, { text: 'paypal', value: 'paypal' }]"
          buttons
          button-variant="outline-primary"
          size="sm"
        />
      </b-form-group>

      <b-form-group class="mx-auto w-50">
        <b-input-group size="md" prepend="" :append="$t('components.headerBarCurrency')">
          <b-form-input
            v-model="deposit" type="number"
            :placeholder="$t('components.headerBarIncreaseRate')"
          />
        </b-input-group>
      </b-form-group>
    </form>

    <div slot="modal-footer">
      <b-button
        variant="secondary" class="mx-1" type="button"
        @click="$root.$emit('bv::hide::modal', 'deposit')"
      >
        <span class="icon-left-1" />
        {{ $t('components.headerBarBack') }}
      </b-button>

      <b-button variant="primary" class="" type="button" @click="AddCredit">
        <span class="icon-ok " />
        {{ $t('components.headerBarPayment') }}
      </b-button>
    </div>
  </b-modal>
</template>

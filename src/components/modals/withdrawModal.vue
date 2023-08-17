<script>
import Vue from 'vue'

export default {
  components: {},

  data() {
    return {
      newTransaction: {
        status: '',
        amount: '',
        meta: {},
      },

    }
  },
  created() {

  },
  mounted() {
    //      this.$auth.refreshAuth()
    //      this.accountSettings = this.$auth.user
    // var _this = this;
  },
  methods: {
    openWithdraw() {
      this.$axios.get('payments/balance').then((res) => {
        this.balance = res.data.balance
        return res.data.balance
      })

      if (process.client && window && window.suggestedWithdrawAmount)
        this.newTransaction.amount = window.suggestedWithdrawAmount
    },

    CreateWithdraw() {
      //                this.newTransaction.meta.menu = this.menu
      this.newTransaction.method = 'shaba'
      this.$axios.post('wallet/1/withdraw', this.newTransaction).then(
        (res) => {
          Vue.$toast(this.$t('messages.newTransactionSuccess'), 'success')
          this.$root.$emit('bv::hide::modal', 'withdraw')
          this.$root.$emit('bv::refresh::table', 'datatable')
          this.newTransaction = { meta: {} }
          // show settings page?
          // empty newtrans
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
    id="withdraw" title="" :hide-header="false" :hide-footer="true" size="md"
    modal-class="dsht" @hidden="$root.$emit('bv::table::refresh', 'datatable');" @shown="openWithdraw"
  >
    <!-- <textarea v-model="feedback.content" class="w-100" autofocus></textarea> -->

    <form
      method="POST" accept-charset="UTF-8" enctype="multipart/form-data"
      autocomplete="off" @submit.prevent="CreateWithdraw()"
    >
      <!-- <b-form-fieldset :label="$t('pages.billingAmountToman')"> -->
      <!-- <b-form-input type="number" v-model="newTransaction.amount" :placeholder="$t('pages.billingAmount')" -->
      <!-- step="any"/> -->
      <!-- &lt;!&ndash;<div class="description">{{$config.meta.min_withdraw}} {{ $t('pages.billingMinimumTransaction') }}</div>&ndash;&gt; -->

      <!-- </b-form-fieldset> -->

      <div v-if="$auth.user && !$auth.user.isVerified" class="alert alert-info text-center my-0">
        هویت شما هنوز تایید نشده
        است.
        توجه کنید که تنها افراد تایید هویت شده می‌توانند درخواست برداشت پول ثبت کنند.
        <router-link
          to="/settings/verification" class="rounded-4 btn-sm btn btn-outline-success"
          active-class="nothing"
        >
          تایید هویت
        </router-link>
      </div>

      <b-form-fieldset :label="$t('pages.billingAmountToman')">
        <b-form-group>
          <b-input-group size="md" prepend="" append=" تومان ">
            <b-form-input
              v-model="newTransaction.amount" type="number" required
              :placeholder="$t('pages.billingAmount')"
            />
          </b-input-group>
        </b-form-group>
      </b-form-fieldset>

      <b-form-fieldset label="شماره شبا (بدون فاصله یا -)">
        <b-form-input
          v-model="newTransaction.meta.shaba" type="text" required :minlength="24"
          placeholder="IR"
        />
      </b-form-fieldset>

      <!-- <b-form-fieldset label="Description"> -->
      <!-- <b-form-input :textarea=true :rows=2 v-model="newTransaction.description" spellcheck="true" -->
      <!-- dir="auto" required placeholder="Description"></b-form-input> -->
      <!-- </b-form-fieldset> -->

      <footer class="modal-footer">
        <div>
          <b-button
            variant="secondary" class="mx-1" type="button"
            @click="$root.$emit('bv::hide::modal', 'withdraw')"
          >
            <span class="icon-left-1" />{{ $t('pages.billingBack') }}
          </b-button>

          <b-button v-if="$auth.user && $auth.user.isVerified" variant="primary" type="submit" class="">
            <span class="icon-ok " />
            {{ $t('pages.billingSubmit') }}
          </b-button>
        </div>
      </footer>
    </form>
  </b-modal>
</template>

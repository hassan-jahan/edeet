<script>
export default {
  // name: 'invoice.vue',
  props: ['invoice'],
  data() {
    return {
      invoiceFields: [
        {
          key: 'title',
          label: 'عنوان',
        },
        {
          key: 'quantity',
          label: 'مقدار',
        },
        {
          key: 'unitPrice',
          label: 'قیمت واحد',
        },
        // {
        //     key: 'subitems',
        //     label: 'توضیحات',
        // },

        {
          key: 'total',
          label: 'مبلغ',
        },
      ],

    }
  },
}
</script>

<template>
  <div>
    <h5 v-if="invoice.title" dir="auto" class="">
      {{ invoice.title }}
    </h5>

    <!-- <div v-if="$auth.user" class="mt-3">درخواست کننده: -->
    <!-- <strong>{{$auth.user.nickname}}</strong> -->
    <!-- </div> -->

    <b-table
      id="datatable" class="mt-3" striped hover :items="[invoice]" :fields="invoiceFields"
      responsive="md" primary-key="id"
    >
      <template #quantity="item">
        <!-- also change invoice system -->
        {{ item.value | number }}
      </template>

      <template #unitPrice="item">
        <!-- also change invoice system -->
        {{ item.value | number }}
      </template>

      <template #itemTotal="item">
        <!-- also change invoice system -->
        {{ Math.round(item.item.quantity * item.item.unitPrice) | number }}
      </template>
    </b-table>

    <div class=" col-md-6 ml-auto text-right p-2 m-1">
      <div v-for="(subitem, i) in invoice.subitems" :key="i" class="d-fex justify-content-around">
        <strong>{{ subitem.title }}:</strong>
        <span>{{ subitem.amount | number }}</span>
      </div>

      <div v-if="invoice.total" class="mt-1 d-fex justify-content-around text-primary">
        <strong>جمع کل:</strong>
        <span><strong>{{ invoice.total | number }} تومان</strong></span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

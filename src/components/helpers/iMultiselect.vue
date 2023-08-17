<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'IMultiselect',
  components: { Multiselect },
}
</script>

<template>
  <!--    $listeners was removed in vue 3 and added to attrs -->
  <!--    attrs below can not be rewritten by attrs! -->
  <Multiselect v-bind="$attrs" v-on="$listeners" />
</template>

<style>
/*instead of 50*/
.multiselect__content-wrapper{
    z-index: 150 !important;
}
</style>

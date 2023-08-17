<script>
import fieldMixin from '../fieldMixin'
import out from '../outDirective'

// import blockMixin from '../toranj/blockMixin'

export default {
  directives: {
    out,
  },
  mixins: [fieldMixin],
  // props: ['name'],
  inheritAttrs: false,
  data() {
    return {
      showEdit: false,
      autoChange: false,
      removeWatch: () => {
      },
    }
  },

  watch: {
    'model.label': function (newVal, oldVal) {
      // this.wasEmpty && (!this.lastAutoChange || this.lastAutoChange > Date.now() - 5000)
      // console.log('this.wasEmpty',this.wasEmpty)
      if (!this.block.dependsOn) {
        if (this.autoChange) { // default for label
          this.value = this.$options.filters.slugify(newVal, this.block.exclude, true, this.block.separator)
          // setTimeout(()=>{
          //     this.value = this.$options.filters.slugify(newVal)
          // },5000)
        }
        // else if (this.value.startsWith('__')) { //enable auto change for second time after creating the initial slug
        //     this.value = this.$options.filters.slugify(newVal)
        // }
      }
    },
    // "model[block.dependsOn]"(newVal, oldVal) {
    //     if (this.autoChange) {
    //         this.value = this.$options.filters.slugify(newVal)
    //     }
    // }
  },
  // {
  // edit: {
  //     type: Object,
  //     // default: {show:false}
  // },
  // current: {
  //     type: String,
  //     required: true
  // }
  // },
  mounted() {
    if (!this.value || this.value.startsWith('__')) { // __ means temporary slug should be changed as soon as possible updating the label
      this.autoChange = true // it will be changed untill page refresh or rerender
    }

    if (this.block.dependsOn) {
      this.removeWatch = this.$watch(`model.${this.block.dependsOn}`, function (newVal, oldValue) {
        if (this.autoChange)
          this.value = this.$options.filters.slugify(newVal, this.block.exclude, true, this.block.separator || '_')// lower for autochange create but not for manual change
      }, { deep: false })
    }

    // vm.$watch('person.name', function(newValue, oldValue) {
    //     alert('The first name was changed from ' + oldValue.firstName + ' to ' + newValue.firstName + '!');
    // }, { deep: true });
    // if (this.block.editMode) {
    //     this.showEdit = true
    // }
    //
    // console.log('editMode')
    // console.log(this.block.editMode)
  },
  created() {

  },

  beforeUnmount() {
    if (this.block.dependsOn)
      this.removeWatch()
    console.log('watcher removed for slug')
  },
  methods: {
    outClick() { // should be func
      if (this.showEdit)
        this.showEdit = false
    },
    input() {
      if (!this.isDirty)
        this.isDirty = true
    },
    Change(val) {
      // it was manually changed
      // this.autoChange = false
      this.value = this.$options.filters.slugify(val, this.block.exclude, this.block.lower, this.block.separator)
    },
  },
}
</script>

<template>
  <field-wrapper
    :block="block" :parent="parent" v-if="ShowIf(block)" :index="index" :options="options"
    :footer-add="true" right-slot-pos="outside"
    left-slot-pos="outside"
    :hide-features="[]"
    style="position: relative;"
    class="mb-3"
    :scope="scope"
  >
    <!--        TODO: FIX Label on click or disable somehow to no loss focus on typing | Validation | MORE COMPONENT | Tabs -->

    <template v-if="!showEdit">
      <span class="text-muted">
        {{ block.prepend }}
      </span>

      {{ value }}

      <span class="text-muted">
        {{ block.append }}
      </span>
      <a href="#" @click.prevent="showEdit = true">Change</a>
    </template>
    <template v-else>
      <!-- Has a problem with input group?? Just replace it with simple {{prepend/append}} -->
      <b-input-group :size="block.size || 'sm'" :prepend="block.prepend" :append="block.append">
        <b-form-input
          :id="`${block.id}-input`"
          v-model="value"
          :name="block.slug"
          :required="block.required"
          v-out="outClick"
          :class="`w-auto d-inline-block ${block.inputClasses}`"
          :disabled="block.disabled"
          :size="block.size || 'sm'"
          v-bind="$attrs"
          :placeholder="block.label"
          :minlength="block.minLength"
          :maxlength="block.maxLength"
          autofocus
          @change="Change"
          @input="input"
          @keyup.enter="outClick"
          @keyup.esc.stop.capture="outClick"
        />
        <!--                    @blur.stop="showEdit=false" -->
        <!--                v-out = "showEdit=false" -->
        <!--                <a @click.prevent="showEdit= false" href="#" class="mt-3 mx-2">Done</a> -->
      </b-input-group>

      <!--            //security risk?? -->
      <small class="d-block mt-1 text-muted" v-html="block.description" />
    </template>
    <!--            :value="block.value || true" -->
    <!--            :unchecked-value="block.value || false " -->
    <!--            :readonly="options.edit" -->

    <!-- <span class="required" v-if="block.required">*</span> -->

    <!--        </b-form-group> -->

    <!--        <template v-slot:menu-item> -->
    <!--            <b-dropdown-item @click.prevent="$root.$emit('bv::show::popover', 'upload-popover-'+block.id)"> -->
    <!--                Upload / Replace -->
    <!--            </b-dropdown-item> -->
    <!--        </template> -->

    <!--        <template v-slot:menu-right> -->
    <!--            <b-btn size="xs" @click.prevent="$root.$emit('bv::show::popover', 'upload-popover-'+block.id)"> -->
    <!--                <span class="iconify big" data-icon="bx:bx-cloud-upload" data-inline="false"></span> -->
    <!--            </b-btn> -->
    <!--        </template> -->
  </field-wrapper>
</template>

<style scoped>
/*.dsht {*/
    .dsht .input-group > .form-control, .dsht .input-group > .form-control-plaintext, .dsht .input-group > .custom-select, .dsht .input-group > .custom-file {
        flex: unset !important;
        /*  should be checked with IE Edge */
    }
/*}*/
</style>

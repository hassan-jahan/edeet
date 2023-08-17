<script>
// import 'vue-multiselect/dist/vue-multiselect.min.css'
import fieldMixin from '../toranj/fieldMixin'
import iMultiselect from './../helpers/iMultiselect'

export default {
  name: 'PostSelector',
  components: { IMultiselect: iMultiselect },
  mixins: [fieldMixin],

  data() {
    return {
      settingsForm: {},
      newPost: '',
      postOptions: [],
      tempModel: false,
      isBusy: false,
    }
  },
  watch: {
    tempModel(newVal) {
      console.log('changess', this.block.getOnlyIds)
      if (!this.block.getOnlyIds) {
        this.value = newVal
      }
      else {
        if (this.block.multiple)
          this.value = this.$helper.pluckArray(newVal, 'id')
        else if (newVal.id)
          this.value = newVal.id
        // else //empty or so
        //     this.value = newVal
      }
    },
  },
  mounted() {
    setTimeout(() => {
      if (!this.block.getOnlyIds || this.block.defined) {
        this.tempModel = this.value
        return
      }

      // this.$helper.pluckArray()
      console.log('va', this.value)

      const IdListString = Array.isArray(this.value) && this.value.length ? this.value.join(',') : this.value
      console.log('IdListString', IdListString)

      if (!IdListString)
        return

      this.isBusy = true
      this.$axios.get(`types/${this.block.relationTypeId}/posts/`, { params: { 'id:in': IdListString } }).then((res) => {
        console.log(res)
        this.tempModel = res.data
        this.isBusy = false
      },
      (err) => {
        this.isBusy = false
      })
    }, 1000)
  },
  methods: {
    addPost(newUser) {
      // for tag only not used here to create new user
      this.userOptions.push(newUser)
      if (!Array.isArray(this.value))
        this.value = []
      this.value.push(newUser)
      //        this.newPost.tags = JSON.stringify(this.arrayTags)
      console.log('add tag lannuch')
      //        console.log(this.newPost.tags)
    },
    findPost(term) {
      const params = {
        count: 25, // todo: CSS z-index problem for more tags
        // nickname: term
      }

      params['title|content:like'] = `%${term}%`

      if (term.length <= 2)
        return
      this.isBusy = true
      this.$axios.get(`types/${this.block.relationTypeId}/posts/`, { params }).then((res) => {
        console.log(res)
        this.postOptions = res.data
        this.isBusy = false
      })
    },
    selectedPost(selected) {
      // console.log(selected)

      // if (!this.block.getOnlyIds)
      //     return
      //
      // if (!Array.isArray(this.tempModel) && this.) this.value = [];
      // this.value.push(newUser);
      //
      // this.value.push
      // for (let item of selected) {
      //     console.log(item);
      // }
    },
    change(newVal) {

    },
  },
}
</script>

<template>
  <!-- usually for development to select or multiple select -->
  <IMultiselect
    v-if="block.defined && Array.isArray(block.values)" :id="`${block.id}-multiselect`"
    v-model="tempModel" :class="block.inputClasses"
    :name="block.slug"
    :tag-placeholder="$t('fields.userAddNew')" :placeholder="block.placeholder || block.label"
    :options="block.values" :multiple="block.multiple" :hide-selected="true"
    :close-on-select="true" :max="block.max || 20" :options-limit="50"
    :max-height="600" select-label="" deselect-label="" @tag="addUser"
    :show-no-results="true" :taggable="block.taggable" :disabled="block.disabled" track-by="id"
    label="title"
  >
    <!--                <span slot="noResult">{{ $t("fields.tagNoResult") }}</span> -->
  </IMultiselect>

  <!--  dynamic user search single or multiple -->
  <IMultiselect
    v-else :id="`${block.id}-multiselect`" v-model="tempModel" :class="block.inputClasses"
    :name="block.slug" :tag-placeholder="$t('fields.postAddNew')"
    :placeholder="block.placeholder || block.label" :options="postOptions"
    :multiple="block.multiple" track-by="id" label="title"
    :hide-selected="true" :close-on-select="true" :max="schema.max || 20"
    :options-limit="50" :max-height="600" select-label=""
    deselect-label="" :show-no-results="true" :taggable="false" :loading="isBusy"
    :internal-search="false" :disabled="block.disabled" :show-labels="false" @tag="addPost"
    @search-change="findPost"
    @select="selectedPost"
  >
    <!--                <template slot="options" slot-scope="props"> -->
    <!--                    {{props}} -->
    <!--                    <img v-if="props.option.avatar" class="option__image" :src="props.option.avatar" -->
    <!--                                                                alt="Avatar" width="40"/> -->
    <!--                    <div class="option__desc"> -->
    <!--                        <span class="option__title">{{ props.option.nickname }}</span> -->
    <!--                        <span class="option__small">{{ props.option.username }}</span> -->
    <!--                    </div> -->
    <!--                </template> -->

    <!--                <span slot="noResult">{{ $t("fields.tagNoResult") }}</span> -->
  </IMultiselect>
</template>

<style>
.multiselect__tags {
    /*background: transparent;*/
}

.multiselect__option--selected.multiselect__option--highlight {
    background: #ccc;
}

.multiselect__input,
.multiselect__single {
    border-radius: 0;
}

.multiselect__tags {
    border-radius: 0;
}

.multiselect__input {
    height: 1.9375rem !important;
    padding: 0.125rem 0.125rem !important;
    box-shadow: none !important;
}

.multiselect__input:focus {
    box-shadow: none !important;
    background: #fff !important;
}

.multiselect__tag {
    line-height: 1.4;
    /*background: green*/
}

.multiselect__tag-icon {
    line-height: 24px;
}
</style>

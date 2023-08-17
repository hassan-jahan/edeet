<script>
import Vue from 'vue'

//  import { abstractField } from "vue-form-generator"

export default {

  props: {
    url: {
      type: String,
      required: true,
    },
    accept: {
      type: String, // not good for android < 5.4
    },
    name: {
      type: String, // not good for android < 5.4
    },
    validateTypes: {
      type: Array,
    },
    maxSize: {
      type: Number,
      default: 5 * 1024 * 1024, // byte //todo: base on type
    },
    minSize: {
      type: Number,
      default: 0, // byte
    },
    btnClass: {
      type: String,
      default: 'btn btn-secondary',
    },
    multiple: {},
    required: {},
    disabled: {},
    readonly: {},
    resize: {},
    currentFiles: {},
  },
  //    mixins: [ abstractField ],
  data() {
    return {
      progress: 0,
      animated: false,
      files: '',
      is_require: false,
      isDragOver: false,
    }
  },
  mounted() {
    if (this.multiple)
      this.files = [] // make default string array

    //            if (this.currentFiles && !Array.isArray(this.currentFiles))
    //                this.currentFiles = [this.currentFiles]

    if (this.currentFiles && this.currentFiles.length)
      this.files = this.currentFiles

    this.is_require = this.required
    if (this.required && this.files && this.files.length)
      this.is_require = false
    // already added
  },
  methods: {
    addDropedFiles(e) {
      const droppedFiles = e.dataTransfer.files
      console.log('droppedFiles')
      console.log(droppedFiles)
      this.isDragOver = false
      if (!droppedFiles)
        return
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      // ([...droppedFiles]).forEach(f => {
      //     this.files.push(f);
      // });

      this.upload(droppedFiles)
    },
    upload(input_files = '') {
      if (!input_files)
        input_files = this.$refs.fileInput.files

      console.log('input_files')
      console.log(input_files)
      for (const input_file of input_files) {
        if (input_file.size > this.maxSize) {
          Vue.$toast(
            this.$t('messages.uploadMaxSize', {
              uploadMax: this.readableSize(this.maxSize),
              uploadError: input_file.name,
            }),
          )
          continue
        }

        if (input_file.size < this.minSize) {
          Vue.$toast(
            this.$t('messages.uploadMinSize', {
              uploadMin: this.readableSize(this.minSize),
              uploadError: input_file.name,
            }),
          )
          continue
        }

        // IMPORTANT: ACCEPT SHOULD NOT BE USED FOR ANDROID > 5.6(don't allow pick anything!)
        if (
          this.validateTypes
                        && this.validateTypes.length
                        && !this.validateTypes.includes(input_file.type)
        ) {
          Vue.$toast(
            this.$t('messages.uploadFormatUnacceptable', {
              uploadError: input_file.name,
            }),
          )
          continue
        }

        this.doUpload(input_file)
      }
    },
    doUpload(input) {
      const data = new FormData()
      //        data.append('foo', 'bar');
      data.append('file', input)
      this.animated = true

      const config = {
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent.loaded)
          this.progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          )
        },
      }

      let url = this.url
      if (this.resize && this.resize.w && this.resize.h) {
        url
                        += `?resize_w=${
                         this.resize.w
                         }&resize_h=${
                         this.resize.h
                         }&resize_fit=${
                         this.resize.fit}`
      }

      this.$axios.post(url, data, config).then(
        (res) => {
          // input.name or size and v-model
          console.log('files')
          console.log(this.files)
          if (this.multiple)
            this.files.push(res.data.file)
          else
            this.files = res.data.file

          console.log(this.files)

          // wait to prepare resized images
          setTimeout(() => {
            console.log(this.files)
            this.$emit('update:files', this.files)
            this.progress = 0
          }, 2000)

          this.animated = false
        },
        (err) => {
          this.animated = false
        },
      )
    },
    remove(index) {
      // todo: remove from server base on name
      // let index = this.files.indexOf(file);
      this.files.splice(index, 1) // remove this from workings
    },
    readableSize(size) {
      if (size < 1024 * 1024)
        return `${parseInt(size / 1024)} KB`
      else
        return `${parseInt(size / (1024 * 1024))} MB`
    },
  },
}
</script>

<template>
  <div
    v-cloak
    :class="{ dragOver: isDragOver }"
    @drop.prevent="addDropedFiles"
    @dragover.prevent="isDragOver = true"
    @dragenter.prevent="isDragOver = true"
    @dragleave.prevent="isDragOver = false"
  >
    <div class="fileUpload" :class="[btnClass]">
      <span><slot>{{ $t('components.uploadUpload') }}</slot></span>
      <input
        ref="fileInput"
        type="file"
        v-bind="{ accept, multiple, required, disabled, readonly, name }"
        class="uploadInput"
        @change="upload()"
      >
    </div>

    <div
      v-show="progress > 0 && progress <= 100"
      class="small mx-2 mt-2 font-weight-bold "
    >
      {{ progress }}%
    </div>

    <b-progress
      v-show="progress > 0 && progress <= 100"
      v-model="progress"
      class="mt-1"
      :animated="animated"
      :striped="animated"
    />

    <!-- <div v-if="multiple" v-for="(file,i) in files" class="files_list"> -->
    <!-- <small>{{file.path}} -->
    <!-- <button type="button" class="close btn-sm" @click="remove(i)" aria-label="Remove"> -->
    <!-- <span aria-hidden="true">&times;</span> -->
    <!-- </button> -->
    <!-- </small> -->
    <!-- </div> -->
  </div>
</template>

<style scoped>
    .fileUpload {
        position: relative;
        overflow: hidden;
    }

    .dragOver {
        border: 2px dashed darkblue !important;
    }

    .fileUpload input.uploadInput {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        padding: 0;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        filter: alpha(opacity=0);
    }
</style>

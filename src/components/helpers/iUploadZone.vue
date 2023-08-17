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
      previews: '',
      is_require: false,
      isDragOver: false,
    }
  },
  mounted() {
    if (this.multiple)
      this.files = [] // make default string array
    if (this.multiple)
      this.previews = [] // make default string array

    //            if (this.currentFiles && !Array.isArray(this.currentFiles))
    //                this.currentFiles = [this.currentFiles]

    if (this.currentFiles && this.currentFiles.length)
      this.files = this.currentFiles

    this.is_require = this.required
    if (this.required && this.files && this.files.length)
      this.is_require = false
    // already added

    // <input type="file" accept="image/*;capture=camera">
    //     <input type="file" accept="video/*;capture=camcorder">
    //         <input type="file" accept="audio/*;capture=microphone">
    //             The capture attribute can be included as a separate attribute in HTML5.
    //             While the attribute helps in getting users to select the right file type, you must still validate server side.
    //
    //     (this.accept) //not tested
    //     this.mimeTypes = this.accept.split(',')
    // else if (this.fileType) {
    //         switch (this.fileType.toLowerCase()) {
    //             case "image":
    //                 this.mimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif", 'image/svg+xml']; //svg has //security: risk 'image/svg+xml'
    //                 break;
    //
    //             case "audio":
    //                 this.mimeTypes = [
    //                     "audio/mpeg",
    //                     "audio/mp3",
    //                     "audio/mpeg3",
    //                     "audio/x-mpeg-3"
    //                 ];
    //                 break;
    //             case "video":
    //                 this.mimeTypes = ["video/mp4"];
    //                 break;
    //             case "document":
    //                 this.mimeTypes = [
    //                     "application/pdf",
    //                     "text/plain",
    //                     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //                     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //                     "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    //                 ]; //pdf may not be safe for older IE
    //                 break;
    //             case "archive":
    //                 this.mimeTypes = ["application/zip", "application/x-rar-compressed", "application/tar+gzip"];
    //                 break;
    //             default:
    //                 this.mimeTypes = [
    //                     "application/pdf",
    //                     "text/plain",
    //                     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //                     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //                     "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    //                     "application/zip",
    //                     "application/x-rar-compressed",
    //                     "application/tar+gzip",
    //                     "video/mp4",
    //                     "audio/mpeg",
    //                     "audio/mp3",
    //                     "audio/mpeg3",
    //                     "audio/x-mpeg-3",
    //                     "image/png",
    //                     "image/jpg",
    //                     "image/jpeg",
    //                     "image/gif",
    //                     'image/svg+xml', //security: risk
    //                 ]
    //         }
    //     }
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
      console.log(input_files)
      console.log(this.$refs.fileInput)
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

      if (input.type.match('image.*')) { // loaded preview
        const reader = new FileReader()
        reader.onload = (e) => {
          if (this.multiple)
            this.previews.push(e.target.result)
          else
            this.previews = e.target.result
        }
        reader.readAsDataURL(input)
      }

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
          console.log(this.multiple)
          if (this.multiple)
            this.files.push(res.data.file)
          else
            this.files = res.data.file

          console.log(this.files)

          // wait to prepare resized images
          setTimeout(() => {
            console.log('this.files')
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
  <div>
    <div
      v-cloak
      class="fileUpload fileUploadZone" :class="{ dragOver: isDragOver }"
      @drop.prevent="addDropedFiles"
      @dragover.prevent="isDragOver = true"
      @dragenter.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
    >
      <template v-if="!Array.isArray(files) && files">
        <!-- only for single file not multiple -->
        <img
          :src="previews"
          style="width: 100%;height: auto; max-height: 105px;border:2px solid #ccc"
        >
      </template>
      <template v-else>
        <div class="mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="58.827"
            height="37.584"
            viewBox="0 0 58.827 37.584"
          >
            <path
              id="Path_343"
              data-name="Path 343"
              d="M48.073,15.817c0-.157.026-.313.026-.47a15.156,15.156,0,0,0-28.888-6.6,7.8,7.8,0,0,0-11.24,5.742,11.88,11.88,0,0,0,3.782,23.1H25.212V27.144H18.882L29.413,16.221l10.531,10.91H33.615v10.44H48.1a10.878,10.878,0,0,0-.026-21.754Z"
              transform="translate(0 0)"
              fill="#ffd500"
              opacity="0.49"
            />
          </svg>
        </div>

        <div>
          <slot>{{ $t('components.uploadUpload') }}</slot>
        </div>
      </template>

      <input
        ref="fileInput"
        type="file"
        v-bind="{ accept, multiple, required, disabled, readonly, name }"
        class="uploadInput click-away-exception"
        @change="upload($event.target.files)"
      >
      <div
        v-show="progress > 0 && progress <= 100"
        class="small mx-2 mt-2 font-weight-bold "
        style="z-index:9999;"
      >
        {{ progress }}%
      </div>

      <b-progress
        v-show="progress > 0 && progress <= 100"
        v-model="progress"
        class="mt-1"
        :animated="animated"
        style="z-index:9999;"
        :striped="animated"
      />
    </div>

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
.fileUploadZone {
        width: 150px;
        height: 150px;
        background: center center no-repeat #F0F2F8;
        text-align: center;
        padding: 10px;

    }

    .fileUploadZone .uploadInput {
        width: 100%;
        height: 100%;
    }

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

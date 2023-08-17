<script>
import Vue from 'vue'

// todo: you may also load sun editor for faster rendereinng but slower initial load
import 'suneditor/src/assets/css/suneditor.css'

// import "../../assets/css/partials/suneditor.css";
// import 'suneditor/src/assets/css/suneditor-contents.css'
import suneditor from 'suneditor'


// all plugins
import plugins from 'suneditor/src/plugins'

// How to import language files (default: en)
// import {ko} from 'suneditor/src/lang'
// import de from 'suneditor/src/lang/de'

export default {
  props: ['value', 'options'],
  data() {
    return {
      editor: false,
    }
  },
  // watch:{
  //     value(newVal, oldVal){
  //         this.editor.setContents(newVal)
  //     }
  // },
  mounted() {
    this.editor = this.createEditor()

    // this.$on('updateSunEditor', (newVal)=>{
    //     this.editor.setContents(newVal)
    // })

    // onchange event
    // contents: core.getContents(), Core object
    this.editor.onDrop = (e, cleanData, maxCharCount, core) => {
      return false // required for better move// or check cleandata and core if it wasn't another editor return true  }
    }

    this.editor.onChange = (contents, core) => {
      // this.value = contents
      // console.log('on change', contents)
      this.$emit('input', contents)
      // console.log('onChange', contents)
      // console.log('onChange2', core.getContents())
    }

    // this.editor.onBlur = (e, core) => {
    //     // this.value = contents
    //     // console.log('on change', contents)
    //     this.$emit('editorBlur', e)
    //     // console.log('onChange', contents)
    //     // console.log('onChange2', core.getContents())
    // }

    this.editor.onload = (core, onload) => {
      // remove all these for performance  in future
      // change class name to dasht-editor with and css with.className=''

      // also change editable if you like
      // let sunEditorEl = this.$parent.$el.getElementsByClassName('sun-editor')[0]
      // sunEditorEl.classList.add('sepid-editor')
      // sunEditorEl.classList.remove('sun-editor')

      // let sunEditorCommonEl = this.$parent.$el.getElementsByClassName('sun-editor-common')[0]
      // sunEditorCommonEl.classList.add("sepid-editor-common")
      // sunEditorCommonEl.classList.remove("sun-editor-common")

      const sunEditorEditable = this.$parent.$el.getElementsByClassName('sun-editor-editable')[0]
      // sunEditorEditable.classList.add('sepid-editor-editable')
      // sunEditorEditable.classList.remove('sun-editor-editable')

      sunEditorEditable.setAttribute('dir', 'auto')

      this.editor.setContents(this.value)
      //
      // // console.log('core',core)
      // // console.log(onload)
      // // this.editor.toolbar.hide();

      // core.controllersOff(); //hide link popup appear but loss focus for custom code modal (with editable)
    }

    this.editor.imageUploadHandler = (xmlHttpRequest, info, core) => {
      // Example of upload method
      const res = JSON.parse(xmlHttpRequest.responseText)

      // Error
      if (res.errorMessage) {
        if (core.functions.onImageUploadError !== 'function' || core.functions.onImageUploadError(res.errorMessage, res, core))
          core.notice.open.call(core, res.errorMessage)
        else
          core.notice.open.call(core, res.errorMessage)
      }
      // Success
      else {
        const fileList = res.result
        // res: is exaxtly what we get from server
        const imagePlugin = core.plugins.image
        // console.log('info', info)
        const url = this.$options.filters.cdnURL(res.file)

        if (info.isUpdate)
          imagePlugin.update_src.call(core, url, info.element, res)
        // The image is created and a format element(p, div..) is added below it.
        else
          imagePlugin.create_image.call(core, url, info.linkValue, info.linkNewWindow, info.inputWidth, info.inputHeight, info.align, res)

        // for (let i = 0, len = fileList.length, file; i < len; i++) {
        //     // The file object must have name and size attributes.
        //     file = {name: fileList[i].name, size: fileList[i].size};
        //     console.log(fileList)
        //     // For existing image updates, the "info" attributes are predefined in the element.
        //     // The "imagePlugin.update_src" function is only changes the "src" attribute of an image.
        //     if (info.isUpdate) imagePlugin.update_src.call(core, fileList[i].url, info.element, file);
        //     // The image is created and a format element(p, div..) is added below it.
        //     else imagePlugin.create_image.call(core, fileList[i].url, info.linkValue, info.linkNewWindow, info.inputWidth, info.inputHeight, info.align, file);
        // }
      }
    }
  },
  methods: {
    updateEditor(content) {
      this.editor.setContents(content)
    },

    createEditor() {
      const defaultOptions = {
        //  plugins: [font, video, image, list],

        plugins,
        height: 'auto',
        width: 'auto',
        minWidth: '50px',
        minHeight: '20px',
        mode: 'balloon', // 'classic', 'inline', 'balloon', 'balloon-always'
        addTagsWhitelist: 'span',
        imageResizing: false, // resize issue as always
        imageHeightShow: false,
        imageUploadHeader: {
          // "auto": "asd"
          Authorization: `Bearer ${Vue?.$auth?.token}`,
        },
        imageUploadUrl: `${Vue.axios?.defaults?.baseURL}/files/attach/upload`,
        // "imageGalleryUrl": "https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo",

        // "imageFileInput": false,
        // "katex": "window.katex",
        // "charCounter": true,
        // "videoFileInput": false,
        // "tabDisable": false,
        placeholder: 'Type Here...',
        toolbarWidth: '415px',

        buttonList: [
          [
            // "undo",
            // "redo",
            // "font",

            // "paragraphStyle",
            'bold',
            // "underline",
            'italic',
            // "strike",
            'formatBlock',
            'fontSize',
            // "blockquote",

            // "subscript",
            // "superscript",
            // "hiliteColor",
            // "textStyle",
            'link',
            // "outdent",
            // "indent",
            'align',
            // "horizontalRule",
            'list',
            'removeFormat',
            // "lineHeight",
            // "table",

            // "image",
            // "video",
            'fontColor', // todo:

            // "audio",
            // "math",
            // "fullScreen",
            // "showBlocks",
            'codeView',
            // "preview",
            // "print",
            // "save",
            // "template"
          ],
        ],
        // "defaultStyle": "background: yellow;",
        // "font": [
        //     "Arial",
        //     "tahoma",
        //     "Courier New,Courier"
        // ],
        // "fontSize": [
        //     8,
        //     10,
        //     14,
        //     18,
        //     24,
        //     36
        // ],
        // "fontSizeUnit": "",
        // "formats": [
        //     "p",
        //     "blockquote",
        //     "h1",
        //     "h2",
        //     "h3"
        // ],
        // "colorList": [
        //     [
        //         "#ff0000",
        //         "#ff5e00",
        //         "#ffe400",
        //         "#abf200"
        //     ],
        //     [
        //         "#00d8ff",
        //         "#0055ff",
        //         "#6600ff",
        //         "#ff00dd"
        //     ]
        // ],
        // "videoFileInput": false,
        // "tabDisable": false,
        // "lineHeights": [
        //     {
        //         "text": "Single",
        //         "value": 1
        //     },
        //     {
        //         "text": "Double",
        //         "value": 2
        //     }
        // ],
        // "paragraphStyles": [
        //     "spaced",
        //     {
        //         "name": "Box",
        //         "class": "__se__customClass"
        //     }
        // ],
        // "textStyles": [
        //     "translucent",
        //     {
        //         "name": "Emphasis",
        //         "style": "-webkit-text-emphasis: filled;",
        //         "tag": "span"
        //     }
        // ],
        // "lang": "en",
        // "lang(In nodejs)": "en"
      }

      const options = Object.assign(defaultOptions, this.options)
      return suneditor.create(this.$refs.textareaEditor, options)
    },
  },

}
</script>

<template>
    <textarea ref="textareaEditor" dir="auto"/>
</template>

<style>
/*//.sun-editor { //wait until rebranding*/
/*//    display: none !important;*/
/*//}*/

.sun-editor-common, .sun-editor-common {
  font-family: sans-serif !important;
}

.sun-editor-common {
  /*//display: none ////show dialog always or find a way to rename dialog class*/
}

.se-dialog.sun-editor-common {
  /*//display: block !important;*/
}

.sun-editor, .sun-editor button span {
  width: auto;
  height: auto;
  box-sizing: border-box;
  font-family: inherit;
  border: none;
  /*border: 1px solid #dadada;*/
  text-align: inherit;
  background-color: inherit;
  color: inherit;
  user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  /*//font-size: 12px;*/

}

.sun-editor .se-dialog-content {
  color: #666;
}

.sun-editor .se-wrapper .se-wrapper-wysiwyg {
  background: inherit;
}

.sun-editor .se-wrapper .se-wrapper-inner {
  min-height: initial;
}

.sun-editor .link-content span {
  display: none;
}

.se-controller .se-controller-link {
  display: none !important;
}

.sun-editor .se-line-breaker {
  z-index: 2000;
}

.sun-editor .se-controller {
  z-index: 600;
  border: none;
}

.se-arrow {
  display: none !important;
}

.se-btn-group .se-tooltip[data-command='delete'] {
  display: none !important;
}

.se-btn-group .se-tooltip[data-command='revert'] {
  display: none !important;
}

.se-btn-group ._se_resizing_btn_group, .se-btn-group .se-tooltip[data-command='percent'], .se-btn-group .se-tooltip[data-command='auto'], .se-btn-group .se-tooltip[data-command='rotate'], .se-tooltip[data-command='caption'] {
  display: none !important;
}

/*todo: check this for add image with text*/
.se-line-breaker, .se-line-breaker-component {
  display: none !important;
}

.sun-editor .se-wrapper-code {
  width: 100%;
}

.sun-editor .se-toolbar.se-toolbar-balloon {
  /*//min-width: 425px; //old*/
  min-width: 460px;
}

.sun-editor .se-dialog .se-dialog-inner .se-dialog-content {
  min-width: 420px;
}

.sun-editor .se-wrapper .se-placeholder {
  padding: 5px 5px 0 5px;
}
</style>

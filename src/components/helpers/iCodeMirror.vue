<script>
// import dedent from 'dedent'
// import {codemirror} from 'vue-codemirror'
import codemirror from 'vue-codemirror/src/codemirror.vue'

// const codemirror from import('vue-codemirror/src/codemirror')
// base style
import 'codemirror/lib/codemirror.css'

// theme css
// import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/monokai.css'

// language
import 'codemirror/mode/vue/vue.js'
import 'codemirror/mode/javascript/javascript.js'

// active-line.js
// import 'codemirror/addon/selection/active-line.js'
// styleSelectedText
// import 'codemirror/addon/selection/mark-selection.js'
// import 'codemirror/addon/search/searchcursor.js'
// highlightSelectionMatches
// import 'codemirror/addon/scroll/annotatescrollbar.js'
// import 'codemirror/addon/search/matchesonscrollbar.js'
// import 'codemirror/addon/search/searchcursor.js'
// import 'codemirror/addon/search/match-highlighter.js'
// keyMap
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'

// import 'codemirror/addon/dialog/dialog.js'
// import 'codemirror/addon/dialog/dialog.css'
// import 'codemirror/addon/search/searchcursor.js'
// import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/sublime.js'

// // foldGutter
// import 'codemirror/addon/fold/foldgutter.css'
// import 'codemirror/addon/fold/brace-fold.js'
// import 'codemirror/addon/fold/comment-fold.js'
// import 'codemirror/addon/fold/foldcode.js'
// import 'codemirror/addon/fold/foldgutter.js'
// import 'codemirror/addon/fold/indent-fold.js'
// import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/xml-fold.js'
import 'codemirror/addon/edit/closetag.js'
import 'codemirror/addon/edit/matchtags.js'

import 'codemirror/addon/display/placeholder.js'

// import 'codemirror/addon/display/fullscreen.js'
// import 'codemirror/addon/display/fullscreen.css'

export default {
  components: {
    Codemirror: codemirror,
  },
  props: ['value', 'options', 'placeholder', 'size'],
  data() {
    return {
      cmOptions: {},
      defaultOptions: {
        tabSize: 4,
        // styleActiveLine: true,
        lineWrapping: true,
        // lineNumbers: true,
        smartIndent: true,
        // line: true,
        // readOnly: true,
        keyMap: 'sublime',
        mode: 'text/x-vue',
        // theme: 'base16-dark',
        theme: 'monokai',
        autoCloseTags: true,
        viewportMargin: 10, // Infinity for auto resize not good for very big files
        matchTags: { bothTags: true },
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        pollInterval: 100,
        extraKeys: {
          F11(cm) {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'))
          },
          Esc(cm) {
            if (cm.getOption('fullScreen'))
              cm.setOption('fullScreen', false)
          },
        },
      },
    }
  },
  computed: {
    codeMirror() {
      return this.$refs.cmEditor.codemirror
    },
  },
  created() {
    if (this.options)
      this.cmOptions = Object.assign({}, this.defaultOptions, this.options)
    else
      this.cmOptions = this.defaultOptions

    console.log('final cm options', this.cmOptions)
  },
  methods: {
    onInput(val) {
      // console.log('val', val)
      this.$emit('input', val)
    },

    // onCmCursorActivity(codemirror) {
    //     console.debug('onCmCursorActivity', codemirror)
    // },
    onCmReady(codemirror) {
      // console.log('ready')
      setTimeout(() => {
        codemirror.refresh() // fix some problem with empty link
      }, 250)
      // console.debug('onCmReady', codemirror)
    },
    openFullScreen() {
      // doesn't work in modal because of max-width and height!
      this.codeMirror.setOption('fullScreen', !this.codeMirror.getOption('fullScreen'))
    },
    // onCmFocus(codemirror) {
    //     console.debug('onCmFocus', codemirror)
    // },
    // onCmBlur(codemirror) {
    //     console.debug('onCmBlur', codemirror)
    // }

  },
}
</script>

<template>
  <Codemirror
    ref="cmEditor"
    :value="value"
    :options="cmOptions"
    :placeholder="placeholder"
    :class="{ 'i-codemirror-sm': size == 'sm', 'i-codemirror-lg': size == 'lg' }"
    @input="onInput"
    @ready="onCmReady"
  />
  <!--        <a class="btn" href="#" @click="openFullScreen">Full</a> {{cmOptions}} -->

  <!--    @cursorActivity="onCmCursorActivity" -->
  <!--    @ready="onCmReady" -->
  <!--    @focus="onCmFocus" -->
  <!--    @blur="onCmBlur" -->
</template>

<style>
.i-codemirror-sm .CodeMirror {
    height: 125px;
}

.i-codemirror-lg .CodeMirror {
    height: 425px;
}

.CodeMirror {
    resize: both;
    /*height: auto;*/
    /*max-height: 420px;*/
    /*min-height: 180px;*/
}

.CodeMirror-matchingtag {
    background: rgba(255, 150, 0, .2) !important;
}

.CodeMirror-code {
    /*display: block;*/
    /*padding: 1rem;*/
    /*line-height: 1.6;*/
    /*word-break: break-all;*/
    /*word-wrap: break-word;*/
    font-size: 1.1em;
}

.CodeMirror-placeholder {
    opacity: .6;
}

/*//.codemirror,*/
/*//.pre {*/
/*//    width: 50%;*/
/*//    height: 100%;*/
/*//    margin: 0;*/
/*//    overflow: auto;*/
/*//}*/

/*//.pre {*/
/*//    display: block;*/
/*//    padding: 1rem;*/
/*//    line-height: 1.6;*/
/*//    word-break: break-all;*/
/*//    word-wrap: break-word;*/
/*//}*/
/*//}*/
</style>

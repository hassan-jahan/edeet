<script>
// import {BootstrapVue} from 'bootstrap-vue'

// CSS here will be global unless it was scopeed it is better to add them to layouts and use build split chunk layouts true in nuxt to extractCSS for each layout differently
// import '@/assets/css/vendors.scss'
// import '@/assets/css/app.scss'

// Bring all nuxt/component plugins backend js here maybe with another no-ssr plugin js, say no-ssr tag. it is ok to defind it self globally as we splitchunk by layouts (and pages)

export default {
  data() {
    return {}
  },

  beforeCreate() {
    // Vue.use(BootstrapVue, {
    //     bootstrapCSS: false, // Or `css: false`
    //     bootstrapVueCSS: false, // Or `bvCSS: false`
    //     icons: false, //doesn't work})
    // })
  },
  mounted() {
    // make modals draggable
    this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {
      dragElement(document.getElementById(`${modalId}___BV_modal_content_`))
    })
  },
}

function dragElement(el) {
  let pos1 = 0; let pos2 = 0; let pos3 = 0; let pos4 = 0
  if (!el || !el.classList.contains('modal-draggable'))
    return

  const header = el.getElementsByClassName('modal-header')

  if (header.length) {
    // if present, the header is where you move the DIV from:
    header[0].onmousedown = dragMouseDown
  }
  else {
    // otherwise, move the DIV from anywhere inside the DIV:
    el.onmousedown = dragMouseDown
  }

  function dragMouseDown(e) {
    e = e || window.event
    e.preventDefault()
    // get the mouse cursor position at startup:
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  function elementDrag(e) {
    e = e || window.event
    e.preventDefault()
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    el.style.top = `${el.offsetTop - pos2}px`
    el.style.left = `${el.offsetLeft - pos1}px`
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null
    document.onmousemove = null
  }
}
</script>

<template>
  <div>
    <login-modal />
    <deposit-modal />
    <!--        <withdraw-modal></withdraw-modal> -->
    <pay-order-modals />
  </div>
</template>

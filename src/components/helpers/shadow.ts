import Vue from 'vue'

function makeShadow(el: Element, styles) {
  makeAbstractShadow(el, el.childNodes, styles)
}
function makeAbstractShadow(rootEl: Element, childNodes: NodeList, styles: any) {
  const fragment = document.createDocumentFragment()
  for (const node of childNodes)
    fragment.appendChild(node)

  const shadowroot = rootEl.attachShadow({ mode: 'open' })
  try {
    shadowroot.adoptedStyleSheets = styles
  }
  catch (e) {
    console.error(e)
    // emit('error', e)
  }
  shadowroot.appendChild(fragment)
}

function data() {
  return {
    pabstract: false,
    pstatic: false,
  }
}

const ShadowRoot = Vue.extend({
  props: {
    abstract: {
      type: Boolean,
      default: false,
    },
    static: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'div',
    },
    slotTag: {
      type: String,
      default: 'div',
    },
    slotClass: {
      type: String,
    },
    slotId: {
      type: String,
    },
    adoptedStyles: {},
  },
  data,
  beforeMount() {
    this.pabstract = this.abstract
    this.pstatic = this.static
  },
  mounted() {
    try {
      if (this.pabstract)
        makeAbstractShadow(this.$el.parentElement!, this.$el.childNodes, this.adoptedStyles)
      else
        makeShadow(this.$el, this.adoptedStyles)
    }
    catch (e) {
      console.error(e)
      this.$emit('error', e)
    }
  },
  render(h) {
    return h(this.tag, {}, [
      this.pstatic
        ? this.$slots.default
        : h(this.slotTag, { attrs: { id: this.slotId }, class: this.slotClass }, [
          this.$slots.default,
        ]),
    ])
  },
})

function install(vue: typeof Vue) {
  vue.component('ShadowRoot', ShadowRoot)

  vue.directive('shadow', {
    bind(el: HTMLElement, binding) {
      try {
        makeShadow(el)
      }
      catch (e) {
        console.error(e)
        if (binding && typeof binding.value == 'function') {
          try {
            binding.value(e)
          }
          catch (e2) {
            console.error(e2)
          }
        }
      }
    },
  })
}
if (typeof window != null && (window as any).Vue)
  install((window as any).Vue)

export { ShadowRoot, ShadowRoot as shadow_root, install }
export default { ShadowRoot, shadow_root: ShadowRoot, install }

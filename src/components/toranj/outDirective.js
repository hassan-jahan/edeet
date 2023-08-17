export default {
  bind(el, binding, vNode) {
    const handler = (e) => {
      // !el.contains(e.target) && el !== e.target &&
      // console.log('el.contains(e.target)')

      const tagName = (e.target.tagName) ? e.target.tagName.toLowerCase() : ''
      const parentTagName = (e.target.parentElement && e.target.parentElement.tagName) ? e.target.parentElement.tagName.toLowerCase() : ''

      // let parentOfParent =  e.target.parentElement.parentElement
      // console.log('parentOfParent',parentOfParent)

      // todo: performance
      const hasSepidEditorInAncesor = Boolean(e.target.closest('.se-wrapper'))
      const hasExceptionInAncesor = Boolean(e.target.closest('.click-away-exception'))
      const hasActionInAncesor = Boolean(e.target.closest('a, button'))
      const notItself = !el.contains(e.target) && el !== e.target

      // console.log('hasSepidEditorInAncesor',hasSepidEditorInAncesor)

      // if (!el.contains(e.target) && el !== e.target && !['a', 'button', 'svg',].includes(tagName) && !['a', 'button', 'svg',].includes(parentTagName) && !e.target.classList.contains('click-away-exception') && !e.target.parentElement.classList.contains('click-away-exception')) {
      if (notItself && !hasExceptionInAncesor && (!hasActionInAncesor || (hasActionInAncesor && hasSepidEditorInAncesor))) {
        // and here is you toggle var. thats it

        // var vm = vnode.context;
        // var callback = binding.value;

        // hassan NOTE: Hanadler SHOULD BE FUNCTION NOT EXPRESSITON
        if (binding.value)
          return binding.value.call(vNode.context, e)

        // vNode.context[binding.expression] = false
      }
    }
    // el.onClickaway = handler
    document.addEventListener('click', handler)
    // document.addEventListener('clickAwayTrigger', handler)
  },

  unbind(el, binding) {
    document.removeEventListener('click', el.out)
    // document.removeEventListener('clickAwayTrigger', el.out)
    // el.out = null
  },
}

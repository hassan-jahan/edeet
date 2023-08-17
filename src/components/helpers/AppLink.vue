<script>
export default {
  props: {
    to: {
      type: String,
      // required: true,
    },
    target: {
      type: String,
      default: '_blank',
    },
    rel: {
      type: String,
      default: 'noopener',
    },
    click: {
      type: String,
      default: 'media-link',
    },

  },
  created() {
    // console.log('created appli')
  },
  methods: {
    linkProps(url) {
      // todo: is same host? without breaking ssr
      if (!this.$router || (url && url.match(/^(http(s)?|ftp):\/\//))) {
        return {
          is: 'a',
          href: url,
          target: this.target,
          rel: this.rel,
        }
      }

      return {
        is: 'router-link',
        to: url || '#',
      }
    },

    clickEvent(e) {
      if (this.click == 'media-popup' || this.isMediaLink(this.to)) {
        e.preventDefault()
        this.$silentbox.open({
          src: this.to,
          // description: 'Quick Demo',
          // autoplay: true,
          // controls: true,
        })
      }
    },
    isMediaLink(url) {
      const supportedServices = [
        '.mp4', '.ogg', '.webm', '.mov', '.flv', '.wmv', '.mkv', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp',
      ]

      const isFile = supportedServices.some((service) => {
        return url.endsWith(service)
      })

      const supportedEmbed = [
        '.youtube.com/', '/youtube.com/', '.vimeo.com/', '/vimeo.com/', '/youtu.be/', '.youtu.be/',
      ]

      const isEmbed = supportedEmbed.some((service) => {
        return url.includes(service)
      })

      return isFile || isEmbed
    },
  },
}
</script>

<template>
  <component v-bind="linkProps(to)" @click="clickEvent">
    <slot />
  </component>
</template>

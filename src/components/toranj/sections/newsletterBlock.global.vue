<script>
// import blockMixin from '../toranj/blockMixin'

export default {
  // mixins: [blockMixin],
  props: ['block', 'parent', 'index', 'options', 'scope'], // parent can be an array or object with children same as action menus

  data() {
    return {
      settingsForm: {
        component: 'form',
        children: [
          // {
          //     'slug': 'transparent',
          //     'label': 'Transparent',
          //     'component': 'checkbox',
          //     // 'required': true,
          //     'description': 'Transparent',
          // },
          {
            slug: 'successMessage',
            label: 'Success Message',
            component: 'input-text',
            required: false,
            description: 'e.g. Thank you for your message!',
          },

          {
            slug: 'submitBtnText',
            label: 'Subscribe Label',
            component: 'input-text',
            // 'required': true,

            description: 'Subscribe',
          },

          {
            slug: 'redirect',
            label: 'Redirect Url',
            component: 'input-text',
            required: false,
            description: 'Redirect user to another URL after a successful submit, Can be empty',
          },
          {
            slug: 'bgImg',
            label: 'Background Image',
            component: 'upload',
            // 'required': true,

            description: '',
          },
          {
            slug: 'bg',
            label: 'Background Color',
            component: 'color',
            gradient: true,
            transparent: true,
            preset: 'basic',
            options: [
              '#A463BF',
              'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
              'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))',
              'linear-gradient( 90.6deg,  rgba(59,158,255,1) -1.2%, rgba(246,135,255,1) 91.6% )',
            ],
            // 'required': true,
            description: '',
          },

          {
            slug: 'color',
            label: 'Text Color',
            component: 'color',
            preset: 'basic', // none| material| dark| light| text or array of custom colors
            // 'required': true,
            options: ['#fff', '#666', '#333'],

            description: '',
          },

          {
            slug: 'hasCustomCss',
            label: 'Custom CSS',
            component: 'checkbox',
            required: false,
            default: false,
            description: '',
            // "switch": true,
          },
          {
            slug: 'customCss',
            label: 'Custom CSS',
            // 'component': 'textarea',
            component: 'code-field',
            placeholder: `#${this.block.id} {\ncolor: red;\n}`, // with nim fasele

            required: false,
            // 'maxLength': '',
            description: 'Use !important to override',
            showIf: { slug: 'hasCustomCss', op: 'neq', value: false },

          },
        ],
      },

    }
  },

  created() {

  },
  methods: {

  },
}
</script>

<template>
  <section-wrapper
    class="dsht" :block="block" :parent="parent" :index="index" :options="options"
    right-slot-pos="" left-slot-pos=""
    :hide-features="[]"
    :settings-form="settingsForm"
  >
    <section class="jumbotron jumbotr2on-fluid m-0 text-center bg-transparent" style="">
      <div class="container">
        <editable name="title" :block="block" :options="options">
          <h2 class="">
            Subscribe Our Newsletter
          </h2>
        </editable>

        <editable name="lead" :block="block" :options="options">
          <p class="m-2 p-1">
            This is a short description.
          </p>
        </editable>

        <!--                https://gmail.us1.list-manage.com/subscribe/post?u=3346f9a1f4580cfa78c28269d&amp;id=545c5308a0 -->
        <form id="mc-embedded-subscribe-form" :action="block.action" method="post" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
          <div id="mc_embed_signup_scroll">
            <div class="mc-field-group form-group mx-auto d-flex" style="max-width:400px;">
              <!-- 	<label for="mce-EMAIL">Email Address </label> -->
              <input id="mce-EMAIL" type="email" value="" name="EMAIL" placeholder="sample@email.com" class="required email form-control">
              <input id="mc-embedded-subscribe" type="submit" :value="block.submitBtnText || 'Subscribe'" name="subscribe" class="button btn btn-danger btn-lg">
            </div>
            <div id="mce-responses" class="clear">
              <div id="mce-error-response" class="response" style="display:none" />
              <div id="mce-success-response" class="response" style="display:none" />
            </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups -->
            <div style="position: absolute; left: -5000px;" aria-hidden="true">
              <input type="text" name="b_3346f9a1f4580cfa78c28269d_545c5308a0" tabindex="-1" value="">
            </div>
          </div>
        </form>
      </div>
    </section>
  </section-wrapper>
</template>

<style>

</style>

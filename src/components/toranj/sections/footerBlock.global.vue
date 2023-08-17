<script>
// import blockMixin from '../toranj/blockMixin'

export default {
  // mixins: [blockMixin],
  props: ['block', 'parent', 'index', 'options', 'scope'], // parent can be an array or object with children same as action menus

  data() {
    return {
      // style: {
      //     'color': this.block.color,
      //     'background': this.block.bg,
      //     '--footerLinkColor': this.block.linkColor || '#ddd' ,
      // },
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
            slug: 'mini',
            label: 'Mini Footer',
            component: 'checkbox',
            required: false,
            default: false,
            description: 'Only copyright line',
            // "switch": true,
          },

          {
            slug: 'bg',
            label: 'Background Color',
            component: 'color',
            gradient: true,
            transparent: true,
            preset: 'basic',
            options: ['#fff', '#ccc', '#555', 'linear-gradient(to right, #603813, #b29f94)'],
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
            slug: 'linkColor',
            label: 'Link Color',
            component: 'color',
            preset: 'basic', // none| material| dark| light| text or array of custom colors
            // 'required': true,
            // 'options': ['#fff', '#666', '#333'],

            description: '',
          },
        ],
      },

    }
  },

  created() {

  },
  methods: {},
}
</script>

<template>
  <section-wrapper
    class="dsht" :block="block" :parent="parent" :index="index" :options="options"
    right-slot-pos="" left-slot-pos=""
    :hide-features="['up']"
    :settings-form="settingsForm"
  >
    <footer
      class="bg-gray pt-5 pb-3 main-footer big"
      :style="`--footerLinkColor: ${block.linkColor}`"
    >
      <div class="container">
        <div v-if="!block.mini" class="row">
          <div class="col-lg-3">
            <editable name="title" :block="block" :options="options">
              <h3>Site Name</h3>
            </editable>

            <!--                        <editable name="logo" :block="block" :options="options"> -->
            <!--                            <a href="/" class="navbar-brand0870"> -->
            <!--                                <img src="@/assets/img/dasht-logo-full-3.svg" alt="" height="62" class=""/> -->
            <!--                            </a> -->
            <!--                        </editable> -->

            <editable name="lead" :block="block" :options="options">
              <p>Something to describe</p>
            </editable>

            <div class="d-flex mt-2">
              <!--                            h2 in internal class disable size change for svg -->
              <editable class="h4" name="icon-1" :block="block" :options="options">
                <span class="iconify" data-icon="whh:twitter" data-inline="false" />
              </editable>

              <editable class="h4 mx-2" name="icon-2" :block="block" :options="options">
                <span class="iconify " data-icon="whh:instagram" data-inline="false" />
              </editable>

              <editable class="h4 mx-2" name="icon-3" :block="block" :options="options">
                <span class="iconify " data-icon="whh:facebook" data-inline="false" />
              </editable>

              <editable class="h4 mx-2" name="icon-4" :block="block" :options="options">
                <span class="iconify " data-icon="whh:linkedin" data-inline="false" />
              </editable>

              <!--                            <editable class="h4 mx-2" name="icon-5" :block="block" :options="options" > -->
              <!--                                <span class="iconify " data-icon="whh:youtube" data-inline="false"></span> -->
              <!--                            </editable> -->
            </div>
          </div>
          <div class="col-lg-8">
            <div class="row">
              <div class="col-6 col-md-3">
                <editable name="title-1" :block="block" :options="options">
                  <h5>About</h5>
                </editable>

                <editable
                  name="list-01"
                  :block="block"
                  :options="options"
                  :repeat-default="3"
                  class="list-unstyled mt-1 "
                  tag-name="ul"
                >
                  <li>
                    <a href="#">Link</a>
                  </li>
                </editable>

                <!--                                <editable name="list-1" :block="block" :options="options"> -->

                <!--                                    <ul class="list-unstyled mt-1"> -->
                <!--                                        <li><a href="" title="">Team</a></li> -->
                <!--                                        <li><a href="" title="">News</a></li> -->
                <!--                                        <li><a href="" title="">Features</a></li> -->
                <!--                                    </ul> -->
                <!--                                </editable> -->
              </div>
              <div class="col-6 col-md-3">
                <editable name="title-2" :block="block" :options="options">
                  <h5>Work</h5>
                </editable>

                <editable
                  name="list-02"
                  :block="block"
                  :options="options"
                  :repeat-default="3"
                  class="list-unstyled mt-1 "
                  tag-name="ul"
                >
                  <li>
                    <a href="#">Link</a>
                  </li>
                </editable>
              </div>

              <div class="col-6 col-md-3">
                <editable name="title-3" :block="block" :options="options">
                  <h5>Members</h5>
                </editable>

                <editable
                  name="list-03"
                  :block="block"
                  :options="options"
                  :repeat-default="3"
                  class="list-unstyled mt-1 "
                  tag-name="ul"
                >
                  <li>
                    <a href="#">Link</a>
                  </li>
                </editable>
                <!--                                <editable name="list-3" :block="block" :options="options"> -->

                <!--                                    <ul class="list-unstyled mt-1"> -->
                <!--                                        <li><a href="" title="">Privacy</a></li> -->
                <!--                                        <li><a href="" title="">Terms</a></li> -->
                <!--                                        <li><a href="" title="">Support</a></li> -->
                <!--                                    </ul> -->
                <!--                                </editable> -->
              </div>

              <div class="col-6 col-md-3">
                <editable name="title-4" :block="block" :options="options">
                  <h5>Social</h5>
                </editable>

                <editable
                  name="list-04"
                  :block="block"
                  :options="options"
                  :repeat-default="3"
                  class="list-unstyled mt-1 "
                  tag-name="ul"
                >
                  <li>
                    <a href="#">Link</a>
                  </li>
                </editable>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col text-center mt-4">
            <editable name="copy" :block="block" :options="options">
              <p class="text-muted">
                © 2021 Dasht Inc. All Rights Reserved.
              </p>
            </editable>
          </div>
        </div>
      </div>
    </footer>
  </section-wrapper>
</template>

<style>
.main-footer {
}

.main-footer a {
    /*color: #005dff;*/
    color: var(--footerLinkColor);
}

.main-footer ul li {
    /*vertical-align: middle;*/
    /*margin-right: 7px;*/
}

.main-footer .list li a {
    /*color: #141414;*/
}

/*@media (max-width: 767.98px) {*/
/*    .main-footer .title-footer {*/
/*        margin: 15px 0;*/
/*    }*/
/*}*/
</style>

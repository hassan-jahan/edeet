<script>
// import blockMixin from '../toranj/blockMixin'

export default {
  // mixins: [blockMixin],
  props: ['block', 'parent', 'index', 'options', 'scope'], // parent can be an array or object with children same as action menus

  data() {
    return {
      style: {
        'color': this.block.color,
        'background': this.block.bg,
        '--menuLinkColor': this.block.linkColor || '#fff',
        '--menuHoverColor': this.block.hoverColor || '#999',
      },
      settingsForm: {
        component: 'form',
        children: [
          {
            slug: 'linkColor',
            label: 'Link Color',
            component: 'color',
            preset: 'basic', // none| material| dark| light| text or array of custom colors
            // 'required': true,
            // 'options': ['#fff', '#666', '#333'],

            description: '',
          },
          {
            slug: 'bg',
            label: 'Background Color',
            component: 'color',
            gradient: true,
            transparent: true,
            preset: 'basic',
            options: ['#fff', '#1c5cc6', '#ff88cc', 'linear-gradient( 143.3deg,  rgba(216,27,96,1) 33.1%, rgba(237,107,154,1) 74.9% )', 'linear-gradient( 90deg,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% );',
            ],
            // 'required': true,
            description: '',
          },

          {
            slug: 'hoverColor',
            label: 'Hover Color',
            component: 'color',
            preset: 'basic', // none| material| dark| light| text or array of custom colors
            // 'required': true,
            options: ['#fff', '#2450ee', '#ff9900'],

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

        ],
      },

    }
  },

  created() {

  },
  methods: {
    buildMobileMenu() {

    },
  },
}
</script>

<template>
  <section-wrapper
    class="dsht" :block="block" :parent="parent" :index="index" :options="options"
    right-slot-pos="" left-slot-pos=""
    :hide-features="['up', 'down', 'move']"
    :settings-form="settingsForm"
  >
    <nav
      class="navbar navrbar-block navbar-expand-lg " :class="[{ transparent: block.transparent }]"
      :style="`min-height: 60px;background: ${block.bg}; color: ${block.color};--menuLinkColor: ${block.linkColor};--menuHoverColor: ${block.hoverColor}`"
    >
      <div class="container">
        <editable
          name="img"
          :block="block"
          :options="options"
        >
          <a href="/" class="navbar-brand">
            <!--                        no problem with no but two between cause problem -->
            <img
              src="@/assets/img/dasht-logo.png" alt="" height="54"
              class="navbar-brand-img hover-zoom"
            >
          </a>
          <!--                    <a class="navbar-brand00" href="/"> -->
          <!--                        <img src="@/assets/img/dasht-logo-full-3.svg" height="62" class="navbar-brand-img" alt=""> -->
          <!--                    </a> -->
        </editable>

        <div v-b-toggle.main_sidebar="" class="d-lg-none ml-auto cursor-hand hover-zoom">
          <span class="iconify h2" data-icon="gg:menu-right" data-inline="true" />
        </div>

        <!--                <editable -->
        <!--                    name="menu" -->
        <!--                    :block="block" -->
        <!--                    :options="options" -->
        <!--                    :repeat-default="4" -->
        <!--                    item-classes="nav-item" -->
        <!--                    tag-name="ul" -->
        <!--                    :class="`navbar-nav ml-auto d-lg-flex d-none`"> -->
        <!--                    &lt;!&ndash;            todo: drop down will be disabled if you move an item inside this row outside of this row maye drop down group for horizental and non-horizental -->
        <!--                    mx-1 py-1 may not work with moved item? -->
        <!--                    &ndash;&gt; -->
        <!--                    &lt;!&ndash;            enter a component as default on add button&ndash;&gt; -->
        <!--                    <a class="nav-link" href="#">Link1</a> -->

        <!--                </editable> -->

        <editable
          name="menu1"
          :block="block"
          :options="options"
          :repeat-default="4"
          class="navbar-nav ml-auto d-lg-flex d-none "
          tag-name="ul"
        >
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </editable>

        <!--                <ul class="navbar-nav ml-auto d-lg-flex d-none "> -->
        <!--                    &lt;!&ndash;                    <li class="nav-item active">&ndash;&gt; -->
        <!--                    &lt;!&ndash;                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>&ndash;&gt; -->
        <!--                    &lt;!&ndash;                    </li>&ndash;&gt; -->

        <!--                    <li class="nav-item"> -->
        <!--                        <editable -->
        <!--                            name="menu-1" -->
        <!--                            :block="block" -->
        <!--                            :options="options"> -->
        <!--                            <a class="nav-link" href="#">Link00</a> -->
        <!--                        </editable> -->
        <!--                    </li> -->
        <!--                    <li class="nav-item"> -->
        <!--                        <editable -->
        <!--                            name="menu-2" -->
        <!--                            :block="block" -->
        <!--                            :options="options"> -->
        <!--                            <a class="nav-link" href="#">Link</a> -->
        <!--                        </editable> -->
        <!--                    </li> -->
        <!--                    <li class="nav-item"> -->
        <!--                        <editable -->
        <!--                            name="menu-3" -->
        <!--                            :block="block" -->
        <!--                            :options="options"> -->
        <!--                            <a class="nav-link" href="#">Link</a> -->
        <!--                        </editable> -->
        <!--                    </li> -->
        <!--                    <li class="nav-item"> -->
        <!--                        <editable -->
        <!--                            name="menu-4" -->
        <!--                            :block="block" -->
        <!--                            :options="options"> -->
        <!--                            <a class="nav-link" href="#">Link</a> -->
        <!--                        </editable> -->
        <!--                    </li> -->

        <!--                    <li class="nav-item"> -->
        <!--                        <editable -->
        <!--                            name="menu-5" -->
        <!--                            :block="block" -->
        <!--                            :options="options"> -->
        <!--                            <a class="nav-link" href="#">Link</a> -->
        <!--                        </editable> -->
        <!--                    </li> -->
        <!--                    &lt;!&ndash;                    <li class="nav-item dropdown">&ndash;&gt; -->
        <!--                    &lt;!&ndash;                        <a class="nav-link dropdown-toggle" href="#" id="dropdown03" data-toggle="dropdown"&ndash;&gt; -->
        <!--                    &lt;!&ndash;                           aria-haspopup="true" aria-expanded="false">Dropdown</a>&ndash;&gt; -->
        <!--                    &lt;!&ndash;                        <div class="dropdown-menu" aria-labelledby="dropdown03">&ndash;&gt; -->
        <!--                    &lt;!&ndash;                            <a class="dropdown-item" href="#">Action</a>&ndash;&gt; -->
        <!--                    &lt;!&ndash;                            <a class="dropdown-item" href="#">Another action</a>&ndash;&gt; -->
        <!--                    &lt;!&ndash;                            <a class="dropdown-item" href="#">Something else here</a>&ndash;&gt; -->
        <!--                    &lt;!&ndash;                        </div>&ndash;&gt; -->
        <!--                    &lt;!&ndash;                    </li>&ndash;&gt; -->
        <!--                </ul> -->
      </div>
    </nav>

    <b-sidebar id="main_sidebar" title="" lazy shadow backdrop left width="280px">
      <div
        class="px-3 py-2"
        :style="`background: ${block.bg}; color: ${block.color};--menuLinkColor: ${block.linkColor};--menuHoverColor: ${block.hoverColor}`"
      >
        <editable
          name="menu1"
          :block="block"
          :options="options"
          :repeat-default="4"
          item-classes="nav-item"
          tag-name="ul"

          class="navbar flex-column"
        >
          <!--            todo: drop down will be disabled if you move an item inside this row outside of this row maye drop down group for horizental and non-horizental
                    mx-1 py-1 may not work with moved item?
                    -->
          <!--            enter a component as default on add button -->
          <a class="nav-link" href="#">Link</a>
        </editable>
        <!--                same as menu but with flex-column -->
      </div>
    </b-sidebar>

    <!--        <img-editable name="ltest" :block="block" :options="options" -->
    <!--                      src="https://www.whatruns.com/images/home/WhatRuns-logo.svg" alt="Whatruns logo" class="logo" -->
    <!--        /> -->

    <b-navbar fi2xed="top" toggleable="lg" type="">
      <!--            <b-nav-toggle target="sidebar-1"></b-nav-toggle> -->
      <!--            <b-nav-toggle target="nav_collapse"></b-nav-toggle> -->

      <!-- <button class="" type="button" @click="showSidePanel= true"> <span class="navbar-toggler-icon"></span>Open</button> -->
      <!-- b-navbar-brand -->
      <!--            -->
    </b-navbar>

    <!--        <section class="py-5 py-lg-5 mb-6 mb-lg-7 bg-white"> -->
    <!--            <div class="container"> -->

    <!--                <editable -->
    <!--                    name="navv" -->
    <!--                    :block="block" -->
    <!--                    :options="options"> -->

    <!--                    <ul class="nav justify-content-center"> -->
    <!--                        <li class="nav-item"> -->
    <!--                            <a class="nav-link active" href="#">Active</a> -->
    <!--                        </li> -->
    <!--                        <li class="nav-item"> -->
    <!--                            <a class="nav-link" href="#">Link</a> -->
    <!--                        </li> -->
    <!--                        <li class="nav-item"> -->
    <!--                            <a class="nav-link" href="#">Link</a> -->
    <!--                        </li> -->
    <!--                        <li class="nav-item"> -->
    <!--                            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> -->
    <!--                        </li> -->
    <!--                    </ul> -->
    <!--                </editable> -->

    <!--            </div> -->
    <!--        </section> -->
  </section-wrapper>
</template>

<style>
.navbar .nav-link {
    /*color: #005dff;*/
    color: var(--menuLinkColor);
    transition: all 0.3s ease;
}

.navbar .nav-link:hover {
    color: var(--menuHoverColor);
    /*border-bottom: 2px solid var(--menuHoverColor);*/
    box-shadow: inset 0 -2px 0 var(--menuHoverColor);
}

.navbar.navrbar-block {
    box-shadow: none;
}
</style>

<script>
export default {
  components: {},
  props: {
    smOpened: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // smOpened: false
    }
  },
  methods: {},
}
</script>

<template>
  <div>
    <section class="sm-container position-relative">
      <aside
        class="sm-aside position-fixed d-block d-md-none"
        :class="{ opened: smOpened }"
      >
        <a
          href="#"
          @click.prevent="smOpened = !smOpened"
        >
          <div
            class="sm-hamburger position-absolute"
            :class="{ opened: smOpened }"
          >
            <div class="sm-hamburger-bar top-bar" />
            <div class="sm-hamburger-bar middle-bar" />
            <div class="sm-hamburger-bar bottom-bar" />
          </div>
        </a>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
            >Link 1</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
            >Link 2</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
            >Link 3</a>
          </li>
        </ul>
      </aside>
      <div
        class="sm-wrapper"
        :class="{ opened: smOpened }"
      >
        <!-- Your content would place here -->
      </div>
    </section>
  </div>
</template>

<style scoped>
    .sm-aside {
        top: 0;
        left: -250px;
        width: 250px;
        height: 100vh;
        transition: left 0.3s ease-in-out;
        box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
        background: #333;
    }

    .sm-aside.opened {
        left: 0;
    }

    .sm-aside .navbar-nav .nav-item .nav-link {
        padding: 5px 10px;
        font-size: 1.1em;
        color: #eee;
        transition: all 0.2s ease-in-out;
    }

    .sm-aside .navbar-nav .nav-item .nav-link:hover {
        background: #eee;
        color: #333;
    }

    .sm-aside .sm-hamburger {
        top: 10px;
        right: -45px;
        width: 30px;
        height: auto;
        overflow: hidden;
    }

    .sm-hamburger-bar {
        display: block;
        width: 30px;
        height: 4px;
        border-radius: 4px;
        background: #333;
        margin: 5px auto;
        transition: all 0.3s ease-in-out;
    }

    .sm-hamburger.opened .sm-hamburger-bar.top-bar {
        -webkit-transform: translateY(8px) rotateZ(45deg);
        -moz-transform: translateY(8px) rotateZ(45deg);
        -ms-transform: translateY(8px) rotateZ(45deg);
        -o-transform: translateY(8px) rotateZ(45deg);
        transform: translateY(8px) rotateZ(45deg);
    }

    .sm-hamburger.opened .sm-hamburger-bar.middle-bar {
        width: 0;
    }

    .sm-hamburger.opened .sm-hamburger-bar.bottom-bar {
        -webkit-transform: translateY(-10px) rotateZ(-45deg);
        -moz-transform: translateY(-10px) rotateZ(-45deg);
        -ms-transform: translateY(-10px) rotateZ(-45deg);
        -o-transform: translateY(-10px) rotateZ(-45deg);
        transform: translateY(-10px) rotateZ(-45deg);
    }

    .sm-wrapper {
        float: right;
        width: 100%;
        min-height: 100vh;
        transition: width 0.3s ease-in-out;
    }

    .sm-wrapper.opened {
        width: calc(100% - 250px);
    }
</style>

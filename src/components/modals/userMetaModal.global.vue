<script>
export default {
  // components:{DrawerLayout},
  props: ['app', 'user', 'modalId'],
  data() {
    return {
      roleInput: [
        {
          component: 'input-text',
          label: 'Role Number',
          slug: 'appRole',
          type: 'number',
        },
      ],
    }
  },

  created() {
    if (this.user && !this.user.userMeta)
      this.user.userMeta = {}
  },

  methods: {

    userMetaUpdate() {
      if (!this.$refs[`${this.modalId}-user-meta-form`].checkValidity()) {
        this.$refs[`${this.modalId}-user-meta-form`].reportValidity()
        return
      }

      // todo: todorole?
      this.$axios.post(`apps/${this.app.id}/users/${this.user.id}`, {
        userMeta: this.user.userMeta,
        role: this.user.appRole,
      }).then(
        (res) => {
          this.$toast('User updated successfully!', 'success')
          // this.userSelector.userId = ''

          // this.$root.$emit('bv::table::refresh', 'users-datatable')
          this.$root.$emit('bv::hide::modal', this.modalId)
        }).catch((error) => {

      })
    },

  },
}
</script>

<template>
  <b-modal
    :id="modalId" title="" :hide-header="false" size="sm" class="" hide-backdrop lazy modal-class="dsht"
    scrollable content-class="modal-draggable"
  >
    <!-- <p class="text-center">Get a chance to win a small gift card with a helpful feedback!</p> -->
    <h5 class="mt-2">
      User Settings
    </h5>

    <form :ref="`${modalId}-user-meta-form` " class="mt-2" @submit.prevent="userMetaUpdate">
      <formFields
        :model="user" :block="{ id: modalId, children: roleInput }"
        :parent="[]"
        :index="0"
        :options="{ edit: false }"
      />

      <formFields
        :model="user.userMeta" :block="{ id: `${modalId}-2`, children: app.userFields }"
        :parent="[]"
        :index="0"
        :options="{ edit: false }"
      />
    </form>

    <div slot="modal-footer">
      <b-button
        variant="secondary" class="mx-1" type="button"
        @click="$root.$emit('bv::hide::modal', modalId)"
      >
        <span class="icon-left-1" />
        Cancel
      </b-button>

      <b-button variant="primary" class="" type="submit" @click.prevent="userMetaUpdate">
        <span class="icon-ok " />
        Update
      </b-button>
    </div>
  </b-modal>
</template>

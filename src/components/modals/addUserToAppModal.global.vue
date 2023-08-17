<script>
export default {
  // components:{DrawerLayout},
  props: ['users'],
  data() {
    return {
      usersForm: {
        component: 'form',
        children: [
          {
            slug: 'userId',
            label: 'Choose From Current Users',
            placeholder: 'Search Name or Email',
            component: 'user-select',
            required: false,
            defined: false,
            multiple: false,
            taggable: false, // add email new user!
            getOnlyIds: true,
            // 'values': [{id: 1, nickname:'Aram'}, {id: 2, nickname:'Hassan'}, {id: 3, nickname:'Kenneth'}], //still buggy for objects
            // 'values': ['tasm','olii'], //not for array! use simple select iinstead
            description: '',
          },

          {
            slug: 'html-or',
            html: '<div class="text-center m-1 big text-muted"> - OR -</div>',
            component: 'html-field',
            description: '',
            label: '',
          },
          {
            slug: 'invite',
            label: 'Invite New Users',
            placeholder: 'Enter Email',
            component: 'input-text',
            required: false,
            // 'maxLength': 150,
            type: 'email',
            description: '',
            // 'showIf': {'slug': 'settings.noIndex', 'value': false},

          },
          {
            slug: 'role',
            component: 'select',
            label: 'Choose Role',
            // 'buttons': true,
            // stacked: true,
            variant: 'outline-dark',
            size: 'sm',
            default: 90,
            values: [{ text: 'Admin', value: 90 }, { text: 'Editor', value: 50 }, { text: 'Subscriber', value: 25 }],
            description: '',
          },
        ],
      },
      userSelector: {},

    }
  },

  methods: {

    addUserOrInvite() {
      console.log('this.userSelector', this.userSelector)

      if (!this.$refs.addUserOrInviteForm.checkValidity()) {
        this.$refs.addUserOrInviteForm.reportValidity()
        return
      }

      if (this.userSelector && this.userSelector.userId) {
        this.$axios.post(`apps/${this.$currentApp.id}/users/`, { userId: this.userSelector.userId, role: this.userSelector.role }).then(
          (res) => {
            this.$toast('User was added successfully!', 'success')
            // this.userSelector.userId = ''
            this.$set(this.userSelector, 'userId', '')

            if (Array.isArray(this.users))
              this.users.push(res.data)

            // this.$root.$emit('bv::table::refresh', 'users-datatable')
            this.$root.$emit('bv::hide::modal', 'add-user-to-app')
          }).catch((error) => {

        })
      }

      if (this.userSelector.invite) {
        this.$axios.post(`apps/${this.$currentApp.id}/invite`, { email: this.userSelector.invite, role: this.userSelector.role }).then(
          (res) => {
            this.$toast('Invitation was sent successfully!', 'success')
            // this.userSelector.userId = ''
            this.$set(this.userSelector, 'invite', '')
            this.$root.$emit('bv::hide::modal', 'add-user-to-app')
          }).catch((error) => {

        })
      }
    },

  },
}
</script>

<template>
  <b-modal id="add-user-to-app" title="" :hide-header="false" size="sm" class="" hide-backdrop lazy modal-class="dsht" content-class="modal-draggable">
    <!-- <p class="text-center">Get a chance to win a small gift card with a helpful feedback!</p> -->
    <h5 class="mt-2">
      Add New User
    </h5>

    <form ref="addUserOrInviteForm" class="mt-2" autocomplete="off" @submit.prevent="addUserOrInvite">
      <formFields
        :model="userSelector" :block="usersForm" :parent="[]"
        :index="0"
        :options="{ edit: false }"
      />
    </form>

    <div slot="modal-footer">
      <b-button
        variant="secondary" class="mx-1" type="button"
        @click="$root.$emit('bv::hide::modal', 'add-user-to-app')"
      >
        <span class="icon-left-1" />
        Cancel
      </b-button>

      <b-button variant="primary" class="" type="submit" @click.prevent="addUserOrInvite">
        <span class="icon-ok " />
        Add or Invite
      </b-button>
    </div>
  </b-modal>
</template>

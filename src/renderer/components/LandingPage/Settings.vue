<template>
  <div>
    <md-field>
      <label>User ID</label>
      <md-input v-model="userId" @change="emitId()"></md-input>
    </md-field>

    <md-field>
      <label>API Token</label>
      <md-input v-model="userToken" @change="emitToken()"></md-input>
    </md-field>
  </div>
</template>
<script>
export default {
  name: 'Settings',
  data() {
    return {
      userId: '',
      userToken: '',
    }
  },
  methods: {
    emitId() {
      this.$store.commit('changeId', this.userId)
    },
    emitToken() {
      this.$store.commit('changeToken', this.userToken)
    }
  }
};
</script>
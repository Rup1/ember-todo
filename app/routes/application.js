import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {
    });
  },
  model() {
    return this.store.findAll('task')
  },
  actions: {  
    signIn: function(provider) {
      this.get('session').open('firebase', {
        provider: provider,
      }).then(function(data) {
        console.log(data.currentUser);
      });
    },

    signOut: function() {
      this.get('session').close();
    },
},
});

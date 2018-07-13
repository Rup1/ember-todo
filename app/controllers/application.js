import Controller from '@ember/controller';

export default Controller.extend({
  showNote: false,
  actions: {
    saveTask(description) {
      if(description.length > 5) {
        this.get('store').createRecord('task', {
          description
        }).save();
        this.set('description', '');
      }else{
        alert("Your task must be at least 5 characters!");
        this.set('description', '');
      }
    },

    saveNote(task, note) {
      console.log(task.id);
      if(note.length > 3) {
        this.get('store').findRecord('task', task.id).then(function(theTask){
          theTask.set('note', note);
          theTask.set('editingNote', false);
          theTask.save();
        })
        this.set('taskNote', '');
      }else{
        alert("Your task must be at least 5 characters!");
        this.set('TaskNote', '');
      }
    },

    
    delete(task) {
      task.deleteRecord();
      task.save();
    },

    toggleTask(task, prop, i){
      task.toggleProperty(prop);
      task.save();
    },

    saveEdit(task) {
      task.set('isEditing', false);
      task.save();
    },

    editTask(task) {
      task.set('isEditing', true)
    },

    editNote(task) {
      task.set('editingNote', true)
    }
  }
});

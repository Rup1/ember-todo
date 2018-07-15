import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
  theDay: '',
  showNote: false,
  taskDone: ['isDone', 'day'],
  allTasks: sort('model','taskDone'),

  actions: {
    saveTask(description) {
      if(this.days.indexOf(this.theDay) !== -1 && description.length > 3) {
        console.log("the description length is: " + description.length);
        this.get('store').createRecord('task', {
          description, day:this.theDay
        }).save();
        this.set('description', '');
      }else{
        alert("Your task must be at least 5 characters!");
        this.set('description', '');
      }
    },

    foo(opt){
      console.log(opt);
      this.set('theDay', opt);
    },

    saveNote(task, note) {
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

    toggleTask(task, prop){  
      task.toggleProperty(prop);
      task.save();
    },

    saveEdit(task) {
      event.stopPropagation();
      task.set('isEditing', false);
      task.save();
    },

    editTask(task) {
      event.stopPropagation();
      task.set('isEditing', true)
    },

    editNote(task) {
      task.set('editingNote', true)
    }
  }
});

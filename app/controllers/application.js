import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    this.taskDone = ['isDone'];
    this.activeDay = this.weekdays[new Date().getDay()]
  },
  showNote: false,

  filteredDay: computed('model', 'activeDay', function(){
    const todos = this.get('model');
    return todos.filter((todo) => {
      return todo.get('day') === this.activeDay;
    });
  }),
  
  sortedTasks: sort('filteredDay','taskDone'),

  actions: {
    saveTask(description) {
      if( description.length > 3) {
        const originalDay = this.activeDay;
        this.get('store').createRecord('task', {
          description, day:this.activeDay
        }).save();
        this.set('description', '');
        this.set('activeDay', '');
        this.set('activeDay', originalDay);
      }else{
        alert("Your task must be at least 5 characters!");
        this.set('description', '');
      }
    },

    setDay(day){
      this.set('activeDay', day);
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

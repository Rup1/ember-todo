import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({
  days: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  theDay: '',
  showNote: false,
  taskDone: ['isDone'],
  whichDay: '',

  filterDay: computed('model', 'whichDay', function(){
    const todos = this.get('model');
    var d = new Date();
    var weekday = this.days;
    var n = weekday[d.getDay()];

    if(this.whichDay === ''){
      console.log(n);
      return todos.filter((todo) => {
        return todo.get('day') === n;
      })
    }

    return todos.filter((todo) => {
      return todo.get('day') === this.whichDay;
    });
  }),
  
  allTasks: sort('filterDay','taskDone'),


  actions: {
    saveTask(description) {
      if(this.days.indexOf(this.theDay) !== -1 && description.length > 3) {
        const originalDay = this.whichDay;
        console.log("the description length is: " + description.length);
        this.get('store').createRecord('task', {
          description, day:this.theDay
        }).save();
        this.set('description', '');
        this.set('whichDay', '');
        this.set('whichDay', originalDay);
      }else{
        alert("Your task must be at least 5 characters!");
        this.set('description', '');
      }
    },

    foo(opt){
      console.log(opt);
      this.set('theDay', opt);
    },

    setDay(day){
      this.set('whichDay', day);
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
      const originalDay = this.whichDay;
      task.deleteRecord();
      task.save();
      this.set('whichDay', 'mon');
      this.set('whichDay', 'wed');
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

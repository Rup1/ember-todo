import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  id(i) {
    return i
  },
  description: faker.lorem.sentences(1, 3),
  isDone:false
});

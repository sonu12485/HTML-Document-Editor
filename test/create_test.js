const assert = require('assert');
const User = require('../src/user');

describe('creating records', () => {
    
    it('saves a record', (done) => {
        const joe = new User({ name: "Joe" });

        joe.save()
            .then( () => {
                assert(!joe.isNew);
                done();
            });
    })
})

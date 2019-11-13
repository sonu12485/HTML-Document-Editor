const assert = require('assert');
const User = require('../src/user');

describe('validation of records', ()=>{

    it('name required', ()=>{
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        
        assert(message === 'Name is required !');
    });

    it('Name must be longer than 2 chars', ()=>{
        const user = new User({ name: 'ab' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        
        assert(message === 'Name must be longer than 2 chars');
    });

    it('disallow save', (done)=>{
        const user = new User({ name: 'ab' });
        user.save()
            .catch( (validationResult)=>{
                const { message } = validationResult.errors.name;
                assert(message === 'Name must be longer than 2 chars');
                done();
            });
    });

});

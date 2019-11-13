const assert = require('assert');
const User = require('../src/user');

describe('updating records', ()=>{
    let joe;

    beforeEach((done)=>{
        joe = new User({ name: 'Joe', stars: 0 });
        joe.save()
            .then(()=>{
                done();
            });
    });

    function assertName(operation, done)
    {
        operation
            .then( () => User.find({}) )
            .then( (users)=>{
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }

    it('model instance set & save', (done)=>{

        joe.set('name','Alex');
        assertName(joe.save(), done);
    }); 

    it('model instance update', (done)=>{

        const operation = joe.update({ name: 'Alex' });
        assertName(operation, done); 

    });

    it('model class update', (done)=>{

        const operation = User.update({ name: 'Joe' },{ name: 'Alex' });
        assertName(operation, done); 

    });

    it('model class findOneAndUpdate', (done)=>{

        const operation = User.findOneAndUpdate({ name: 'Joe' },{ name: 'Alex' });
        assertName(operation, done); 

    }); 

    it('model class findOneAndUpdate', (done)=>{
        
        const operation = User.findByIdAndUpdate(joe._id,{ name: 'Alex' });
        assertName(operation, done); 
        
    }); 

    it('increment post count by 1 for Joe', (done)=>{

        User.update({ name: 'Joe' }, { $inc: { stars: 1 } })
            .then(() => User.findOne({ name: 'Joe' }) )
            .then( (user) =>{
                assert(user.stars === 1);
                done();
            }); 

    });

});
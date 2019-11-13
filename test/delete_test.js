const assert = require("assert");
const User = require("../src/user");

describe("deleting records", ()=>{
    let joe;

    beforeEach((done)=>{
        joe = new User({name:"Joe"});

        joe.save()
            .then( ()=>{
                done();
            })
    });

    it('model instance remove', (done)=>{

        joe.remove()
            .then(() => User.findOne({ name: 'Joe' }) )
            .then( (user)=>{
                assert(user === null);
                done();
            });

    });

    it('class model remove', (done)=>{

        // does multiple removes as per the criteria obj passed
        User.remove({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe' }) )
            .then( (user)=>{
                assert(user === null);
                done();
        });
    });

    it('class model findOneAndRemove', (done)=>{
        
        User.findOneAndRemove({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe' }) )
            .then( (user)=>{
                assert(user === null);
                done();
        });
    });

    it('class model findByIdAndRemove', (done)=>{
        
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({ name: 'Joe' }) )
            .then( (user)=>{
                assert(user === null);
                done();
        });
    });
});
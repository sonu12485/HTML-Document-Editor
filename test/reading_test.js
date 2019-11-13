const assert = require("assert");
const User = require("../src/user");

describe("reading records", ()=>{
    let joe,a,b,c;

    beforeEach((done)=>{
        joe = new User({name:"Joe"});
        a = new User({name:"Aaa"});
        b = new User({name:"Bbb"});
        c = new User({name:"Ccc"});
        
        Promise.all([joe.save(), a.save(), b.save(), c.save()])
            .then( () => done() );

    });

    it("find all records with name Joe", (done)=>{
        
        //find function is present on model(User) and not in it's instance(joe)
        //find() returns a array
        User.find({ name:"Joe" }) 
            .then( (users)=>{
                assert( users[0]._id.toString() === joe._id.toString() );
                // toString() is nessary for comparission
                // users[0]._id & joe._id are object id ...
                // ... hence should be converted to string to compare 
                done();
            });
    });

    it("find record with id", (done)=>{

        //findOne() returns a object
        User.findOne({ _id: joe._id })
            .then( (user)=>{
                assert(user.name === 'Joe');
                done();
            }); 
    });

    it('uses skip and limit to do pagination', (done)=>{

        User.find({})
            .sort({ name: 1 })// sort by name '1'-ascending '-1'-desending
            .skip(1)
            .limit(2)
            .then( (users) => {

                assert( users.length === 2 );
                assert( users[0].name === 'Bbb' );
                assert( users[1].name === 'Ccc' );
                done();

            });

    });

});
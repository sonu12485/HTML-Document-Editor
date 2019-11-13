const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before( (done) => {

    mongoose.connect('mongodb://localhost/user_test');
    
    mongoose.connection
        .once( 'open', () => {
            console.log("mongodb connected");
            done();
        })
        .on( 'error', (error) => console.warn("Error",error) );

});

beforeEach( (done) => {
    const { users, blogposts, comments } = mongoose.connection.collections;

    users.drop( () => {
        blogposts.drop( () => {
            comments.drop( () => {
                done();
            });
        });
    });

});

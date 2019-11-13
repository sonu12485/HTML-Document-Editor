const assert = require('assert');
const User = require('../src/user');

describe('sub-documents', ()=>{

    it("create seb-document", (done)=>{
        
        const joe = new User({ 
            name: "Joe",
            postCount: 1,
            posts: [{ title: 'post-title' }]
        });

        joe.save()
            .then( () => User.findOne({ name: "Joe" }) )
            .then( (user)=>{
                assert( user.posts[0].title === 'post-title' );
                done();
            });

    });

    it('Adding a new post to a existing user', (done)=>{

        const joe = new User({
            name: 'Joe',
            posts: []
        });

        joe.save()
            .then( () => User.findOne({ name: 'Joe' }) )
            .then( (user)=>{
                user.posts.push({ title: 'new post' });
                return user.save()
            })
            .then( () => User.findOne({ name: "Joe" }) )
            .then( (user)=>{
                assert( user.posts[0].title === 'new post' );
                done();
            });

    });

    it("removing a post from a user", (done)=>{

        const joe = new User({
            name: "Joe",
            posts: [{ title: 'new post' }]
        });

        joe.save()
            .then( () => User.findOne({ name: "Joe" }) )
            .then( (user)=>{
                user.posts = [];
                return  user.save();
            })
            .then( () => User.findOne({ name: "Joe" }) )
            .then( (user)=>{
                assert( user.posts.length === 0 );
                done();
            });

    });

});
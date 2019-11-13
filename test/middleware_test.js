const assert = require('assert');

const User = require('../src/user');
const BlogPost = require('../src/blogPosts');

describe('middleware test', ()=>{
    let joe, blogPost;

    beforeEach( (done)=>{

        joe = new User({
            name: 'Joe'
        });
        blogPost = new BlogPost({
            title: 'new post',
            content: 'hello world'
        });

        joe.blogPosts.push(blogPost);

        // Promise.all combines multiple promises into one promise
        Promise.all([joe.save(), blogPost.save() ])
            .then( () => done() );

    });

    it('blogPost cleanup while removing user', (done)=>{

        joe.remove()
            .then( () => BlogPost.count() )
            .then( (count) =>{
                assert( count === 0 );
                done();
            });
        
    });
});
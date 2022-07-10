import * as PostComments from './home_post_comment.js';

{
    //const PostComments = require('./home_post_comment') ;
        
    // Method to submit the form data for new post using AJAX
    let createPost = function () {
        // let get form here from home.ejs
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) { //e --> event
            e.preventDefault();

            // submission through ajax
            $.ajax({
                type: 'post',
                url: '/posts/create', //same as in form action
                data: newPostForm.serialize(), //this converts the post data in JSON (conetent: key, value: form)
                success: function (data) {
                    // console.log(data); 
                    // let's call new post
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost)); //this class inside of the new post

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function (error) {
                    console.log(error.resposeText);
                }
            })
        });
    }

    // Method to create a post in DOM, Need a function which will help us in converting this text of html that copied into html text (obv.. jquery object)
    let newPostDom = function (post) { //passed in post data which receive
        // CHANGE:: show the count of zero likes on this post
        return $(`<li id="post-${post._id}">   
        <p>
            
                <small>
                    
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a> 
                </small>
                ${post.content}
                    <br>
                    <small>
                    ${post.user.name}
                    </small>
                
                    <br>
                    <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 Likes
                                </a>
                            
                    </small>

        </p>
        <div class="post-comments">
            
                <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to add comment...">
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add comment">
                </form>
                
    
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                            
                        </ul>
                    </div>
        </div>
    </li>`)
    }

    // Method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(error){
                    console.log(error.resposeText);
                }
            })
        })

    }
    
    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $('.delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1];
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}

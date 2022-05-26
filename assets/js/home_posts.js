{
    // Method to submit the form data for new post using AJAX
    let createPost = function(){
        // let get form here from home.ejs
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){ //e --> event
            e.preventDefault();

            // submission through ajax
            $.ajax({
                type: 'post',
                url: '/posts/create', //same as in form action
                data: newPostForm.serialize(), //this converts the post data in JSON (conetent: key, value: form)
                success: function(data){
                    // console.log(data); 
                    // let's call new post
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                }, error: function(error){
                    console.log(error.resposeText);
                }
            })
        });
    }

    // Method to create a post in DOM, Need a function which will help us in
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
            
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post.id}">X</a>
                </small>
                <%}%>
                ${ post.content}
                        <br>
                        <small>
                        ${post.user.name }
                        </small>
        </p>
        <div class="post-comments">
            
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to add comment...">
                    <input type="hidden" name="post" value="${ post._id}">
                    <input type="submit" value="Add comment">
                </form>
                
    
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id }">
                            
                        </ul>
                    </div>
        </div>
    </li>`)
    }

    createPost();
}
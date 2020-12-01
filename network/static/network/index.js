document.addEventListener('DOMContentLoaded', function() {
    // By default, load  all posts feed
  loadFeed('all posts');
})

function loadFeed(feed) {
    // SHOW the feed view and HIDE other views
    document.querySelector('#feed-view').style.display = 'block';

    // CLEAR out form text field
    document.querySelector('#post-form-text').value = '';

    // DISPLAY the feed name
    document.querySelector('#feed-name').innerHTML = 
                            `<div class="row justify-content-center mt-2">
                                <div class="col-lg-6 my-text">
                                    ${feed.charAt(0).toUpperCase() + feed.slice(1)}
                                </div>
                            </div>`;

    // Fetch feed for posts from API ROUTE
    fetch(`feed/${feed}`)
    .then(response => response.json())
    .then(posts => {
        console.log(posts)
        // Display custom message case FEED has NO POSTS
        if (posts.length == 0) {
            document.querySelector("#feed-view"). innerHTML +=
            `<div class="row my-text mt-3 justify-content-center"
                <div class="col-6  text-center">
                    This feed has no posts yet.
                </div>
            </div>`;
        };
        
        // If there are posts iteract though them 
        posts.forEach(post => {

            function getToggleLikeClass(is_liked) {
                return (is_liked ? "fas fa-heart text-danger" : "far fa-heart text-dark")
            }
            
            // CREATE a DIV for each post
            const element = document.createElement('div');
            element.className = `row justify-content-center`;
            element.id = `post${post.id}`;
            element.innerHTML = 
            `<div class="col-lg-6 border rounded-lg shadow-sm bg-white">
                <div class="row">
                    <div class="col p-1 ml-3 small my-text font-weight-bolder">
                        @${post.username}
                    </div>
                    <div class="col small my-text text-right font-weight-lighter pt-1">
                        ${post.created}
                    </div>
                </div>
                <div class="row">
                    <div class="col small font-weight-lighter ml-3 mr-3 pt-1 pb-1" style="min-height: 60px;">
                        ${post.text}
                    </div>
                </div>
                <div class="row">
                    <div class="col m-2">
                        <div>
                            <i id="toggle_like${post.id}" class="${getToggleLikeClass(post.is_liked)}" style="font-size: 14px;"></i><span id="num-likes${post.id}" class="ml-1" style="font-size: 14px;">${post.num_likes}</span> 
                        <div>
                    </div>
                </div>   
            </div>`;
            
            // RENDER a DIV element for each post
            document.querySelector("#feed-view").append(element);

            // Add EVENT HANDLER to LIKE BUTTON CLICK
            document.querySelector(`#toggle_like${post.id}`).addEventListener('click', function() {
                  
                console.log(`CLICK toggle_like ${post.id}`);
                
                // CHECK with GET request if post is_liked by user
                fetch(`like/${post.id}`)
                .then(response => response.json())
                .then(is_liked => {  
                    // No message means is_like exists
                    if (!is_liked.message) {
                        console.log(`FROM LIKED POST ${post.id} => ${is_liked.post} TO NON LIKED!`);              
                        fetch(`like/${post.id}`, {
                            method: 'POST',
                            body: JSON.stringify({
                                post: post.id,
                                action: "delete",
                            })
                        })   
                        .then(response => response.json())
                        .then(post => {
                            console.log(post)
                        })
                    } else {
                        console.log(`FROM NOT LIKED POST ${post.id} - TO LIKED`);
                        fetch(`like/${post.id}`, {
                            method: 'POST',
                            body: JSON.stringify({
                                post: post.id,
                                action: "create",
                            })
                        })
                        .then(response => response.json())
                        .then(like => {
                            console.log(like)
                        }) 
                    }
                })
                
                // TOGGLE_LIKE 
                if (document.querySelector(`#toggle_like${post.id}`).className === "far fa-heart text-dark") {
                    // FROM NO LIKE to LIKE 
                    document.querySelector(`#toggle_like${post.id}`).className = "fas fa-heart text-danger";
                    
                    before = document.querySelector(`#num-likes${post.id}`).innerHTML;
                    after = parseInt(before) + 1 
                    document.querySelector(`#num-likes${post.id}`).innerHTML = after; 
                } else {
                    // FROM LIKE to UNLIKE 
                    document.querySelector(`#toggle_like${post.id}`).className = "far fa-heart text-dark";
                     
                    before = document.querySelector(`#num-likes${post.id}`).innerHTML;
                    after = parseInt(before) - 1 
                    document.querySelector(`#num-likes${post.id}`).innerHTML = after; 
                }
            });
        });
    })

}
document.addEventListener('DOMContentLoaded', function() {
  // By default, load  all posts feed
  load_feed('all posts');
});


function is_liked(post) {

    // Check whether post is liked by user or not
    fetch(`like/${post.id}`)
    .then(response => response.json())
    .then(is_liked => {    
        // No message means (actual) post is_liked in fact 
        if (!is_liked.message) {
            console.log(`IS LIKED POST ${post.id} => ${is_liked.post}`);
            heart_ini = "fas fa-heart text-danger";
            return console.log(heart_ini);
        } else {
            console.log(`NOT LIKED POST ${post.id}`);
            heart_ini = "far fa-heart text-dark";
            return console.log(heart_ini);
        }
    
    }); // Close fetch for like   
}



function load_feed(feed) {
    // Show the feed view and hide other views
    document.querySelector('#feeds-view').style.display = 'block';

    // Clear out form text field
    document.querySelector('#post-form-text').value = '';

    // Show the feed name
    document.querySelector('#feed-name').innerHTML = 
                            `<div class="row justify-content-center mt-2">
                                <div class="col-lg-6">
                                    <p>${feed.charAt(0).toUpperCase() + feed.slice(1)}</p>
                                </div>
                            </div>`;

    // Fetch feed for posts from API ROUTE
    fetch(`feed/${feed}`)
    .then(response => response.json())
    .then(posts => {
        console.log(posts)
        // Display custom message if feed empty
        if (posts.length == 0) {
            document.querySelector("#feeds-view"). innerHTML +=
            `<div class="row justify-content-center"
                <div class="col">
                    This feed has no posts.
                </div>
            </div>`;
        };
        
        // If there are posts iteract though them and RENDER a div element for each
        posts.forEach(post => {
            console.log(post.id, post.user_id, post.text)

            // Create and ender a DIV for each post
            const element = document.createElement('div');
            element.className = `row justify-content-center`;
            element.id = `post${post.id}`;
            element.innerHTML = 
            `<div class="col-lg-6 border rounded-lg shadow-sm bg-white">
                <div class="row">
                    <div class="col p-1 ml-3 small my-text">
                        @${post.username}
                    </div>
                    <div class="col small my-text text-right font-weight-lighter pt-1">
                        ${post.created}
                    </div>
                </div>
                <div class="row">
                    <div class="col border rounded-lg ml-3 mr-3 pt-1 pb-1" style="min-height: 60px;">
                        ${post.text}
                    </div>
                </div>
                <div class="row">
                    <div class="col m-2">
                        <div>
                            <i id="toggle_like${post.id}" class="far fa-heart text-dark"></i> 
                        <div>
                    </div>
                </div>   
            </div>`;
            
            document.querySelector("#feeds-view").append(element);
        
            document.querySelector(`#toggle_like${post.id}`).addEventListener('click', function() {
                console.log(`CLICK toggle_like ${post.id}`);
                
                if (document.querySelector(`#toggle_like${post.id}`).className === "far fa-heart text-dark") {
                    document.querySelector(`#toggle_like${post.id}`).className = "fas fa-heart text-danger";
                    
                } else {
                    document.querySelector(`#toggle_like${post.id}`).className = "far fa-heart text-dark";
                }
 
            });
        });
    })
    
    // Check whether post is liked by user or not to set correct heart_ini
    fetch(`feed/${feed}`)
    .then(response => response.json())
    .then(posts => {
        posts.forEach(post => {
            console.log(post.id)
            
            // Check if is_liked
            fetch(`like/${post.id}`)
            .then(response => response.json())
            .then(is_liked => {  
                // Select correct heart_ini class
                if (!is_liked.message) {
                    console.log(`IS LIKED POST ${post.id} => ${is_liked.post}`);
                    heart_ini = `fas fa-heart text-danger`;
                }else {
                    console.log(`NOT LIKED POST ${post.id}`);
                    heart_ini = `far fa-heart text-dark`; 
                }
                
                // Render correct heart_ini
                document.querySelector(`#toggle_like${post.id}`).className = heart_ini;
            }) 
        })   
    
    });
    
     
}
function generatePaginator(feed, num_pages) {
    
    // CLEAR out last 
    document.querySelector("#feed-view-all-paginator").innerHTML = "";
    document.querySelector("#feed-view-following-paginator").innerHTML = "";
    document.querySelector("#profile-view-feed-paginator").innerHTML = "";
    
    // CREATE PAGINATOR DIV
    const paginator = document.createElement('div');
    paginator.id = `paginator-${feed}`;
    paginator.style.height = "20px";
    paginator.innerHTML = 
        `<div class="row small justify-content-center mt-3 mb-5"">
            <div class="col-6">
                <nav>
                    <ul id="paginator-${feed}-ul" class="pagination justify-content-center my-text my-text-hover" style="font-size: 11px;">
                    
                    </ul>
                </nav>
            </div>
        </div>
        `;
    
    if (feed ==="all" || feed ==="following") {
        document.querySelector(`#feed-view-${feed}-paginator`).append(paginator)
    } else {
        document.querySelector(`#profile-view-feed-paginator`).append(paginator)
    }


    // POPULATE PAGINATOR (do nothing if only one page) -=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    if (num_pages !== 1) {
        // ADD a PREVIOUS BUTTON  (PREVIOUS)
        const button_previous = document.createElement('li');
        button_previous.id = `button-previous-${feed}`;
        button_previous.className = `page-item`
        button_previous.innerHTML = 
            `<a class="page-link my-text my text-hover">
                <i class="fas fa-angle-double-left"></i>
            </a>`;
        document.querySelector(`#paginator-${feed}-ul`).append(button_previous);

        // CREATE BUTTON FOR EACH page  (ACTUAL)
        for (i = 1; i <= num_pages; i++) {    
            const button_actual = document.createElement('li');
            if (i === 1) {
                button_actual.className = `page-item active`;
                document.querySelector(`#button-previous-${feed}`).className = "page-item disabled";

            } else {
                button_actual.className = `page-item`;
            }
            button_actual.id = `button-actual-${feed}-${i}`;
            button_actual.innerHTML = `<a class="page-link">${i}</a>`;
            document.querySelector(`#paginator-${feed}-ul`).append(button_actual);

        }

        // ADD a FORWARD BUTTON (NEXT)
        const button_next = document.createElement('li');
        button_next.id = `button-next-${feed}`;
        button_next.className = `page-item`
        button_next.innerHTML = 
            `<a class="page-link my-text my text-hover">
                <i class="fas fa-angle-double-right"></i>
            </a>`;
        document.querySelector(`#paginator-${feed}-ul`).append(button_next);   
    }
} 

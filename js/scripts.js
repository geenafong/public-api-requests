const gallery = $('#gallery');
const search = $('.search-container')
const modal = $('body')


//fetch function
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(data => fetchUsers(data.results))
    

//helper functions
function fetchUsers(data){
    let html =''
    $.each(data, function(i, user){
        //Adds 12 users to page using an object literal
        html += `
        <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src=${data[i].picture.thumbnail} alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${data[i].name.first}, ${data[i].name.last}</h3>
                        <p class="card-text">${data[i].email}</p>
                        <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
                    </div>
                </div> `
        //Adds data for when a user is clicked
    });
    //Adds the html to the DOM
    gallery.append(html);
    
    //Event Listener
    $('.card').click(function(user){
        $('#gallery').after(popUp(user));
        
    });
}

function popUp(user){
    let popUp = ''
        popUp += `
        <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${this.user.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${this.user.name.first}, ${this.user.name.last}</h3>
                <p class="modal-text">${this.user.email}</p>
                <p class="modal-text cap">${this.user.location.city}, ${this.user.location.state}</p>
                <hr>
                <p class="modal-text">${this.user.phone}</p>
                <p class="modal-text">${this.user.location.street}., ${this.user.location.city}, ${this.user.location.state}, ${this.user.location.postcode}</p>
                <p class="modal-text">${this.user.dob.date}</p>
            </div>
        </div> ` 
};

//For when someone wants to close the window
$('strong').on("click", function(){
    $(".modal-container").hide();
});

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
    $('.card').on('click', function(){
        popUp(data[$('.card').index(this)]);
      });
}

function popUp(chosen){
    let date = chosen.dob.date
    let month = date.slice(5,7);
    let day = date.slice(8,10);
    let year = date.slice(0,4);
    console.log(year)

    let popUp = ''
        popUp += `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=${chosen.picture.large} alt="profile picture">
                    <h3 id="name" class="modal-name cap">${chosen.name.first}, ${chosen.name.last}</h3>
                    <p class="modal-text">${chosen.email}</p>
                    <p class="modal-text cap">${chosen.location.city}, ${chosen.location.state}</p>
                    <hr>
                    <p class="modal-text">${chosen.phone}</p>
                    <p class="modal-text cap">${chosen.location.street}., ${chosen.location.city}, ${chosen.location.state}, ${chosen.location.postcode}</p>
                    <p class="modal-text">${month +'/' + day + '/' + year}</p>
                </div>
            </div>
        </div> ` 
        
        $('#gallery').after(popUp);
        
        //To close the window
        $('strong').on('click', function(){
            $('.modal-container').remove();
          });
    };



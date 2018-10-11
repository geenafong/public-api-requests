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
                        <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                        <p class="card-text">${data[i].email}</p>
                        <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
                    </div>
                </div> `
    });
    //Adds the html to the DOM
    gallery.append(html);
    
    //Event Listener for modal window
    $('.card').on('click', function(){
        popUp(data[$('.card').index(this)]);
      });
}

//Helper function to show modal window
function popUp(chosen){
    let date = chosen.dob.date
    let month = date.slice(5,7);
    let day = date.slice(8,10);
    let year = date.slice(0,4);


    let popUp = ''
        popUp += `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=${chosen.picture.large} alt="profile picture">
                    <h3 id="name" class="modal-name cap">${chosen.name.first} ${chosen.name.last}</h3>
                    <p class="modal-text">${chosen.email}</p>
                    <p class="modal-text cap">${chosen.location.city}, ${chosen.location.state}</p>
                    <hr>
                    <p class="modal-text">${chosen.phone}</p>
                    <p class="modal-text cap">${chosen.location.street}., ${chosen.location.city}, ${chosen.location.state}, ${chosen.location.postcode}</p>
                    <p class="modal-text">${month +'/' + day + '/' + year}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
        </div> ` 

        //Appends html after the gallery element
        $('#gallery').after(popUp);

        // Modal Toggle
        // $('.modal-prev').on('click', function(){
        //     $('.modal-container').remove();
        //   });
    
        //To close the window
        $('.modal-close-btn').on('click', function(){
            $('.modal-container').remove();
        });
    };

// Search Bar
function searchBar(){
    let bar = '';
        bar = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
        </form>`

        $('.search-container').append(bar);
}
searchBar();

$('#search-input').keyup(function(){
    var valThis = $(this).val();
     $('.card [id=name]').each(function(){
      var text = $(this).text().toLowerCase();
         if (text.indexOf(valThis) == 0) {
            $(this).show();
            $(this).parent().parent().show();
         } else if (text.indexOf(valThis) < 0){
            $(this).parent().parent().hide();
         }
        else {
            $(this).parent().parent().show();
        }      

    });
 });




      




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
    let rv= true;
    $.each(data, function(i, user){
        if (i > 12){
            return rv = false;
        }
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
    gallery.append(html);
    });
    return rv;
}




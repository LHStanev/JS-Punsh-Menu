function renderAllPunshesInHTML(punshes) {
    let navbarItems = $('<div class="navbar-items">');
    for(let punsh in punshes) {
        let punshDiv  = $('<div class="navbar-item">').append($(`<h4>${punshes[punsh]['name']}</h4>`));
        navbarItems.append(punshDiv);
    }
    $('.navbar').append(navbarItems);

    attachPunshesEvents(punshes);
}

function renderSinglePunshInHTML(punsh) {
    let punshData = $('<div class="punsh-data">');
    let contentHeader = $('<div class="content-header">');

            
    let heading = $(`<div class="content-heading">${punsh['name']}</div>`);
    heading.css('cursor', 'pointer');
    contentHeader.append(heading);

    let punshType = $(`<div class="punsh-type"><label>Type: </label><h6>${punsh['type']}</h6></div>`);
    let punshContents = $(`<div class="punsh-contents"><label>Contents: </label><p>${punsh['contents']}</p></div> `);
    let punshDescription = $(`<div class="punsh-description"><label>Description: </label><p>${punsh['description']}</p></div> `);
         
    punshData.append(punshType)
    		 .append(punshContents)
    		 .append(punshDescription);

    $('.content').append(contentHeader)
    			 .append(punshData);
    			 
    attachBackEvents();            
}

function attachPunshesEvents(punshes) {
    
    $('.navbar-item').on('click', function() {
        $('.navbar-items').remove();

        let punshName = $(this).find('h4').text();
        
        for(let index in punshes) {
        	
        	if(punshes[index]['name'] === punshName) {
        		var punshNum = index;
        	}
        }

        $.ajax({
			url: "https://punsh-master.firebaseio.com/data/punshes/"+punshNum+".json",
			method: "GET",
			success: renderSinglePunshInHTML
		});
    });   
}

function attachBackEvents(punshes) {
    
    $('.content-heading').on('click', function() {
        $('.content').empty();
        renderData();
    });
}



function renderData() {
	$.ajax({
		url: "https://punsh-master.firebaseio.com/data/punshes.json",
		method: "GET",
		success: renderAllPunshesInHTML
	});
}


renderData();
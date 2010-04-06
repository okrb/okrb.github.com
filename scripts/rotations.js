jQuery(function() {
	// link up the events
	$('#events .event .paginator a').live('click', function(event) {
		event.preventDefault();
		var url = $(this).attr('href')
		var d   = new Date( parseFloat(url.substring(8, 12)),
		                    parseFloat(url.substring(13, 15)) - 1,
		                    parseFloat(url.substring(16, 18)) );
	    var months = new Array( "January",  "February", "March", 
	                            "April",    "May",      "June",
	                            "July",     "August",   "September",
	                            "October",  "November", "December" );
		$.ajax({
		    url:      url,
		    type:     "GET",
		    dataType: "html",
            success: function(data, textStatus, xhr) {
				$('#events .event .date').html( "Meeting:  <strong>" +
					                            months[d.getMonth()] + " "  +
				                                d.getDate()          + ", " +
				                                d.getFullYear()      +
				                                "</strong>" );
		        $('#events .event .details').html(data);
				$('#events .event .paginator').fadeIn();
            }
        });
	});
	$('#events .event .paginator').fadeIn();
	
	// rotate member profiles every five seconds
	$('#members .full_list').shuffle();
	setInterval(function() {
		var member = $('#members .full_list a:first').detach();
		$.ajax({
		    url:      member.attr('href'),
		    type:     "GET",
		    dataType: "html",
            success: function(data, textStatus, xhr) {
		        $('#members .member').fadeOut(function() {
			        $('#members .member').html(data);
			        $('#members .member').fadeIn();
				});
            }
        });
		$(member).appendTo('#members .full_list');
	}, 5000);
});


var addItem = function( toTrim, writeToStorage ){
    
    var toAdd = $.trim(toTrim);
    
    if (toAdd == "") {
	    alert('Please add Input!');
    } else {
	    $('#listToPush').append("<p class='list-group-item'>"+ toAdd +"<i class='icon-remove close'></i>"+"</p>");
	    $('input[type=text]').val('');
	    $('#listToPush').sortable();
	    if(writeToStorage == true){
	    	writeToLocalStorage( toAdd );
	    }
    } 	 

}

var writeToLocalStorage = function( item ){
	var items = $.jStorage.get('items', [] );
	items.push( item );
	$.jStorage.set('items', items);
}

var readFromLocalStorage = function(){
	var items = $.jStorage.get('items', [] );
	for (var i = 0; i < items.length; i++) {
	    addItem(items[i], false );
	}
}

var deleteFromLocalStorage = function( itemToDelete ){
	var items = $.jStorage.get('items', [] );
	var key = items.indexOf( itemToDelete );
	console.log('Key of text:', key);
	items.splice(key, 1);
	$.jStorage.set('items', items);
	
}


$(document).ready(function() {
	
	readFromLocalStorage();
	
    $('#addButton').click(function() {
    	addItem( $("input[name=listItem]").val(), true );
    });
    
    $(document).on('keydown',function(event) {
	    if (event.which == 13) {
	    	addItem( $("input[name=listItem]").val(), true );
	    };
    });
    
    $(document).on('click','.close',function(){
    	$(this).parent().fadeOut('fast', function(){
    		$(this).remove();
    		var divText = $(this).text(); 
    		console.log('Text from div', divText);
    		deleteFromLocalStorage( $.trim( divText ) );
		});
		
    });
    $('#clearButton').on('click', function(){
		$('.list-group-item').remove();
		$.jStorage.set('items', [] );
    });
});
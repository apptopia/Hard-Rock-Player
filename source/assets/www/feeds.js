$(document).ready(function() {
	//rndvideo("relevance");
  
});
var movie=new Array(); // regular array (add an optional integer
	movie[0]="Bon jovi";       // argument to control array's size)
	movie[1]="Aerosmith";
	movie[2]="Moetley Crue";
	movie[3]="Demolition 23";
	movie[4]="Backyard Babies";
	movie[5]="Ramones";
	movie[6]="Social Distortion";
	movie[7]="Nickelback";
	movie[8]="The Clash";
	movie[9]="Alice Cooper";
	movie[10]="Black Sabbath";
	movie[11]="Deep Purple";
	movie[12]="Led Zeppelin";
	movie[13]="CCR";
	movie[14]="AC/DC";
	movie[15]="Guns’n’Roses";
	movie[16]="Misfits";
	movie[17]="Danko Jones";
	movie[18]="Danzig";
	movie[19]="Rolling Stones"
	movie[20]="Status Quo"
	movie[21]="Joan Jett"
	movie[22]="Thin Lizzy"



function rvalue(){
	return Math.floor(Math.random()*23); // 0 to 18
};

function rndvideo(sortby)	{
//order=sort_by zusatz: relevance, published, viewCount, rating
	var i=rvalue();
	var j=rvalue();
  
  getYoutubeFeed(movie[i], "#menu_one", sortby);
  
  if(i==j){
 	getYoutubeFeed(movie[rvalue()], "#menu_two", sortby);
		  }else 
		  { 	getYoutubeFeed(movie[j], "#menu_two", sortby);	   
			  };
};

$("#page_start").live( 'pageinit',function(event){
	$.mobile.changePage( "#page_start");
	rndvideo("relevance");

});
$("#random").live("click", function() {
	$.mobile.changePage( "#page_start");
	rndvideo("relevance");

});

$("#newest").live("click", function() {
	$.mobile.changePage( "#page_start");
	rndvideo("relevance");
	
});
$("#mostview").live("click", function() {
	$.mobile.changePage( "#page_start");
	rndvideo("viewCount");
});

$("#toprated").live("click", function() {
	$.mobile.changePage( "#page_start");
	rndvideo("rating");
	
});

$('#page_asdf').live('pageshow',function(event, ui){
 // rndvideo("relevance");
  
});


getYoutubeFeed=function(term, menu,order){	
	//term=suchbegriff
	//menu=videomenu-anhang
	//order=sort_by zusatz: relevance, published, viewCount, rating
	
	var content="";
	var avgrating=0;
	var searchURL="";

	$(menu).empty();
	
	//searchURL = 'http://gdata.youtube.com/feeds/mobile/standardfeeds/most_recent?q=asdf&orderby=published';

	
	//var searchURL = 'http://gdata.youtube.com/feeds/mobile/videos?alt=json&q='+term+'&orderby='+order+'&format=1,5,6';
	//var searchURL = 'http://gdata.youtube.com/feeds/api/videos?alt=json&q='+term+'&orderby='+order+'&format=1,5,6';
	var searchURL = 'http://gdata.youtube.com/feeds/api/videos?alt=json&q='+term+'&orderby='+order;
	
	var videoURL= "http://www.youtube.com/watch?v=";
	
	$.mobile.showPageLoadingMsg();
	$.getJSON(searchURL, function(data) {
		$.each(data.feed.entry, function(i, item) {
		var feedTitle = item.title.$t;
		var author=item.author[0].name.$t;
		var updated=item.updated.$t;
		var date=updated.substring(0,10);
		var time=updated.substring(11,16);
		var avgrating=item.gd$rating.average; 
		var viewcount=item.yt$statistics.viewCount;
	    var feedURL = item.link[1].href;
        var fragments = feedURL.split("/");
        var videoID = fragments[fragments.length - 2];
        var url = videoURL + videoID;
        var thumb = "http://img.youtube.com/vi/"+ videoID +"/default.jpg";
	//	content += '<li><a href="#" onclick="playVideo(\'http://www.youtube.com/watch?v='+videoID+'\')"><img src="'+thumb+'" /><h3>'+feedTitle+'</h3><p>by '+author+'; update: '+date+'</p><span class="ui-li-count">views: '+viewcount+'</span></a></li>'; 
		
		content += '<li><a href="#" data-role="none" onclick="playVideo(\'http://www.youtube.com/watch?v='+videoID+'\')"><img src="'+thumb+'" /><h3>'+feedTitle+'</h3>'+
		'<p><h6 style="font-size:.45em;">by '+author+'</h6></p><span class="ui-li-aside"><p>'+viewcount+' views </p><p>'+generateRating(avgrating)+'</p></span></a></li>'; 

		//content+='<li><a href="'+ url +'" title="'+ feedTitle +'"><img alt="'+ feedTitle+'" src="'+ thumb +'"</a></li>';
		 });
	
	$(menu).append(content);
	$(menu).listview('refresh');
	$.mobile.hidePageLoadingMsg();
	}); 

};

function generateRating(value){
	var rating="";
	var roundvalue=Math.round(value);
	var i=0;
	
	for (i=0;i<roundvalue;i++)
	{ 
	  rating+='<img src="css/themes/images/birnevoll.png"/>';
	}
	for (i;i<5;i++)
	{
	  rating+='<img src="css/themes/images/birneleer.png"/>';
	}
	return rating;
};


 

	function getUrlVars() {
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('#');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	}
	
	function getParameterByName(name) {
   		 var match = RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.search);
    	return match && decodeURIComponent(match[1].replace(/%20/g, ' '));
	}
	
	function getEntrybyKey(vkey){
		var entries = {};
		var val; 
        for (var i = 0; i < localStorage.length; i++){
            var key =  localStorage.key(i);
            if(key.substr(0, entry_prefix.length) == entry_prefix){
                entries[key] = JSON.parse(localStorage.getItem(key));
                if(vkey==key){
                	val=entries[key].string_1
                }
            }
        }
        return val; 
	}




getYoutubeFeedCOPY=function(term, menu, order){	
	//term=suchbegriff
	//menu=videomenu-anhang
	//order=sort_by zusatz: relevance, published, viewCount, rating
	
	var content="";

	$(menu).empty();
	var basis_uri = "http://query.yahooapis.com/v1/public/yql?q=";
	var query='SELECT * from youtube.search where query="'+term+'" and order_by="'+order+'"';
	
	var strUrl = basis_uri+escape(query)+"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";  
	$.mobile.showPageLoadingMsg();
	$.getJSON(strUrl, function(data) {
		$.each(data.query.results.video, function(index, item){
			title=item.title;
			url=item.url;
			id=item.id;
			author=item.author;
			comments=item.comment_count;
			imgurl=item.thumbnails.thumbnail[0].content;
		   content += '<li><a href="#" onclick="playVideo(\'http://www.youtube.com/watch?v='+id+'\')"><img src="'+imgurl+'" /><h3>'+title+'</h3><p>'+author+'</p><span class="ui-li-count">'+comments+'</span></a></li>'; 
		 
	//	 content += '<li><href="" onclick="playVideo(\'http://www.youtube.com/watch?v='+id+'\')"><img src="'+imgurl+'" /><h3>'+title+'</h3><p>'+author+'</p><span class="ui-li-count">'+comments+'</span></li>';

		 
		  //<a href="#" onclick="playVideo('http://www.youtube.com/watch?v=c-weHQS2Rd0')">Play HTTP</a><p/>
		 });
				$(menu).append(content);
	$(menu).listview('refresh');
	$.mobile.hidePageLoadingMsg();
	}); 

};




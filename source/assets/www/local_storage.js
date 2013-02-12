(function(){
    /**
     * Prefix is used to separate entries created by the application
     * from other ones
     */
    var entry_prefix = "hrpro_";

    /**
     * Store entry to the local storage
     * @param {String} string1
     * @param {String} string2
     */
    function storeEntry(string1, string2){
        var entry = {
            string_1: string1,
            string_2: string2
        };
        var key = entry_prefix + new Date().getTime();
        try {
        	 localStorage.setItem(key, JSON.stringify(entry));
        } catch (e) {
        	 	 alert('Quota exceeded! Your entry has not been saved'); //data wasn't successfully saved due to quota exceed so throw an error
                 return false;
        }
        return true;
    }

    /**
     * Get local storage entries
     * @return Object
     */
    function readEntries(){
        var entries = {};
        for (var i = 0; i < localStorage.length; i++){
            var key =  localStorage.key(i);
            if(key.substr(0, entry_prefix.length) == entry_prefix){
                entries[key] = JSON.parse(localStorage.getItem(key));
            }
        }
        return entries;
    }

    /**
     * Return html for single list view item
     * @param key
     * @param value
     */
    function getListItemHtml(key, value) {
        return '<li><a href="#entry_details_page" class="view_entry" data-key="'+key+'"><span class="value_1">'+value['string_1']+'</span></a>'+
        '<a href="#" class="delete_entry" data-key="'+key+'" data-icon="delete"></a></li>';
    }

    /**
     * Clear entries list and re-build it
     */
    function reloadEntries() {
        $("#stored_entries").empty();
        // build entries list
        var entries = readEntries();
        if(entries){
            $.each(entries, function(key, value){
                $("#stored_entries").append(getListItemHtml(key, value));
            });
            try{
                $("#stored_entries").listview("refresh");
            }
            catch(e){

            }
        }
    }


    /**
     * Handle form submission
     */
    $('#entry_form_page').live( 'pageinit',function(event){
        $("#entry_form").unbind().validate({
            submitHandler: function(){
                if(storeEntry($("#string_1").val(), $("#string_2").val())) {
                    $("#string_1").val('');
                    $("#string_2").val('');
                    reloadEntries();
                    $.mobile.changePage('#entries_list');
                    return false;
                }
                return false;
            }
        });

    });


    /**
     * Page initialization
     */
    $('#entries_list').live( 'pageinit',function(event){
        // TODO Storage support validation
        reloadEntries();
        // Delete entry
        $(".delete_entry").live("click", function(){
            if(confirm("Delete this entry?")){
                var key = $(this).data('key');
                localStorage.removeItem(key);
                $(this).parents("li").remove();
            }
            return false;
        });

        $(".view_entry").live("click", function() {
            $("#string_p_1").text($(this).find(".value_1").text());
            $("#entry_details_page").data("key", $(this).data('key'));
            getYoutubeFeed($(this).find(".value_1").text(), "#menu_myclips", "relevance");
        });
    });


})();
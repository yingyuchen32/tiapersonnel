$(document).ready(function() {
    $("#asidemenu").html("Loading...");
    
    var pagelink = "pages/component";
    var url = pagelink + "asidemenu.html";
    
    $.ajax({
        async: true,
        url : url,
        type : "GET",
        dataType : "html"
    }).done(function(data) {        
        $("#asidemenu").html(data);
        $("#asidemenu script").each(function() {
            var jsLink = pagelink + $(this).attr('src');
            $("head").append("<script src='" + jsLink + "' ></script>")
        });
    });

    $('#foot').load('pages/firstpage/footer.html');
});
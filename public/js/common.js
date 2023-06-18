$("#posttextarea").keyup((event)=>{
    var textbox = $(event.target);
    var value = textbox.val().trim();
    
    var submitbutton = $("#submitpostbutton")

    if(submitbutton.length == 0)return alert("NO button is found to submit")

    if(value == ""){
        submitbutton.prop("disabled",true)
        return;
    }

    submitbutton.prop("disabled",false)
})

$('#submitpostbutton').click((event)=>{
    var button = $(event.target);
    var textbox = $('#posttextarea')
    var data = {
        content : textbox.val()
    }
    $.post("/api/posts",data,(postdata)=>{
        
        var html = craeteposthtml(postdata);
        $(".postcontainer").prepend(html);             // prepend added to the top while appned at last
        textbox.val("");
        button.prop("disabled",true)

    })
})

function craeteposthtml(postdata){
    var postedby = postdata.postedby;
    var displayname =postedby.firstname+" "+ postedby.lastname;
    var timestamp = "to do later"

    return `<div class = 'post'>
                <div class = 'maincontentcontainer'>
                    <div class ="userimageconatiner">
                        <img src = '${postedby.profilePic}' width = 50px >
                    </div>
                    <div class ="postcontentconatiner">
                        <div class = "header">
                            <a href='/profile/${postedby.username}'>${displayname}</a>
                            <span class="username">${postedby.username}</span>
                            <span class="username">${timestamp}</span>
                        </div>
                        <div class = "postbody">
                            <span>${postdata.content}</span>
                        </div>
                        <div class = "postfooter">
                        </div>
                    </div>
                </div>
            </div>`;
}
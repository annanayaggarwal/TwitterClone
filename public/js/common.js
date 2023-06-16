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

$('#submitpostbutton').click(()=>{
    var button = $(event.target);
    var textbox = $('#posttextarea')
    var data = {
        content : textbox.val()
    }
    $.post("/api/posts",data,(postdata,status,xhr)=>{
        alert(postdata)
    })
})
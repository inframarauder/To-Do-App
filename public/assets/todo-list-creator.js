$(document).ready(function(){

    $('form').on('submit',function(){
        var todo = {item :  $('form input').val()};
        $.ajax({

            type: 'POST',
            url:'/todo',
            data : todo,
            success : function(data){
                location.reload();
            }

        });
        return false;
    });

    $('li').on('click', function(){
        var item = $(this).text().trim();
        console.log(item);
        $.ajax({
            type: 'DELETE',
            url:'/todo/'+ item,
            success: function(data){
                location.reload();
            }
        });
    });
});
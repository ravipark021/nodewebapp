$(document).ready(function(){
  $('.delete-article').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/articles/'+id,
      success: function(response){
        alert('Deleting Article');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});

function changeUserAuthorization(filters){
  console.log(filters);
  $.ajax({
      url: '/admin/manage/users',
      type: 'POST',
      cache: false,
      async: true,
      data: filters
  })
  .done(function (results) {
      console.log('User status changed successfully');
  }).fail(function (xhr) {
      console.log('error : ' + xhr.status + ' - ' + xhr.statusText + ' - ' + xhr.responseText);
  });
}
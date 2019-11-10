$(function () {
    $('#searchReportBtn').on('click', function (e) {
        filters = {
            reportName: $('#searchReportText').val(),
            citation: $('#searchCitation').val()
        };
        GetReports(filters);
    });
});

function GetReports(filters) {
    $.ajax({
        url: '/reports/findreport',
        type: 'GET',
        cache: false,
        async: true,
        data: filters
    })
    .done(function (results) {
        if(results.length > 0){
            let htmlSnippet = GenerateReportHtml(results);
            $('#searchResults').html(htmlSnippet);
        }
        else{
            $('#searchResults').html('<h3>No matching record found!</h3>');
        }
    }).fail(function (xhr) {
        console.log('error : ' + xhr.status + ' - ' + xhr.statusText + ' - ' + xhr.responseText);
    });
}

function GenerateReportHtml(results){

    let reportsRow = '';
    for(let i=0;i<results.length;i++){
        reportsRow += '<tr>' +
        '<td>' + results[i].name +
        '</td>' +
        '<td>' + results[i].description +
        '</td>' +
        '<td>' +
        '<a href="/reports/'+results[i]._id+'" id="OpenDetails" class="btn btn-primary col-sm-8 float-sm-left">Open</a>' +
        '</td>' +
        '</tr>';
    }

    let htmlSnippet = '<table class="table">' + 
        '<thead><tr><th>Name</th><th>Description</th><th>Action</th></tr></thead>' + 
        '<tbody>' +
            reportsRow +
        '</tbody>' +
        '</table>';

    return htmlSnippet;
}
var githubhook = require('githubhook');
var github = githubhook({ });

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'repos-enabled/sabordoc.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

github.listen();

github.on('*', function (event, repo, ref, data) {

    loadJSON(function(response) {
        var json_data = JSON.parse(response);

        if(data.action == 'closed' && data.pull_request.merged == 'true'){
            var exec = require('child_process').exec;

            exec('cd /var/www/' + json_data.repo + ' && git pull origin ' + json_data.branch);
        }
    });
});
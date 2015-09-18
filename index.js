var githubhook = require('githubhook');
var github = githubhook({
});

github.listen();

github.on('*', function (event, repo, ref, data) {

    //if(data.action == 'closed'){
        var exec = require('child_process').exec;

        exec('cd /var/www/' + repo + ' && git pull origin develop');
    //}
});
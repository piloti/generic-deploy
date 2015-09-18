var githubhook = require('githubhook');
var github = githubhook({ });

github.listen();

github.on('*', function (event, repo, ref, data) {

    if(data.action == 'closed' && data.pull_request.merged == 'true'){
        var exec = require('child_process').exec;

        exec('cd /var/www/' + repo + ' && git pull origin develop');
    }
});
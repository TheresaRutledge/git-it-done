var issueContainerEl = document.querySelector('#issues-container');

const displayIssues = (issues)=> {

    if(issues.length === 0){
        issueContainerEl.textContent = 'This repo has no open issues!';
        return;
    }
    
    for (i=0;i<issues.length;i++){
        let issuesEl = document.createElement('a');
        issuesEl.classList = 'list-item flex-row justify-space-between align-center';
        issuesEl.setAttribute('href',issues[i].html_url);
        issuesEl.setAttribute('target','_blank')

        let titleEl = document.createElement('span');
        titleEl.textContent = issues[i].title;

        issuesEl.appendChild(titleEl);

        let typeEl = document.createElement('span');

        if(issues[i].pull_request){
            typeEl.textContent = '(Pull Request)';
        } else {
            typeEl.textContent = '(Issue)';
        }
        issuesEl.appendChild(typeEl);

        issueContainerEl.appendChild(issuesEl);
    }
}

const getRepoIssues = (repo) => {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl)
    .then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayIssues(data);
            })
        } else {
            alert('There was a problem with your request')
        }
    })
}

getRepoIssues('theresarutledge/daily-planner');
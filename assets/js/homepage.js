const userFormEl = document.querySelector('#user-form');
const nameInputEl = document.querySelector('#username');
const repoContainerEl = document.querySelector('#repos-container');
const repoSeachTerm = document.querySelector('#repo-search-term');

const getUserRepos = (user) => {
    fetch(`https://api.github.com/users/${user}/repos`)
        .then(function (response) {
            if(response.ok){
            response.json()
                .then(function (data) {
                    displayRepos(data, user)
                })
            } else {
                alert(`Error: ${response.statusText}`)
            }
        })
        .catch(function(error){
            alert('Unable to connect to GitHub');
        })

}

const formSubmitHandler = (event) => {
    event.preventDefault();
    let username = nameInputEl.value.trim();
    if (username) {
        getUserRepos(username);
        nameInputEl.value = '';
    } else {
        alert('Please enter a GitHub username')
    }
}

const displayRepos = (repos, searchTerm) => {
    repoContainerEl.textContent = '';
    repoSeachTerm.textContent = searchTerm;

    if(repos.length === 0){
        repoContainerEl.textContent = "No repositories found"
        return;
    }

    for (i = 0; i < repos.length; i++) {
        let repoName = `${repos[i].owner.login}/${repos[i].name}`;

        let repoEl = document.createElement('div');
        repoEl.classList = 'list-item flex-row justify-space-between align center';

        let titleEl = document.createElement('span');
        titleEl.textContent = repoName;

        repoEl.appendChild(titleEl);

        let statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';

        if(repos[i].open_issues_count > 0){
            statusEl.innerHTML = `<i class='fas fa-times status-icon icon-danger'></i> ${repos[i].open_issues_count} issues(s)`;
        } else {
            statusEl.innerHTML = `<i class='fas fa-check-square status-icon icon-success'></i>`;
        }
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }
}


userFormEl.addEventListener('submit', formSubmitHandler);

// getUserRepos('TheresaRutledge');


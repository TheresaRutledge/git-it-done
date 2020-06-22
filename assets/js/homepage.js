const getUserRepos = (user) => {
    fetch(`https://api.github.com/users/${user}/repos`)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    console.log(data);
                })
        })

}

getUserRepos('TheresaRutledge');
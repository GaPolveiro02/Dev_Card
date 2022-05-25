const url = 'https://api.github.com/users/'

function searchUser() {
    const inputValue = document.querySelector('#input').value

    console.log(inputValue)
    if (inputValue != '') {
        getUser(inputValue)
        getPerfilColor()
    } else {
        alert('digite um usuário valido do gitHub')
    }
}

function getUser(user) {
    let searchUrl = `${url}${user}`;

    fetch(searchUrl)
     .then(response => response.json())
     .then(data => {
            userName.textContent = data.name
            devUser.textContent = data.login
            githubLink.href = data.html_url
            userAvatar.src = data.avatar_url
            userRepos.textContent = `Public repositories ${data.public_repos}`
            userFollowers.textContent = `Followers ${data.followers}`
            userFollowing.textContent = `Following ${data.following}`

            if(data.location != null){
                userLocation.textContent = `Location: ${data.location}`
            }
            else{
                userLocation.textContent = `?`
            }

            getUserRepos(searchUrl)
        })
     .catch(error => console.log(error));
}

function getPerfilColor() {
    const color = '#' + Math.floor(Math.random()*16777215).toString(16);

    document.documentElement.style.setProperty('--color', `${color}`)
}

function getUserRepos(searchUrl) {
    const reposUrl = `${searchUrl}/repos`

    console.log(reposUrl)

    fetch(reposUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(repo => {
            let li = document.createElement('li')
            li.setAttribute('class','item')
            li.innerHTML = 
            `<a href="${repo.html_url}" target="_blank">
                <img src="./assets/img/repository.svg" alt="Repositórios">
                ${repo.name}
            </a>`

            reposUl.append(li)
        });
    })
}

function hideRepos() {
    const reposCard = document.querySelector('#reposCard')
    
    console.log(reposCard.style)

    if(reposCard.style.display == '') {
        reposCard.style.display = 'flex'
    }else if(reposCard.style.display == 'none') {
        reposCard.style.display = 'flex'
    }else {
        reposCard.style.display = 'none'
    }
}

getUser("gapolveiro02")
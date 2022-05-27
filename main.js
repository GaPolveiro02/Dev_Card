const url = 'https://api.github.com/users/'
const repositories = document.querySelector('#repos')
const followers = document.querySelector('#followers')
const following = document.querySelector('#following')

repositories.addEventListener("click", () => {
    const user = document.querySelector('#devUser').textContent
    hideCard()
    getUserRepos(`${url}${user}`)
})

followers.addEventListener("click", () => {
    const user = document.querySelector('#devUser').textContent
    hideCard()
    getUserFollowers(`${url}${user}`)
})

following.addEventListener("click", () => {
    const user = document.querySelector('#devUser').textContent
    hideCard()
    getUserFollows(`${url}${user}`)
})

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
    const searchUrl = `${url}${user}`;

    fetch(searchUrl)
     .then(response => response.json())
     .then(data => {
            userName.textContent = data.name
            devUser.textContent = data.login
            githubLink.href = data.html_url
            userAvatar.src = data.avatar_url
            userBio.textContent = data.bio
            userRepos.textContent = `Public repositories ${data.public_repos}`
            userFollowers.textContent = `Followers ${data.followers}`
            userFollowing.textContent = `Following ${data.following}`

            if(data.location != null){
                userLocation.textContent = `Location: ${data.location}`
            }
            else{
                userLocation.textContent = `?`
            }
            console.log(searchUrl)
        })
     .catch(error => console.log(error));
}

function getPerfilColor() {
    const color = '#' + Math.floor(Math.random()*16777215).toString(16);

    document.documentElement.style.setProperty('--color', `${color}`)
}

function getUserRepos(url) {
    console.log(url)
    const reposUrl = `${url}/repos`

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

            cardUl.append(li)
        });
    })
}

function getUserFollowers(url) {
    const followersUrl = `${url}/followers`

    fetch(followersUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(follower => {
            let li = document.createElement('li')
            li.setAttribute('class', 'item')
            li.innerHTML = 
            `<a href="${follower.html_url}" target="_blank">
                <img src="${follower.avatar_url}" alt="Repositórios">
                ${follower.login}
            </a>`

            cardUl.append(li)
        })
    })
}

function getUserFollows(url) {
    const followersUrl = `${url}/following`

    fetch(followersUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(follower => {
            let li = document.createElement('li')
            li.setAttribute('class', 'item')
            li.innerHTML = 
            `<a href="${follower.html_url}" target="_blank">
                <img src="${follower.avatar_url}" alt="Repositórios">
                ${follower.login}
            </a>`

            cardUl.append(li)
        })
    })
}

function hideCard() {
    const xButton = document.querySelector("#closeCard")
    const secondCard = document.querySelector('#secondCard') 
    const cardDisplay = secondCard.style.display
    
    if(cardDisplay == '' || cardDisplay == 'none') {
        secondCard.style.display = 'flex'
    }else {
        const li = document.querySelectorAll('li')
        secondCard.style.display = 'none'
        
        for(let i=0; i<= li.length; i++) {
            li[i].parentNode.removeChild(li[i])
        }
    }

    xButton.addEventListener("click", () => {
        const li = document.querySelectorAll('li')
        secondCard.style.display = 'none'
        
        for(let i=0; i<= li.length; i++) {
            li[i].parentNode.removeChild(li[i])
        }
    })
}

getUser("gapolveiro02")
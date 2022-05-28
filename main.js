const url = 'https://api.github.com/users/'
const repositoriesButton = document.querySelector('#repos');
const followersButton = document.querySelector('#followers');
const followingButton = document.querySelector('#following');
const secondCardTitle = document.querySelector('#headerCard h2');
const changeColorButton  = document.querySelector('#changeColorButton');


repositoriesButton.addEventListener("click", () => {
    const user = document.querySelector('#devUser').textContent
    hideCard()
    getUserInfos(`${url}`, `${user}`, 'repos')
})

followersButton.addEventListener("click", () => {
    const user = document.querySelector('#devUser').textContent
    hideCard()
    getUserInfos(`${url}`, `${user}`, 'followers')
})

followingButton.addEventListener("click", () => {
    const user = document.querySelector('#devUser').textContent
    hideCard()
    getUserInfos(`${url}`, `${user}`, 'following')
})

changeColorButton.addEventListener("click", () => {
    getPerfilColor()
})

const searchUser = () => {
    const inputValue = document.querySelector('input').value

    if (inputValue != '') {
        getUser(`${url}`,inputValue)
        getPerfilColor()
    } else {
        alert('digite um usuário valido do gitHub')
    }
}

const getUser = (url,user) => {
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

const getPerfilColor = () => {
    const element = document.querySelector('html')
    const style = getComputedStyle(element)
    const actualColor = style.getPropertyValue('--color')
    const generatedColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    
    if (generatedColor == actualColor || generatedColor == 'rgba(255, 0, 0, 0)') {
        getPerfilColor()
    } else {       
        document.documentElement.style.setProperty('--color', `${generatedColor}`)
    }
}

const getUserInfos = (url, user, query) => {
    const queryUrl = `${url}${user}/${query}`
    secondCardTitle.textContent = `${query}`

    fetch(queryUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(el => {
            let li = document.createElement('li')
            li.setAttribute('class', 'item')

            if (query == "followers") {
                li.innerHTML = 
                `<a href="${el.html_url}" target="_blank">
                    <img src="${el.avatar_url}" alt="Seguidores">
                    ${el.login}
                </a>` 
            } else if(query == "following") {
                li.innerHTML = 
                `<a href="${el.html_url}" target="_blank">
                    <img src="${el.avatar_url}" alt="Seguindo">
                    ${el.login}
                </a>`
            } else {
                li.innerHTML = 
                `<a href="${el.html_url}" target="_blank">
                    <img src="./assets/img/repository.svg" alt="Repositórios">
                    ${el.name}
                </a>`
            }

            cardUl.append(li)
        })
    })
}

const hideCard = () => {
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

getUser(url, "gapolveiro02")
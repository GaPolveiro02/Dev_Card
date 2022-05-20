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
    fetch(`${url}${user}`)
     .then(response => response.json())
     .then(data => {
            userName.textContent = data.name
            devUser.textContent = data.login
            userAvatar.src = data.avatar_url
            userRepos.textContent = `Public repositories ${data.public_repos}`
            userFollowers.textContent = `Followers ${data.followers}`
            userFollowing.textContent = `Following ${data.following}`
            if(data.location != null){
                userLocation.textContent = `Location: ${data.location}`
            }
            else{
                userLocation.textContent = ``
            }
        })
     .catch(error => console.log(error))
}


function getPerfilColor() {
    const color = '#' + Math.floor(Math.random()*16777215).toString(16);
    console.log(color) 
    document.documentElement.style.setProperty('--color', `${color}`)
}

getUser("gapolveiro02")
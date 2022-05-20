const url = 'https://api.github.com/users/'

function searchUser() {
    const inputValue = document.querySelector('#input').value

    console.log(inputValue)
    if (inputValue != '') {
        getUser(inputValue)
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

getUser("gapolveiro02")
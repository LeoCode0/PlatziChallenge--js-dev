const baseApi = "https://api.github.com/users"

const fetchData = async (user) => {
    debugger
    let data = await fetch(`${baseApi}/${user}`)
    if(data.status !== 200){
      let err = await data.json()
      debugger
      profile.classList.add("invisible")
      errorContainer.classList.remove("invisible")
      errorContainer.innerText = err.message
    }else{
      data = await data.json()
      if(!errorContainer.classList.contains("invisible")){
        errorContainer.classList.add("invisible")
      }
      if(profile.classList.contains("invisible")){
        profile.classList.remove("invisible")
      }
      fullName.innerText = data.name
      username.innerHTML = `
        <a href=${data.html_url} target=__blank class="profile--anchor" >@${data.login}</a>
      `
      profileImg.src = data.avatar_url
      profileImg.alt = data.name
      bio.innerText = data.bio
    }
    
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const value = searchInput.value
  fetchData(value)
})

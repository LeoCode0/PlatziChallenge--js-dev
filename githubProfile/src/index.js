const baseApi = "https://api.github.com/users"

const fetchData = async (dataApi, callbackErr, callbackOk) => {
  // ❌ refactor
    let data = await fetch(dataApi)
    if(data.status !== 200){
      let err = await data.json()
      callbackErr(err)
    }else{
      data = await data.json()
      if(!errorContainer.classList.contains("invisible")){
        errorContainer.classList.add("invisible")
      }
      if(profile.classList.contains("invisible")){
        profile.classList.remove("invisible")
      }
      callbackOk(data)
    }

    return data
}

const getTheLastPage = (followersCount) => {
  return parseInt(followersCount / 30) + 1
}

const fetchFollowersInformation = async (url) => {
  let data = await fetch(url)
  data = await data.json()
  let first = data[0].url
  last = await fetch(`${url}?page=${getTheLastPage(128)}`)
  last = await last.json()
  last = last[last.length - 1]
  console.log(last)
  
  first = await fetch(first)
  first = await first.json()
  last = await fetch(last.url)
  last = await last.json()
  printUserInformation(first, firstFollower)
  printUserInformation(last, lastFollower)

}

const printUserInformation = (data, target = profile) => {
  target.innerHTML = `
    <div class="profile--user">
    <h1 class="profile--fullname" id="fullname">
      ${data.name}
    </h1>
    <p class="profile--username" id="username">
      <a href=${data.html_url} target=__blank class="profile--anchor" >@${data.login}</a>
    </p>
  </div>
  <div class="profile--container">
    <img src=${data.avatar_url} alt=${data.name} class="profile--img" id="img">
  </div>
  <p class="profile--bio" id="bio">
    ${data.bio ? data.bio : "This user has no information"}
  </p>
  `
}

const printError = (error) => {
  profile.classList.add("invisible")
  errorContainer.classList.remove("invisible")
  errorContainer.innerText = error.message
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const value = searchInput.value
  fetchData(`${baseApi}/${value}`, printError, printUserInformation)
    .then(data => {
      const followers = data.followers_url
      fetchFollowersInformation(followers)
    })
})

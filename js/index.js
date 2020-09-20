let searchForm = document.querySelector("#github-form");
let userInfoList = document.querySelector("#user-list");
let listOfRepos = document.querySelector("#repos-list");
let seachOption = document.createElement("select");
seachOption.id = "seach-option";
let byGitHubName = document.createElement("option");
byGitHubName.innerText = "Search by GitHub Name";
byGitHubName.value = "Search-by-GitHub-Name";
let byRepoName = document.createElement("option");
byRepoName.innerText = "Seach by Repo Name";
byRepoName.value = "Seach-by-Repo-Name";
seachOption.append(byGitHubName);
seachOption.append(byRepoName);
searchForm.append(seachOption);


searchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();  
  let searchingOption = seachOption.value
  let userSearchInput = evt.target.search.value;
  fetch(`https://api.github.com/search/users?q=octocat`)
    .then(res => res.json())
    .then(gitHubUserObjects => {
    if (searchingOption === "Search-by-GitHub-Name"){
        let found = gitHubUserObjects.items.find(userInfo => userInfo.login.toLowerCase()==               userSearchInput.toLowerCase())
        userInfoList.innerHTML = "";
        listOfRepos.innerHTML = "";
        if (typeof found !== "undefined"){
          return createUserLi(found)
        }
        else {
          return UserNotFound()
        }
    }
    else{
      userInfoList.innerHTML = "";
      listOfRepos.innerHTML = "";
      return alert("not implemented!")
    }
      
    })
  evt.target.reset();
});


let createUserLi = (userInfo) => {
  
  let UserDiv = document.createElement("div");
  UserDiv.classList.add("UserDiv");
  
  let UserAvatar = document.createElement("img");
  UserAvatar.classList.add("UserAvatar");
  UserAvatar.src = userInfo.avatar_url;
  UserAvatar.alt = `${userInfo.login} Avatar`;
  
  let GitHubUsername = document.createElement("p");
  GitHubUsername.classList.add("Username");
  GitHubUsername.innerText = userInfo.login;
  
  let GitHubProfile = document.createElement("a");
  GitHubProfile.classList.add("UserProfileURL");
  GitHubProfile.innerHTML = "Profile <br>";
  GitHubProfile.href = userInfo.html_url;
  
  let reposBtn = document.createElement("button")
  reposBtn.classList.add("reposBtn");
  reposBtn.innerText = "Load User Repositories"
  
  let userRepoURL = userInfo.repos_url;
  
  UserDiv.append(UserAvatar, GitHubUsername, GitHubProfile, reposBtn);
  userInfoList.append(UserDiv);

   reposBtn.addEventListener("click", (evt) => {
     fetch(userInfo.repos_url)
      .then(res => res.json())
      .then(userRepoObjects => {
       listOfRepos.innerText = "Repos";
       userRepoObjects.forEach(repoObject => createRepoLi(repoObject))
     });
   }); 
}

let UserNotFound = () =>{
  
  let User = document.createElement("div");
  User.classList.add("UserDiv");
  
  let UserAvatar = document.createElement("img");
  UserAvatar.classList.add("UserNotFoundImg");
  UserAvatar.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0iwIo-1giAItDhANWkjyqX27SsLeSqS5sjQ&usqp=CAU";
  UserAvatar.alt = "USER NOT FOUND";
  
  let notFound = document.createElement("p");
  notFound.classList.add("notFound");
  notFound.innerText = "USER NOT FOUND!";
  
  User.append(UserAvatar,notFound);
  userInfoList.append(User);
}

let createRepoLi = (repoObj) => {
  
  let repoDiv = document.createElement("div");
  repoDiv.classList.add("div-of-repos");
  
  let repoName = document.createElement("p");
  repoName.classList.add("repo-name");
  repoName.innerText = repoObj.name;
  
  let repoUrlLink = document.createElement("a");
  repoUrlLink.classList.add("repo-link-url");
  repoUrlLink.innerText = "Check Repo";
  repoUrlLink.href = repoObj.html_url;
  repoUrlLink.target="_blank"
  
  repoDiv.append(repoName, repoName, repoUrlLink);
  listOfRepos.append(repoDiv); 
}


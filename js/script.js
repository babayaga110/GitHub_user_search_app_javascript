const searchBtn = document.querySelector('.btn');
const fullName =   document.getElementById('fullName')
const joinData =   document.getElementById('joinDate')
const bioData =   document.getElementById('bio')
const reposData =   document.getElementById('reposCount')
const followersData =   document.getElementById('followersCount')
const followingData =   document.getElementById('followingCount')
const locationData =   document.getElementById('location')
const gitBlogData =   document.getElementById('gitBlog')
const twitterData =   document.getElementById('twitter')
const githubData =   document.getElementById('github')
const userNameData =   document.getElementById('userName')
const profilePic = document.getElementById('profile-pic')
const modeBtn = document.querySelector('.mode')

modeBtn.addEventListener('click', ()=>{
    const a = modeBtn.innerText.toLowerCase();
    if(a.trim() === "light"){
        modeBtn.innerHTML = `Dark <i class="fas fa-moon"></i>`;
    }else{
        modeBtn.innerHTML = `light <i class="fas fa-sun"></i>`;
        document.body.style.backgroundColor= "unset"
    }
 })

searchBtn.addEventListener('click', ()=>{
    const userName = document.getElementById('username').value;
    if(userName){
        const fetchData = API(userName)
        fetchData.then(function(result){
        if(userName === result.login){
            dataFilling(result);
        }
    })
    }
    
});

async function API(a){
    const userName = a;
    
    const url = `https://api.github.com/users/${userName}`;
    const response = await fetch(url)
                        .then(resp =>resp.json())
                        .then(data=>data)
                        .catch((error) =>{
                            console.log('Error: ', error);
                        });
                      
        return response
}


function dataFilling(resp){
    const response = resp;
    console.log(response)
    profilePic.src = response.avatar_url;
    fullName.innerText = response.name;
    userNameData.innerText = `@${response.login}`;
    userNameData.href = response.html_url;
    joinData.innerText = funDate(response.created_at);

    if(response.bio == null){
        bioData.innerText = "This profile has no bio"
    }else{
        bioData.innerText = response.bio;
    }

    reposData.innerText = response.public_repos;
    followersData.innerText = response.followers;
    followingData.innerText = response.following;

    if(response.location === null){
            locationData.innerHTML = `<i class="fas fa-map-marker-alt"></i> Not Available`
    }else{
        locationData.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${response.location}`;
    }
    if(response.twitter_username === null){
        twitterData.innerHTML = `<i class="fab fa-twitter"></i> Not Available`;
    }else{
        twitterData.innerHTML =`<i class="fab fa-twitter"></i> ${response.twitter_username}`;
        twitterData.href = `https://twitter.com/${response.twitter_username}`;
    }
    if(response.blog === ""){
        gitBlogData.innerHTML = `<i class="fas fa-link"></i> Not Available`;
    }else{
        gitBlogData.innerHTML = `<i class="fas fa-link"></i> ${response.blog}`;
    }
    if(response.html_url === null){
        githubData.href = "#";
    }else{
        githubData.href = response.html_url;
    }
}

function funDate (a){
    let text = '"'+ a + '"';
    const myArray = text.split("T");
    const date = myArray[0] + '"';
    const now = new Date (date);
    const day = now.getDate();
    const year = now.getFullYear();
    const GetMonth = (anyDate) => 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')[anyDate.getMonth()];
    const fulldate = day + " " + GetMonth(now) + " " + year;
    return "Joined " + fulldate;
}



// Redirect to the Indepth Page
function indepth_redirect(){
    location.href = "Indepth.html";
}

// Redirect to About Page
function about_redirect(){
    location.href = "about.html";
}

// Redirect to About Me Page
function about_me_redirect(){
    location.href = "about_me.html";
}

// Redirect back to the main page
function back_redirect(){
    location.href = "index.html";
}

//Helper sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function calculate_bounds(query){
    el = document.getElementsByClassName(query)[0];
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
    //console.log("PARTIAL",elemTop < window.innerHeight && elemBottom >= 0);
}

function skills_bounds(query){
    var top = window.pageYOffset + window.innerHeight;
    isVisible = top > document.getElementById(query).offsetTop;
    return isVisible;
}

function skills_scrollevent(){
    document.addEventListener("scroll", function(e){
        const root = document.querySelector(":root");
        
        // This works 
        // el = document.getElementsByClassName('skills_header')[0];
        // var rect = el.getBoundingClientRect();
        // var elemTop = rect.top;
        // var elemBottom = rect.bottom;
        // console.log("FULLY", (elemTop >= 0) && (elemBottom <= window.innerHeight));
        // console.log("PARTIAL",elemTop < window.innerHeight && elemBottom >= 0);

        //  Skills animation
        var leftbar = document.getElementsByClassName("skills_leftbar")[0];
        var rightbar = document.getElementsByClassName("skills_rightbar")[0];
        isVisible = skills_bounds("skills_tab");
        if(isVisible){ 
            leftbar.classList.add("sidebar-animate");
            rightbar.classList.add("sidebar-animate");
            root.style.setProperty("--animate_skills", "progress");
            return;
        }
        leftbar.classList.remove("sidebar-animate");
        rightbar.classList.remove("sidebar-animate");
        root.style.setProperty("--animate_skills", "none");
    })  
}
skills_scrollevent();

edu_progress = false;
function education_scrollevent(){
    document.addEventListener("scroll", function(e){
        var leftbar = document.getElementsByClassName("education_leftbar")[0];
        var rightbar = document.getElementsByClassName("education_rightbar")[0];
        isVisible = calculate_bounds("education_header");
        if (isVisible){
            leftbar.classList.add("sidebar-animate");
            rightbar.classList.add("sidebar-animate");
            if (!edu_progress){
                education_animate();
                edu_progress = true;
            }
            return;
        }
        leftbar.classList.remove("sidebar-animate");
        rightbar.classList.remove("sidebar-animate");
    })
}
education_scrollevent();

function intially_disabled(){
    const item = document.querySelectorAll("#edu_circles > div");
    const cards = document.querySelectorAll("#edu_cards > div");
    for(let i=0;i<4;i++){
        item[i].classList.toggle("disabled");
    }
}

async function education_animate(){
    const item = document.querySelectorAll("#edu_circles > div");
    const cards = document.querySelectorAll("#edu_cards > div");
    for(let i=0;i<4;i++){
        item[i].classList.toggle("disabled");
        if(i < 3){ cards[i].classList.toggle("fadein"); }
        await sleep(4000);
    }
}
intially_disabled();

function project_scrollevent(){
    document.addEventListener("scroll", function(e){
        var leftbar = document.getElementsByClassName("project_leftbar")[0];
        var rightbar = document.getElementsByClassName("project_rightbar")[0];
        isVisible = calculate_bounds("project_header");
        if (isVisible){
            leftbar.classList.add("sidebar-animate");
            rightbar.classList.add("sidebar-animate");
            return;
        }
        leftbar.classList.remove("sidebar-animate");
        rightbar.classList.remove("sidebar-animate");
    })
}
project_scrollevent();

function project_listener(idx, required_id){
    const dis = document.getElementsByClassName("project_display");
    for(let i=0; i<dis.length; i++){
        dis[i].style.display = "none";
    }
    const pro = document.getElementsByClassName("project");
    for(let i=0; i<pro.length;i++){
        pro[i].classList.remove("project_active");
    }
    document.getElementById(required_id).style.display = "block";
    pro[idx].classList.add("project_active");
}

function project_activator(){
    const arr = ["django_blog", "drf_blog", "kivy_app"]
    for(let i=0;i<3;i++){
        document.getElementsByClassName("project")[i].addEventListener("click", function(){
            project_listener(i, arr[i]);
        })
    }
    document.getElementsByClassName("project")[0].click();
}
project_activator();


function experince_scrollevent(){
    document.addEventListener("scroll", function(e){
        var leftbar = document.getElementsByClassName("experience_leftbar")[0];
        var rightbar = document.getElementsByClassName("experience_rightbar")[0];
        isVisible = calculate_bounds("experience_header");
        if (isVisible){
            leftbar.classList.add("sidebar-animate");
            rightbar.classList.add("sidebar-animate");
            return;
        }
        leftbar.classList.remove("sidebar-animate");
        rightbar.classList.remove("sidebar-animate");
    })
}
experince_scrollevent();

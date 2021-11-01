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


function indepth_collapser(){
    var coll = document.getElementsByClassName("indepth_property_collapser");
    for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("indepth_collapser_active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
        content.style.display = "none";
        } else {
        content.style.display = "block";
        }
    });
    }
}
indepth_collapser();


function indepth_expansion_generator(){
    var item = document.getElementById("indepth_expansion");
    item.innerHTML = "(x+y)<sup>n</sup> = <sup>n</sup>C<sub>0</sub> x<sup>n</sup> y<sup>0</sup>";
    for(let i=1;i<6;i++){
        item.innerHTML += " + <sup>n</sup>C<sub>" + i + "</sub> x<sup>n-" + i + "</sup> y<sup>" + i + "</sup>";
    }
    item.innerHTML += "+ ............. + <sup>n</sup>C<sub>n</sub> x<sup>0</sup> y<sup>n</sup>.";
}
indepth_expansion_generator();

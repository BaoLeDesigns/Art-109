

//img disappear
document.querySelector("#image-0").addEventListener("click", function(){
    document.querySelector("#image-1").style.visibility = "visible";
    alert("im so hungry")
    //document.querySelector("#image-0").style.display = "none"; -> this is to completely remove from page
})

document.querySelector("#image-1").addEventListener("click", function(){
    document.querySelector("#image-2").style.visibility = "visible";
})
document.querySelector("#image-2").addEventListener("click", function(){
    document.querySelector("#image-3").style.visibility = "visible";
})

document.querySelector("#image-3").addEventListener("click", function(){
    document.querySelector("#image-4").style.visibility = "visible";
})

document.querySelector("#image-4").addEventListener("click", function(){
    document.querySelector("#image-5").style.visibility = "visible";
})

document.querySelector("#image-5").addEventListener("click", function(){
    document.querySelector("#image-6").style.visibility = "visible";
})

document.querySelector("#image-6").addEventListener("click", function(){
    //document.querySelector("#image-6").style.visibility = "visible";
})




//Anything below this is before the img disappear tut

//console.log ("hello world");

//let pageTitle =  document.querySelector("#page-title")
//let header = document.querySelector("header")
//let body = document.querySelector("body")


//js timeout changes to 3 secs
//setTimeout( function(){
  //  pageTitle.style.color = "pink";
    //console.log ("timeout worked")
//}  , 3000 )

//click event on header changes bg color
//header.onclick = function(){
//console.log("clicked header");
//body.style.backgroundColor = "black";
//}
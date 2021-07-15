

window.onload=function(){
    // window.addEventListener('scroll', activateHeaderBackground);
    // skillCircleFactory();
    addTestCase();
}

function activateHeaderBackground(){
    var homePage = document.getElementById("homepage");
    if(window.scrollY + 50 > homePage.clientHeight){
        document.querySelector("header").classList.add("scrolled-header");
    } else {
        document.querySelector("header").classList.remove("scrolled-header");
    }
}

// Append new test case text area when button is clicked
function addTestCase(){
    var addTestCaseButton =  document.getElementById("addTestCaseButton");
    addTestCaseButton.addEventListener("click", function(){

        // Make a copy of the test case div element
        var clone = document.getElementById("testCase").cloneNode(true);
        var testCase = document.getElementById("testCase");
        
        // Get the total number of test cases
        var testNum = (document.getElementsByClassName("testCase").length/2)+1;
        // console.log(testNum);

        var cloneInput = clone.getElementsByTagName("testInput");
        
        // Clear the text areas for the new node
        clone.querySelectorAll('[id="testInput"]')[0].value = "[]";
        clone.querySelectorAll('[id="testExpected"]')[0].value = "[]";

        // Append a new test case to test case section
        testCase.parentNode.append(clone);
    });
}


var skills = {
    "Javascript": 0.75,
    "Python": 1,
    "C++": 0.6, 
    "Java": 0.5,
    "HTML": 0.65,
    "CSS": 0.7,
    "Game Dev": 0.85,
};

var canvasParent = null;
function skillCircleFactory(){
    canvasParent = document.getElementById("technical-skills");
    var i = 0;
    for( var skill in skills) {
    
        var skillName = "skill" + i;
        var div = document.createElement('div');
        var canvas = document.createElement('canvas');
        canvas.height = 200;
        var context = canvas.getContext("2d");
        canvas.setAttribute("className", "skillCard");
        if(i >3){
            canvas.classList.add("bot");
        } else {
            canvas.classList.add("skillDiv");
        }
        
        // canvas.setAttribute("height", canvasParent.innerHeight);
        // canvas.setAttribute("width", canvasParent.innerWidth);
        var currAngle = -Math.PI/2;
        canvas.setAttribute("id", skillName);
        drawSkillToCard(canvas, context,skill, skills[skill], currAngle);
        canvasParent.append(canvas);
        i++;   
    }


// add css class to canvas when i create it
   
}

function drawSkillToCard(canvas, context, skill, percent, currAngle){
    var radius = 90 ;
    var frameRate = 20;
    var startAngle = -Math.PI/2;
    var endAngle = (2*Math.PI)*percent-Math.PI/2;
    currAngle = currAngle + endAngle/frameRate;

    // draw full outer border circle
    context.save();
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, radius, 0, 2*Math.PI, false);
    context.fillStyle = "rgb(223, 230, 245)";
    context.fill();

    // draw percentage arc
    // radius - 10
    context.beginPath();  
    context.arc(canvas.width/2, canvas.height/2, radius-10, startAngle, currAngle);
    context.strokeStyle = " rgb(0,255,0)";
    context.lineWidth = 20;
    context.stroke();

    // draw inner filled circle
    //radius - 20
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, radius - 10,0,2*Math.PI ,false);
    context.fillStyle = "rgb(21,44,85)";
    context.fill();

    // add text
    var percentStr = percent*100 + "%"
    context.font = "bold 16pt Verdana";
    context.fillStyle = " rgb(255, 140, 0)";
    context.textAlign = "center";
    context.fillText(percentStr, canvas.width/2, canvas.height/2);
    context.font = "14pt Verdana";
    context.fillText(skill, canvas.width/2, (canvas.height/2)+30);

    context.restore();

    if (currAngle < endAngle) {
        window.requestAnimationFrame(function(){drawSkillToCard(canvas, context, skill, percent, currAngle);});
    }

}


// var canvas = null;
// var canvasParent = null;
// var context = null;
// var copyOfCanvas = null;

// function drawSkillsCanvas(){
//     canvas = document.getElementById("myCanvas");
//     canvasParent = document.getElementById("myCanvas").parentElement; 
//     context = canvas.getContext("2d");
//     canvas.width = parseInt(window.getComputedStyle(canvasParent).width);
//     canvas.height = parseInt(window.getComputedStyle(canvasParent).height);
//     // widthPrev = canvas.width;
//     // console.log("width before resize = " + widthPrev);    
//     // context.clearRect(0,0, canvas.width, canvas.height); 
    

//     var radius = 70 ;
//     var xCord = radius;
//     var yCord = radius;
//     var maxWidth = canvas.width - radius;
//     var maxHeight = canvas.height - radius;

//     for(var skill in skills){

//         // check if current row is completely filled with circles, start on new row if it is
//         if(xCord >= maxWidth){
//             xCord = radius;

//             if(yCord+3*radius < maxHeight){
//                 yCord = yCord + 3*radius;
//             } else {
//                 console.log(" ERROR: MAX CANVAS HEIGHT REACHED")
//                 return;
//             }
//         }
//         var currAngle = -Math.PI/2;
//         drawSkillCircle(skill, skills[skill], xCord, yCord, radius, currAngle);
//         xCord = xCord + 2.5*radius;
//     }

//     // save completed canvas 
    
// }


// function drawSkillCircle(skill, mastery, xCord, yCord, radius, currAngle){
//     var frameRate = 20;
//     var startAngle = -Math.PI/2;
//     var endAngle = (2*Math.PI)*mastery-Math.PI/2;
//     currAngle = currAngle + endAngle/frameRate;

//     // draw full outer border circle
//     context.save();
//     context.beginPath();
//     context.arc(xCord, yCord, radius, 0, 2*Math.PI, false);
//     context.fillStyle = "rgb(223, 230, 245)";
//     context.fill();

//     // draw percentage arc
//     // radius - 10
//     context.beginPath();  
//     context.arc(xCord, yCord, radius-10, startAngle, currAngle);
//     context.strokeStyle = " rgb(0,255,0)";
//     context.lineWidth = 20;
//     context.stroke();

//     // draw inner filled circle
//     //radius - 20
//     context.beginPath();
//     context.arc(xCord, yCord, radius - 10,0,2*Math.PI ,false);
//     context.fillStyle = "rgb(21,44,85)";
//     context.fill();

//     // add text
//     var percentStr = mastery*100 + "%"
//     context.font = "bold 16pt Verdana";
//     context.fillStyle = " rgb(255, 140, 0)";
//     context.textAlign = "center";
//     context.fillText(percentStr, xCord, yCord);
//     context.font = "14pt Verdana";
//     context.fillText(skill, xCord, yCord+30);

//     context.restore();

//     if (currAngle < endAngle) {
//         window.requestAnimationFrame(function(){drawSkillCircle(skill, mastery, xCord, yCord, radius,currAngle);});
//     }

// }














// function resizeCanvas(){
//     var c = document.getElementById("myCanvas");
//     var context = c.getContext("2d");
//     canvasParent = document.getElementById("myCanvas").parentElement; 
//     // c.width = parseInt(window.getComputedStyle(canvasParent).width);
//     // c.height = parseInt(window.getComputedStyle(canvasParent).height);
//     c.setAttribute("height", window.innerHeight);
//     c.setAttribute("width", window.innerWidth);



//     context.beginPath();
//     context.arc(c.width/2, c.height/2, 100, 0, 2*Math.PI, false);
//     context.fillStyle = "red";
//     context.fill();



// }






//     var c = document.getElementById("c1");
 
//     // c.addEventListener("mouseover", changeColorMouseOver);
//     // c.addEventListener("mouseout", changeColorMouseOut);



//     function changeColorMouseOver(event){
//         c.style.setProperty("background", "blue"); 
//     }

//     function changeColorMouseOut(event){
//         c.style.setProperty("background", "green"); 
//     }

// scroll bar and scroll top

const scroll=document.querySelector(".scroller");
const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
const span=document.querySelector(".up");
console.log(document.documentElement.scrollHeight);
console.log(document.documentElement.clientHeight);
window.addEventListener("scroll",()=>{
  if(scrollY >=1000){
  span.classList.add("show");

  }else{
  
  span.classList.remove("show");
  }
  const scrollTop=document.documentElement.scrollTop;
  scroll.style.width=`${(scrollTop / height) * 100}%`;

});
span.onclick=function(){
  window.scrollTo({
    top:0,
    behavior:"smooth",
  });
}























// image slider

// Get Slider Items | Array.form [ES6 Feature]
var sliderImages = Array.from(document.querySelectorAll('.slider-container img'));

// Get Number Of Slides
var slidesCount = sliderImages.length;

// Set Current Slide
var currentSlide = 1;

// Slide Number Element
var slideNumberElement = document.getElementById('slide-number');

// Previous and Next Buttons
var nextButton = document.getElementById('next');
var prevButton = document.getElementById('prev');

// Handle Click on Previous and Next Buttons
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;

// Create The Main UL Element
var paginationElement = document.createElement('ul');

// Set ID On Created Ul Element
paginationElement.setAttribute('id', 'pagination-ul');

// Create List Items Based On Slides Count
for (var i = 1; i <= slidesCount; i++) {

  // Create The LI
  var paginationItem = document.createElement('li');

  // Set Custom Attribute
  paginationItem.setAttribute('data-index', i);

  // Set Item Content
  paginationItem.appendChild(document.createTextNode(i));

  // Append Items to The Main Ul List
  paginationElement.appendChild(paginationItem);

}

// Add The Created UL Element to The Page
document.getElementById('indicators').appendChild(paginationElement);

// Get The New Created UL
var paginationCreatedUl = document.getElementById('pagination-ul');

// Get Pagination Items | Array.form [ES6 Feature]
var paginationsBullets = Array.from(document.querySelectorAll('#pagination-ul li'));

// Loop Through All Bullets Items
for (var i = 0; i < paginationsBullets.length; i++) {

  paginationsBullets[i].onclick = function () {

    currentSlide = parseInt(this.getAttribute('data-index'));

    theChecker();

  }

}

// Trigger The Checker Function
theChecker();

// Next Slide Function
function nextSlide() {

  if (nextButton.classList.contains('disabled')) {

    // Do Nothing
    return false;

  } else {

    currentSlide++;

    theChecker();

  }

}

// Previous Slide Function
function prevSlide() {

  if (prevButton.classList.contains('disabled')) {

    // Do Nothing
    return false;

  } else {

    currentSlide--;

    theChecker();

  }

}

// Create The Checker Function
function theChecker() {

  // Set The Slide Number
  slideNumberElement.textContent = 'Slide ' + (currentSlide) + ' of ' + (slidesCount);

  // Remove All Active Classes
  removeAllActive();

  // Set Active Class On Current Slide
  sliderImages[currentSlide - 1].classList.add('active');

  // Set Active Class on Current Pagination Item
  paginationCreatedUl.children[currentSlide - 1].classList.add('active');

  // Check if Current Slide is The First
  if (currentSlide == 1) {

    // Add Disabled Class on Previous Button
    prevButton.classList.add('disabled');

  } else {

    // Remove Disabled Class From Previous Button
    prevButton.classList.remove('disabled');

  }

  // Check if Current Slide is The Last
  if (currentSlide == slidesCount) {

    // Add Disabled Class on Next Button
    nextButton.classList.add('disabled');

  } else {

    // Remove Disabled Class From Next Button
    nextButton.classList.remove('disabled');

  }

}

// Remove All Active Classes From Images and Pagination Bullets
function removeAllActive() {

  // Loop Through Images
  sliderImages.forEach(function (img) {

    img.classList.remove('active');

  });

  // Loop Through Pagination Bullets
  paginationsBullets.forEach(function (bullet) {

    bullet.classList.remove('active');

  });

}







// taps
var tabs=document.querySelectorAll("#btn");
var contents=document.querySelectorAll("#content");
tabs.forEach(tab => {
  tab.addEventListener("click" ,function(){
    tabs.forEach(tab => {
      tab.classList.remove("active");
    });
   this.classList.add("active");
    contents.forEach(cont=> {
      cont.style.display="none";
    });
    document.querySelector(this.dataset.con).style.display="block";
  })
});
  






// filter items
var filter=document.querySelectorAll("#fill");
var items=document.querySelectorAll("#ite");
filter.forEach(filt => {
  filt.addEventListener("click" , function(){
    filter.forEach(filt => {
          filt.classList.remove("active");
    });
this.classList.add("active");
items.forEach(item => {
  item.style.display="none";
});
document.querySelectorAll(this.dataset.cat).forEach((ele)=>{
  ele.style.display="block";
})
  })

});




// start skills

const section=document.querySelector(".skills");
const skills=document.querySelectorAll(".skill span");
window.onscroll=function(){
  if(scrollY >= section.offsetTop-300){
console.log("reached");
skills.forEach((skill)=>{
  skill.style.width=skill.dataset.width;
});
  }
};

// e.currentTarget == this but e is a parameter in function
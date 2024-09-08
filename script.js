// Variables
const ColorArr = [
    'red',
    'green',
    'blue',
    'yellow',
    'orange',
    'purple',
    'cyan',
    'magenta'
];

const doubleArr =[...ColorArr , ...ColorArr]
const arrlength =doubleArr.length
let gamewin=false
let counter=0
const cells =document.querySelectorAll('.cell')
const WinCounter =document.querySelector(".Counter")


// sort the doubleArr randomly
const randomArrColors = doubleArr.sort(function(){
    return 0.5 - Math.random()
})

let FirstCLick=0;
let SecondCLick=0;



// ##################################

// fill all cells with color and randomly and set background image to make them hidden.
cells.forEach((cell,i) => {
    
    let color =  randomArrColors[i]
    cell.style.backgroundColor = color
    cell.classList.add("hiddenImge")

  
});

// Functions ---------------

// function that check for matching the two cell clicked.




// ##################################


// Events ------------
let clickCount =0

for (let index = 0; index < cells.length; index++) {
    cells[index].addEventListener('click', function() {
        
        clickCount++
        ShowColor(cells[index],index ,clickCount);
        // console.log(clickCount)
        if(clickCount == 2)
        {
            clickCount=0
        }


    });
}




// ##################################

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

let pagelinkID = "1"

let soundWrong= new Audio();
soundWrong.src = "Sound/wrong.mp3"

let soundCorrect= new Audio();
soundCorrect.src = "Sound/correct.mp3"


let soundWin= new Audio();
soundWin.src = "Sound/win.mp3"



const cells =document.querySelectorAll('.cell')

const WinCounter =document.querySelector(".Counter")

const Win =document.querySelector(".win")

const Time =document.querySelector(".Time")

const button =document.querySelector(".button")

let mins=0
let secs=0

let startTime=0
let elpasedTime=0
let intarvalID;






// sort the doubleArr randomly
const randomArrColors = doubleArr.sort(function(){
    return 0.5 - Math.random()
})


// ##################################

// fill all cells with color and randomly and set background image to make them hidden.
cells.forEach((cell,i) => {
    
    let color =  randomArrColors[i]
    cell.style.backgroundColor = color
    cell.classList.add("hiddenImge")  
});

// Functions ---------------

// function that check for matching the two cell clicked.

function matchPairs(FirstCell, SecondCell,Firstindex,Secondindex){

    if(gamewin){
        return 
    }
    
    // if FirstCell & SecondCell exisit AND Firstindex is not equal Secondindex (to make sure it will to click on same cell)
    if
    (    FirstCell && SecondCell     && 
        (Firstindex !== Secondindex) && 
        (!FirstCell.classList.contains('hiddenImage') && !SecondCell.classList.contains('hiddenImage'))
    )
        {  

    // Get the background color of both cells
    const firstCellColor = window.getComputedStyle(FirstCell).backgroundColor;
    const secondCellColor = window.getComputedStyle(SecondCell).backgroundColor;

    if(firstCellColor !== secondCellColor){ // if selection is not matched.
        soundWrong.play()      


        FirstCell.classList.remove("hiddenImage")
        SecondCell.classList.remove("hiddenImage")

        // Make a delay so that the player can see for 0.3 second the wrong selection.
        setTimeout(() => {
            FirstCell.classList.add("hiddenImge")
            SecondCell.classList.add("hiddenImge")
        }, 300); 
        }
        else{ // matches found

            soundCorrect.play()      

                counter++
                //  Add class name :avoid-clicks" to avoid click on the cell that is orady has been matched.
                FirstCell.classList.add("avoid-clicks")
                SecondCell.classList.add("avoid-clicks")
                WinCounter.innerHTML = `<span>Counter Found:</span> ${counter}/8`
                if(counter === 8){
                    soundWin.play()

                    elpasedTime = Date.now() - startTime;
                    clearInterval(intarvalID)
                    Win.innerHTML = `Congratulation you win!`
                    gamewin=true;
                }
        
        
        }
    } else{  // IF the player click on same cell in which is does not make sense (Must select other cell )
        alert("Please select another card!")
        FirstCell.classList.add("hiddenImge")

    }

     // cell.classList.Add("anmation");
    }

function ShowColor(cell ,index,clickCount){
    if(clickCount == 1){
        Firstindex=index
        FirstCell=cell
        cell.classList.remove("hiddenImge")

    }  // if two clicks happen then check for matchPairs
    else if (clickCount == 2){
        Secondindex=index
         SecondCell =cell        
         cell.classList.remove("hiddenImge")
        matchPairs(FirstCell, SecondCell ,Firstindex,Secondindex)
    }


}
function loadPage(){
    window.location.href = "levelTwo.html";

}
// function to reset game 
function resetGame() {

    for (let index = 0; index < cells.length; index++) {
        // look for cell that contains'avoid-clicks' class and remove it and add hiddenImge to

            if(cells[index].classList.contains('avoid-clicks')){
             cells[index].classList.remove('avoid-clicks')
            }
            cells[index].classList.add('hiddenImge')
        }
            // return to defult 

            gameWon = false
            WinCounter.innerHTML = ' <span>Counter Found:</span> 0/8'
            counter =0

            // Do new random sort. 
            
            const randomArrColors = doubleArr.sort(function(){
                return 0.5 - Math.random()
            })
            cells.forEach((cell,i) => {
    
                let color =  randomArrColors[i]
                cell.style.backgroundColor = color
                cell.classList.add("hiddenImge")  
            });
            // reset time
            loadPage()


            

            
    }
    

    function updateTime(){
        elpasedTime = Date.now()-startTime;

        secs = Math.floor((elpasedTime/1000)%60);
        mins = Math.floor((elpasedTime/(1000*60))%60);


        Time.innerHTML = `<span>Time: </span><span class="numbers">${mins} : ${secs}</span> sec`;

    }

    // function that makes the link active for the current page
    function AddActiveLink(pagelinkID){
        const links = document.querySelectorAll('.contanier-levels li a ')

        if(pagelinkID == links[1].getAttribute('value') ){
            const link =document.querySelectorAll('.contanier-levels li')
            console.log(document.querySelectorAll('.contanier-levels li'))
            link[1].classList.add('active')

        }
    }

            



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

button.addEventListener('click',resetGame)


window.addEventListener("load", () => {
    startTime = Date.now() - elpasedTime;
    intarvalID =setInterval(updateTime,75);

    AddActiveLink(pagelinkID)

});




// ##################################


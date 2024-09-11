
// Variables
const ImagesArr = [
    'https://ca.slack-edge.com/T03JBCX8WE7-U05N2501BQD-f77834d43b15-512',
    'https://ca.slack-edge.com/T03JBCX8WE7-U07JD8HCH43-a104288cb0d9-192',
    'https://ca.slack-edge.com/T03JBCX8WE7-U06Q7GU50NR-48da4327f0ab-48'
]

const doubleArr =[...ImagesArr , ...ImagesArr]
const arrlength =doubleArr.length

let gamewin=false
let counter=0

const cells =document.querySelectorAll('.cell')

const WinCounter =document.querySelector(".Counter")

const Win =document.querySelector(".win")

const Time =document.querySelector(".Time")

const button =document.querySelector(".button")

let soundWrong= new Audio();
soundWrong.src = "Sound/wrong.mp3"

let soundCorrect= new Audio();
soundCorrect.src = "Sound/correct.mp3"


let soundWin= new Audio();
soundWin.src = "Sound/win.mp3"
let hrs=0
let mins=0
let secs=0

let startTime=0
let elpasedTime=0
let intarvalID;
let pagelinkID = "0"

// sort the doubleArr randomly
const randomArrImages = doubleArr.sort(function(){
    return 0.5 - Math.random()
})


// ##################################

// fill all cells with color and randomly and set background image to make them hidden.
cells.forEach((cell,i) => {
    console.log( randomArrImages[i])
    cell.style.backgroundImage = `url(${randomArrImages[i]})`;
    cell.classList.add("hiddenImge")  
});

// Functions ---------------

// function that check for matching the two cells clicked.

function matchPairs(FirstCell, SecondCell,Firstindex,Secondindex){

    if(gamewin){  // if gamewin true then return
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
    const firstCellColor = window.getComputedStyle(FirstCell).backgroundImage;
    const secondCellColor = window.getComputedStyle(SecondCell).backgroundImage;

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
                //  Add class name "avoid-clicks" to avoid click on the cell that is orady has been matched.
                FirstCell.classList.add("avoid-clicks")
                SecondCell.classList.add("avoid-clicks")

                WinCounter.innerHTML = `<span>Counter Found:</span> ${counter}/3`

                if(counter === 3){ // IF win happen 
                    soundWin.play()
                    // Stop the time
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
// function 'ShowColor' that store cards clicked information for both first and second clicks
// AND then passed them to 'matchPairs' function on the second click.  
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
    window.location.href = "levelOne.html";

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
            WinCounter.innerHTML = ' <span>Counter Found:</span> 0/3'
            counter =0

            // Do new random sort. 
            
            const randomArrImages = doubleArr.sort(function(){
                return 0.5 - Math.random()
            })
            cells.forEach((cell,i) => {
                cell.style.backgroundImage = `url(${randomArrImages[i]})`;
                cell.classList.add("hiddenImge")  
            });
            // reset time
            loadPage()
    }
    

    function updateTime(){
        elpasedTime = Date.now()-startTime;

        secs = Math.floor((elpasedTime/1000)%60);
        mins = Math.floor((elpasedTime/(1000*60))%60);

        hrs = Math.floor((elpasedTime/(1000 *60*60))%60);

        Time.innerHTML = `<span>Time: </span>${hrs} : ${mins} : ${secs} sec`;

    }


    // function that makes the link active for the current page
    function AddActiveLink(pagelinkID){
        const links = document.querySelectorAll('#contanier-levels-first li a ')
        console.log(links)
        if(pagelinkID == links[0].getAttribute('value') ){
            const link =document.querySelectorAll('#contanier-levels-first  li')
            console.log(document.querySelectorAll('#contanier-levels-first li'))
            link[0].classList.add('active')

        }
    }


// ##################################

// Events ------------
let clickCount =0


// EventListener for handing first and sesond clicks
for (let index = 0; index < cells.length; index++) {
    cells[index].addEventListener('click', function() {
        
        clickCount++  
        // call function 'ShowColor' taht 
        ShowColor(cells[index],index ,clickCount);
        // console.log(clickCount)
        if(clickCount == 2) // when it reach to second click then make it ZERO
        {
            clickCount=0
        }

    });
}
// EventListener for reset the game 

button.addEventListener('click',resetGame)

// EventListener for when load the page

window.addEventListener("load", () => {
    // time functionlity
    startTime = Date.now() - elpasedTime;
    intarvalID =setInterval(updateTime,75);

    //  call AddActiveLink that make the link active for current page 
    AddActiveLink(pagelinkID)

});




// ##################################
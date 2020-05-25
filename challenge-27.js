var elem = document.getElementsByTagName("div");
let puzzle = document.getElementById("puzzle");
let sudukoArray= [[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,]];
let emptyArray=[];
let someArray=document.getElementsByTagName("input"); // putting input elements into an array

for (y=0; y<9; y++)  { 
    let square = document.createElement("div");
    puzzle.appendChild(square);
        for (x=0; x<9; x++)  {       
            let cell = document.createElement("div");
            let input = document.createElement("input");
            input.type="number";
            input.size="1";
            input.min="0";
            input.max="9";
            input.maxLength="1";
            let name='cell'+y+x;
            input.id=`${name}`;
            cell.classList.add("cell");
            cell.appendChild(input);
            square.appendChild(cell);
        }
    square.classList.add("square");     
}; 

function solve(){
    let a, b;
    emptyArray=[];
    someArray=document.getElementsByTagName("input"); // putting input elements into an array
    for (x=0; x<someArray.length; x++){ // going throught the someArray to assign values to a & b to use to put ino suduko array to simplify checking rows and columns for values... harder to check the squares but doable
        if (x === 0 || x === 3 || x === 6 || x === 27 || x === 30 || x === 33 || x === 54 || x === 57 || x === 60 ){
            b=0;    
        }else if (x === 1 || x === 4 || x === 7 || x === 28 || x === 31 || x === 34 || x === 55 || x === 58 || x === 61){
            b=1;    
        }else if (x === 2 || x === 5 || x === 8 || x === 29 || x === 32 || x === 35 || x === 56 || x === 59 || x === 62){
            b=2;    
        }else if (x === 9 || x === 12 || x === 15 || x === 36 || x === 39 || x === 42 || x === 63 || x === 66 || x === 69){
            b=3;    
        }else if (x === 10 || x === 13 || x === 16 || x === 37 || x === 40 || x === 43 || x === 64 || x === 67 || x === 70){
            b=4;    
        }else if (x === 11 || x === 14 || x === 17 || x === 38 || x === 41 || x === 44 || x === 65 || x === 68 || x === 71){
            b=5;    
        }else if (x === 18 || x === 21 || x === 24 || x === 45 || x === 48 || x === 51 || x === 72 || x === 75 || x === 78){
            b=6;    
        }else if (x === 19 || x === 22 || x === 25 || x === 46 || x === 49 || x === 52 || x === 73 || x === 76 || x === 79){
            b=7;    
        }else if (x === 20 || x === 23 || x === 26 || x === 47 || x === 50 || x === 53 || x === 74 || x === 77 || x === 80){
            b=8;    
        } ;
        if ((x>=0 && x<=2) || (x>=9 && x<=11) || (x>=18 && x<=20)){
            a=0;    
        }else if ((x>=3 && x<=5) || (x>=12 && x<=14) || (x>=21 && x<=23)){
            a=1;    
        }else if ((x>=6 && x<=8) || (x>=15 && x<=17) || (x>=24 && x<=26)){
            a=2;    
        }else if ((x>=27 && x<=29) || (x>=36 && x<=38) || (x>=45 && x<=47)){
            a=3;    
        }else if ((x>=30 && x<=32) || (x>=39 && x<=41) || (x>=48 && x<=50)){
            a=4;    
        }else if ((x>=33 && x<=35) || (x>=42 && x<=44) || (x>=51 && x<=53)){
            a=5;    
        }else if ((x>=54 && x<=56) || (x>=63 && x<=65) || (x>=72 && x<=74)){
            a=6;    
        }else if ((x>=57 && x<=59) || (x>=66 && x<=68) || (x>=75 && x<=77)){
            a=7;    
        }else if ((x>=60 && x<=62) || (x>=69 && x<=71) || (x>=78 && x<=80)){
            a=8;    
        } ;
        //checking value of cell if between 0-9  then adding it to the sudukoArray to make it easier to search and then checking if it was assigned a value between 1-9 so can save the index values for it 
        if (someArray[x].value==="" || someArray[x].value===" " || someArray[x].value===null ){
            someArray[x].value = 0;
        }
        if (someArray[x].value<10 && someArray[x].value>-1){
            sudukoArray[a][b]=someArray[x];
        } else { //if the value is not between 0-9 then restting the value to the default of 0 and alerting user to enter a value between 0-9
            someArray[x].value = 0;
            alert("Please enter a value between 0-9");
            return
        };
    };
    check();
    
}; 

let a=1;
let fillCells=[];
let row=0;
let col=0;
let inc=0;
function check(){     
    //using loops to check each row/col
    for (r=0; r<9; r++){
        row=r;
        for (c=0; c<9; c++){
            col=c;
            inc++;
            console.log (inc);
            if (inc===30000){
                if (confirm('This is taking a long time.  Would you like to continue?')){
                    inc=0;
                }else{
                    r=8;
                    c=8;
                    reset();
                };
            }
            //if the cell is empty need to check if its row/col/square contain 1-9 and put the lowest possible value in it 
            if (sudukoArray[r][c].valueAsNumber===0){
                checkRowCol(); 
                //make sure r and c values match the row and col values in case they changed in a different function as r&c are used for the loop to tell what cells have been checked
                r=row;
                c=col;
            }else{
                 //if cell is not empty need to move to the next cell ... making sure a is equal to 1 before moving on
                a=1;
            }
        }
    }
}
    
function checkRowCol(){
    //checking row/col if contains 1-9 (a) 
    for (cell=0; cell<9; cell++){ 
        if (sudukoArray[row][cell].valueAsNumber===a || sudukoArray[cell][col].valueAsNumber===a){
            //if the value was found and it is under 9 then restart the loop and check for the next value 
            if (a<9){
                checkA(); 
                cell=-1; 
            } else {
                //if the value was found and it is 9 then you need to goback to the last cell filled out to redo it... all other values should have been checked already... end the loop
                cell=8;
                goBack();
            }
        }else{
            //when the value is not found check and all cells in the row/square have been checked then check the square
            if (cell===8){
            checkSquare();
            } 
        }
    }
}
    
function checkSquare(){
    //check for value in square after checking the row and col 
    //to figure out square divide row & col by 3 and round down regardless of the decimal... then times by 3.. that gives the starting row/col for the square
    let rowS = Math.floor(row/3);  let colS = Math.floor(col/3);
    rowS=rowS*3;
    colS=colS*3;
    //searching the 3 col in the 3 rows that make the square
    for (r=rowS; r<rowS+3; r++){
        for (c=colS; c<colS+3; c++){
            //the value was found
            if (sudukoArray[r][c].valueAsNumber===a){
                c=colS+3;
                r=rowS+3;
                if (a===9){
                    //if 9 was found then all rest have been looked for and found or don't work, so need to go back to last filled in cell to redo it 
                    goBack();
                }else {
                    //haven't tried all possible numbers yet so checck the next value up and start over looking through the row/col
                    checkA();
                    checkRowCol();
                }  
            }else{
                //if you checked the whole square and didn't find the value then add it to the cell and to the list of cells that you have filled and reset the value to look for to 1
                if (r===rowS+2 && c===colS+2){
                    sudukoArray[row][col].value=a;
                    fillCells.push([row,col,a]);
                    a=1;
                }  
            }
        }        
    }
}
    /**/
function checkA(){
    a++; //changing number to check for
    if (a===10){// resetting a... should anything else happen? 1-9 apparently are already in the row/column... how to go back to last cell done?
        a=1;
    }
}

function goBack(){
    if (fillCells.length===0){
        alert("This puzzle can not be solved.");
        reset();
        row=8;
        col=8;
        return;
    }else{
        //sets row, col and a to take you back to the last cell filled out
        row=fillCells[fillCells.length-1][0];
        col=fillCells[fillCells.length-1][1];
        sudukoArray[row][col].value=0;
        a=fillCells[fillCells.length-1][2];
        fillCells.pop(); 
        //need to prevent errors/issue if the col or row goes neg so that it will still take you to the correct cell
        col=col-1;
        if (col===-1){
            col=8;
            row=row-1;
            if (row===-1){
                //should take you to the very first cell
                row=0;
                col=-1;
            }
        }
        checkA();
        //if a was reset to 1 that means 9 was tried so you should go back to a previous cell again
        if (a===1){
            goBack();
        }
    }
    
}

function reset(){
    for (x=0; x<someArray.length; x++){
        someArray[x].value="";
    }
    sudukoArray= [[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,]];
    emptyArray=[];
}

function preset(){
    reset();
    someArray[0].value=3;
    someArray[3].value=9;
    someArray[6].value=4;
    someArray[8].value=8;
    someArray[13].value=3;
    someArray[16].value=2;
    someArray[17].value=1;
    someArray[18].value=4;
    someArray[19].value=8;
    someArray[28].value=4;
    someArray[29].value=6;
    someArray[34].value=8;
    someArray[37].value=7;
    someArray[41].value=3;
    someArray[44].value=4;
    someArray[46].value=3;
    someArray[48].value=8;
    someArray[49].value=7;
    someArray[51].value=6;
    someArray[61].value=2;
    someArray[64].value=4;
    someArray[68].value=9;
    someArray[72].value=5;
    someArray[74].value=9;
    someArray[77].value=7;
    someArray[78].value=1;
}



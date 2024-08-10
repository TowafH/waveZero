/*

Option 1: do what you are doing now ( copy and paste)

Option 2: make a function to help you simplify your code

let bottleX;
let bottleY;

let bottleX;
let bottleY;

let bottleX;
let bottleY;

let bottleX;
let bottleY;

function moveBottle(x,y){
    // write the code to move the bottle from top to bottom 

    // Check if bottle has fallen out of the canvas
        if (bottleY > height) {
            // Restart the bottle position
            bottleX = random(50, width -50);
            bottleY = random(-500,-50);
        }

}

Option 3: use arrays to help store the positions
let allBottleX = [];
let allBottleY = [0, 0, 0];


// repeat this procces 100 times ( create bottle random x positions)
for (.........){
    allBottleX.push(random(0,255));
}


// used to draw bottles and implement the logic
Ex: 0 - 2
for (.......){

    rect(allBottleX[i],allBottleY[i], 50,50);
}


*/


//X Coord & Y Coords for HomeScreen Rect
let levelsXPos = 250;
let level1YPos = 300;
let level2YPos = 450;
let level3YPos = 600;

//Variables to switch Screens
let One = false;
let Two = false;
let Three = false;
let clickbutton = true;

//Variables to Preload Images/Sounds
let fish;
let bottle;
let scuba;
let bg;
let bg_fail;
let scubaImg;
let myFont;
let bottlePickUpSound;
let fishPickUpSound;
let winSound;
let loseSound;

//Setup Scuba Diver Collision Variable
let myxPos = 250;
let myYpos = 600;

// Array to store bottle and fish positions // CHANGE
let allBottleX = [];
let allBottleY = [];
let allFishX = [];
let allFishY = [];
let numBottles = 2;
let numFish = 2;  // END OF CHANGE

//Initial Score Variables
let trashScore = 0;
let lives = 5;

let trashScore2 = 0;
let lives2 = 3;

let trashScore3 = 0;
let lives3 = 2;

//timer

let timer1 = 20;
let timer2 = 15;
let timer3 = 10;
let loosetime = 0;

function preload(){
    fish = loadImage("images/fish.png");// changed to fish it was in bg
    bottle = loadImage("images/bottle.png");
    scuba = loadImage("images/scuba.png");
    bg_home = loadImage("images/bg_home.png")
    bg_game = loadImage("images/bg_game2.png");
    bg_fail = loadImage("images/bg_fail.jpg");
    bg_win = loadImage("images/bg_win.png");
    scubaImg = loadImage("images/scuba.png");
    scubaLogo = loadImage("images/scubaLogo.png");
    myFont = loadFont("static/Genos-Bold.ttf")
    bottlePickUpSound = loadSound("sounds/coin.mp3");
    fishPickUpSound = loadSound("sounds/error.mp3");
    winSound = loadSound("sounds/win.mp3");
    loseSound = loadSound("sounds/fail.mp3");
}


function loose() {
    if (loseSound.isPlaying() == false) {
        loseSound.play();
    }
    background(135,206,235);
    image(bg_fail, 0, 0, 500, 800);

    image(scubaLogo, 210, 1, 100, 100);
    textSize(22);
    stroke(1);
    text("Ocean Crew", 260, 120, 300, 100);

//Seperation line from Top
    fill(255)
    rect(100, 100, 800, 10);

//Box for Level Fail
    fill(255);
    rect(250, 200, 300, 100, 5);

//Text within Level Failed Box
    fill(0);
    textSize(30);
    stroke(1);
    text("Level Failed :(", 260, 240, 300, 100);

//Box for Fail
    fill(255);
    rect(250, 350, 300, 100, 5);

//Text within Fail Box
    fill(0);
    textSize(30);
    stroke(1);
    text("Oh No", 250, 340, 300, 50);
    textSize(25);
    text("The Ocean is polluted!", 255, 380, 300, 30);
    wait(5000);
    loseSound.stop();
}
    function winnn() {
        //Setup Win Sound Effect
        if (winSound.isPlaying() == false) {
            winSound.play();
            
        }
        
//Changes screen to the Completion Screen
        background(135,206,235);
        image(bg_win, 0, 0, 500, 800);
//Generates the Game Logo
        image(scubaLogo, 210, 1, 100, 100);
        textSize(22);
        stroke(1);
        text("Ocean Crew", 260, 120, 300, 100);

        //Seperation line from Top
        fill(255)
        rect(100, 100, 800, 10);

//Box for Level Completed
        fill(255);
        rect(250, 200, 300, 100, 5);

//Text within Level Completed Box
        fill(0);
        textSize(30);
        stroke(1);
        text("Level Completed!!", 255, 240, 300, 100);

//Box for Congratulations
        fill(255);
        rect(250, 350, 300, 100, 5);

//Text within Congratulations Box
        fill(0);
        textSize(30);
        stroke(1);
        text("Congratulations!", 255, 340, 300, 50);
        textSize(25);
        text("You saved the Ocean", 255, 380, 300, 30);
        Two == false;
        wait(5000);
         winSound.stop();
    }


function setup() {
    createCanvas(500, 700);
    for (let i = 0; i < numBottles; i++) { // CHANGE
        allBottleX.push(random(50, width - 50));
        allBottleY.push(random(-500, -50));
    }
    for (let i = 0; i < numFish; i++) {
        allFishX.push(random(50, width - 50));
        allFishY.push(random(-500, -50));
    }                                       // END OF CHANGE

    noStroke();
    rectMode(CENTER);
    textFont(myFont);

    //Background Image for HomeScreen
    background(135,206,235);
    image(bg_home, 0, 0, 500, 800);

    //Headline Rect
    stroke(255,255,255);
    fill(177, 212, 224);
    rect(250, 80, 274, 133, 10);

    //Text within topRect
    noStroke();
    fill(20, 93, 160);
    textSize(45);
    textAlign(CENTER);
    text("Scuba Heritage", 255, 70, 200, 100);

    // Rectangle to Click Level 1
    stroke(255,255,255);
    fill(20, 93, 160);
    rect(levelsXPos, level1YPos, 250, 100, 5); 
    noStroke();
    textSize(40);
    fill(177, 212, 224);
    textAlign(CENTER);
    text("Easy", 255, 315, 120, 80);

    // Rectangle to Click Level 2
    stroke(255,255,255);
    fill(20, 93, 160);
    rect(levelsXPos, level2YPos, 250, 100, 5);
    noStroke();
    textSize(40);
    fill(177, 212, 224);
    textAlign(CENTER);
    text("Medium", 255, 477, 120, 100);

    // Rectangle to Click Level 3
    stroke(255,255,255);
    fill(20, 93, 160);
    rect(levelsXPos, level3YPos, 250, 100, 5);
    noStroke();
    textSize(40);
    fill(177, 212, 224);
    textAlign(CENTER);
    text("Hard", 255, 625, 120, 100);
    fill(0,0,0);
}


function draw() { 

    if(trashScore >= 5){
winnn();
    } 

//Checks if the user lost all their lives, switch to failScreen
    else if (lives == 0){
//Setup lose sound effect
       loose();
    }

    else if(One == true) {

        console.log("Inside level1");
        background(135,206,235)
        image(bg_game, 0, 0, 500, 800);

        textSize(20);
        fill(0);
        text("Ocean Crew", 60, 20);
        text("Score: " + trashScore, 45, 60);
        text("Lives: " + lives, 45, 45);

        // timer
        textSize(20);
        fill(0);
        text("Timer: " + timer1, 200, 20);
        let currenttime1 = millis();
        if(currenttime1 - loosetime >= 1000) {
                timer1 -= 1;
                loosetime = currenttime1;
        }

        if( timer1 == 0) { 
            loose();
        }

       

        fill(255);
        text("Avoid the Fish", 430, 20);
        text("Collect 5 bottles to win!", 390, 60);

        for (let i = 0; i < allBottleX.length; i++) {  

            //Draw & Increment the Falling Bottles
            allBottleY[i] += 3;
            image(bottle, allBottleX[i], allBottleY[i]);

            //If bottles that fall down, exceed the height, respawn
            if (allBottleY[i] > height) {
                allBottleX[i] = random(50, width - 50);
                allBottleY[i] = random(-500, -50);
            }

            //Checking for bottle collisions
            if (allBottleX[i] > myxPos - 20 && allBottleX[i] < myxPos + 80 && allBottleY[i] > myYpos - 20 && allBottleY[i] < myYpos + 80) {
                trashScore++;
                allBottleX[i] = random(50, width - 50);
                allBottleY[i] = random(-500, -50);
                bottlePickUpSound.play();
            }
        }

        for (let i = 0; i < allFishX.length; i++) {

            //Draw & Increment the falling fish
            allFishY[i] += 3;
            image(fish, allFishX[i], allFishY[i]);

            //If bottles that fall down, exceed the height, respawn
            if (allFishY[i] > height) {
                allFishX[i] = random(50, width - 50);
                allFishY[i] = random(-500, -50);
            }

            //Checking for Fish Collision
            if (allFishX[i] > myxPos - 20 && allFishX[i] < myxPos + 80 && allFishY[i] > myYpos - 20 && allFishY[i] < myYpos + 80) {
                lives--;
                allFishX[i] = random(50, width - 50);
                allFishY[i] = random(-500, -50);
                fishPickUpSound.play();
            }

        
        }   



        //Draw scuba Image 
        image(scuba, myxPos, myYpos, 80, 80);

        // Movement keys with boundary checks
        if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && myxPos > 0) {
            myxPos -= 10;
        } 

        if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && myxPos < width - 50) {
            myxPos += 10;
        } 

        if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && myYpos > 0) {
            myYpos -= 10;
        } 

        if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && myYpos < height - 50) {
            myYpos += 10;
        }
    }
        //END OF CODE FOR LEVEL 1

        
    if(trashScore2 >= 7){
        winnn();
            } 
        
        //Checks if the user lost all their lives, switch to failScreen
            else if (lives2 == 0){
        //Setup lose sound effect
                loose();
            }
        
            else if(Two == true) {
        
                console.log("Inside level2");
                background(135,206,235)
                image(bg_game, 0, 0, 500, 800);
        
                textSize(20);
                fill(0);
                text("Ocean Crew", 60, 20);
                text("Score: " + trashScore2, 45, 60);
                text("Lives: " + lives2, 45, 45);
                  // timer
                  textSize(20);
                  fill(0);
                  text("Timer: " + timer2, 200, 20);
                  let currenttime2 = millis();
                  if(currenttime2 - loosetime >= 1000) {
                          timer2 -= 1;
                          loosetime = currenttime2;
                  }
          
                  if( timer2 == 0) { 
                      loose();
                  }

        
                fill(255);
                text("Avoid the Fish", 430, 20);
                text("Collect 7 bottles to win!", 390, 60);
        
                for (let i = 0; i < allBottleX.length; i++) {  //change
        
                    //Draw & Increment the Falling Bottles
                    allBottleY[i] += 7;
                    image(bottle, allBottleX[i], allBottleY[i]);
        
                    //If bottles that fall down, exceed the height, respawn
                    if (allBottleY[i] > height) {
                        allBottleX[i] = random(50, width - 50);
                        allBottleY[i] = random(-500, -50);
                    }
        
                    //Checking for bottle collisions
                    if (allBottleX[i] > myxPos - 20 && allBottleX[i] < myxPos + 80 && allBottleY[i] > myYpos - 20 && allBottleY[i] < myYpos + 80) {
                        trashScore2++;
                        allBottleX[i] = random(50, width - 50);
                        allBottleY[i] = random(-500, -50);
                        bottlePickUpSound.play();
                    }
                }
        
                for (let i = 0; i < allFishX.length; i++) {
        
                    //Draw & Increment the falling fish
                    allFishY[i] += 7;
                    image(fish, allFishX[i], allFishY[i]);
        
                    //If bottles that fall down, exceed the height, respawn
                    if (allFishY[i] > height) {
                        allFishX[i] = random(50, width - 50);
                        allFishY[i] = random(-500, -50);
                    }
        
                    //Checking for Fish Collision
                    if (allFishX[i] > myxPos - 20 && allFishX[i] < myxPos + 80 && allFishY[i] > myYpos - 20 && allFishY[i] < myYpos + 80) {
                        lives2--;
                        allFishX[i] = random(50, width - 50);
                        allFishY[i] = random(-500, -50);
                        fishPickUpSound.play();
                    }
                }    // end of change
        
        
        
                //Draw scuba Image 
                image(scuba, myxPos, myYpos, 80, 80);
        
        // Movement keys with boundary checks
        if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && myxPos > 0) {
            myxPos -= 10;
        } 

        if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && myxPos < width - 50) {
            myxPos += 10;
        } 

        if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && myYpos > 0) {
            myYpos -= 10;
        } 

        if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && myYpos < height - 50) {
            myYpos += 10;
        }
    }
                //END OF CODE FOR LEVEL 2



                        if(trashScore3 >= 10){
                        winnn();
                        } 
                    
                        //Checks if the user lost all their lives, switch to failScreen
                        else if (lives3 == 0){
                        //Setup lose sound effect
                         loose();
                        }

                        else if(Three == true) {
                    
                        console.log("Inside level3");
                        background(135,206,235)
                            image(bg_game, 0, 0, 500, 800);
                    
                            textSize(20);
                            fill(0);
                            text("Ocean Crew", 60, 20);
                            text("Score: " + trashScore3, 45, 60);
                            text("Lives: " + lives3, 45, 45);

                            //timer
                            textSize(20);
                            fill(0);
                            text("Timer: " + timer3, 200, 20);
                            let currenttime3 = millis();
                            if(currenttime3 - loosetime >= 1000) {
                                    timer3 -= 1;
                                    loosetime = currenttime3;
                            }
                    
                            if( timer3 == 0) { 
                                loose();
                            }
                    
                            fill(255);
                            text("Avoid the Fish", 430, 20);
                            text("Collect 10 bottles to win!", 390, 60);
                    
                            for (let i = 0; i < allBottleX.length; i++) {  //change
                    
                                //Draw & Increment the Falling Bottles
                                allBottleY[i] += 10;
                                image(bottle, allBottleX[i], allBottleY[i]);
                    
                                //If bottles that fall down, exceed the height, respawn
                                if (allBottleY[i] > height) {
                                    allBottleX[i] = random(50, width - 50);
                                    allBottleY[i] = random(-500, -50);
                                }
                    
                                //Checking for bottle collisions
                                if (allBottleX[i] > myxPos - 20 && allBottleX[i] < myxPos + 80 && allBottleY[i] > myYpos - 20 && allBottleY[i] < myYpos + 80) {
                                    trashScore3++;
                                    allBottleX[i] = random(50, width - 50);
                                    allBottleY[i] = random(-500, -50);
                                    bottlePickUpSound.play();
                                }
                            }
                    
                            for (let i = 0; i < allFishX.length; i++) {
                    
                                //Draw & Increment the falling fish
                                allFishY[i] += 12;
                                image(fish, allFishX[i], allFishY[i]);
                    
                                //If bottles that fall down, exceed the height, respawn
                                if (allFishY[i] > height) {
                                    allFishX[i] = random(50, width - 50);
                                    allFishY[i] = random(-500, -50);
                                }
                    
                                //Checking for Fish Collision
                                if (allFishX[i] > myxPos - 20 && allFishX[i] < myxPos + 80 && allFishY[i] > myYpos - 20 && allFishY[i] < myYpos + 80) {
                                    lives3--;
                                    allFishX[i] = random(50, width - 50);
                                    allFishY[i] = random(-500, -50);
                                    fishPickUpSound.play();
                                }
                            }    // end of change
                    
                    
                    
                            //Draw scuba Image 
                            image(scuba, myxPos, myYpos, 80, 80);
                    
        // Movement keys with boundary checks
        if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && myxPos > 0) {
            myxPos -= 10;
        } 

        if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && myxPos < width - 50) {
            myxPos += 10;
        } 

        if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && myYpos > 0) {
            myYpos -= 10;
        } 

        if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && myYpos < height - 50) {
            myYpos += 10;
        }
    }
}


function mouseClicked() {
    //Selects the Area that has to be clicked to start level 1
    if (mouseX > levelsXPos - 137 && mouseX < levelsXPos + 137 &&  mouseY > level1YPos - 52.5 && mouseY < level1YPos + 52.5 &&  clickbutton == true) {
        console.log("Level 1 clicked");
        background(135,206,235);
        One = true;
        clickbutton == false; 
    } 

    // Generates the fish
    for (let i = 0; i < numFish; i++) {
        allFishX[i] = random(50, width - 50);   
        allFishY[i] = random(-500, -50);
    }
            
    // Generates the bottle
    for (let i = 0; i < numBottles; i++) {
        allBottleX[i] = random(50, width - 50); 
        allBottleY[i] = random(-500, -50); 
    }

 

    //Selects the Area that has to be clicked to start level 2
    if (mouseX > levelsXPos - 137 && mouseX < levelsXPos + 137 && mouseY > level2YPos - 52.5 && mouseY < level2YPos + 52.5 && clickbutton == true) {
        console.log("Level 2 clicked");
        background(135,206,235);
        Two = true;
        clickbutton == false; 
    }   
    
    //Selects the Area that has to be clicked to start level 3
    if (mouseX > levelsXPos - 137 && mouseX < levelsXPos + 137 &&  mouseY > level3YPos - 52.5 && mouseY < level3YPos + 52.5 && clickbutton == true) {
        console.log("Level 3 clicked");
        background(135,206,235);
        Three = true;
    }
}


//Create a function that spawns a bottle at random X position from top of the screen (y = 0 or less than). 
// Since draw() runs infinite amount of times, if you call the function, it'll probably spawn a bunch
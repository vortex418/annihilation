    var sketchProc = function(processingInstance) {
	   var mouseIsPressed = false;
        processingInstance.mousePressed = function () { mouseIsPressed = true; };
        processingInstance.mouseReleased = function () { mouseIsPressed = false; };
	   var keyIsPressed = false;
        processingInstance.keyPressed = function () { keyIsPressed = true; };
        processingInstance.keyReleased = function () { keyIsPressed = false; };
	    
     with (processingInstance) {
		size(1024, 576);
        	frameRate(10);
		window.scrollTo(10,8);
        // ProgramCode V V V
		/**
		Scene table:
		- 1-9 = menu -
		1 = main menu
		- 10-19 = campain -
		10 = How to Play
		11 = Name character
		12 = Galaxy Map
		13 = Shipyard
		14 = Laboratory
		15 = settings
		16 = planet overview
		17 = planet battle
		18 = victory/defeat
		- 20-29 = sandbox -
		20 = Feature not added
		**/
		//basic vars
		var scene = 1;
		var sub = 0;
		var Uname = "";
		var skip = 0;
		//vars for star cords
		var starX = [
			[776,447,567,910,219,640,440,991,669,734,715,730,807,692,714,97,944,294,168,431,765,730,468,298,579],
			[311,157,625,759,517,376,392,277,502,258,936,854,832,194,380,730,859,158,77,145,146,397,500,709,290],
			[495,764,594,485,295,169,833,502,178,296,023,123,934,564,299,554,722,781,986,442,912,93,655,241,961]
		];
		var starY = [
			[561,570,420,298,229,532,253,323,305,384,290,104,409,115,117,315,179,267,515,471,240,421,229,107,236],
			[225,395,558,299,308,399,255,526,459,404,377,559,257,357,483,426,226,398,127,347,515,168,553,249,322],
			[265,151,240,569,76,410,450,154,134,467,154,312,465,354,232,436,448,217,223,145,438,258,573,513,464]
		];
		var starSize = [2,3,5,4,5,3,5,3,1,4,5,3,5,3,5,2,5,5,4,2,3,4,5,5,3];
		//vars for planets
		var planetName = ["home","[1] Planet 1","[2] Planet 2","[3] Planet 3","[4] Planet 4","[5] Planet 5","[6] Planet 6","[7] Planet 7","[8] Planet 8","[9] secret planet"];
		var planetOccupied = [2,1,1,1,1,1,1,1,1];
		var planetColor = [
			[100,98,30,90,187,214,255,234,57],
			[90,140,17,87,130,159,97,199,76],
			[110,139,68,95,110,255,92,207,32],
		];
		//vars for research
		var armorLevel = 0;
		var shieldLevel = 0;
		var weaponLevel = 0;
		var missleLevel = 0;
		var speedLevel = 0;
		var agilityLevel = 0;
		var techPoints = 100;
		var techColor;
		//vars for ship building and resources
		var metal = 10000;
		var minerals = 5000;
		var fuel = 2500;
		// how many of each type of ship(corvette, frigate, crusier, destroyer,battleship) with [0] being nothing
		var shipNum = [0,0,0,0,0,0];
		var shipTotal;
		var shipStrength;
		var shipRecommended = ["n/a",15,30,60,250,400,750,1000,1000,1500,2500];
		var shipDifficulty = ["n/a","easy","easy-medium","medium","medium","medium-hard","hard","hard","hard-insane","insane"];
		var shipX = [width/64*16,width/64*15,width/64*1,width/64*8,width/64*20,width/64*27,width/64*26,width/64*11,width/64*2,width/64*24,width/64*1,width/64*4,width/64*11,width/64*20,width/64*9,width/64*26,width/64*27,width/64*1,width/64*19,width/64*6,width/64*15,width/64*21,width/64*12,width/64*20,width/64*11];
		var shipY = [width/64*30,width/64*37,width/64*21,width/64*19,width/64*5,width/64*54,width/64*17,width/64*2,width/64*36,width/64*56,width/64*41,width/64*51,width/64*48,width/64*10,width/64*31,width/64*31,width/64*8,width/64*40,width/64*4,width/64*10,width/64*59,width/64*52,width/64*29,width/64*10,width/64*27];
		var shipZ = 0;
		var shipShields;
		var shipBattle = false;
		var battleWon = false;
		var shipTick;
		var enemyTick;
		var burnTime = 10;
		var burnCords = [0,0,0,0];
		var burn = [false, false];
		var burnX;
		var burnY;
		var enemyX = [width/64*32,width/64*38,width/64*44,width/64*50];
		var enemyY = [height/64*0,height/64*6,height/64*12,height/64*18,height/64*24,height/64*32,height/64*40,height/64*46,height/64*52,height/64*58]; 
		var enemyShields;
		var cX;
		var cY;
		var cXmin = [0,2,2,2,2,2,2,1,1,1];
		var cXmax = [0,2,2,2,2,2,2,2,2,2];
		var cYmin = [0,4,3,3,2,2,1,3,2,1];
		var cYmax = [0,6,7,7,8,8,9,7,8,9];
		// function to draw ships, I figured to put it here since it makes more sense next to the ship var than the other functions
		// type: which type(1-5 yours,11-15 enemy) ,shields: % shields are at, if any
		var shipDraw = function(type,shields,x,y){
			if(type === 1){
				fill(128,128,128);
				stroke(0,255,255,shields);
				rect(x,y-5,25,10);
				rect(x-5,y-12.5,5,25);
				rect(x-10,y-12.5,5,5);
				rect(x-10,y-2.5,5,5);
				rect(x-10,y+7.5,5,5);
			}
			if(type === 2){
				fill(128,128,128);
				stroke(0,255,255,shields);
				triangle(x+5,y-12.5,x+35,y,x+5,y+12.5);
				rect(x,y-5,5,10);
				rect(x-5,y-12.5,5,25);
				rect(x-10,y-12.5,5,5);
				rect(x-10,y-2.5,5,5);
				rect(x-10,y+7.5,5,5);
			}
			if(type === 3){
				fill(128,128,128);
				stroke(0,255,255,shields);
				quad(x,y-25,x+50,y-2.5,x+50,y+2.5,x,y+25);
				rect(x-15,y-25,15,50);
				rect(x-24,y-20,7.5,10);
				rect(x-24,y-5,7.5,10);
				rect(x-24,y+10,7.5,10);
			}
			if(type === 4){
				fill(128,128,128);
				stroke(0,255,255,shields);
				triangle(x,y-30,x+100,y,x,y+30);
			}
			if(type === 5){
				fill(128,128,128);
				stroke(0,255,255,shields);
				triangle(x,y-30,x+125,y,x,y+30);
			}
			if(type === 11){
				fill(128,128,128);
				stroke(255,0,0,shields);
				rect(x,y-5,25,10);
				rect(x+25,y-12.5,5,25);
				rect(x+30,y-12.5,5,5);
				rect(x+30,y-2.5,5,5);
				rect(x+30,y+7.5,5,5);
			}
			if(type === 12){
				fill(128,128,128);
				stroke(255,0,0,shields);
				triangle(x,y-12.5,x-30,y,x,y+12.5);
				rect(x,y-5,5,10);
				rect(x+5,y-12.5,5,25);
				rect(x+10,y-12.5,5,5);
				rect(x+10,y-2.5,5,5);
				rect(x+10,y+7.5,5,5);
			}
			if(type === 13){
				fill(128,128,128);
				stroke(255,0,0,shields);
				quad(x,y-25,x-50,y-2.5,x-50,y+2.5,x,y+25);
				rect(x,y-25,15,50);
				rect(x+15,y-20,7.5,10);
				rect(x+15,y-5,7.5,10);
				rect(x+15,y+10,7.5,10);
			}
			if(type === 14){
				fill(128,128,128);
				stroke(255,0,0,shields);
				triangle(x,y-30,x-100,y,x,y+30);
			}
			if(type === 15){
				fill(128,128,128);
				stroke(255,0,0,shields);
				triangle(x,y-30,x-125,y,x,y+30);
			}
		};
		//vars for text boxes
		var chars     =["","","","","","","","","","    ","","","","\n","\n","","shift","ctrl","alt","pause/break","caps","","","","","","","esc","","","",""," ","pg up","pg down","end","home","","","","","","","","","insert","delete","","0","1","2","3","4","5","6","7","8","9","","","","","","","","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]; 
		var shiftChars=["","","","","","","","","","    ","","","","","\n","\n","shift","ctrl","alt","pause/break","caps","","","","","","","esc","","","",""," ","pg up","pg down","end","home","","","","","","","","","insert","delete","",")","!","@","#","$","%","^","&","*","(","","","","","","","","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]; 

		var shift = false;
		var boxSelected = false;
		var Text = "";
		var textsize = height/32;
		var cursorVisible = false;
		var cursorTime=0;
		var textBox = function(x,y,width){
			textAlign(LEFT,CENTER);
		    if(shift){

				  Text = Text.substring(0,Text.length-6);
				  Text+=shiftChars[keyCode];
				  shift = false;

		    }
		    if(Text.substring(Text.length-6,Text.length-1)==="shift"&& !keyIsPressed){
			   shift = true;
		    }
		    keyPressed = function() { 

				  if(keyCode === 37||keyCode ===  8){
					 Text = Text.substring(0,Text.length-1);
				  }
				  if(keyCode===188){
					 Text+=","; 

				  } else if(keyCode===190){
					 Text+="."; 

				  } else{
					 Text+=chars[keyCode];
				  } 
		    }; 

				  fill(128,128,128);
				  rect(x,y,width,25);

			   fill(255, 0, 0);
			   text(Text.substring(Text.length-width/5.5,Text.length),x+5,y+16);
			   if(mouseIsPressed){
				  if(mouseX>x&&mouseY>y&&mouseX<x+width&&mouseY<y+22){ 
				  boxSelected = true;
				  } else{
					 boxSelected = false;
				  }
			   }
			   if(boxSelected){
				  cursorTime-=1;
				  if(cursorVisible)
				  {
				  line(x+5+Text.length*textsize,y+2,x+5+Text.length*textsize,y+20);
					 if(cursorTime<0)
					 {
						cursorVisible=false;
						cursorTime = 20;
					 }
				  }
				  else
				  {
					 if(cursorTime<0)
					 {
						cursorVisible=true;
						cursorTime = 20;
					 }
				  }
			   }
			textAlign(CENTER,CENTER);
		};
		var starscape = function(num){
			fill(255,255,255);
			noStroke();
			for(var i = 0; i < 25; i++){
				ellipse(starX[num][i],starY[num][i],starSize[i],starSize[i]);
			}
		};
		var object = function(name,alligence,x,y,z,a,b,c){
			fill(255,255,255);
			if(alligence === 0){
				noStroke();
			}
			if(alligence === 1){
				stroke(255,0,0);
			}
			if(alligence === 2){
				stroke(0,255,0);
			}
			if(alligence === 3){
				stroke(255,255,255);
			}
			text(name,x,y+(z*0.6));
			fill(a,b,c);
			ellipse(x,y,z,z);
		};
		
		draw = function(){
			shipStrength = (shipNum[1]*1 + shipNum[2]*5 + shipNum[3]*10 + shipNum[4]*25 + shipNum[5]*100)*(weaponLevel*0.1+1);
			shipTotal = shipNum[1] + shipNum[2] + shipNum[3] + shipNum[4] + shipNum[5];
			if(shipBattle === false){
				shipShields = (shipNum[1]*10+shipNum[2]*25+shipNum[3]*50+shipNum[4]*100+shipNum[5]*250)*(armorLevel*0.1+1);
				enemyShields = [null,100,250,500,1000,3000,4000,5500,7500,10000];
			}
			shipTick = round(random(0,100));
			enemyTick = round(random(0,100));
			if(burnTime <= 0){
				burn[0] = false;
			}
			if(burn[0] === false){
				burnTime = 10;
			}
			if(scene === 1){
				background(0,0,0);
				fill(255,255,255);
				noStroke();
				for(var i = 0; i < 25; i++){
					ellipse(starX[0][i],starY[0][i],starSize[i],starSize[i]);
				}
				fill(128,128,128);
				noStroke();
				rect(width/2-width/8,height/2-height/32,width/4,height/16);
				rect(width/2-width/8,height/2+height/16,width/4,height/16);
				fill(255,0,0);
				textAlign(CENTER,CENTER);
				textSize(width/16);
				text("A n n i h i l a t i o n",width/2,height/4);
				textSize(height/32*1.5);
				text("Campain",width/2,height/2);
				text("Sandbox",width/2,height/2*1.18);
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/32 && mouseY > height/2-height/32 && mouseIsPressed && skip === 0) {
					scene = 10;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/32 && mouseY > height/2-height/32 && mouseIsPressed && skip === 2) {
					scene = 12;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8 && mouseY > height/2+height/16 && mouseIsPressed) {
					scene = 20;
				}
			}
			if(scene === 10){
				background(0,0,0);
				noStroke();
				textAlign(CENTER,CENTER);
				fill(255,0,0);
				textSize(width/32);
				text("Story",width/2,height/4);
				textSize(height/32);
				text("You are a conquester. Your're goal is to take over the galaxy. You take off from your home system,",width/2,height/2-height/12);
				text("your destination over 100 years away. But you don't make it. ",width/2,height/2-height/20);
				text("Halfway through the trip, youre convoy is attacked and you're ship gets knocked off-course.",width/2,height/2);
				text("You wake up at the right time, but not in the right place. Now, you're over 25 years away from help. ",width/2,height/2+height/20); 
				text("But you have a fleet and troops. You're new goal: Get back home, at whatever costs.",width/2,height/2+height/12);
				fill(128,128,128);
				rect(width/2-width/8*1.25,height/2+height/8+height/32,width/4*1.25,height/16);
				fill(255,0,0);
				textSize(height/32*1.5);
				text("Start or Continue Game",width/2,height/2*1.375);
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8+height/16+height/32 && mouseY > height/2+height/8+height/32 && mouseIsPressed) {
					scene = 11;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8+height/16+height/32 && mouseY > height/2+height/8+height/32 && mouseIsPressed && skip === 1) {
					scene = 12;
				}
				
			}
			if(scene === 11){
				background(0,0,0);
				fill(128,128,128);
				rect(width/2-width/8,height/2+height/16,width/4,height/16);
				fill(255,0,0);
				textSize(height/32*1.5);
				textAlign(CENTER,CENTER);
				text("Accept name",width/2,height/2*1.18);
				Uname = Text;
				textBox(width/2-width/8,height/2,width/4);
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8 && mouseY > height/2+height/16 && mouseIsPressed) {
					scene = 12;
				}
			}
			if(scene === 12){
				// Galaxy map GUI
				background(0,0,0);
				fill(255,255,255);
				noStroke();
				for(var i = 0; i < 25; i++){
					ellipse(starX[1][i],starY[1][i],starSize[i],starSize[i]);
				}
				textAlign(CENTER,CENTER);
				object("home",planetOccupied[0],width/16*6,height/16*13,width/24,planetColor[0][0],planetColor[1][0],planetColor[2][0]);
				object("[1] planet 1",planetOccupied[1],width/16*8,height/16*10,width/16,planetColor[0][1],planetColor[1][1],planetColor[2][1]);
				object("[2] planet 2",planetOccupied[2],width/16*13,height/16*10,width/12,planetColor[0][2],planetColor[1][2],planetColor[2][2]);
				object("[3] planet 3",planetOccupied[3],width/16*10,height/16*8,width/16,planetColor[0][3],planetColor[1][3],planetColor[2][3]);
				object("[4] planet 4",planetOccupied[4],width/16*11,height/16*5,width/8,planetColor[0][4],planetColor[1][4],planetColor[2][4]);
				object("[5] planet 5",planetOccupied[5],width/16*6,height/16*5,width/15,planetColor[0][5],planetColor[1][5],planetColor[2][5]);
				object("[6] planet 6",planetOccupied[6],width/16*4,height/16*7,width/11,planetColor[0][6],planetColor[1][6],planetColor[2][6]);
				object("[7] planet 7",planetOccupied[7],width/16*2,height/16*10,width/18,planetColor[0][7],planetColor[1][7],planetColor[2][7]);
				object("[8] planet 8",planetOccupied[8],width/16*11,height/16*13,width/9,planetColor[0][8],planetColor[1][8],planetColor[2][8]);
				stroke(64,64,64);
				fill(128,128,128);
				rect(width/4*0,0,width/4,height/8);
				rect(width/4*1,0,width/4,height/8);
				rect(width/4*2,0,width/4,height/8);
				rect(width/4*3,0,width/4,height/8);
				rect(width/2-width/8,height-25,width/4,25);
				if(planetOccupied[8] === 2){
					rect(width/16*15,height/16*14,width/16,height/12);
				}
				textSize(height/16);
				noStroke();
				fill(255,0,0);
				text("Galaxy Map",width/4*0.5,height/8*0.5);
				text("Shipyard",width/4*1.5,height/8*0.5);
				text("Laboratory",width/4*2.5,height/8*0.5);
				text("Settings",width/4*3.5,height/8*0.5);
				textSize(height/32);
				text(Uname,width/2,height-height/32);
				noStroke();
				fill(255,255,255);
				if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 12) {
					scene = 12;
				}
				if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 12) {
					scene = 13;
				}
				if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 12) {
					scene = 14;
				}
				if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 12) {
					scene = 15;
				}
				if(mouseX < width/16*6+width/48 && mouseX > width/16*6-width/48 && mouseY < height/16*13+width/48 && mouseY > height/16*13-height/48 && mouseIsPressed){
					scene = 16;
					sub = 0;
				}
				if(mouseX < width/16*8+width/32 && mouseX > width/16*8-width/32 && mouseY < height/16*10+width/32 && mouseY > height/16*10-height/32 && mouseIsPressed){
					scene = 16;
					sub = 1;
				}
				if(mouseX < width/16*13+width/24 && mouseX > width/16*13-width/24 && mouseY < height/16*10+width/24 && mouseY > height/16*10-height/24 && mouseIsPressed){
					scene = 16;
					sub = 2;
				}
				if(mouseX < width/16*10+width/32 && mouseX > width/16*10-width/32 && mouseY < height/16*8+width/32 && mouseY > height/16*8-height/32 && mouseIsPressed){
					scene = 16;
					sub = 3;
				}
				if(mouseX < width/16*11+width/16 && mouseX > width/16*11-width/16 && mouseY < height/16*5+width/16 && mouseY > height/16*5-height/16 && mouseIsPressed){
					scene = 16;
					sub = 4;
				}
				if(mouseX < width/16*6+width/30 && mouseX > width/16*6-width/30 && mouseY < height/16*5+width/30 && mouseY > height/16*5-height/30 && mouseIsPressed){
					scene = 16;
					sub = 5;
				}
				if(mouseX < width/16*4+width/22 && mouseX > width/16*4-width/22 && mouseY < height/16*7+width/22 && mouseY > height/16*7-height/22 && mouseIsPressed){
					scene = 16;
					sub = 6;
				}
				if(mouseX < width/16*2+width/36 && mouseX > width/16*2-width/36 && mouseY < height/16*10+width/36 && mouseY > height/16*10-height/36 && mouseIsPressed){
					scene = 16;
					sub = 7;
				}
				if(mouseX < width/16*11+width/18 && mouseX > width/16*11-width/18 && mouseY < height/16*13+width/18 && mouseY > height/16*13-height/18 && mouseIsPressed){
					scene = 16;
					sub = 8;
				}
			}
			if(scene === 13){
				// Shipyard GUI
				background(0,0,0);
				textAlign(CENTER,CENTER);
				stroke(64,64,64);
				fill(128,128,128);
				rect(width/4*0,0,width/4,height/8);
				rect(width/4*1,0,width/4,height/8);
				rect(width/4*2,0,width/4,height/8);
				rect(width/4*3,0,width/4,height/8);
				rect(width/2-width/8,height-25,width/4,25);
				noStroke();
				rect(width*0.05,height/8+25,width*0.9,height/4*3);
				textSize(height/16);
				noStroke();
				fill(255,0,0);
				text("Galaxy Map",width/4*0.5,height/8*0.5);
				text("Shipyard",width/4*1.5,height/8*0.5);
				text("Laboratory",width/4*2.5,height/8*0.5);
				text("Settings",width/4*3.5,height/8*0.5);
				fill(64,64,64);
				rect(width/4*1-width/10,height/4,width/5,height/24);
				rect(width/4*2-width/10,height/4,width/5,height/24);
				rect(width/4*3-width/10,height/4,width/5,height/24);
				if(metal >= 1000 && minerals >= 500 && fuel >= 250){stroke(0,255,0);}else {stroke(255,0,0);}
				rect(width/6*1-width/16,height/4*3-height/8,width/8,height/4);
				if(metal >= 2000 && minerals >= 2000 && fuel >= 500){stroke(0,255,0);}else {stroke(255,0,0);}
				rect(width/6*2-width/16,height/4*3-height/8,width/8,height/4);
				if(metal >= 4000 && minerals >= 1000 && fuel >= 1000){stroke(0,255,0);}else {stroke(255,0,0);}
				rect(width/6*3-width/16,height/4*3-height/8,width/8,height/4);
				if(metal >= 10000 && minerals >= 4000 && fuel >= 2500){stroke(0,255,0);}else {stroke(255,0,0);}
				rect(width/6*4-width/16,height/4*3-height/8,width/8,height/4);
				if(metal >= 25000 && minerals >= 10000 && fuel >= 5000){stroke(0,255,0);}else {stroke(255,0,0);}
				rect(width/6*5-width/16,height/4*3-height/8,width/8,height/4);
				noStroke();
				fill(255,0,0);
				textSize(height/24);
				textAlign(CENTER,TOP);
				text("Metal: "+metal,width/4*1,height/4*1);
				text("Minerals: "+minerals,width/4*2,height/4*1);
				text("Fuel: "+fuel,width/4*3,height/4*1);
				textAlign(CENTER,CENTER);
				textSize(height/32);
				text("Corvette",width/6*1,height/8*5.1);
				text("Frigate",width/6*2,height/8*5.1);
				text("Crusier",width/6*3,height/8*5.1);
				text("Destoryer",width/6*4,height/8*5.1);
				text("Battleship",width/6*5,height/8*5.1);
				text("Metal: 1000",width/6*1,height/8*5.5);
				text("Metal: 2000",width/6*2,height/8*5.5);
				text("Metal: 4000",width/6*3,height/8*5.5);
				text("Metal: 10000",width/6*4,height/8*5.5);
				text("Metal: 25000",width/6*5,height/8*5.5);
				text("Minerals: 500",width/6*1,height/8*6);
				text("Minerals: 2000",width/6*2,height/8*6);
				text("Minerals: 1000",width/6*3,height/8*6);
				text("Minerals: 4000",width/6*4,height/8*6);
				text("Minerals: 10000",width/6*5,height/8*6);
				text("Fuel: 250",width/6*1,height/8*6.5);
				text("Fuel: 500",width/6*2,height/8*6.5);
				text("Fuel: 1000",width/6*3,height/8*6.5);
				text("Fuel: 2500",width/6*4,height/8*6.5);
				text("Fuel: 5000",width/6*5,height/8*6.5);
				text(shipNum[1],width/6*1,height/8*6.9);
				text(shipNum[2],width/6*2,height/8*6.9);
				text(shipNum[3],width/6*3,height/8*6.9);
				text(shipNum[4],width/6*4,height/8*6.9);
				text(shipNum[5],width/6*5,height/8*6.9);
				text(Uname,width/2,height-height/32);
				if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 13) {
					scene = 12;
				}
				if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 13) {
					scene = 13;
				}
				if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 13) {
					scene = 14;
				}
				if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 13) {
					scene = 15;
				}
				if(mouseX < width/6*1+width/16 && mouseX > width/6*1-width/16 && mouseY < height/4*3+height/8 && mouseY > height/4*3-height/8 && mouseIsPressed && metal >= 1000 && minerals >= 500 && fuel >= 250){
					metal -= 1000;
					minerals -= 500;
					fuel -= 250;
					shipNum[1]++;
				}
				if(mouseX < width/6*2+width/16 && mouseX > width/6*2-width/15 && mouseY < height/4*3+height/8 && mouseY > height/4*3-height/8 && mouseIsPressed && metal >= 2000 && minerals >= 2000 && fuel >= 500){
					metal -= 2000;
					minerals -= 2000;
					fuel -= 500;
					shipNum[2]++;
				}
				if(mouseX < width/6*3+width/16 && mouseX > width/6*3-width/15 && mouseY < height/4*3+height/8 && mouseY > height/4*3-height/8 && mouseIsPressed && metal >= 4000 && minerals >= 1000 && fuel >= 1000){
					metal -= 4000;
					minerals -= 1000;
					fuel -= 1000;
					shipNum[3]++;
				}
				if(mouseX < width/6*4+width/16 && mouseX > width/6*4-width/15 && mouseY < height/4*3+height/8 && mouseY > height/4*3- height/8 && mouseIsPressed && metal >= 10000 && minerals >= 4000 && fuel >= 2500){
					metal -= 10000;
					minerals -= 4000;
					fuel -= 2500;
					shipNum[4]++;
				}
				if(mouseX < width/6*5+width/16 && mouseX > width/6*5-width/15 && mouseY < height/4*3+height/8 && mouseY > height/4*3- height/8 && mouseIsPressed && metal >= 25000 && minerals >= 10000 && fuel >= 5000){
					metal -= 25000;
					minerals -= 10000;
					fuel -= 5000;
					shipNum[5]++;
				}
			}
			if(scene === 14){
				// Lab GUI
				background(0,0,0);
				textAlign(CENTER,CENTER);
				fill(128,128,128);
				noStroke();
				rect(width*0.05,height/8+25,width*0.9,height/4*3);
				stroke(64,64,64);
				fill(128,128,128);
				rect(width/4*0,0,width/4,height/8);
				rect(width/4*1,0,width/4,height/8);
				rect(width/4*2,0,width/4,height/8);
				rect(width/4*3,0,width/4,height/8);
				rect(width/2-width/8,height-25,width/4,25);
				if (armorLevel === 0){techColor = 1;}
				if (armorLevel >= 1){techColor = 2;}
				object("Armor "+ armorLevel+ "(cost: 5)",techColor,width/4*1,height/4*3,width/16,64,64,64);
				if (shieldLevel === 0){techColor = 1;}
				if (shieldLevel >= 1){techColor = 2;}
				object("Shield "+ shieldLevel+ "(cost: 10)",techColor,width/4*1,height/4*2,width/16,64,64,64);
				if (weaponLevel === 0){techColor = 1;}
				if (weaponLevel >= 1){techColor = 2;}
				object("Weapon "+ weaponLevel+ "(cost: 5)",techColor,width/4*3,height/4*3,width/16,64,64,64);
				if (missleLevel === 0){techColor = 1;}
				if (missleLevel >= 1){techColor = 2;}
				object("Missle "+ missleLevel+ "(cost: 10)",techColor,width/4*3,height/4*2,width/16,64,64,64);
				if (speedLevel === 0){techColor = 1;}
				if (speedLevel >= 1){techColor = 2;}
				object("Speed "+ speedLevel+ "(cost: 5)",techColor,width/4*2,height/4*3,width/16,64,64,64);
				if (agilityLevel === 0){techColor = 1;}
				if (agilityLevel >= 1){techColor = 2;}
				object("Agility "+ agilityLevel+ "(cost: 10)",techColor,width/4*2,height/4*2,width/16,64,64,64);
				if (armorLevel < 5){stroke(255,0,0);}
				if (armorLevel >= 5){stroke(0,255,0);}
				line(width/4*1,height/4*3-height/16,width/4*1,height/4*2+height/16);
				if (weaponLevel < 5){stroke(255,0,0);}
				if (weaponLevel >= 5){stroke(0,255,0);}
				line(width/4*3,height/4*3-height/16,width/4*3,height/4*2+height/16);
				if (speedLevel < 5){stroke(255,0,0);}
				if (speedLevel >= 5){stroke(0,255,0);}
				line(width/4*2,height/4*3-height/16,width/4*2,height/4*2+height/16);
				noStroke();
				fill(255,0,0);
				textSize(height/16);
				text("Galaxy Map",width/4*0.5,height/8*0.5);
				text("Shipyard",width/4*1.5,height/8*0.5);
				text("Laboratory",width/4*2.5,height/8*0.5);
				text("Settings",width/4*3.5,height/8*0.5);
				textSize(height/24);
				text("Research Points: "+techPoints,width/2,height/4*1);
				textSize(height/32);
				text(Uname,width/2,height-height/32);
				noStroke();
				fill(255,255,255);
				if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 14) {
					scene = 12;
				}
				if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 14) {
					scene = 13;
				}
				if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 14) {
					scene = 14;
				}
				if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 14) {
					scene = 15;
				}
				if( mouseX > width/4*1-width/32 && mouseX < width/4*1+width/32 && mouseY > height/4*3-width/32 && mouseY < height/4*3+width/32 && mouseIsPressed && techPoints >= 5){
				 armorLevel++;
				 techPoints -= 5;
				}
				if( mouseX > width/4*3-width/32 && mouseX < width/4*3+width/32 && mouseY > height/4*3-width/32 && mouseY < height/4*3+width/32 && mouseIsPressed && techPoints >= 5){
				 weaponLevel++;
				 techPoints -= 5;
				}
				if( mouseX > width/4*1-width/32 && mouseX < width/4*1+width/32 && mouseY > height/4*2-width/32 && mouseY < height/4*2+width/32 && mouseIsPressed && techPoints >= 10 && armorLevel >= 5){
				 shieldLevel++;
				 techPoints -= 10;
				}
				if( mouseX > width/4*3-width/32 && mouseX < width/4*3+width/32 && mouseY > height/4*2-width/32 && mouseY < height/4*2+width/32 && mouseIsPressed && techPoints >= 10 && weaponLevel >= 5){
				 missleLevel++;
				 techPoints -= 10;
				}
				if( mouseX > width/4*2-width/32 && mouseX < width/4*2+width/32 && mouseY > height/4*3-width/32 && mouseY < height/4*3+width/32 && mouseIsPressed && techPoints >= 5){
				 speedLevel++;
				 techPoints -= 5;
				}
				if( mouseX > width/4*2-width/32 && mouseX < width/4*2+width/32 && mouseY > height/4*2-width/32 && mouseY < height/4*2+width/32 && mouseIsPressed && techPoints >= 10 && speedLevel >= 5){
				 agilityLevel++;
				 techPoints -= 10;
				}
			}
			if(scene === 15){
				// Settings GUI
				background(0,0,0);
				stroke(64,64,64);
				fill(128,128,128);
				rect(width/4*0,0,width/4,height/8);
				rect(width/4*1,0,width/4,height/8);
				rect(width/4*2,0,width/4,height/8);
				rect(width/4*3,0,width/4,height/8);
				rect(width/2-width/8,height-25,width/4,25);
				noStroke();
				rect(width*0.05,height/8+25,width*0.9,height/4*3);
				fill(64,64,64);
				rect(width/2-width/8,height/2-height/32,width/4,height/16);
				rect(width/2-width/8,height/2+height/16,width/4,height/16);
				rect(width/2-width/8,height/2+height/8+height/32,width/4,height/16);
				textSize(height/16);
				noStroke();
				fill(255,0,0);
				text("Galaxy Map",width/4*0.5,height/8*0.5);
				text("Shipyard",width/4*1.5,height/8*0.5);
				text("Laboratory",width/4*2.5,height/8*0.5);
				text("Settings",width/4*3.5,height/8*0.5);
				text("Reset Name",width/2,height/2);
				text("Story",width/2,height/2*1.18);
				text("Main Menu",width/2,height/2*1.375);
				textSize(height/32);
				text(Uname,width/2,height-height/32);
				noStroke();
				fill(255,255,255);
				if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 15) {
					scene = 12;
				}
				if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 15) {
					scene = 13;
				}
				if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 15) {
					scene = 14;
				}
				if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed && scene === 15) {
					scene = 15;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/16 && mouseY > height/2-height/32 && mouseIsPressed) {
					Text = "";
					skip = 1;
					scene = 11;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8 && mouseY > height/2+height/16 && mouseIsPressed) {
					skip = 1;
					scene = 10;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2 + height/8 + height/16 + height/32 && mouseY > height/2+height/8+height/32 && mouseIsPressed) {
					skip = 2;
					scene = 1;
				}
				
			}
			if(scene === 16){
				// planet tab GUI
				background(0,0,0);
				textAlign(CENTER,CENTER);
				fill(128,128,128);
				noStroke();
				rect(width*0.05,height/8+25,width*0.9,height/4*3);
				stroke(64,64,64);
				fill(128,128,128);
				rect(width/4*0,0,width/4,height/8);
				rect(width/4*1,0,width/4,height/8);
				rect(width/4*2,0,width/4,height/8);
				rect(width/4*3,0,width/4,height/8);
				rect(width/2-width/8,height-25,width/4,25);
				stroke(255,0,0);
				fill(64,64,64);
				rect(width/16*8,height/16*11,width/8,height/16);
				if(sub !== 0 && planetOccupied[sub-1] === 2){
				if(shipStrength < shipRecommended[sub]){stroke(255,0,0);}
				if(shipStrength >= shipRecommended[sub]){stroke(0,255,0);} 
				rect(width/16*11,height/16*11,width/8,height/16);
				}
				noStroke();
				fill(255,0,0);
				textSize(height/16);
				text("Galaxy Map",width/4*0.5,height/8*0.5);
				text("Shipyard",width/4*1.5,height/8*0.5);
				text("Laboratory",width/4*2.5,height/8*0.5);
				text("Settings",width/4*3.5,height/8*0.5);
				textSize(height/32);
				text(Uname,width/2,height-height/32);
				text("Back",width/16*9,height/32*23);
				if(sub !== 0 && planetOccupied[sub-1] === 2){
					text("Attack",width/16*12,height/32*23);
				}
				textSize(height/24);
				object(planetName[sub],planetOccupied[sub],width/4,height/2,width/6,planetColor[0][sub],planetColor[1][sub],planetColor[2][sub]);
				textAlign(LEFT,CENTER);
				noStroke();
				fill(255,255,255);
				if(planetOccupied[sub] === 1){text("Status: Occupied",width/2,height/16*6);}
				if(planetOccupied[sub] === 2){text("Status: Taken",width/2,height/16*6);}
				text("recommended fleet strength: "+shipRecommended[sub],width/2,height/16*7);
				text("your fleet strength: "+round(shipStrength),width/2,height/16*8);
				text("difficulty: "+shipDifficulty[sub],width/2,height/16*9);
				textAlign(CENTER,CENTER);
				if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 12;
				}
				if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 13;
				}
				if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 14;
				}
				if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 15;
				}
				if(mouseX < width/16*10 && mouseX > width/16*8 && mouseY < height/16*12 && mouseY > height/16*11 && mouseIsPressed){
					scene = 12;
				}
				if(mouseX < width/16*13 && mouseX > width/16*11 && mouseY < height/16*12 && mouseY > height/16*11 && mouseIsPressed){
					scene = 17;
				}
			}
			if(scene === 17){
				//Battle over planet
				shipBattle = true;
				background(0,0,0);
				fill(255,255,255);
				noStroke();
				for(var i = 0; i < 25; i++){
					ellipse(starX[2][i],starY[2][i],starSize[i],starSize[i]);
				}
				textAlign(CENTER,CENTER);
				object("",planetOccupied[sub],width*1.25,height/2,width,planetColor[0][sub],planetColor[1][sub],planetColor[2][sub]);
				stroke(255,0,0);
				fill(128,128,128);
				rect(width/2-width/8,height-25,width/4,25);
				noStroke();
				rect(width/64*1,height/64*1,width/64*8,height/64*4);
				fill(255,0,0);
				textSize(height/48);
				textAlign(CENTER,CENTER);
				text("your shields: "+round(shipShields),width/64*4.5,height/64*2);
				text("enemy shields: "+round(enemyShields[sub]),width/64*4.5,height/64*4);
				textSize(height/32);
				text(Uname,width/2,height-height/32);
				for(var i=0;i<shipNum[5];i++){
					shipDraw(5,100,shipX[shipZ],shipY[shipZ]);
					shipZ++;
				}
				for(var i=0;i<shipNum[4];i++){
					shipDraw(4,100,shipX[shipZ],shipY[shipZ]);
					shipZ++;
				}
				for(var i=0;i<shipNum[3];i++){
					shipDraw(3,100,shipX[shipZ],shipY[shipZ]);
					shipZ++;
				}
				for(var i=0;i<shipNum[2];i++){
					shipDraw(2,100,shipX[shipZ],shipY[shipZ]);
					shipZ++;
				}
				for(var i=0;i<shipNum[1];i++){
					shipDraw(1,100,shipX[shipZ],shipY[shipZ]);
					shipZ++;
				}
				if(shipTick < 20){
					burn[0] = true;
				}
				if(enemyTick < 20){
					burn[1] = true;
				}
				if(burn[0] === true){
					stroke(0,255,255);
					var bX = round(random(0,shipZ));
					var bY = round(random(0,shipZ));
					cX = round(random(cXmin[sub],cXmax[sub]));
					cY = round(random(cYmin[sub],cYmax[sub]));
					line(shipX[bX],shipY[bY],enemyX[cX],enemyY[cY]);
					enemyShields[sub] -= shipStrength/10;
					burnTime--;
				}
				if(burn[1] === true){
					stroke(255,0,0);
					var bX = round(random(0,shipZ));
					var bY = round(random(0,shipZ));
					cX = round(random(cXmin[sub],cXmax[sub]));
					cY = round(random(cYmin[sub],cYmax[sub]));
					line(shipX[bX],shipY[bY],enemyX[cX],enemyY[cY]);
					shipShields -= sub;
					burnTime--;
				}
				shipZ = 0;
				if(sub===1){
					shipDraw(11,enemyShields[sub],enemyX[2],enemyY[4]);
					shipDraw(12,enemyShields[sub],enemyX[2],enemyY[5]);
					shipDraw(11,enemyShields[sub],enemyX[2],enemyY[6]);
				}
				if(sub===2){
					shipDraw(11,enemyShields[sub]/2.5,enemyX[2],enemyY[3]);
					shipDraw(12,enemyShields[sub]/2.5,enemyX[2],enemyY[4]);
					shipDraw(13,enemyShields[sub]/2.5,enemyX[2],enemyY[5]);
					shipDraw(12,enemyShields[sub]/2.5,enemyX[2],enemyY[6]);
					shipDraw(11,enemyShields[sub]/2.5,enemyX[2],enemyY[7]);
				}
				if(sub===3){
					shipDraw(12,enemyShields[sub]/5,enemyX[2],enemyY[3]);
					shipDraw(12,enemyShields[sub]/5,enemyX[2],enemyY[4]);
					shipDraw(14,enemyShields[sub]/5,enemyX[2],enemyY[5]);
					shipDraw(12,enemyShields[sub]/5,enemyX[2],enemyY[6]);
					shipDraw(12,enemyShields[sub]/5,enemyX[2],enemyY[7]);
				}
				if(sub===4){
					shipDraw(12,enemyShields[sub]/10,enemyX[2],enemyY[2]);
					shipDraw(12,enemyShields[sub]/10,enemyX[2],enemyY[3]);
					shipDraw(13,enemyShields[sub]/10,enemyX[2],enemyY[4]);
					shipDraw(13,enemyShields[sub]/10,enemyX[2],enemyY[5]);
					shipDraw(13,enemyShields[sub]/10,enemyX[2],enemyY[6]);
					shipDraw(12,enemyShields[sub]/10,enemyX[2],enemyY[7]);
					shipDraw(12,enemyShields[sub]/10,enemyX[2],enemyY[8]);
				}
				if(sub===5){
					shipDraw(11,enemyShields[sub]/30,enemyX[2],enemyY[2]);
					shipDraw(13,enemyShields[sub]/30,enemyX[2],enemyY[3]);
					shipDraw(13,enemyShields[sub]/30,enemyX[2],enemyY[4]);
					shipDraw(14,enemyShields[sub]/30,enemyX[2],enemyY[5]);
					shipDraw(13,enemyShields[sub]/30,enemyX[2],enemyY[6]);
					shipDraw(13,enemyShields[sub]/30,enemyX[2],enemyY[7]);
					shipDraw(11,enemyShields[sub]/30,enemyX[2],enemyY[8]);
				}
				if(sub===6){
					shipDraw(11,enemyShields[sub]/40,enemyX[2],enemyY[1]);
					shipDraw(11,enemyShields[sub]/40,enemyX[2],enemyY[2]);
					shipDraw(13,enemyShields[sub]/40,enemyX[2],enemyY[3]);
					shipDraw(14,enemyShields[sub]/40,enemyX[2],enemyY[4]);
					shipDraw(14,enemyShields[sub]/40,enemyX[2],enemyY[5]);
					shipDraw(14,enemyShields[sub]/40,enemyX[2],enemyY[6]);
					shipDraw(13,enemyShields[sub]/40,enemyX[2],enemyY[7]);
					shipDraw(11,enemyShields[sub]/40,enemyX[2],enemyY[8]);
					shipDraw(11,enemyShields[sub]/40,enemyX[2],enemyY[9]);
				}
				if(sub===7){
					shipDraw(12,enemyShields[sub]/55,enemyX[1],enemyY[3]);
					shipDraw(12,enemyShields[sub]/55,enemyX[1],enemyY[4]);
					shipDraw(13,enemyShields[sub]/55,enemyX[1],enemyY[5]);
					shipDraw(12,enemyShields[sub]/55,enemyX[1],enemyY[6]);
					shipDraw(12,enemyShields[sub]/55,enemyX[1],enemyY[7]);
					shipDraw(14,enemyShields[sub]/55,enemyX[2],enemyY[3]);
					shipDraw(14,enemyShields[sub]/55,enemyX[2],enemyY[4]);
					shipDraw(14,enemyShields[sub]/55,enemyX[2],enemyY[5]);
					shipDraw(14,enemyShields[sub]/55,enemyX[2],enemyY[6]);
					shipDraw(14,enemyShields[sub]/55,enemyX[2],enemyY[7]);
				}
				if(sub===8){
					shipDraw(12,enemyShields[sub]/75,enemyX[1],enemyY[2]);
					shipDraw(12,enemyShields[sub]/75,enemyX[1],enemyY[3]);
					shipDraw(13,enemyShields[sub]/75,enemyX[1],enemyY[4]);
					shipDraw(13,enemyShields[sub]/75,enemyX[1],enemyY[5]);
					shipDraw(13,enemyShields[sub]/75,enemyX[1],enemyY[6]);
					shipDraw(12,enemyShields[sub]/75,enemyX[1],enemyY[7]);
					shipDraw(12,enemyShields[sub]/75,enemyX[1],enemyY[8]);
					shipDraw(14,enemyShields[sub]/75,enemyX[2],enemyY[2]);
					shipDraw(14,enemyShields[sub]/75,enemyX[2],enemyY[3]);
					shipDraw(14,enemyShields[sub]/75,enemyX[2],enemyY[4]);
					shipDraw(15,enemyShields[sub]/75,enemyX[2],enemyY[5]);
					shipDraw(14,enemyShields[sub]/75,enemyX[2],enemyY[6]);
					shipDraw(14,enemyShields[sub]/75,enemyX[2],enemyY[7]);
					shipDraw(14,enemyShields[sub]/75,enemyX[2],enemyY[8]);
				}
				if(sub===9){
					shipDraw(13,enemyShields[sub]/100,enemyX[1],enemyY[2]);
					shipDraw(13,enemyShields[sub]/100,enemyX[1],enemyY[3]);
					shipDraw(14,enemyShields[sub]/100,enemyX[1],enemyY[4]);
					shipDraw(14,enemyShields[sub]/100,enemyX[1],enemyY[5]);
					shipDraw(14,enemyShields[sub]/100,enemyX[1],enemyY[6]);
					shipDraw(13,enemyShields[sub]/100,enemyX[1],enemyY[7]);
					shipDraw(13,enemyShields[sub]/100,enemyX[1],enemyY[8]);
					shipDraw(15,enemyShields[sub]/100,enemyX[2],enemyY[2]);
					shipDraw(15,enemyShields[sub]/100,enemyX[2],enemyY[3]);
					shipDraw(15,enemyShields[sub]/100,enemyX[2],enemyY[4]);
					shipDraw(15,enemyShields[sub]/100,enemyX[2],enemyY[5]);
					shipDraw(15,enemyShields[sub]/100,enemyX[2],enemyY[6]);
					shipDraw(15,enemyShields[sub]/100,enemyX[2],enemyY[7]);
					shipDraw(15,enemyShields[sub]/100,enemyX[2],enemyY[8]);
				}
				if(enemyShields[sub] <= 0){
					planetOccupied[sub] = 2;
					shipBattle = false;
					metal+= 5000*sub;
					minerals+= 2500*sub;
					fuel+= 2000* sub;
					techPoints+= 5*sub;
					battleWon=true;
					scene=18;
				}
				if(shipShields <= 0){
					shipBattle = false;
					battleWon=false;
					scene=18;
				}
			}
			if(scene === 18){
				// planet win/lose GUI
				background(0,0,0);
				textAlign(CENTER,CENTER);
				fill(128,128,128);
				noStroke();
				rect(width*0.05,height/8+25,width*0.9,height/4*3);
				stroke(64,64,64);
				fill(128,128,128);
				rect(width/4*0,0,width/4,height/8);
				rect(width/4*1,0,width/4,height/8);
				rect(width/4*2,0,width/4,height/8);
				rect(width/4*3,0,width/4,height/8);
				rect(width/2-width/8,height-25,width/4,25);
				stroke(255,0,0);
				fill(64,64,64);
				rect(width/16*8,height/16*11,width/8,height/16);
				rect(width/16*11,height/16*11,width/8,height/16);
				noStroke();
				fill(255,0,0);
				textSize(height/16);
				text("Galaxy Map",width/4*0.5,height/8*0.5);
				text("Shipyard",width/4*1.5,height/8*0.5);
				text("Laboratory",width/4*2.5,height/8*0.5);
				text("Settings",width/4*3.5,height/8*0.5);
				fill(255,255,255);
				if(battleWon===true){text("You Won!",width/4*3,height/4*2);}
				if(battleWon===false){text("You Lost!",width/4*3,height/4*2);}
				textSize(height/32);
				text(Uname,width/2,height-height/32);
				text("Retry",width/16*9,height/32*23);
				text("Accept",width/16*12,height/32*23);
				textSize(height/24);
				object(planetName[sub],planetOccupied[sub],width/4,height/2,width/6,planetColor[0][sub],planetColor[1][sub],planetColor[2][sub]);
				textAlign(LEFT,CENTER);
				noStroke();
				fill(255,255,255);
				textAlign(CENTER,CENTER);
				if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 12;
				}
				if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 13;
				}
				if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 14;
				}
				if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 15;
				}
				if(mouseX < width/16*10 && mouseX > width/16*8 && mouseY < height/16*12 && mouseY > height/16*11 && mouseIsPressed){
					scene = 16;
					battleWon = null;
				}
				if(mouseX < width/16*13 && mouseX > width/16*11 && mouseY < height/16*12 && mouseY > height/16*11 && mouseIsPressed){
					scene = 12;
					battleWon = null;
				}
			}
			if(scene === 20){
				background(0,0,0);
				noStroke();
				textAlign(CENTER,CENTER);
				fill(255,0,0);
				textSize(width/32);
				text("Sorry :(",width/2,height/4);
				textSize(height/32);
				text("This feature has not been added yet. We hope to add it in the future.",width/2,height/2);
				fill(128,128,128);
				rect(width/2-width/8,height/2+height/8+height/32,width/4,height/16);
				fill(255,0,0);
				textSize(height/32*1.5);
				text("Take me back",width/2,height/2*1.375);
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8+height/16+height/32 && mouseY > height/2+height/8+height/32 && mouseIsPressed) {
					scene = 1;
				}	
			}
		};

        // ProgramCode A A A
    }};

    // Get the canvas that Processing-js will use
    var canvas = document.getElementById("mycanvas"); 
    // Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
    var processingInstance = new Processing(canvas, sketchProc); 
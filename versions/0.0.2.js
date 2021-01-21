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
		2 = settings
		- 10-19 = campain (space)-
		10 = How to Play
		11 = Name character
		12 = Galaxy Map
		13 = Shipyard
		14 = Laboratory
		- 20-29 = sandbox -
		20 = Feature not added
		- 30-39
		**/
		//basic vars
		var scene = 1;
		var level = 0;
		var score = 0;
		var Uname = "";
		var newName = true;
		var howToPlay = true;
		//vars for star cords
		var starX1 = [776,447,567,910,219,640,440,991,669,734,715,730,807,692,714,97,944,294,168,431,765,730,468,298,579];
		var starX2 = [311,157,625,759,517,376,392,277,502,258,936,854,832,194,380,730,859,158,77,145,146,397,500,709,290];
		var starX3 = [495,764,594,485,295,169,833,502,178,296,023,123,934,564,299,554,722,781,986,442,912,93,655,241,961];
		var starY1 = [561,570,420,298,229,532,253,323,305,384,290,104,409,115,117,315,179,267,515,471,240,421,229,107,236];
		var starY2 = [225,395,558,299,308,399,255,526,459,404,377,559,257,357,483,426,226,398,127,347,515,168,553,249,322];
		var starY3 = [265,151,240,569,76,410,450,154,134,467,154,312,465,354,232,436,448,217,223,145,438,258,573,513,464];
		var starSize = [2,3,5,4,5,3,5,3,1,4,5,3,5,3,5,2,5,5,4,2,3,4,5,5,3];
		//vars for planets
		var planetOccupied = [2,1,1,1,1,1,1,1,1];
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
		var metal = 0;
		var minerals = 0;
		var fuel = 0;
		// how many of each type of ship(corvette, frigate, crusier, destroyer,battleship) with [0] being
		var shipNum = [0,0,0,0,0,0];
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
			if(num === 1){
				for(var i = 0; i < 25; i++){
					ellipse(starX1[i],starY1[i],starSize[i],starSize[i]);
				}
			}
			if(num === 2){
				for(var i = 0; i < 25; i++){
					ellipse(starX2[i],starY2[i],starSize[i],starSize[i]);
				}
			}
			if(num === 3){
				for(var i = 0; i < 25; i++){
					ellipse(starX3[i],starY3[i],starSize[i],starSize[i]);
				}
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
			if(scene === 1){
				background(0,0,0);
				starscape(1);
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
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/32 && mouseY > height/2-height/32 && mouseIsPressed && scene === 1 && howToPlay === true) {
					scene = 10;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/32 && mouseY > height/2-height/32 && mouseIsPressed && scene === 1 && howToPlay === false) {
					scene = 12;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8 && mouseY > height/2+height/16 && mouseIsPressed && scene === 1) {
					scene = 20;
				}
			}
			if(scene === 10){
				background(0,0,0);
				noStroke();
				textAlign(CENTER,CENTER);
				fill(255,0,0);
				textSize(width/32);
				text("How To Play",width/2,height/4);
				textSize(height/32);
				text("You are a conquester. Your're goal is to take over the galaxy. You take off from your home system,",width/2,height/2-height/12);
				text("your destination over 100 years away. But you don't make it. ",width/2,height/2-height/20);
				text("Halfway through the trip, youre convoy is attacked and you're ship gets knocked off-course.",width/2,height/2);
				text("You wake up at the right time, but not in the right place. Now, you're over 25 years away from help. ",width/2,height/2+height/20); 
				text("But you have a fleeet and troops. You're new goal: Get back home, at whatever costs.",width/2,height/2+height/12);
				fill(128,128,128);
				rect(width/2-width/8*1.25,height/2+height/8+height/32,width/4*1.25,height/16);
				fill(255,0,0);
				textSize(height/32*1.5);
				text("Start or Continue Game",width/2,height/2*1.375);
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8+height/16+height/32 && mouseY > height/2+height/8+height/32 && mouseIsPressed && scene === 10 && newName === true) {
					scene = 11;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8+height/16+height/32 && mouseY > height/2+height/8+height/32 && mouseIsPressed && scene === 10 && newName === false) {
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
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8 && mouseY > height/2+height/16 && mouseIsPressed && scene === 11) {
					scene = 12;
				}
			}
			if(scene === 12){
				// Galaxy map GUI
				background(0,0,0);
				starscape(2);
				textAlign(CENTER,CENTER);
				object("home",planetOccupied[0],275,469,32,100,90,110);
				object("[1] planet 1",planetOccupied[1],349,494,78,98,140,139);
				object("[2] planet 2",planetOccupied[2],450,419,84,30,17,68);
				object("[3] planet 3",planetOccupied[3],540,500,61,90,87,95);
				object("[4] planet 4",planetOccupied[4],666,400,128,187,130,110);
				object("[5] planet 5",planetOccupied[5],700,128,69,214,159,255);
				object("[6] planet 6",planetOccupied[6],128,418,88,255,97,92);
				object("[7] planet 7",planetOccupied[7],180,180,50,234,199,207);
				object("[8] planet 8",planetOccupied[8],423,129,100,57,76,32);
				stroke(255,0,0);
				fill(128,128,128);
				rect(width/4*0,0,width/4,height/8);
				rect(width/4*1,0,width/4,height/8);
				rect(width/4*2,0,width/4,height/8);
				rect(width/4*3,0,width/4,height/8);
				rect(width/2-width/8,height-25,width/4,25);
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
			}
			if(scene === 13){
				// Shipyard GUI
				background(0,0,0);
				textAlign(CENTER,CENTER);
				stroke(255,0,0);
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
				if(metal >= 2500 && minerals >= 1000 && fuel >= 500){stroke(0,255,0);}else {stroke(255,0,0);}
				rect(width/6*2-width/16,height/4*3-height/8,width/8,height/4);
				if(metal >= 4000 && minerals >= 750 && fuel >= 1000){stroke(0,255,0);}else {stroke(255,0,0);}
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
				text("Metal: 2500",width/6*2,height/8*5.5);
				text("Metal: 4000",width/6*3,height/8*5.5);
				text("Metal: 10000",width/6*4,height/8*5.5);
				text("Metal: 25000",width/6*5,height/8*5.5);
				text("Minerals: 500",width/6*1,height/8*6);
				text("Minerals: 1000",width/6*2,height/8*6);
				text("Minerals: 750",width/6*3,height/8*6);
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
				if(mouseX < width/6*2+width/16 && mouseX > width/6*2-width/15 && mouseY < height/4*3+height/8 && mouseY > height/4*3-height/8 && mouseIsPressed && metal >= 2500 && minerals >= 1000 && fuel >= 500){
					metal -= 2500;
					minerals -= 1000;
					fuel -= 500;
					shipNum[2]++;
				}
				if(mouseX < width/6*3+width/16 && mouseX > width/6*3-width/15 && mouseY < height/4*3+height/8 && mouseY > height/4*3-height/8 && mouseIsPressed && metal >= 4000 && minerals >= 750 && fuel >= 1000){
					metal -= 4000;
					minerals -= 750;
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
				stroke(255,0,0);
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
				stroke(255,0,0);
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
				text("How To Play",width/2,height/2*1.18);
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
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/16 && mouseY > height/2-height/32 && mouseIsPressed && scene === 15) {
					Text = "";
					newName = true;
					scene = 11;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8 && mouseY > height/2+height/16 && mouseIsPressed && scene === 15) {
					newName = false;
					scene = 10;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2 + height/8 + height/16 + height/32 && mouseY > height/2+height/8+height/32 && mouseIsPressed && scene === 15) {
					howToPlay = false;
					scene = 1;
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
    var sketchProc = function(processingInstance) {
	   var mouseIsPressed = false;
        processingInstance.mousePressed = function () { mouseIsPressed = true; };
        processingInstance.mouseReleased = function () { mouseIsPressed = false; };
	   var keyIsPressed = false;
        processingInstance.keyPressed = function () { keyIsPressed = true; };
        processingInstance.keyReleased = function () { keyIsPressed = false; };
	   function getImage(url) {
            processingInstance.externals.sketch.imageCache.add(url);
            return processingInstance.loadImage(url);
        }
     with (processingInstance) {
		size(1024, 576);
        	frameRate(10);
		window.scrollTo(10,8);
        // ProgramCode V V V
		/**
		scene/subscene table:
		0 = main menu
		1/x = Infopedia ( 
			1/0 = Home/Navigation
			1/1-1/5 = Ships
			1/6 = Story
			1/7 = Ship nav.
			
		)
		2 = Name character
		3 = Galaxy Map
		4/0 = Shipyard
		5 = Laboratory
		6 = settings
		7/x = planet overview (0-8)
		8/x = planet battle (1-8)
		9/x = victory/defeat (1-8)
		**/
		//basic vars
		var scene = 0;
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
		var planetName = ["crash site","[1] Abrigato","[2] Beta-Keralis","[3] Suzum","[4] Vespa","[5] Coruscare","[6] Vulca","[7] Jaeger","[8] Kashyyyk","[9] Outpost-42","[10] Victoria Alpha","[11] Victoria Bravo","[12] Gesht","[13] Sanctuary","[14] Snowmass","[15] Ja","[16] Keeg"];
		var planetOccupied = [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
		var planetColor = [
			[100,98,30,90,187,214,255,234,57,69,62, 210, 209, 87, 242, 50, 78],
			[90,140,17,87,130,159,97,199,76,21,61, 17, 83, 43, 247, 118, 81],
			[110,139,68,95,110,255,92,207,32,42,209, 74, 62, 234, 190, 139, 73],
		];
		//vars for research
		var armorLevel = 0;
		var shieldLevel = 0;
		var laserLevel = 0;
		var missleLevel = 0;
		var reloadLevel = 0;
		var rechargeLevel = 0;
		var techPoints = 100;
		var techColor;
		var techPrice;
		//vars for ship building and resources
		var metal = 10000;
		var minerals = 5000;
		var fuel = 2500;
		// how many of each type of ship(corvette, frigate, crusier, destroyer,battleship) with [0] being nothing
		var shipNum = [0,0,0,0,0,0];
		var shipTotal;
		var shipStrength;
		var shipCost = [
			[null,1000,2000,4000,10000,25000],
			[null,500,2000,1000,4000,10000],
			[null,250,500,1000,2500,5000],
		];
		var shipSize = [
			[null,25,36,75,100,150,0,0,0,0,0,25,35,75,100,150],
			[null,24,18,50,50,60,0,0,0,0,0,24,18,50,50,60],
		];
		var shipRecommended = ["n/a",25,50,100,175,275,400,550,675,5000,2500,5000,10000,15000,25000,35000,50000];
		var shipDifficulty = ["n/a","easy","easy","easy-medium","easy-medium","medium","medium","medium-hard","hard","hard","hard","hard-insane","insane","insane","beyond insane","deyond insane","BEYOND"];
		var shipX = [width/64*16,width/64*15,width/64*1,width/64*8,width/64*20,width/64*27,width/64*26,width/64*11,width/64*2,width/64*24,width/64*1,width/64*4,width/64*11,width/64*20,width/64*9,width/64*26,width/64*27,width/64*1,width/64*19,width/64*6,width/64*15,width/64*21,width/64*12,width/64*20,width/64*11];
		var shipY = [width/64*30,width/64*25,width/64*21,width/64*19,width/64*5,width/64*54,width/64*17,width/64*2,width/64*36,width/64*56,width/64*41,width/64*51,width/64*48,width/64*10,width/64*31,width/64*31,width/64*8,width/64*40,width/64*4,width/64*10,width/64*59,width/64*52,width/64*29,width/64*10,width/64*27];
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
		var cXmin = [0,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1];
		var cXmax = [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
		var cYmin = [0,4,3,3,2,2,1,3,2,1,1,1,1,1,1,1,1,1];
		var cYmax = [0,6,7,7,8,8,9,7,8,9,9,9,9,9,9,9,9,9];
		// function to draw ships, I figured to put it here since it makes more sense next to the ship var than the other functions
		// type: which type(0-4 yours,5-10 enemy) ,shields: % shields are at
		var shipDraw = function(type,x,y,z){
			image(getImage(ip+"/annihilation/models/"+type+".png"),x,y,shipSize[0][type]*z,shipSize[1][type]*z);
		};
		/**var savetext;
		var savedata;
		var saveurl;**/
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
			techPrice = [armorLevel+5,shieldLevel+10,laserLevel+5,missleLevel+10,reloadLevel+5,rechargeLevel+10];
			shipStrength = (shipNum[1]*1 + shipNum[2]*5 + shipNum[3]*10 + shipNum[4]*25 + shipNum[5]*100)*(missleLevel+1+laserLevel*0.2);
			shipTotal = shipNum[1] + shipNum[2] + shipNum[3] + shipNum[4] + shipNum[5];
			if(shipBattle === false){
				shipShields = (shipNum[1]*10+shipNum[2]*25+shipNum[3]*50+shipNum[4]*100+shipNum[5]*250)*(shieldLevel+1+armorLevel*0.2);
				enemyShields = [null,100,250,500,1000,3000,4000,5500,7500,25000,35000,50000,70000,95000,125000,160000,200000];
			}
			shipTick = round(random(0,100));
			enemyTick = round(random(0,100));
			if(burnTime <= 0){
				burn[0] = false;
			}
			if(burn[0] === false){
				burnTime = 10;
			}
			if(scene === 0){
				background(0,0,0);
				image(getImage(ip+"/annihilation/models/menu.png"),0,0,width,height);
				fill(128,128,128);
				noStroke();
				rect(width/2-width/8,height/2-height/32*1,width/4,height/16);
				rect(width/2-width/8,height/2+height/32*2,width/4,height/16);
				rect(width/2-width/8,height/2+height/32*5,width/4,height/16);
				fill(255,0,0);
				textAlign(CENTER,CENTER);
				textSize(height/24);
				text("Campain",width/2,height/32*16);
				text("Sandbox",width/2,height/32*19);
				text("Exit Game",width/2,height/32*22);
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/32 && mouseY > height/2-height/32 && mouseIsPressed && skip === 0) {
					scene = 1;
					sub = 6;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/32 && mouseY > height/2-height/32 && mouseIsPressed && skip === 2) {
					scene = 3;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/32*4 && mouseY > height/2+height/32*2 && mouseIsPressed) {
					window.alert(" =(  Sorry, this feature has not been added yet.");
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/32*7 && mouseY > height/2+height/32*5 && mouseIsPressed) {
					window.close();
				}
			}
			if(scene === 1){
				if(sub===0){
					// infopedia main UI
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
					noStroke();
					fill(64,64,64);
					rect(width/32*3,height/32*8,width/32*12,height/32*8);
					rect(width/32*3,height/32*20,width/32*12,height/32*8);
					rect(width/32*17,height/32*8,width/32*12,height/32*8);
					rect(width/32*17,height/32*20,width/32*12,height/32*8);
					stroke(255,0,0);
					fill(255,0,0);
					textSize(height/16);
					text("Galaxy Map",width/4*0.5,height/8*0.5);
					text("Shipyard",width/4*1.5,height/8*0.5);
					text("Laboratory",width/4*2.5,height/8*0.5);
					text("Settings",width/4*3.5,height/8*0.5);
					text("Story",width/32*9,height/8*3);
					text("How To Play",width/32*23,height/8*3);
					text("Ships",width/32*9,height/8*6);
					text("Release Notes",width/32*23,height/8*6);
					textSize(height/32);
					text(Uname,width/2,height-height/32);
					textSize(height/24);
					fill(255,255,255);
					textAlign(CENTER,CENTER);
					if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 3;
						sub = 0;
					}
					if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 4;
					}
					if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 5;
					}
					if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 6;
					}
					if(mouseX < width/32*15 && mouseX > width/32*3 && mouseY < height/32*16 && mouseY > height/32*8 && mouseIsPressed) {
						scene = 1;
						sub = 6;
					}
					if(mouseX < width/32*29 && mouseX > width/32*17 && mouseY < height/32*16 && mouseY > height/32*8 && mouseIsPressed) {
						scene = 1;
						sub = 8;
					}
					if(mouseX < width/32*15 && mouseX > width/32*3 && mouseY < height/32*28 && mouseY > height/32*20 && mouseIsPressed) {
						scene = 1;
						sub = 7;
					}
					if(mouseX < width/32*29 && mouseX > width/32*17 && mouseY < height/32*28 && mouseY > height/32*20 && mouseIsPressed) {
						scene = 1;
						sub = 9;
					}
				}
				if(sub>0 && sub <6){
					// ship info GUI
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
					textSize(height/24);
					shipDraw(sub,width/8,height/2,6-sub);
					textAlign(LEFT,CENTER);
					noStroke();
					fill(255,255,255);
					text("metal cost: "+shipCost[0][sub],width/2,height/16*7);
					text("minerals cost: "+shipCost[1][sub],width/2,height/16*8);
					text("fuel cost: "+shipCost[2][sub],width/2,height/16*9);
					textAlign(CENTER,CENTER);
					if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 3;
						sub = 0;
					}
					if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 4;
					}
					if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 5;
					}
					if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 6;
					}
					if(mouseX < width/16*9 && mouseX > width/16*8 && mouseY < height/16*12 && mouseY > height/16*11 && mouseIsPressed){
						sub = 7;
					}
				}
				if(sub===6){
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
						scene = 2;
					}
					if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8+height/16+height/32 && mouseY > height/2+height/8+height/32 && mouseIsPressed && skip === 1) {
						scene = 3;
						sub = 0;
					}
				}
				if(sub === 7){
					// Ship info nav. GUI
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
					stroke(255,0,0);
					fill(64,64,64);
					rect(width/16*1,height/16*8-height/32,width/16*6,height/16);
					rect(width/16*1,height/16*10-height/32,width/16*6,height/16);
					rect(width/16*1,height/16*12-height/32,width/16*6,height/16);
					rect(width/16*9,height/16*8-height/32,width/16*6,height/16);
					rect(width/16*9,height/16*10-height/32,width/16*6,height/16);
					fill(255,0,0);
					noStroke();
					textAlign(CENTER,CENTER);
					textSize(height/32);
					text("Corvette",width/8*2,height/16*8);
					text("Frigate",width/8*2,height/16*10);
					text("Crusier",width/8*2,height/16*12);
					text("Destoryer",width/8*6,height/16*8);
					text("Battleship",width/8*6,height/16*10);
					text(Uname,width/2,height-height/32);
					if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 3;
						sub = 0;
					}
					if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 4;
					}
					if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 5;
					}
					if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 6;
					}
					if(mouseX < width/16*7 && mouseX > width/16*1 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32 && mouseIsPressed){
						scene = 1;
						sub = 1;
					}
					if(mouseX < width/16*7 && mouseX > width/16*1 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32 && mouseIsPressed){
						scene = 1;
						sub = 2;
					}
					if(mouseX < width/16*7 && mouseX > width/16*1 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32 && mouseIsPressed){
						scene = 1;
						sub = 3;
					}
					if(mouseX < width/16*15 && mouseX > width/16*9 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32 && mouseIsPressed){
						scene = 1;
						sub = 4;
					}
					if(mouseX < width/16*15 && mouseX > width/16*9 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32 && mouseIsPressed){
						scene = 1;
						sub = 5;
					}
				}
				if(sub === 8){
					// How To Play
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
					fill(255,255,255);
					noStroke();
					textSize(height/32);
					text("Welcome To Annihilation!",width/2,height/32*14);
					text("The tabs at the top help you navigate between the main sections.",width/2,height/32*15);
					text("Do more damage by building ships and unlocking laser/missle research.",width/2,height/32*16);
					text("Researching armor and shields gives you more health.",width/2,height/32*17); 
					text("Everything is easy to figure out.",width/2,height/32*18);
					stroke(255,0,0);
					fill(64,64,64);
					rect(width/32*14,height/32*26,width/32*4,height/32*2);
					fill(255,0,0);
					noStroke();
					textAlign(CENTER,CENTER);
					textSize(height/24);
					text("Back",width/2,height/32*27);
					textSize(height/32);
					text(Uname,width/2,height-height/32);
					if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 3;
						sub = 0;
					}
					if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 4;
					}
					if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 5;
					}
					if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 6;
					}
					if(mouseX < width/32*18 && mouseX > width/32*14 && mouseY < height/32*28 && mouseY > height/32*26 && mouseIsPressed){
						scene = 1;
						sub = 0;
					}
				}
				if(sub === 9){
					//Release notes
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
					fill(255,255,255);
					noStroke();
					textSize(height/32);
					text("Release notes: 0.1.1 (2020/11/20)",width/2,height/32*14);
					text("Added the infopedia! Improved all ship textures!",width/2,height/32*15);
					text("Made the shipyard interface better! Reload/Recharge research improves firing speed!",width/2,height/32*16);
					text("Added more levels! Research costs now scale!",width/2,height/32*17); 
					text("Changed errors to be popups and added exit game button back!",width/2,height/32*18);
					stroke(255,0,0);
					fill(64,64,64);
					rect(width/32*14,height/32*26,width/32*4,height/32*2);
					fill(255,0,0);
					noStroke();
					textAlign(CENTER,CENTER);
					textSize(height/24);
					text("Back",width/2,height/32*27);
					textSize(height/32);
					text(Uname,width/2,height-height/32);
					if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 3;
					}
					if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 4;
					}
					if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 5;
					}
					if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
						scene = 6;
					}
					if(mouseX < width/32*18 && mouseX > width/32*14 && mouseY < height/32*28 && mouseY > height/32*26 && mouseIsPressed){
						scene = 1;
						sub = 0;
					}
				}
			}
			if(scene === 2){
				background(0,0,0);
				fill(128,128,128);
				rect(width/2-width/8,height/2+height/16,width/4,height/16);
				fill(255,0,0);
				textSize(height/32*1.5);
				textAlign(CENTER,CENTER);
				text("Accept name",width/2,height/2+height/11);
				Uname = Text;
				textBox(width/2-width/8,height/2,width/4);
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8 && mouseY > height/2+height/16 && mouseIsPressed) {
					scene = 3;
					sub=0;
				}
			}
			//if(scene === 3){
			if(scene === 3 && sub === 0){
				// Galaxy map GUI
				background(0,0,0);
				fill(255,255,255);
				noStroke();
				for(var i = 0; i < 25; i++){
					ellipse(starX[1][i],starY[1][i],starSize[i],starSize[i]);
				}
				textAlign(CENTER,CENTER);
				object(planetName[0],planetOccupied[0],width/16*6,height/16*13,width/24,planetColor[0][0],planetColor[1][0],planetColor[2][0]);
				object(planetName[1],planetOccupied[1],width/16*8,height/16*10,width/16,planetColor[0][1],planetColor[1][1],planetColor[2][1]);
				object(planetName[2],planetOccupied[2],width/16*13,height/16*10,width/12,planetColor[0][2],planetColor[1][2],planetColor[2][2]);
				object(planetName[3],planetOccupied[3],width/16*10,height/16*8,width/16,planetColor[0][3],planetColor[1][3],planetColor[2][3]);
				object(planetName[4],planetOccupied[4],width/16*11,height/16*5,width/8,planetColor[0][4],planetColor[1][4],planetColor[2][4]);
				object(planetName[5],planetOccupied[5],width/16*6,height/16*5,width/15,planetColor[0][5],planetColor[1][5],planetColor[2][5]);
				object(planetName[6],planetOccupied[6],width/16*4,height/16*7,width/11,planetColor[0][6],planetColor[1][6],planetColor[2][6]);
				object(planetName[7],planetOccupied[7],width/16*2,height/16*10,width/18,planetColor[0][7],planetColor[1][7],planetColor[2][7]);
				object(planetName[8],planetOccupied[8],width/16*11,height/16*13,width/9,planetColor[0][8],planetColor[1][8],planetColor[2][8]);
				stroke(64,64,64);
				fill(128,128,128);
				rect(width/4*0,0,width/4,height/8);
				rect(width/4*1,0,width/4,height/8);
				rect(width/4*2,0,width/4,height/8);
				rect(width/4*3,0,width/4,height/8);
				rect(width/2-width/8,height-25,width/4,25);
				if(planetOccupied[8] === 2){
					rect(width/16*15,height/16*14,width/16,height/12);
					fill(255,0,0);
					text(">",width/32*31,height/32*29);
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
				if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 3;
				}
				if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed ) {
					scene = 4;
				}
				if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 5;
				}
				if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 6;
				}
				if(mouseX < width/16*6+width/48 && mouseX > width/16*6-width/48 && mouseY < height/16*13+width/48 && mouseY > height/16*13-height/48 && mouseIsPressed){
					scene = 7;
					sub = 0;
				}
				if(mouseX < width/16*8+width/32 && mouseX > width/16*8-width/32 && mouseY < height/16*10+width/32 && mouseY > height/16*10-height/32 && mouseIsPressed){
					scene = 7;
					sub = 1;
				}
				if(mouseX < width/16*13+width/24 && mouseX > width/16*13-width/24 && mouseY < height/16*10+width/24 && mouseY > height/16*10-height/24 && mouseIsPressed){
					scene = 7;
					sub = 2;
				}
				if(mouseX < width/16*10+width/32 && mouseX > width/16*10-width/32 && mouseY < height/16*8+width/32 && mouseY > height/16*8-height/32 && mouseIsPressed){
					scene = 7;
					sub = 3;
				}
				if(mouseX < width/16*11+width/16 && mouseX > width/16*11-width/16 && mouseY < height/16*5+width/16 && mouseY > height/16*5-height/16 && mouseIsPressed){
					scene = 7;
					sub = 4;
				}
				if(mouseX < width/16*6+width/30 && mouseX > width/16*6-width/30 && mouseY < height/16*5+width/30 && mouseY > height/16*5-height/30 && mouseIsPressed){
					scene = 7;
					sub = 5;
				}
				if(mouseX < width/16*4+width/22 && mouseX > width/16*4-width/22 && mouseY < height/16*7+width/22 && mouseY > height/16*7-height/22 && mouseIsPressed){
					scene = 7;
					sub = 6;
				}
				if(mouseX < width/16*2+width/36 && mouseX > width/16*2-width/36 && mouseY < height/16*10+width/36 && mouseY > height/16*10-height/36 && mouseIsPressed){
					scene = 7;
					sub = 7;
				}
				if(mouseX < width/16*11+width/18 && mouseX > width/16*11-width/18 && mouseY < height/16*13+width/18 && mouseY > height/16*13-height/18 && mouseIsPressed){
					scene = 7;
					sub = 8;
				}
				if(mouseX < width && mouseX > width/16*15 && mouseY < height/16*14+height/12 && mouseY > height/16*14 && mouseIsPressed){
					scene = 3;
					sub = 1;
				}
			}
			if(scene === 3 && sub === 1){
				// Galaxy map GUI
				background(0,0,0);
				fill(255,255,255);
				noStroke();
				for(var i = 0; i < 25; i++){
					ellipse(starX[1][i],starY[1][i],starSize[i],starSize[i]);
				}
				textAlign(CENTER,CENTER);
				object(planetName[9],planetOccupied[9],width/16*6,height/16*13,width/24,planetColor[0][9],planetColor[1][9],planetColor[2][9]);
				object(planetName[10],planetOccupied[10],width/16*8,height/16*10,width/16,planetColor[0][10],planetColor[1][10],planetColor[2][10]);
				object(planetName[11],planetOccupied[11],width/16*13,height/16*10,width/12,planetColor[0][11],planetColor[1][11],planetColor[2][11]);
				object(planetName[12],planetOccupied[12],width/16*10,height/16*8,width/16,planetColor[0][12],planetColor[1][12],planetColor[2][12]);
				object(planetName[13],planetOccupied[13],width/16*11,height/16*5,width/8,planetColor[0][13],planetColor[1][13],planetColor[2][13]);
				object(planetName[14],planetOccupied[14],width/16*6,height/16*5,width/15,planetColor[0][14],planetColor[1][14],planetColor[2][14]);
				object(planetName[15],planetOccupied[15],width/16*4,height/16*7,width/11,planetColor[0][15],planetColor[1][15],planetColor[2][15]);
				object(planetName[16],planetOccupied[16],width/16*2,height/16*10,width/18,planetColor[0][16],planetColor[1][16],planetColor[2][16]);
				stroke(64,64,64);
				fill(128,128,128);
				rect(width/4*0,0,width/4,height/8);
				rect(width/4*1,0,width/4,height/8);
				rect(width/4*2,0,width/4,height/8);
				rect(width/4*3,0,width/4,height/8);
				rect(width/2-width/8,height-25,width/4,25);
				rect(0,height/16*14,width/16,height/12);
				fill(255,0,0);
				text("<",width/32*1,height/32*29);
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
				if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 3;
				}
				if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed ) {
					scene = 4;
				}
				if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 5;
				}
				if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 6;
				}
				if(mouseX < width/16*6+width/48 && mouseX > width/16*6-width/48 && mouseY < height/16*13+width/48 && mouseY > height/16*13-height/48 && mouseIsPressed){
					scene = 7;
					sub = 9;
				}
				if(mouseX < width/16*8+width/32 && mouseX > width/16*8-width/32 && mouseY < height/16*10+width/32 && mouseY > height/16*10-height/32 && mouseIsPressed){
					scene = 7;
					sub = 10;
				}
				if(mouseX < width/16*13+width/24 && mouseX > width/16*13-width/24 && mouseY < height/16*10+width/24 && mouseY > height/16*10-height/24 && mouseIsPressed){
					scene = 7;
					sub = 11;
				}
				if(mouseX < width/16*10+width/32 && mouseX > width/16*10-width/32 && mouseY < height/16*8+width/32 && mouseY > height/16*8-height/32 && mouseIsPressed){
					scene = 7;
					sub = 12;
				}
				if(mouseX < width/16*11+width/16 && mouseX > width/16*11-width/16 && mouseY < height/16*5+width/16 && mouseY > height/16*5-height/16 && mouseIsPressed){
					scene = 7;
					sub = 13;
				}
				if(mouseX < width/16*6+width/30 && mouseX > width/16*6-width/30 && mouseY < height/16*5+width/30 && mouseY > height/16*5-height/30 && mouseIsPressed){
					scene = 7;
					sub = 14;
				}
				if(mouseX < width/16*4+width/22 && mouseX > width/16*4-width/22 && mouseY < height/16*7+width/22 && mouseY > height/16*7-height/22 && mouseIsPressed){
					scene = 7;
					sub = 15;
				}
				if(mouseX < width/16*2+width/36 && mouseX > width/16*2-width/36 && mouseY < height/16*10+width/36 && mouseY > height/16*10-height/36 && mouseIsPressed){
					scene = 7;
					sub = 16;
				}
				if(mouseX < width/16*1 && mouseX > width/16*0 && mouseY < height/16*14+height/12 && mouseY > height/16*14 && mouseIsPressed){
					scene = 3;
					sub = 0;
				}
			}
			if(scene === 4){
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
				rect(width/16*1,height/16*8-height/32,width/16*5,height/16);
				if(metal >= 2000 && minerals >= 2000 && fuel >= 500){stroke(0,255,0);}else {stroke(255,0,0);}
				rect(width/16*1,height/16*10-height/32,width/16*5,height/16);
				if(metal >= 4000 && minerals >= 1000 && fuel >= 1000){stroke(0,255,0);}else {stroke(255,0,0);}
				rect(width/16*1,height/16*12-height/32,width/16*5,height/16);
				if(metal >= 10000 && minerals >= 4000 && fuel >= 2500){stroke(0,255,0);}else {stroke(255,0,0);}
				rect(width/16*9,height/16*8-height/32,width/16*5,height/16);
				if(metal >= 25000 && minerals >= 10000 && fuel >= 5000){stroke(0,255,0);}else {stroke(255,0,0);}
				rect(width/16*9,height/16*10-height/32,width/16*5,height/16);
				stroke(255,0,0);
				rect(width/16*6,height/16*8-height/32,width/16,height/16);
				rect(width/16*6,height/16*10-height/32,width/16,height/16);
				rect(width/16*6,height/16*12-height/32,width/16,height/16);
				rect(width/16*14,height/16*8-height/32,width/16,height/16);
				rect(width/16*14,height/16*10-height/32,width/16,height/16);
				fill(255,0,0);
				noStroke();
				textSize(height/24);
				textAlign(CENTER,TOP);
				text("Metal: "+metal,width/4*1,height/4*1);
				text("Minerals: "+minerals,width/4*2,height/4*1);
				text("Fuel: "+fuel,width/4*3,height/4*1);
				textAlign(CENTER,CENTER);
				text("i",width/32*13,height/16*8);
				text("i",width/32*13,height/16*10);
				text("i",width/32*13,height/16*12);
				text("i",width/32*29,height/16*8);
				text("i",width/32*29,height/16*10);
				textSize(height/32);
				text("Corvette ["+shipNum[1]+"]",width/8*2,height/16*8);
				text("Frigate ["+shipNum[2]+"]",width/8*2,height/16*10);
				text("Crusier ["+shipNum[3]+"]",width/8*2,height/16*12);
				text("Destoryer ["+shipNum[4]+"]",width/8*6,height/16*8);
				text("Battleship ["+shipNum[5]+"]",width/8*6,height/16*10);
				text(Uname,width/2,height-height/32);
				if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 3;
					sub = 0;
				}
				if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 4;
				}
				if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 5;
				}
				if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 6;
				}
				if(mouseX < width/16*5 && mouseX > width/16*1 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32 && mouseIsPressed && metal >= 1000 && minerals >= 500 && fuel >= 250){
					metal -= 1000;
					minerals -= 500;
					fuel -= 250;
					shipNum[1]++;
				}
				if(mouseX < width/16*5 && mouseX > width/16*1 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32 && mouseIsPressed && metal >= 2000 && minerals >= 2000 && fuel >= 500){
					metal -= 2000;
					minerals -= 2000;
					fuel -= 500;
					shipNum[2]++;
				}
				if(mouseX < width/16*5 && mouseX > width/16*1 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32 && mouseIsPressed && metal >= 4000 && minerals >= 1000 && fuel >= 1000){
					metal -= 4000;
					minerals -= 1000;
					fuel -= 1000;
					shipNum[3]++;
				}
				if(mouseX < width/16*13 && mouseX > width/16*9 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32 && mouseIsPressed && metal >= 10000 && minerals >= 4000 && fuel >= 2500){
					metal -= 10000;
					minerals -= 4000;
					fuel -= 2500;
					shipNum[4]++;
				}
				if(mouseX < width/16*13 && mouseX > width/16*9 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32 && mouseIsPressed && metal >= 25000 && minerals >= 10000 && fuel >= 5000){
					metal -= 25000;
					minerals -= 10000;
					fuel -= 5000;
					shipNum[5]++;
				}
				if(mouseX < width/16*7 && mouseX > width/16*6 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32 && mouseIsPressed){
					scene = 1;
					sub = 1;
				}
				if(mouseX < width/16*7 && mouseX > width/16*6 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32 && mouseIsPressed){
					scene = 1;
					sub = 2;
				}
				if(mouseX < width/16*7 && mouseX > width/16*6 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32 && mouseIsPressed){
					scene = 1;
					sub = 3;
				}
				if(mouseX < width/16*15 && mouseX > width/16*14 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32 && mouseIsPressed){
					scene = 1;
					sub = 4;
				}
				if(mouseX < width/16*15 && mouseX > width/16*14 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32 && mouseIsPressed){
					scene = 1;
					sub = 5;
				}
			}
			if(scene === 5){
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
				object("Armor "+ armorLevel+ "(cost: "+techPrice[0]+")",techColor,width/4*1,height/4*3,width/16,64,64,64);
				if (shieldLevel === 0){techColor = 1;}
				if (shieldLevel >= 1){techColor = 2;}
				object("Shield "+ shieldLevel+ "(cost: "+techPrice[1]+")",techColor,width/4*1,height/4*2,width/16,64,64,64);
				if (laserLevel === 0){techColor = 1;}
				if (laserLevel >= 1){techColor = 2;}
				object("Laser "+ laserLevel+ "(cost: "+techPrice[2]+")",techColor,width/4*3,height/4*3,width/16,64,64,64);
				if (missleLevel === 0){techColor = 1;}
				if (missleLevel >= 1){techColor = 2;}
				object("Missle "+ missleLevel+ "(cost: "+techPrice[3]+")",techColor,width/4*3,height/4*2,width/16,64,64,64);
				if (reloadLevel === 0){techColor = 1;}
				if (reloadLevel >= 1){techColor = 2;}
				object("Reload "+ reloadLevel+ "(cost: "+techPrice[4]+")",techColor,width/4*2,height/4*3,width/16,64,64,64);
				if (rechargeLevel === 0){techColor = 1;}
				if (rechargeLevel >= 1){techColor = 2;}
				object("Recharge "+ rechargeLevel+ "(cost: "+techPrice[5]+")",techColor,width/4*2,height/4*2,width/16,64,64,64);
				if (armorLevel < 5){stroke(255,0,0);}
				if (armorLevel >= 5){stroke(0,255,0);}
				line(width/4*1,height/4*3-height/16,width/4*1,height/4*2+height/16);
				if (laserLevel < 5){stroke(255,0,0);}
				if (laserLevel >= 5){stroke(0,255,0);}
				line(width/4*3,height/4*3-height/16,width/4*3,height/4*2+height/16);
				if (reloadLevel < 5){stroke(255,0,0);}
				if (reloadLevel >= 5){stroke(0,255,0);}
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
				if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 3;
					sub = 0;
				}
			    	if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 4;
				}
			    	if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 5;
				}
			    	if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 6;
				}
				if( mouseX > width/4*1-width/32 && mouseX < width/4*1+width/32 && mouseY > height/4*3-width/32 && mouseY < height/4*3+width/32 && mouseIsPressed && techPoints >= 5+armorLevel){
					techPoints -= (5+armorLevel);
					armorLevel++;
				}
				if( mouseX > width/4*3-width/32 && mouseX < width/4*3+width/32 && mouseY > height/4*3-width/32 && mouseY < height/4*3+width/32 && mouseIsPressed && techPoints >= 5+laserLevel){
					techPoints -= (5+laserLevel);
					laserLevel++;
				}
				if( mouseX > width/4*1-width/32 && mouseX < width/4*1+width/32 && mouseY > height/4*2-width/32 && mouseY < height/4*2+width/32 && mouseIsPressed && techPoints >= 10+shieldLevel && armorLevel >= 5){
					techPoints -= (10+shieldLevel);
					shieldLevel++;				 
				}
				if( mouseX > width/4*3-width/32 && mouseX < width/4*3+width/32 && mouseY > height/4*2-width/32 && mouseY < height/4*2+width/32 && mouseIsPressed && techPoints >= 10+missleLevel && laserLevel >= 5){
					techPoints -= (10+missleLevel);
					missleLevel++;				 
				}
				if( mouseX > width/4*2-width/32 && mouseX < width/4*2+width/32 && mouseY > height/4*3-width/32 && mouseY < height/4*3+width/32 && mouseIsPressed && techPoints >= 5+reloadLevel){
					techPoints -= (5+reloadLevel);
					reloadLevel++;				 
				}
				if( mouseX > width/4*2-width/32 && mouseX < width/4*2+width/32 && mouseY > height/4*2-width/32 && mouseY < height/4*2+width/32 && mouseIsPressed && techPoints >= 10+rechargeLevel && reloadLevel >= 5){
					techPoints -= (10+rechargeLevel);
					rechargeLevel++;				 
				}
			}
			if(scene === 6){
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
				rect(width/2-width/8,height/32*15,width/4,height/16);
				rect(width/2-width/8,height/32*18,width/4,height/16);
				rect(width/2-width/8,height/32*21,width/4,height/16);
				//rect(width/2-width/8,height/32*24,width/4,height/16);
				textSize(height/16);
				noStroke();
				fill(255,0,0);
				text("Galaxy Map",width/4*0.5,height/8*0.5);
				text("Shipyard",width/4*1.5,height/8*0.5);
				text("Laboratory",width/4*2.5,height/8*0.5);
				text("Settings",width/4*3.5,height/8*0.5);
				//Options
				text("Reset Name",width/2,height/32*16);
				text("Infopedia",width/2,height/32*19);
				text("Main Menu",width/2,height/32*22);
				//text("Save Game",width/2,height/32*25);
				textSize(height/32);
				text(Uname,width/2,height-height/32);
				noStroke();
				fill(255,255,255);
				if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 3;
					sub = 0;
				}
				if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 4;
				}
				if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 5;
				}
				if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 6;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/32*18 && mouseY > height/32*15 && mouseIsPressed) {
					Text = "";
					skip = 1;
					scene = 2;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/32*20 && mouseY > height/32*18 && mouseIsPressed) {
					skip = 1;
					scene = 1;
					sub = 0;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/32*23 && mouseY > height/32*21 && mouseIsPressed) {
					skip = 2;
					scene = 0;
				}
				/**if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/32*26 && mouseY > height/32*24 && mouseIsPressed) {
					savetext = metal+","+minerals+","+fuel+","+planetOccupied[1]+","+planetOccupied[1]+","+planetOccupied[2]+","+planetOccupied[3]+",";
					savedata = new Blob([savetext], {type: 'text/plain'});
					saveurl = window.URL.createObjectURL(savedata);
					document.getElementById('download_link').href = saveurl;
				}**/
			}
			if(scene === 7){
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
					scene = 3;
					sub=0;
				}
				if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 4;
				}
				if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 5;
				}
				if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 6;
				}
				if(mouseX < width/16*10 && mouseX > width/16*8 && mouseY < height/16*12 && mouseY > height/16*11 && mouseIsPressed){
					scene = 3;
					sub = 0;
				}
				if(mouseX < width/16*13 && mouseX > width/16*11 && mouseY < height/16*12 && mouseY > height/16*11 && mouseIsPressed){
					scene = 8;
				}
			}
			if(scene === 8){
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
				stroke(255,0,0);
				rect(width/64*1,height/64*6,width/64*8,height/64*4);
				fill(255,0,0);
				textSize(height/48);
				textAlign(CENTER,CENTER);
				text("your shields: "+round(shipShields),width/64*4.5,height/64*2);
				text("enemy shields: "+round(enemyShields[sub]),width/64*4.5,height/64*4);
				text("surrender",width/64*4.5,height/64*8);
				textSize(height/32);
				text(Uname,width/2,height-height/32);
				for(var i=0;i<shipNum[5];i++){
					shipDraw(5,shipX[shipZ],shipY[shipZ],1);
					shipZ++;
				}
				for(var i=0;i<shipNum[4];i++){
					shipDraw(4,shipX[shipZ],shipY[shipZ],1);
					shipZ++;
				}
				for(var i=0;i<shipNum[3];i++){
					shipDraw(3,shipX[shipZ],shipY[shipZ],1);
					shipZ++;
				}
				for(var i=0;i<shipNum[2];i++){
					shipDraw(2,shipX[shipZ],shipY[shipZ],1);
					shipZ++;
				}
				for(var i=0;i<shipNum[1];i++){
					shipDraw(1,shipX[shipZ],shipY[shipZ],1);
					shipZ++;
				}
				if(shipTick < ((15+reloadLevel)*(1+rechargeLevel/100))){
					burn[0] = true;
				}
				if(enemyTick < 20+sub){
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
					if(sub < 9){shipShields -= sub;}
					if(sub > 8){shipShields -= sub*sub;}
					burnTime--;
				}
				shipZ = 0;
				if(sub===1){
					shipDraw(11,enemyX[2],enemyY[4],1);
					shipDraw(12,enemyX[2],enemyY[5],1);
					shipDraw(11,enemyX[2],enemyY[6],1);
				}
				if(sub===2){
					shipDraw(11,enemyX[2],enemyY[3],1);
					shipDraw(12,enemyX[2],enemyY[4],1);
					shipDraw(13,enemyX[2],enemyY[5],1);
					shipDraw(12,enemyX[2],enemyY[6],1);
					shipDraw(11,enemyX[2],enemyY[7],1);
				}
				if(sub===3){
					shipDraw(12,enemyX[2],enemyY[3],1);
					shipDraw(12,enemyX[2],enemyY[4],1);
					shipDraw(14,enemyX[2],enemyY[5],1);
					shipDraw(12,enemyX[2],enemyY[6],1);
					shipDraw(12,enemyX[2],enemyY[7],1);
				}
				if(sub===4){
					shipDraw(12,enemyX[2],enemyY[2],1);
					shipDraw(12,enemyX[2],enemyY[3],1);
					shipDraw(13,enemyX[2],enemyY[4],1);
					shipDraw(13,enemyX[2],enemyY[5],1);
					shipDraw(13,enemyX[2],enemyY[6],1);
					shipDraw(12,enemyX[2],enemyY[7],1);
					shipDraw(12,enemyX[2],enemyY[8],1);
				}
				if(sub===5){
					shipDraw(11,enemyX[2],enemyY[2],1);
					shipDraw(13,enemyX[2],enemyY[3],1);
					shipDraw(13,enemyX[2],enemyY[4],1);
					shipDraw(14,enemyX[2],enemyY[5],1);
					shipDraw(13,enemyX[2],enemyY[6],1);
					shipDraw(13,enemyX[2],enemyY[7],1);
					shipDraw(11,enemyX[2],enemyY[8],1);
				}
				if(sub===6){
					shipDraw(11,enemyX[2],enemyY[1],1);
					shipDraw(11,enemyX[2],enemyY[2],1);
					shipDraw(13,enemyX[2],enemyY[3],1);
					shipDraw(14,enemyX[2],enemyY[4],1);
					shipDraw(14,enemyX[2],enemyY[5],1);
					shipDraw(14,enemyX[2],enemyY[6],1);
					shipDraw(13,enemyX[2],enemyY[7],1);
					shipDraw(11,enemyX[2],enemyY[8],1);
					shipDraw(11,enemyX[2],enemyY[9],1);
				}
				if(sub===7){
					shipDraw(12,enemyX[1],enemyY[3],1);
					shipDraw(12,enemyX[1],enemyY[4],1);
					shipDraw(13,enemyX[1],enemyY[5],1);
					shipDraw(12,enemyX[1],enemyY[6],1);
					shipDraw(12,enemyX[1],enemyY[7],1);
					shipDraw(14,enemyX[2],enemyY[3],1);
					shipDraw(14,enemyX[2],enemyY[4],1);
					shipDraw(14,enemyX[2],enemyY[5],1);
					shipDraw(14,enemyX[2],enemyY[6],1);
					shipDraw(14,enemyX[2],enemyY[7],1);
				}
				if(sub===8){
					shipDraw(12,enemyX[1],enemyY[2],1);
					shipDraw(12,enemyX[1],enemyY[3],1);
					shipDraw(13,enemyX[1],enemyY[4],1);
					shipDraw(13,enemyX[1],enemyY[5],1);
					shipDraw(13,enemyX[1],enemyY[6],1);
					shipDraw(12,enemyX[1],enemyY[7],1);
					shipDraw(12,enemyX[1],enemyY[8],1);
					shipDraw(14,enemyX[2],enemyY[2],1);
					shipDraw(14,enemyX[2],enemyY[3],1);
					shipDraw(14,enemyX[2],enemyY[4],1);
					shipDraw(15,enemyX[2],enemyY[5],1);
					shipDraw(14,enemyX[2],enemyY[6],1);
					shipDraw(14,enemyX[2],enemyY[7],1);
					shipDraw(14,enemyX[2],enemyY[8],1);
				}
				if(sub >= 9){
					shipDraw(13,enemyX[1],enemyY[2],1);
					shipDraw(13,enemyX[1],enemyY[3],1);
					shipDraw(14,enemyX[1],enemyY[4],1);
					shipDraw(14,enemyX[1],enemyY[5],1);
					shipDraw(14,enemyX[1],enemyY[6],1);
					shipDraw(13,enemyX[1],enemyY[7],1);
					shipDraw(13,enemyX[1],enemyY[8],1);
					shipDraw(15,enemyX[2],enemyY[2],1);
					shipDraw(15,enemyX[2],enemyY[3],1);
					shipDraw(15,enemyX[2],enemyY[4],1);
					shipDraw(15,enemyX[2],enemyY[5],1);
					shipDraw(15,enemyX[2],enemyY[6],1);
					shipDraw(15,enemyX[2],enemyY[7],1);
					shipDraw(15,enemyX[2],enemyY[8],1);
				}
				if(enemyShields[sub] <= 0){
					planetOccupied[sub] = 2;
					shipBattle = false;
					metal+= 5000*sub;
					minerals+= 2500*sub;
					fuel+= 2000* sub;
					techPoints+= 5*sub;
					battleWon=true;
					scene=9;
				}
				if(shipShields <= 0){
					shipBattle = false;
					battleWon=false;
					scene=9;
				}
				if(mouseX > width/64*1 && mouseX < width/64*9 && mouseY > width/64*4 && mouseY < width/64*6 && mouseIsPressed){
					battleWon=false;
					scene=9;	
				}
			}
			if(scene === 9){
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
					scene = 3;
					sub = 0;
					battleWon = null;
				}
				if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 4;
					battleWon = null;
				}
				if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 5;
					battleWon = null;
				}
				if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					scene = 6;
					battleWon = null;
				}
				if(mouseX < width/16*10 && mouseX > width/16*8 && mouseY < height/16*12 && mouseY > height/16*11 && mouseIsPressed){
					scene = 8;
					battleWon = null;
				}
				if(mouseX < width/16*13 && mouseX > width/16*11 && mouseY < height/16*12 && mouseY > height/16*11 && mouseIsPressed){
					scene = 3;
					sub = 0;
					battleWon = null;
				}
			}
		};

        // ProgramCode A A A
    }};

    // Get the canvas that Processing-js will use
    var canvas = document.getElementById("mycanvas"); 
    // Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
    var processingInstance = new Processing(canvas, sketchProc); 
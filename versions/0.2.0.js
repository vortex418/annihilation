var sketchProc = function(processingInstance) {
	var mouseIsPressed = false;
     processingInstance.mousePressed = function () { mouseIsPressed = true; };
     processingInstance.mouseReleased = function () { mouseIsPressed = false; };
	processingInstance.touchStarted = function () { mouseIsPressed = true; };
     processingInstance.touchEnded = function () { mouseIsPressed = false; };
	var keyIsPressed = false;
	processingInstance.keyPressed = function () { keyIsPressed = true; };
     processingInstance.keyReleased = function () { keyIsPressed = false; };
	function getImage(url) {
		processingInstance.externals.sketch.imageCache.add(url);
		return processingInstance.loadImage(url);
     }
     with (processingInstance) {
		resizeTo(1024, 576);
		size(1024,576);
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
			1/8 = How To Play
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
		var skip = 0;
		var tabText = 16;
		var log = [0,1];
		var star = {
			x: [
[round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width))],
				[round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width))],
				[round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width)),round(random(0,width))]
			],
			y: [
				[round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height))],
				[round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height))],
				[round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height)),round(random(0,height))]
			],
			max: 5,
			size: []
		};
		star.size = [round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max))];
		//planets
		var planet = {
			max: 0,
			name: ["crash site","[1] Abrigato","[2] Beta-Keralis","[3] Suzum","[4] Vespa","[5] Coruscare","[6] Vulca","[7] Jaeger","[8] Kashyyyk","[9] Outpost-42","[10] Victoria Alpha","[11] Victoria Bravo","[12] Gesht","[13] Sanctuary","[14] Snowmass","[15] Ja","[16] Keeg","[17]Haemeiguli","[18]Borebalae","[19]Albataetarius","[20]Hataerius","[21]Achernaiphoros","[22]Antadrophei","[23]Hoemeirai","[24]Antabalis","[25]Hoereo","[26]Pazadam","[27]Equidor","[28]Pax","[29]Xena","[30]Titan","[31]Oturn","[32]Thuamia","[33]Heuthea","[34]Ditharus","[35]Muxater","[36]Trukovis","[37]Bichotune","[38]Etis","[39]Leorus","[40]Aphus","[41]Harophos","[42]","[43]","[44]","[45]","[46]","[47]","[48]","[49]","[50]","[51]","[52]","[53]","[54]","[55]","[56]","[57]","[58]","[59]","[60]","[61]","[62]","[63]","[64] Home!"],
			status: [0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			str: {
				r: "",
				g: "",
				b: "",
			},
			color: {
				r: [128,round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),200],
				g: [128,round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),200],
				b: [128,round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),round(random(0,255)),200],
			},
			recommended: ["n/a",25,50,100,175,275,400,550,675,5000,2500,5000,10000,15000,25000,35000,50000,70000,95000,130000,170000,215000,270000,340000,420690,510000,610000,720000,830000,940000,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999,999999],
			difficulty: ["very easy","easy","easy-medium","medium","medium-hard","hard","very hard","extremly hard","hard-insane","insane"]
		};
		//vars for research
		var tech = {
			points: 100,
			color: 0,
			price: [0],
			level: {
				armor: 0,
				shield: 0,
				laser: 0,
				missle: 0,
				reload: 0,
				recharge: 0,
			},
		};
		//resources
		var metal = 10000;
		var minerals = 5000;
		var fuel = 2500;
		var tax = {
			claimed: 0,
			max: 10,
		};
		// everything ship related!
		var ship = {
			generic: {
				strength: 10,
				shields: 10,
			},
			totalnum: 0,
			total: 0,
			num: [0,0,0,0,0,0,0,0],
			strength: 0,
			cost: {
				metal: [1000,2000,4000,10000,25000,100000],
				minerals: [500,2000,1000,4000,10000,50000],
				fuel: [250,500,1000,2500,5000,25000],
			},
			width: [null,25,36,75,100,150,160,0,0,0,0,25,35,75,100,150,160],
			height: [null,24,18,50,50,60,131,0,0,0,0,24,18,50,50,60,131],
			x:[width/64*28,width/64*28,width/64*28,width/64*28,width/64*28,width/64*28,width/64*28,width/64*20,width/64*20,width/64*20,width/64*20,width/64*20,width/64*20,width/64*20,width/64*12,width/64*12,width/64*12,width/64*12,width/64*12,width/64*12,width/64*12,width/64*4,width/64*4,width/64*4,width/64*4],
			y: [width/64*16,width/64*12,width/64*20,width/64*8,width/64*24,width/64*4,width/64*28,width/64*2,width/64*36,width/64*56,width/64*41,width/64*51,width/64*48,width/64*10,width/64*31,width/64*31,width/64*8,width/64*40,width/64*4,width/64*10,width/64*59,width/64*52,width/64*29,width/64*10,width/64*27],
			shields: 0,
			tick: null,
		};		
		var InBattle = false;
		var battleWon = false;
		var burn = {
			status: [false,false],
			x: 0,
			y: 0,
		};
		var enemy = {
			x: [width/64*32,width/64*38,width/64*44,width/64*50],
			y: [height/64*0,height/64*6,height/64*12,height/64*18,height/64*24,height/64*32,height/64*40,height/64*46,height/64*52,height/64*58],
			shields: 100,
			tick: 100,
		};
		var cX;
		var cY;
		var cXmin = [0,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1];
		var cXmax = [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
		var cYmin = [0,4,3,3,2,2,1,3,2,1,1,1,1,1,1,1,1,1];
		var cYmax = [0,6,7,7,8,8,9,7,8,9,9,9,9,9,9,9,9,9];
		// function to draw ships, I figured to put it here since it makes more sense next to the ship var than the other functions
		// type: which type(0-4 yours,5-10 enemy) ,shields: % shields are at
		var shipDraw = function(type,x,y,z){
			var imgName;
			if(type == 1){imgName = "corvette"}
			if(type == 2){imgName = "frigate"}
			if(type == 3){imgName = "crusier"}
			if(type == 4){imgName = "destroyer"}
			if(type == 5){imgName = "battleship"}
			if(type == 6){imgName = "dreadnought"}
			if(type == 11){imgName = "enemy-corvette"}
			if(type == 12){imgName = "enemy-frigate"}
			if(type == 13){imgName = "enemy-crusier"}
			if(type == 14){imgName = "enemy-destroyer"}
			if(type == 15){imgName = "enemy-battleship"}
			if(type == 16){imgName = "enemy-dreadnought"}
			image(getImage("/annihilation/models/ships/"+imgName+".png"),x-20,y-20,ship.width[type]*z,ship.height[type]*z);
		};
		var playSound = function(src) {
			document.getElementById("audio").src="/annihilation/sound/"+src;
			var sound = document.getElementById("audio");
  			sound.play();
		};
		var play = false;
		var playTime = 20;
		var onceSound = function(sound){
			play = true;
			playSound(sound);
		};
		var save = {
			fromUpload: null,
			selected: 0,
			content: "",
			url: null,
			str: "",
			valid: false,
			new: 0,
			json: {
				planet: "",
				star: "",
				ship: "",
				tech: "",
				tax: ""
			}
		};
		var command = {
			str: "",
			type: "",
			subtype: "",
			value: ""
		};
		var element = {
			show: function(id){
					if(document.getElementById(id).classList.contains("hidden") == true){
					document.getElementById(id).classList.remove("hidden");
					console.log('"'+id+'" shown');
				}
			},
			hide: function(id){
				if(document.getElementById(id).classList.contains("hidden") == false){
					document.getElementById(id).classList.add("hidden");
					console.log('"'+id+ '" hidden');
				}
			},
			toggle: function(id, classTotoggle){
				if(document.getelementById(id).classList.contains(classTotoggle) == true){
					document.getElementById(id).classList.remove(classTotoggle);
				}
				if(document.getelementById(id).classList.contains(classTotoggle) == false){
					document.getElementById(id).classList.add(classTotoggle);
				}
			}
		};
		var box = function(x,y,width,height,layer){
			image(getImage("/annihilation/models/UI/box-"+layer+".png"),x,y,width,height);
		};
		var button = function(x,y,width,height){
			image(getImage("/annihilation/models/UI/button.png"),x,y,width,height);
		}; 
		var starscape = function(num){
			fill(255,255,255);
			noStroke();
			for(var i = 0; i < 25; i++){
				ellipse(star.x[num][i],star.y[num][i],star.size[i],star.size[i]);
			}
		};
		var object = function(name,alligence,x,y,z,a,b,c){
			fill(255,255,255);
			if(alligence == 0){noStroke();}
			if(alligence < 0){stroke(255,0,0);}
			if(alligence > 0){stroke(0,255,0);}
			text(name,x,y+(z*0.6));
			fill(a,b,c);
			ellipse(x,y,z,z);
		};
		var drawUI = function(type){
			background(0,0,0);
			starscape(1);
			stroke(64,64,64);
			fill(128,128,128);
			button(width/4*0,0,width/4,height/8);
			button(width/4*1,0,width/4,height/8);
			button(width/4*2,0,width/4,height/8);
			button(width/4*3,0,width/4,height/8);
			noStroke();
			if(type===1){
				box(width*0.05,height/8+25,width*0.9,height/4*3,"background");
			}
			fill(200,200,214);
			textSize(height/tabText);
			text("Galaxy Map",width/4*0.5,height/8*0.5);
			text("Shipyard",width/4*1.5,height/8*0.5);
			text("Laboratory",width/4*2.5,height/8*0.5);
			text("Settings",width/4*3.5,height/8*0.5);
			if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
				scene = 3;
				sub = 0;
				element.hide("download_link");
			}
			if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
				scene = 4;
				element.hide("download_link");
			}
			if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
				scene = 5;
				element.hide("download_link");
			}
			if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
				scene = 6;
				element.hide("download_link");
			}
		};
		draw = function(){	
			if(scene != 0 && sub != 4){
				element.hide("inputsave");
			}
			if(play === true){
				playTime--;
			}
			ship.totalnum = ship.num[1]+ship.num[2]+ship.num[3]+ship.num[4]+ship.num[5]+ship.num[6];
			if(planet.status[64] === 2){
				scene = 0;
				sub = 2;
			}
			tech.points = parseFloat(tech.points);
			metal = parseFloat(metal);
			minerals = parseFloat(minerals);
			fuel = parseFloat(fuel);
			ship.strength = parseFloat(ship.strength);
			planet.max = parseFloat(planet.max);
			ship.generic.strength = parseFloat(ship.generic.strength);
			ship.generic.shields = parseFloat(ship.generic.shields);
			for(var i=0;i<64;i++){
				planet.color.r[i] = parseFloat(planet.color.r[i]);
				planet.color.g[i] = parseFloat(planet.color.g[i]);
				planet.color.b[i] = parseFloat(planet.color.b[i]);
			}
			tech.price =[Number(tech.level.armor)+5,Number(tech.level.shield)+10,Number(tech.level.laser)+5,parseFloat(tech.level.missle)+10,Number(tech.level.reload)+5,parseFloat(tech.level.recharge)+10];
		
			ship.strength = (ship.generic.strength + ship.num[1]*1 + ship.num[2]*5 + ship.num[3]*10 + ship.num[4]*25 + ship.num[5]*100 + ship.num[6]*250)*(parseFloat(tech.level.missle)+1+parseFloat(tech.level.laser)*0.2);
			if(InBattle === false){
				ship.shields = (ship.generic.shields + ship.num[1]*10+ship.num[2]*25+ship.num[3]*50+ship.num[4]*100+ship.num[5]*250 + ship.num[6]*1000)*(parseFloat(tech.level.shield)+1+parseFloat(tech.level.armor)*0.2);
				enemy.shields = [null,100,250,500,1000,3000,4000,5500,7500,25000,35000,50000,70000,95000,125000,160000,200000,250000,320000,400000,500000,620000,750000,880000,1000000,1250000,1550000,1800000,2250000,2750000,3300000,3900000,4750000,5000000,6000000,7500000,9000000,10000000,11000000,12000000,13000000,14000000,15000000,16000000,17000000,18000000,19000000,20000000,22000000,24000000,26000000,28000000,30000000,32500000,35000000,37500000,40000000,43300000,46600000,50000000,55000000,60000000,65000000,70000000,75000000];
				ship.maxShields = ship.shields; 
				enemy.maxShields = [null,100,250,500,1000,3000,4000,5500,7500,25000,35000,50000,70000,95000,125000,160000,200000,250000,320000,400000,500000,620000,750000,880000,1000000,1250000,1550000,1800000,2250000,2750000,3300000,3900000,4750000,5000000,6000000,7500000,9000000,10000000,11000000,12000000,13000000,14000000,15000000,16000000,17000000,18000000,19000000,20000000,22000000,24000000,26000000,28000000,30000000,32500000,35000000,37500000,40000000,43300000,46600000,50000000,55000000,60000000,65000000,70000000,75000000];
			}
			ship.tick = round(random(0,100));
			enemy.tick = round(random(0,100));
			if(burn.time <= 0){
				burn.status[0] = false;
			}
			if(burn.status[0] === false){
				burn.time = 10;
			}
			if(mouseIsPressed && mouseButton === RIGHT){
				command.str = prompt("Enter Command:");
				[command.type, command.subtype, command.value] = command.str.split(" ");
				parseFloat(command.value);
				if(command.type === "system"){
					if(command.subtype === "restart"){
						window.location.assign("/annihilation/play.html?v=0.2.0");
					}
					if(command.subtype === "reset"){
						localStorage.removeItem("localSave1");
						localStorage.removeItem("localSave2");
						localStorage.removeItem("localSave3");
					}
					if(command.subtype === "exit"){
						window.close();
					}
					if(command.subtype === "freeze"){
						window.alert("system was frozen successfully.");
					   	notafunction();
					}
				}
				if(command.type === "set"){
					if(command.subtype === "resource"){
						metal = command.value;
						minerals = command.value;
						fuel = command.value;
					}
					if(command.subtype === "metal"){
						metal = command.value;
					}
					if(command.subtype === "minerals"){
						minerals = command.value;
					}
					if(command.subtype === "fuel"){
						fuel = command.value;
					}
					if(command.subtype === "tax:claimed"){
						tax.claimed = command.value;
					}
					if(command.subtype === "tax:max"){
						tax.max = command.value;
					}
					if(command.subtype === "ship:corvette"){
						ship.num[1] = command.value;
					}
					if(command.subtype === "ship:frigate"){
						ship.num[2] = command.value;
					}
					if(command.subtype === "ship:cruiser"){
						ship.num[3] = command.value;
					}
					if(command.subtype === "ship:destroyer"){
						ship.num[4] = command.value;
					}
					if(command.subtype === "ship:battleship"){
						ship.num[5] = command.value;
					}
					if(command.subtype === "ship:dreadnought"){
						ship.num[6] = command.value;
					}
					if(command.subtype === "generic:shields"){
						ship.generic.shields = command.value;
						parseFloat(ship.generic.shields);
					}
					if(command.subtype === "generic:strength"){
						ship.generic.strength = command.value;
						parseFloat(ship.generic.strength);
					}
				}
				if(command.type === "tech"){
					if(command.subtype === "points"){
						tech.points = command.value;
					}
					if(command.subtype === "all"){
						tech.level.armor = command.value;
						tech.level.reload = command.value;
						tech.level.laser = command.value;
						tech.level.shield = command.value;
						tech.level.recharge = command.value;
						tech.level.missle = command.value;
					}
					if(command.subtype === "armor"){
						tech.level.armor = command.value;
					}
					if(command.subtype === "reload"){
						tech.level.reload = command.value;
					}
					if(command.subtype === "laser"){
						tech.level.laser = command.value;
					}
					if(command.subtype === "shields"){
						tech.level.shield = command.value;
					}
					if(command.subtype === "recharge"){
						tech.level.recharge = command.value;
					}
					if(command.subtype === "missle"){
						tech.level.missle = command.value;
					}
				}
				mouseIsPressed = false;
			}
			if(scene === 0 && sub === 0){
				background(0,0,0);
				image(getImage("/annihilation/models/menu.png"),0,0,width,height);
				fill(128,128,128);
				noStroke();
				button(width/2-width/8,height/2-height/32*1,width/4,height/16);
				button(width/2-width/8,height/2+height/32*2,width/4,height/16);
				button(width/2-width/8,height/2+height/32*5,width/4,height/16);
				fill(255,0,0);
				textAlign(CENTER,CENTER);
				textSize(width/28);
				text("0.2.0",width/2,height/32*11);
				fill(200,200,214);
				textSize(height/24);
				text("New Game",width/2,height/32*16);
				text("Load Game",width/2,height/32*19);
				text("Exit Game",width/2,height/32*22);
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/32 && mouseY > height/2-height/32 && mouseIsPressed && skip === 0) {
					sub = 1;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/32 && mouseY > height/2-height/32 && mouseIsPressed && skip === 2) {
					scene = 3;
					playSound("on.mp3");
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/32*4 && mouseY > height/2+height/32*2 && mouseIsPressed) {
					sub = 4;
					element.show("inputsave");
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/32*7 && mouseY > height/2+height/32*5 && mouseIsPressed) {
					onceSound("off.mp3");
					sub = 3;					
				}
			}
			if(scene === 0 && sub===1){
				background(0,0,0);
				if(log[1] > 0){
					console.log("This is an intentional feature, not an error");
					log[1]--;
				}
				playSound("sans.mp3");
				noStroke();
				fill(255,255,255);
				starscape(0);
				textAlign(CENTER,CENTER);
				fill(200,200,214);
				textSize(width/32);
				text("Story",width/2,height/4);
				textSize(height/32);
				text("You are a conquester. Your're goal is to take over the galaxy. You take off from your home system,",width/2,height/2-height/12);
				text("your destination over 100 years away. But you don't make it. ",width/2,height/2-height/20);
				text("Halfway through the trip, youre convoy is attacked and you're ship gets knocked off-course.",width/2,height/2);
				text("You wake up at the right time, but not in the right place. Now, you're over 25 years away from help. ",width/2,height/2+height/20); 
				text("But you have a fleet and troops. You're new goal: Get back home, at whatever costs!",width/2,height/2+height/12);
				fill(128,128,128);
				button(width/2-width/8*1.25,height/2+height/8+height/32,width/4*1.25,height/16);
				textSize(height/32*1.5);
				text("Start Game",width/2,height/2*1.375);
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8+height/16+height/32 && mouseY > height/2+height/8+height/32 && mouseIsPressed) {
					scene = 2;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8+height/16+height/32 && mouseY > height/2+height/8+height/32 && mouseIsPressed && skip === 1) {
					scene = 3;
					sub = 0;
				}
			}
			if(scene === 0 && sub===2){
				background(128,128,128);
				noStroke();
				fill(255,255,255);
				textAlign(CENTER,CENTER);
				fill(255,0,0);
				textSize(width/8);
				text("Your Home!",width/2,height/4);
				textSize(height/32);
				fill(255,255,255);
				text("Final fleet strength: "+round(ship.strength),width/2,height/2-height/12);
				text("Final number of ships: "+ship.totalnum,width/2,height/2-height/20);
				text("Did you have fun? Make sure to comment and upvote!",width/2,height/2);
				text("Support the game by joing the discord (https://discord.gg/7mQsXb3EdY) and telling everyone you know!",width/2,height/2+height/20); 
				text("All credit goes to Vortex418",width/2,height/2+height/12);
				fill(64,64,64);
				button(width/2-width/8*1.25,height/2+height/8+height/32,width/4*1.25,height/16);
				fill(200,200,214);
				textSize(height/32*1.5);
				text("Restart",width/2,height/2*1.375);
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8+height/16+height/32 && mouseY > height/2+height/8+height/32 && mouseIsPressed) {
					window.location.assign("/annihilation/play.html?v=0.2.0");
				}
			}
			if(scene === 0 && sub===3){
				background(128,128,128);
				noStroke();
				textAlign(CENTER,CENTER);
				fill(200,200,214);
				textSize(height/10);
				text("Closing...",width/2,height/2);
				if(playTime <= 0){window.close();}
			}
			if(scene === 0 && sub===4){
				background(128,128,128);			
				fill(64,64,64);
				textAlign(CENTER,CENTER);
				stroke(255,0,0);
				if(save.selected === 1){stroke(0,255,0)}else{stroke(255,0,0)}
				button(width/4*1-width/12,height/64*19,width/6,height/6);
				if(save.selected === 2){stroke(0,255,0)}else{stroke(255,0,0)}
				button(width/4*2-width/12,height/64*19,width/6,height/6);
				if(save.selected === 3){stroke(0,255,0)}else{stroke(255,0,0)}
				button(width/4*3-width/12,height/64*19,width/6,height/6);
				noStroke();
				button(width/2-width/16,height/32*26+8,width/8,height/32);
				button(width/2-width/8,height/32*23,width/4,height/16);
				fill(200,200,214);
				textSize(height/tabText);
				text("Start Game",width/2,height/32*24);
				text("Save 1",width/4*1,height/32*12);
				text("Save 2",width/4*2,height/32*12);
				text("Save 3",width/4*3,height/32*12);
				textSize(height/(tabText*2));
				text("Back",width/2,height/32*27);
				document.getElementById("inputsave").addEventListener('change', function() {
					mouseIsPressed = false;
					var reader = new FileReader();
					reader.onload = function(){ 
						save.valid = true;
						save.selected = 0;
						save.str = reader.result;
						console.log("loeaded from upload: "+save.str);
					};
					reader.readAsText(this.files[0]);					
				});
				for(var i=0; i<planet.max; i++){
					planet.status[i] = 2;
				}
				if(save.str == null){
					save.valid = false;
					save.str = "";
					alert("There's nothing in that save! Pick a different one or go back!");
				}
				if(mouseX < width/4*1+width/12 && mouseX > width/4*1-width/12 && mouseY < height/64*19+height/6 && mouseY > height/64*19 && mouseIsPressed){
					save.valid = true;
					save.selected = 1;
					save.str = localStorage.getItem("localSave1");
					console.log("loaded from slot 1: "+save.str);
				}
				if(mouseX < width/4*2+width/12 && mouseX > width/4*2-width/12 && mouseY < height/64*19+height/6 && mouseY > height/64*19 && mouseIsPressed){
					save.valid = true;
					save.selected = 2;
				  	save.str = localStorage.getItem("localSave2");
					console.log("loaded from slot 2: "+save.str);
				}
				if(mouseX < width/4*3+width/12 && mouseX > width/4*3-width/12 && mouseY < height/64*19+height/6 && mouseY > height/64*19 && mouseIsPressed){
					save.valid = true;
					save.selected = 3;
				   	save.str = localStorage.getItem("localSave3");
					console.log("loaded from slot 3: "+save.str);
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/32*25 && mouseY > height/32*23 && save.valid !== true){document.body.style.cursor = "not-allowed";} else {document.body.style.cursor = "default";}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/32*25 && mouseY > height/32*23 && mouseIsPressed && save.valid === true) {
[metal,minerals,fuel,save.json.planet,save.json.star,save.json.ship,save.json.tech,save.json.tax] = save.str.split("\n/sep/\n");
					planet = JSON.parse(save.json.planet);
					star = JSON.parse(save.json.star);
					ship = JSON.parse(save.json.ship);
					tech = JSON.parse(save.json.tech);
					tax = JSON.parse(save.json.tax);
					element.hide("inputsave");
					scene = 3;
					sub = 0;
				}
				if(mouseX < width/2+width/16 && mouseX > width/2-width/16 && mouseY < height/32*28 && mouseY > height/32*27 && mouseIsPressed) {
					element.hide("inputsave");
					scene = 0;
					sub = 0;
				}
			}
			if(scene === 1){
				if(sub===0){
					// ship info GUI
					drawUI(1);
					textAlign(CENTER,CENTER);
					noStroke();
					fill(64,64,64);
					button(width/32*3,height/32*8,width/32*12,height/32*8);
					button(width/32*3,height/32*20,width/32*12,height/32*8);
					button(width/32*17,height/32*8,width/32*12,height/32*8);
					button(width/32*17,height/32*20,width/32*12,height/32*8);
					stroke(255,0,0);
					fill(200,200,214);
					textSize(height/16);
					text("Story",width/32*9,height/8*3);
					text("How To Play",width/32*23,height/8*3);
					text("Ships",width/32*9,height/8*6);
					text("Commands",width/32*23,height/8*6);
					textSize(height/24);
					fill(255,255,255);
					textAlign(CENTER,CENTER);
					if(mouseX < width/32*15 && mouseX > width/32*3 && mouseY < height/32*16 && mouseY > height/32*8 && mouseIsPressed) {
						scene = 1;
						sub = 7;
					}
					if(mouseX < width/32*29 && mouseX > width/32*17 && mouseY < height/32*16 && mouseY > height/32*8 && mouseIsPressed) {
						scene = 1;
						sub = 9;
					}
					if(mouseX < width/32*15 && mouseX > width/32*3 && mouseY < height/32*28 && mouseY > height/32*20 && mouseIsPressed) {
						scene = 1;
						sub = 8;
					}
					if(mouseX < width/32*29 && mouseX > width/32*17 && mouseY < height/32*28 && mouseY > height/32*20 && mouseIsPressed) {
						scene = 1;
						sub = 10;
					}
				}
				if(sub>0 && sub <7){
					// ship info GUI
					drawUI(1);
					textAlign(CENTER,CENTER);
					stroke(255,0,0);
					fill(64,64,64);
					button(width/16*8,height/16*11,width/8,height/16);
					noStroke();
					textSize(height/32);
					text("Back",width/16*9,height/32*23);
					textSize(height/24);
					shipDraw(sub,width/4,height/2,6-sub);
					textAlign(LEFT,CENTER);
					noStroke();
					fill(255,255,255);
					text("metal cost: "+ship.cost.metal[sub-1],width/2,height/16*7);
					text("minerals cost: "+ship.cost.minerals[sub-1],width/2,height/16*8);
					text("fuel cost: "+ship.cost.fuel[sub-1],width/2,height/16*9);
					textAlign(CENTER,CENTER);
					if(mouseX < width/16*10 && mouseX > width/16*8 && mouseY < height/16*12 && mouseY > height/16*11 && mouseIsPressed){
						sub = 8;
					}
				}
				if(sub === 7){
					// Story (In Game)
					drawUI(1);
					textAlign(CENTER,CENTER);
					fill(200,200,214);
					noStroke();
					textSize(height/32);
					text("Story",width/2,height/32*14);
					text("You are a conquester. Your're goal is to take over the galaxy. You take off from your home system,",width/2,height/32*15);
					text("your destination over 100 years away. But you don't make it.",width/2,height/32*16);
					text("Halfway through the trip, youre convoy is attacked and you're ship gets knocked off-course.",width/2,height/32*17); 
					text("You wake up at the right time, but not in the right place. Now, you're over 25 years away from help.",width/2,height/32*18);
					text("But you have a fleet and troops. You're new goal: Get back home, at whatever costs.",width/2,height/32*19);
					stroke(255,0,0);
					fill(64,64,64);
					button(width/32*14,height/32*26,width/32*4,height/32*2);
					fill(200,200,214);
					noStroke();
					textAlign(CENTER,CENTER);
					textSize(height/24);
					text("Back",width/2,height/32*27);
					
					if(mouseX < width/32*18 && mouseX > width/32*14 && mouseY < height/32*28 && mouseY > height/32*26 && mouseIsPressed){
						scene = 1;
						sub = 0;
					}
				}
				if(sub === 8){
					// Ship info nav. GUI
					drawUI(1);
					textAlign(CENTER,CENTER);
					stroke(255,0,0);
					fill(64,64,64);
					button(width/16*1,height/16*8-height/32,width/16*6,height/16);
					button(width/16*1,height/16*10-height/32,width/16*6,height/16);
					button(width/16*1,height/16*12-height/32,width/16*6,height/16);
					button(width/16*9,height/16*8-height/32,width/16*6,height/16);
					button(width/16*9,height/16*10-height/32,width/16*6,height/16);
					button(width/16*9,height/16*12-height/32,width/16*6,height/16);
					fill(200,200,214);
					noStroke();
					textAlign(CENTER,CENTER);
					textSize(height/32);
					text("Corvette",width/8*2,height/16*8);
					text("Frigate",width/8*2,height/16*10);
					text("Crusier",width/8*2,height/16*12);
					text("Destoryer",width/8*6,height/16*8);
					text("Battleship",width/8*6,height/16*10);
					text("Dreadnought",width/8*6,height/16*12);
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
					if(mouseX < width/16*15 && mouseX > width/16*9 && mouseY < height/16*13-height/32 && mouseY > height/16*11-height/32 && mouseIsPressed){
						scene = 1;
						sub = 6;
					}
				}
				if(sub === 9){
					// How To Play
					drawUI(1);
					textAlign(CENTER,CENTER);
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
					button(width/32*14,height/32*26,width/32*4,height/32*2);
					fill(200,200,214);
					noStroke();
					textAlign(CENTER,CENTER);
					textSize(height/24);
					text("Back",width/2,height/32*27);
					if(mouseX < width/32*18 && mouseX > width/32*14 && mouseY < height/32*28 && mouseY > height/32*26 && mouseIsPressed){
						scene = 1;
						sub = 0;
					}
				}
				if(sub === 10){
					//Credits
					drawUI(1);
					textAlign(CENTER,CENTER);
					fill(255,255,255);
					noStroke();
					textSize(height/32);
					text("Right click to open the command line.",width/2,height/32*13);
					text("All commands follow the format command,type,value",width/2,height/32*14);
					text("Command List:",width/2,height/32*15);
					text("set (resource, metal, minerals, fuel, tax:max, tax:claimed, generic:strength, generic:shields",width/2,height/32*16);
					text("ship:corvette, ship:frigate, ship:crusier, ship:destroyer, ship:battleship, ship:dreadnought)",width/2,height/32*17);
					text("tech (all, armor, reload, lasers, shields, recharge, missle, points)",width/2,height/32*18);
					text("system (restart, exit, freeze)",width/2,height/32*19);
					text("Examples:",width/2,height/32*20);
					text("set metal 100000",width/2,height/32*21);
					text("set generic:strength 9000",width/2,height/32*22);
					text("system freeze",width/2,height/32*23);
					text("tech all 100",width/2,height/32*24);
					stroke(255,0,0);
					fill(64,64,64);
					button(width/32*14,height/32*26,width/32*4,height/32*2);
					fill(200,200,214);
					noStroke();
					textAlign(CENTER,CENTER);
					textSize(height/24);
					text("Back",width/2,height/32*27);
					if(mouseX < width/32*18 && mouseX > width/32*14 && mouseY < height/32*28 && mouseY > height/32*26 && mouseIsPressed){
						scene = 1;
						sub = 0;
					}
				}
			}
			if(scene === 2){
				background(0,0,0);
				fill(255,255,255);
				noStroke();
				starscape(0);
				fill(128,128,128);
				button(width/2-width/8,height/2+height/16,width/4,height/16);
				fill(200,200,214);
				textSize(height/18);
				text("Tips",width/2,height/36*9);
				fill(255,255,255);
				textSize(height/36);
				text("Build ships in the shipyard tab",width/2,height/36*12);
				text("Use the research tab to buff your ships abilities",width/2,height/36*14);
				text("Attack planets to get rewards!",width/2,height/36*16);
				text("Collect taxes to get resources, though only 10 per game!",width/2,height/36*18);
				text("Go to settings -> infopedia for more info!",width/2,height/36*19.5);
				fill(200,200,214);
				textSize(height/32*1.5);
				textAlign(CENTER,CENTER);
				text("Lets Go!",width/2,height/2+height/11);
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8 && mouseY > height/2+height/16 && mouseIsPressed) {
					onceSound("on.mp3");
					scene = 3;
					sub=0;
				}
			}
			if(scene === 3){
				// Galaxy map GUI
				drawUI(0);
				playTime = 20;
				play = false;
				fill(255,255,255);
				noStroke();
				textAlign(CENTER,CENTER);
				textSize(height/(tabText*2));
				if(sub===0){
					object(planet.name[0], planet.status[0], width/16*6, height/16*13, width/24, planet.color.r[0], planet.color.g[0], planet.color.b[0]);
				}
				object(planet.name[1+(sub*8)],planet.status[1+(sub*8)],width/16*8,height/16*10,width/16,planet.color.r[1+(sub*8)],planet.color.g[1+(sub*8)],planet.color.b[1+(sub*8)]);
				object(planet.name[2+(sub*8)],planet.status[2+(sub*8)],width/16*13,height/16*10,width/12,planet.color.r[2+(sub*8)],planet.color.g[2+(sub*8)],planet.color.b[2+(sub*8)]);
				object(planet.name[3+(sub*8)],planet.status[3+(sub*8)],width/16*10,height/16*8,width/16,planet.color.r[3+(sub*8)],planet.color.g[3+(sub*8)],planet.color.b[3+(sub*8)]);
				object(planet.name[4+(sub*8)],planet.status[4+(sub*8)],width/16*11,height/16*5,width/8,planet.color.r[4+(sub*8)],planet.color.g[4+(sub*8)],planet.color.b[4+(sub*8)]);
				object(planet.name[5+(sub*8)],planet.status[5+(sub*8)],width/16*6,height/16*5,width/15,planet.color.r[5+(sub*8)],planet.color.g[5+(sub*8)],planet.color.b[5+(sub*8)]);
				object(planet.name[6+(sub*8)],planet.status[6+(sub*8)],width/16*4,height/16*7,width/11,planet.color.r[6+(sub*8)],planet.color.g[6+(sub*8)],planet.color.b[6+(sub*8)]);
				object(planet.name[7+(sub*8)],planet.status[7+(sub*8)],width/16*2,height/16*10,width/18,planet.color.r[7+(sub*8)],planet.color.g[7+(sub*8)],planet.color.b[7+(sub*8)]);
				object(planet.name[8+(sub*8)],planet.status[8+(sub*8)],width/16*11,height/16*13,width/9,planet.color.r[8+(sub*8)],planet.color.g[8+(sub*8)],planet.color.b[8+(sub*8)]);
				if(sub < 7){
					textSize(height/32);
					fill(128,128,128);
					button(width/16*15,height/16*14,width/16,height/12);
					fill(200,200,214);
					text(">",width/32*31,height/32*29);
				}
				if(sub > 0){
					fill(128,128,128);
					button(0,height/16*14,width/16,height/12);
					fill(200,200,214);
					textSize(height/32);
					text("<",width/32*1,height/32*29);
				}
				if(mouseX < width/16*6+width/48 && mouseX > width/16*6-width/48 && mouseY < height/16*13+width/48 && mouseY > height/16*13-height/48 && mouseIsPressed && sub === 0){
					scene = 7;
					sub = 0;
				}
				if(mouseX < width/16*8+width/32 && mouseX > width/16*8-width/32 && mouseY < height/16*10+width/32 && mouseY > height/16*10-height/32 && mouseIsPressed){
					scene = 7;
					sub = 1+(sub*8);
				}
				if(mouseX < width/16*13+width/24 && mouseX > width/16*13-width/24 && mouseY < height/16*10+width/24 && mouseY > height/16*10-height/24 && mouseIsPressed){
					scene = 7;
					sub = 2+(sub*8);
				}
				if(mouseX < width/16*10+width/32 && mouseX > width/16*10-width/32 && mouseY < height/16*8+width/32 && mouseY > height/16*8-height/32 && mouseIsPressed){
					scene = 7;
					sub = 3+(sub*8);
				}
				if(mouseX < width/16*11+width/16 && mouseX > width/16*11-width/16 && mouseY < height/16*5+width/16 && mouseY > height/16*5-height/16 && mouseIsPressed){
					scene = 7;
					sub = 4+(sub*8);
				}
				if(mouseX < width/16*6+width/30 && mouseX > width/16*6-width/30 && mouseY < height/16*5+width/30 && mouseY > height/16*5-height/30 && mouseIsPressed){
					scene = 7;
					sub = 5+(sub*8);
				}
				if(mouseX < width/16*4+width/22 && mouseX > width/16*4-width/22 && mouseY < height/16*7+width/22 && mouseY > height/16*7-height/22 && mouseIsPressed){
					scene = 7;
					sub = 6+(sub*8);
				}
				if(mouseX < width/16*2+width/36 && mouseX > width/16*2-width/36 && mouseY < height/16*10+width/36 && mouseY > height/16*10-height/36 && mouseIsPressed){
					scene = 7;
					sub = 7+(sub*8);
				}
				if(mouseX < width/16*11+width/18 && mouseX > width/16*11-width/18 && mouseY < height/16*13+width/18 && mouseY > height/16*13-height/18 && mouseIsPressed){
					scene = 7;
					sub = 8+(sub*8);
				}
				if(mouseX < width && mouseX > width/16*15 && mouseY < height/16*14+height/12 && mouseY > height/16*14 && mouseIsPressed && sub < 7){
					scene = 3;
					sub++;
				}
				if(mouseX < width/16*1 && mouseX > width/16*0 && mouseY < height/16*14+height/12 && mouseY > height/16*14 && mouseIsPressed && sub > 0){
					scene = 3;
					sub--;
				}
			}
			if(scene === 4){
				// Shipyard GUI
				drawUI(1);
				textAlign(CENTER,CENTER);
				fill(64,64,64);
				box(width/4*1-width/10,height/4,width/5,height/24,"foreground");
				box(width/4*2-width/10,height/4,width/5,height/24,"foreground");
				button(width/4*2-width/9,height/24*8,width/4.5,height/24);
				box(width/4*3-width/10,height/4,width/5,height/24,"foreground");
				if(metal >= ship.cost.metal[0] && minerals >= ship.cost.minerals[0] && fuel >= ship.cost.fuel[0]){
					stroke(0,255,0);
				}
				else{
					stroke(255,0,0);
				}
				button(width/16*1,height/16*8-height/32,width/16*5,height/16);
				if(metal >= ship.cost.metal[1] && minerals >= ship.cost.minerals[1] && fuel >= ship.cost.fuel[1]){
					stroke(0,255,0);
				}
				else {
					stroke(255,0,0);
				}
				button(width/16*1,height/16*10-height/32,width/16*5,height/16);
				if(metal >= ship.cost.metal[2] && minerals >= ship.cost.minerals[2] && fuel >= ship.cost.fuel[2]){
					stroke(0,255,0);
				}
				else {
					stroke(255,0,0);
				}
				button(width/16*1,height/16*12-height/32,width/16*5,height/16);
				if(metal >= ship.cost.metal[3] && minerals >= ship.cost.minerals[3] && fuel >= ship.cost.fuel[3]){
					stroke(0,255,0);
				}
				else {
					stroke(255,0,0);
				}
				button(width/16*9,height/16*8-height/32,width/16*5,height/16);
				if(metal >= ship.cost.metal[4] && minerals >= ship.cost.minerals[4] && fuel >= ship.cost.fuel[4]){
					stroke(0,255,0);
				}
				else {
					stroke(255,0,0);
				}
				button(width/16*9,height/16*10-height/32,width/16*5,height/16);
				if(metal >= ship.cost.metal[5] && minerals >= ship.cost.minerals[5] && fuel >= ship.cost.fuel[5]){
					stroke(0,255,0);
				}
				else {
					stroke(255,0,0);
				}
				button(width/16*9,height/16*12-height/32,width/16*5,height/16);
				stroke(255,0,0);
				button(width/16*6,height/16*8-height/32,width/16,height/16);
				button(width/16*6,height/16*10-height/32,width/16,height/16);
				button(width/16*6,height/16*12-height/32,width/16,height/16);
				button(width/16*14,height/16*8-height/32,width/16,height/16);
				button(width/16*14,height/16*10-height/32,width/16,height/16);
				button(width/16*14,height/16*12-height/32,width/16,height/16);
				fill(200,200,214);
				noStroke();
				textSize(height/24);
				textAlign(CENTER,TOP);
				text("Metal: "+metal,width/4*1,height/4*1);
				text("Minerals: "+minerals,width/4*2,height/4*1);
				text("Fuel: "+fuel,width/4*3,height/4*1);
				if (tax.max < 1000000000){
					text("Collect Taxes ("+tax.claimed+"/"+tax.max+")",width/4*2,height/24*8);
				}
				if (tax.max > 999999999){
					text("Collect Taxes ("+tax.claimed+")",width/4*2,height/24*8);
				}
				textAlign(CENTER,CENTER);
				text("i",width/32*13,height/16*8);
				text("i",width/32*13,height/16*10);
				text("i",width/32*13,height/16*12);
				text("i",width/32*29,height/16*8);
				text("i",width/32*29,height/16*10);
				text("i",width/32*29,height/16*12);
				textSize(height/32);
				text("Corvette ["+ship.num[1]+"]",width/8*2,height/16*8);
				text("Frigate ["+ship.num[2]+"]",width/8*2,height/16*10);
				text("Crusier ["+ship.num[3]+"]",width/8*2,height/16*12);
				text("Destoryer ["+ship.num[4]+"]",width/8*6,height/16*8);
				text("Battleship ["+ship.num[5]+"]",width/8*6,height/16*10);
				text("Dreadnought ["+ship.num[6]+"]",width/8*6,height/16*12);
				if(mouseX < width/2+width/10 && mouseX > width/2-width/10 && mouseY < height/24*9 && mouseY > height/24*8 && mouseIsPressed && tax.claimed < tax.max){
					metal += planet.max*1000;
					minerals += planet.max*500;
					fuel += planet.max*250;
					tech.points += planet.max*10;
					tax.claimed++;
				}
				if(mouseX < width/16*5 && mouseX > width/16*1 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32 && mouseIsPressed && metal >= ship.cost.metal[0] && minerals >= ship.cost.minerals[0] && fuel >= ship.cost.fuel[0]){
					metal -= ship.cost.metal[0];
					minerals -= ship.cost.minerals[0];
					fuel -= ship.cost.fuel[0];
					ship.num[1]++;
				}
				if(mouseX < width/16*5 && mouseX > width/16*1 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32 && mouseIsPressed && metal >= ship.cost.metal[1] && minerals >= ship.cost.minerals[1] && fuel >= ship.cost.fuel[1]){
					metal -= ship.cost.metal[1];
					minerals -= ship.cost.minerals[1];
					fuel -= ship.cost.fuel[1];
					ship.num[2]++;
				}
				if(mouseX < width/16*5 && mouseX > width/16*1 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32 && mouseIsPressed && metal >= ship.cost.metal[2] && minerals >= ship.cost.minerals[2] && fuel >= ship.cost.fuel[2]){
					metal -= ship.cost.metal[2];
					minerals -= ship.cost.minerals[2];
					fuel -= ship.cost.fuel[2];
					ship.num[3]++;
				}
				if(mouseX < width/16*13 && mouseX > width/16*9 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32 && mouseIsPressed && metal >= ship.cost.metal[3] && minerals >= ship.cost.minerals[3] && fuel >= ship.cost.fuel[3]){
					metal -= ship.cost.metal[3];
					minerals -= ship.cost.minerals[3];
					fuel -= ship.cost.fuel[3];
					ship.num[4]++;
				}
				if(mouseX < width/16*13 && mouseX > width/16*9 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32 && mouseIsPressed && metal >= ship.cost.metal[4] && minerals >= ship.cost.minerals[4] && fuel >= ship.cost.fuel[4]){
					metal -= ship.cost.metal[4];
					minerals -= ship.cost.minerals[4];
					fuel -= ship.cost.fuel[4];
					ship.num[5]++;
				}
				if(mouseX < width/16*13 && mouseX > width/16*9 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32 && mouseIsPressed && metal >= ship.cost.metal[5] && minerals >= ship.cost.minerals[5] && fuel >= ship.cost.fuel[5]){
					metal -= ship.cost.metal[5];
					minerals -= ship.cost.minerals[5];
					fuel -= ship.cost.fuel[5];
					ship.num[6]++;
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
				if(mouseX < width/16*15 && mouseX > width/16*14 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32 && mouseIsPressed){
					scene = 1;
					sub = 6;
				}
			}
			if(scene === 5){
				// Lab GUI
				drawUI(1);
				textSize(height/36);
				textAlign(CENTER,CENTER);
				if (tech.level.armor === 0){tech.color = 1;}
				if (tech.level.armor >= 1){tech.color = 2;}
				object("Armor "+ tech.level.armor+ "(cost: "+tech.price[0]+")",tech.color,width/4*1,height/4*3,width/16,64,64,64);
				if (tech.level.shield === 0){tech.color = 1;}
				if (tech.level.shield >= 1){tech.color = 2;}
				object("Shield "+ tech.level.shield+ "(cost: "+tech.price[1]+")",tech.color,width/4*1,height/4*2,width/16,64,64,64);
				if (tech.level.laser === 0){tech.color = 1;}
				if (tech.level.laser >= 1){tech.color = 2;}
				object("Laser "+ tech.level.laser+ "(cost: "+tech.price[2]+")",tech.color,width/4*3,height/4*3,width/16,64,64,64);
				if (tech.level.missle === 0){tech.color = 1;}
				if (tech.level.missle >= 1){tech.color = 2;}
				object("Missle "+ tech.level.missle+ "(cost: "+tech.price[3]+")",tech.color,width/4*3,height/4*2,width/16,64,64,64);
				if (tech.level.reload === 0){tech.color = 1;}
				if (tech.level.reload >= 1){tech.color = 2;}
				object("Reload "+ tech.level.reload+ "(cost: "+tech.price[4]+")",tech.color,width/4*2,height/4*3,width/16,64,64,64);
				if (tech.level.recharge === 0){tech.color = 1;}
				if (tech.level.recharge >= 1){tech.color = 2;}
				object("Recharge "+ tech.level.recharge+ "(cost: "+tech.price[5]+")",tech.color,width/4*2,height/4*2,width/16,64,64,64);
				if (tech.level.armor < 5){stroke(255,0,0);}
				if (tech.level.armor >= 5){stroke(0,255,0);}
				line(width/4*1,height/4*3-height/16,width/4*1,height/4*2+height/16);
				if (tech.level.laser < 5){stroke(255,0,0);}
				if (tech.level.laser >= 5){stroke(0,255,0);}
				line(width/4*3,height/4*3-height/16,width/4*3,height/4*2+height/16);
				if (tech.level.reload < 5){stroke(255,0,0);}
				if (tech.level.reload >= 5){stroke(0,255,0);}
				line(width/4*2,height/4*3-height/16,width/4*2,height/4*2+height/16);
				noStroke();
				fill(200,200,214);
				textSize(height/24);
				text("Research Points: "+tech.points,width/2,height/4*1);
				if( mouseX > width/4*1-width/32 && mouseX < width/4*1+width/32 && mouseY > height/4*3-width/32 && mouseY < height/4*3+width/32 && mouseIsPressed && tech.points >= 5+parseFloat(tech.level.armor)){
					tech.points -= (5+parseFloat(tech.level.armor));
					tech.level.armor++;
					playSound("level.mp3");
				}
				if( mouseX > width/4*3-width/32 && mouseX < width/4*3+width/32 && mouseY > height/4*3-width/32 && mouseY < height/4*3+width/32 && mouseIsPressed && tech.points >= 5+parseFloat(tech.level.laser)){
					tech.points -= (5+parseFloat(tech.level.laser));
					tech.level.laser++;
					playSound("level.mp3");
				}
				if( mouseX > width/4*1-width/32 && mouseX < width/4*1+width/32 && mouseY > height/4*2-width/32 && mouseY < height/4*2+width/32 && mouseIsPressed && tech.points >= 10+parseFloat(tech.level.shield) && parseFloat(tech.level.armor >= 5)){
					tech.points -= (10+parseFloat(tech.level.shield));
					tech.level.shield++;
					playSound("levelup.mp3");
				}
				if( mouseX > width/4*3-width/32 && mouseX < width/4*3+width/32 && mouseY > height/4*2-width/32 && mouseY < height/4*2+width/32 && mouseIsPressed && tech.points >= 10+parseFloat(tech.level.missle) && parseFloat(tech.level.laser >= 5)){
					tech.points -= (10+parseFloat(tech.level.missle));
					tech.level.missle++;
					playSound("levelup.mp3");
				}
				if( mouseX > width/4*2-width/32 && mouseX < width/4*2+width/32 && mouseY > height/4*3-width/32 && mouseY < height/4*3+width/32 && mouseIsPressed && tech.points >= 5+parseFloat(tech.level.reload)){
					tech.points -= (5+parseFloat(tech.level.reload));
					tech.level.reload++;
					playSound("level.mp3");
				}
				if( mouseX > width/4*2-width/32 && mouseX < width/4*2+width/32 && mouseY > height/4*2-width/32 && mouseY < height/4*2+width/32 && mouseIsPressed && tech.points >= 10+parseFloat(tech.level.recharge) && parseFloat(tech.level.reload >= 5)){
					tech.points -= (10+parseFloat(tech.level.recharge));
					tech.level.recharge++;
					playSound("levelup.mp3");
				}
			}
			if(scene === 6){
				// Settings GUI
				drawUI(1);
				var finished = 0;
				noStroke();
				fill(64,64,64);
				button(width/2-width/8,height/32*15,width/4,height/16);
				button(width/2-width/8,height/32*18,width/4,height/16);
				button(width/2-width/8,height/32*21,width/4,height/16);
				button(width/2-width/8,height/32*24,width/4,height/16);
				textSize(height/tabText);
				noStroke();
				fill(200,200,214);
				//Options
				text("Tips",width/2,height/32*16);
				text("Infopedia",width/2,height/32*19);
				text("Main Menu",width/2,height/32*22);
				text("Save Game",width/2,height/32*25);
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/32*17 && mouseY > height/32*15 && mouseIsPressed) {
					skip = 1;
					scene = 2;
					element.hide("download_link");
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/32*20 && mouseY > height/32*18 && mouseIsPressed) {
					skip = 1;
					scene = 1;
					sub = 0;
					element.hide("download_link");
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/32*23 && mouseY > height/32*21 && mouseIsPressed) {
					skip = 2;
					scene = 0;
					sub = 0;
					element.hide("download_link");
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/32*26 && mouseY > height/32*24 && mouseIsPressed) {
						document.getElementById("download_link").innerHTML="download save";
						document.getElementById("download_link").download="save.ajson";
						save.content = metal+"\n/sep/\n"+minerals+"\n/sep/\n"+fuel+"\n/sep/\n"+JSON.stringify(planet)+"\n/sep/\n"+JSON.stringify(star)+"\n/sep/\n"+JSON.stringify(ship)+"\n/sep/\n"+JSON.stringify(tech)+"\n/sep/\n"+JSON.stringify(tax);
						finished = 3;
						if(finished === 3){
							save.new = prompt("Which save slot do you want to save to (0-3, 0 will not save locally)",0);
							save.url = window.URL.createObjectURL(new Blob([save.content], {type: "text/plain"}));
							document.getElementById("download_link").href = save.url;
							if(save.new === "1"){
								localStorage.setItem("localSave1",save.content);
								console.log("saved to slot 1: "+save.content);
							}
							if(save.new === "2"){
								localStorage.setItem("localSave2",save.content);
								console.log("saved to slot 2: "+save.content);
							}
							if(save.new === "3"){
								localStorage.setItem("localSave3",save.content);
								console.log("saved to slot 3: "+save.content);
							}
							finished = 4;
						}
						if(finished === 4){
							window.alert("game saved!");
							element.show("download_link");
							mouseIsPressed = false;
						}
				}
			}
			if(scene === 7){
				// planet tab GUI
				drawUI(1);
				textAlign(CENTER,CENTER);
				var o;
                    if (sub === 0){o= 0;}
				if (sub > 0){o=0.01;}
				stroke(255,0,0);
				fill(64,64,64);
				fill(64,64,64);
				button(width/16*8,height/16*11,width/8,height/16);
				if(sub !== 0 && planet.status[sub-1] >= 0 && planet.status[sub] < 0){
					if(ship.strength < planet.recommended[sub]){stroke(255,0,0);}
					if(ship.strength >= planet.recommended[sub]){stroke(0,255,0);} 
					button(width/16*11,height/16*11,width/8,height/16);
				}
				noStroke();
				fill(200,200,214);
				textSize(height/32);
				text("Back",width/16*9,height/32*23);
				if(sub !== 0 && planet.status[sub-1] >= 0 && planet.status[sub] < 0){
					text("Attack",width/16*12,height/32*23);
				}
				textSize(height/24);
				object(planet.name[sub],planet.status[sub],width/4,height/2,width/6,planet.color.r[sub],planet.color.g[sub],planet.color.b[sub]);
				textAlign(LEFT,CENTER);
				noStroke();
				fill(255,255,255);
				if(planet.status[sub-1] < 0){text("Status: Occupied",width/2,height/16*6);}
				if(planet.status[sub] > 0){text("Status: Taken",width/2,height/16*6);}
				text("recommended fleet strength: "+planet.recommended[sub],width/2,height/16*7);
				text("your fleet strength: "+round(ship.strength),width/2,height/16*8);
				text("difficulty: "+planet.difficulty[floor(sub/8-0.01)],width/2,height/16*9);
				textAlign(CENTER,CENTER);
				if(mouseX < width/16*10 && mouseX > width/16*8 && mouseY < height/16*12 && mouseY > height/16*11 && mouseIsPressed){
					scene = 3;
					sub = floor(sub/8-o);
				}
				if(mouseX < width/16*13 && mouseX > width/16*11 && mouseY < height/16*12 && mouseY > height/16*11 && mouseIsPressed && planet.status[sub-1] >= 0 && planet.status[sub] < 0){
					scene = 8;
				}
			}
			if(scene === 8){
				//Battle over planet
				InBattle = true;
				background(0,0,0);
				fill(255,255,255);
				noStroke();
				starscape(2);
				textAlign(CENTER,CENTER);
				object("",planet.status[sub],width*1.25,height/2,width,planet.color.r[sub],planet.color.g[sub],planet.color.b[sub]);
				stroke(255,0,0);
				fill(128,128,128);
				noStroke();
				box(width/64*1,height/64*1,width/64*8,height/64*4,"foreground");
				stroke(255,0,0);
				button(width/64*1,height/64*6,width/64*8,height/64*4);
				fill(200,200,214);
				textSize(height/48);
				textAlign(CENTER,CENTER);
				stroke(200,200,214);
				fill(200,200,214);
				rect(width/64*1.1,height/64*1.1,width/64*7.7,height/64*1);
				rect(width/64*1.1,height/64*2.5,width/64*7.7,height/64*1);
				fill(0,255,0);
				rect(width/64*1.1,height/64*1.1,round(ship.shields/(ship.maxShields/(width/64*7.7))),height/64*1);
				fill(255,0,0);
				rect(width/64*1.1,height/64*2.5,round(enemy.shields[sub]/(enemy.maxShields[sub]/(width/64*7.7))),height/64*1);
				//text("your shields: "+round(ship.shields),width/64*4.5,height/64*2);
				//text("enemy shields: "+round(enemy.shields[sub]),width/64*4.5,height/64*4);
				fill(200,200,214);
				noStroke();
				text("surrender",width/64*4.5,height/64*8);
				if(ship.total < 25){
					for(var i=0;i<ship.num[6];i++){
						shipDraw(6,ship.x[ship.total],ship.y[ship.total]-ship.height[6]/2,1);
						ship.total++;
					}
					for(var i=0;i<ship.num[5];i++){
						shipDraw(5,ship.x[ship.total],ship.y[ship.total]-ship.height[5]/2,1);
						ship.total++;
					}
					for(var i=0;i<ship.num[4];i++){
						shipDraw(4,ship.x[ship.total],ship.y[ship.total],1);
						ship.total++;
					}
					for(var i=0;i<ship.num[3];i++){
						shipDraw(3,ship.x[ship.total],ship.y[ship.total],1);
						ship.total++;
					}
					for(var i=0;i<ship.num[2];i++){
						shipDraw(2,ship.x[ship.total],ship.y[ship.total],1);
						ship.total++;
					}
					for(var i=0;i<ship.num[1];i++){
						shipDraw(1,ship.x[ship.total],ship.y[ship.total],1);
						ship.total++;
					}
				} else {
					scene = 0;
					sub = 3;
					onceSound("error.mp3");
				}
				ship.total = 0;
				if(ship.tick < ((15+tech.level.reload)*(1+tech.level.recharge/100))){
					burn.status[0] = true;
				}
				if(enemy.tick < 20+sub){
					burn.status[1] = true;
				}
				if(burn.status[0] === true){			
					stroke(0,255,255);
					var bX = round(random(0,ship.total));
					var bY = round(random(0,ship.total));
					cX = round(random(cXmin[sub],cXmax[sub]));
					cY = round(random(cYmin[sub],cYmax[sub]));
					line(ship.x[bX],ship.y[bY],enemy.x[cX],enemy.y[cY]);
					enemy.shields[sub] -= ship.strength/10;
					playSound("laser.wav");
					burn.time--;
				}
				if(burn.status[1] === true){
					stroke(255,0,0);
					var bX = round(random(0,ship.total));
					var bY = round(random(0,ship.total));
					cX = round(random(cXmin[sub],cXmax[sub]));
					cY = round(random(cYmin[sub],cYmax[sub]));
					line(ship.x[bX],ship.y[bY],enemy.x[cX],enemy.y[cY]);
					ship.shields -= sub*sub;
					burn.time--;
				}
				if(sub===1){
					shipDraw(11,enemy.x[2],enemy.y[4],1);
					shipDraw(12,enemy.x[2],enemy.y[5],1);
					shipDraw(11,enemy.x[2],enemy.y[6],1);
				}
				if(sub===2){
					shipDraw(11,enemy.x[2],enemy.y[3],1);
					shipDraw(12,enemy.x[2],enemy.y[4],1);
					shipDraw(13,enemy.x[2],enemy.y[5],1);
					shipDraw(12,enemy.x[2],enemy.y[6],1);
					shipDraw(11,enemy.x[2],enemy.y[7],1);
				}
				if(sub===3){
					shipDraw(12,enemy.x[2],enemy.y[3],1);
					shipDraw(12,enemy.x[2],enemy.y[4],1);
					shipDraw(14,enemy.x[2],enemy.y[5],1);
					shipDraw(12,enemy.x[2],enemy.y[6],1);
					shipDraw(12,enemy.x[2],enemy.y[7],1);
				}
				if(sub===4){
					shipDraw(12,enemy.x[2],enemy.y[2],1);
					shipDraw(12,enemy.x[2],enemy.y[3],1);
					shipDraw(13,enemy.x[2],enemy.y[4],1);
					shipDraw(13,enemy.x[2],enemy.y[5],1);
					shipDraw(13,enemy.x[2],enemy.y[6],1);
					shipDraw(12,enemy.x[2],enemy.y[7],1);
					shipDraw(12,enemy.x[2],enemy.y[8],1);
				}
				if(sub===5){
					shipDraw(11,enemy.x[2],enemy.y[2],1);
					shipDraw(13,enemy.x[2],enemy.y[3],1);
					shipDraw(13,enemy.x[2],enemy.y[4],1);
					shipDraw(14,enemy.x[2],enemy.y[5],1);
					shipDraw(13,enemy.x[2],enemy.y[6],1);
					shipDraw(13,enemy.x[2],enemy.y[7],1);
					shipDraw(11,enemy.x[2],enemy.y[8],1);
				}
				if(sub===6){
					shipDraw(11,enemy.x[2],enemy.y[1],1);
					shipDraw(11,enemy.x[2],enemy.y[2],1);
					shipDraw(13,enemy.x[2],enemy.y[3],1);
					shipDraw(14,enemy.x[2],enemy.y[4],1);
					shipDraw(14,enemy.x[2],enemy.y[5],1);
					shipDraw(14,enemy.x[2],enemy.y[6],1);
					shipDraw(13,enemy.x[2],enemy.y[7],1);
					shipDraw(11,enemy.x[2],enemy.y[8],1);
					shipDraw(11,enemy.x[2],enemy.y[9],1);
				}
				if(sub===7){
					shipDraw(12,enemy.x[1],enemy.y[3],1);
					shipDraw(12,enemy.x[1],enemy.y[4],1);
					shipDraw(13,enemy.x[1],enemy.y[5],1);
					shipDraw(12,enemy.x[1],enemy.y[6],1);
					shipDraw(12,enemy.x[1],enemy.y[7],1);
					shipDraw(14,enemy.x[2],enemy.y[3],1);
					shipDraw(14,enemy.x[2],enemy.y[4],1);
					shipDraw(14,enemy.x[2],enemy.y[5],1);
					shipDraw(14,enemy.x[2],enemy.y[6],1);
					shipDraw(14,enemy.x[2],enemy.y[7],1);
				}
				if(sub===8){
					shipDraw(12,enemy.x[1],enemy.y[2],1);
					shipDraw(12,enemy.x[1],enemy.y[3],1);
					shipDraw(13,enemy.x[1],enemy.y[4],1);
					shipDraw(13,enemy.x[1],enemy.y[5],1);
					shipDraw(13,enemy.x[1],enemy.y[6],1);
					shipDraw(12,enemy.x[1],enemy.y[7],1);
					shipDraw(12,enemy.x[1],enemy.y[8],1);
					shipDraw(14,enemy.x[2],enemy.y[2],1);
					shipDraw(14,enemy.x[2],enemy.y[3],1);
					shipDraw(14,enemy.x[2],enemy.y[4],1);
					shipDraw(15,enemy.x[2],enemy.y[5],1);
					shipDraw(14,enemy.x[2],enemy.y[6],1);
					shipDraw(14,enemy.x[2],enemy.y[7],1);
					shipDraw(14,enemy.x[2],enemy.y[8],1);
				}
				if(sub >= 9){
					shipDraw(13,enemy.x[1],enemy.y[2],1);
					shipDraw(13,enemy.x[1],enemy.y[3],1);
					shipDraw(14,enemy.x[1],enemy.y[4],1);
					shipDraw(14,enemy.x[1],enemy.y[5],1);
					shipDraw(14,enemy.x[1],enemy.y[6],1);
					shipDraw(13,enemy.x[1],enemy.y[7],1);
					shipDraw(13,enemy.x[1],enemy.y[8],1);
					shipDraw(15,enemy.x[2],enemy.y[2],1);
					shipDraw(15,enemy.x[2],enemy.y[3],1);
					shipDraw(15,enemy.x[2],enemy.y[4],1);
					shipDraw(15,enemy.x[2],enemy.y[5],1);
					shipDraw(15,enemy.x[2],enemy.y[6],1);
					shipDraw(15,enemy.x[2],enemy.y[7],1);
					shipDraw(15,enemy.x[2],enemy.y[8],1);
				}
				if(enemy.shields[sub] <= 0){
					planet.status[sub] = 2;
					InBattle = false;
					metal+= 5000*sub;
					minerals+= 2500*sub;
					fuel+= 2000* sub;
					tech.points+= 5*sub;
					battleWon=true;
					planet.max++;
					scene=9;
				}
				if(ship.shields <= 0){
					InBattle = false;
					battleWon=false;
					scene=9;
				}
				if(mouseX > width/64*1 && mouseX < width/64*9 && mouseY > width/64*4 && mouseY < width/64*6 && mouseIsPressed){
					InBattle = false;
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
				box(width*0.05,height/8+25,width*0.9,height/4*3,"background");
				stroke(64,64,64);
				fill(128,128,128);
				button(width/4*0,0,width/4,height/8);
				button(width/4*1,0,width/4,height/8);
				button(width/4*2,0,width/4,height/8);
				button(width/4*3,0,width/4,height/8);
				stroke(255,0,0);
				fill(64,64,64);
				if(battleWon === false){
				button(width/16*8,height/16*11,width/8,height/16);
				}
				button(width/16*11,height/16*11,width/8,height/16);
				noStroke();
				fill(200,200,214);
				textSize(height/16);
				text("Galaxy Map",width/4*0.5,height/8*0.5);
				text("Shipyard",width/4*1.5,height/8*0.5);
				text("Laboratory",width/4*2.5,height/8*0.5);
				text("Settings",width/4*3.5,height/8*0.5);
				fill(255,255,255);
				if(battleWon===true){
					text("You Won!",width/4*3,height/4*2);
				}
				if(battleWon===false){
					text("You Lost!",width/4*3,height/4*2);
					textSize(height/32);
					text("Retry",width/16*9,height/32*23);
				}
				textSize(height/32);
				text("Accept",width/16*12,height/32*23);
				textSize(height/24);
				object(planet.name[sub],planet.status[sub],width/4,height/2,width/6,planet.color.r[sub],planet.color.g[sub],planet.color.b[sub]);
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
				if(mouseX < width/16*10 && mouseX > width/16*8 && mouseY < height/16*12 && mouseY > height/16*11 && mouseIsPressed && battleWon === false){
					scene = 8;
					battleWon = null;
				}
				if(mouseX < width/16*13 && mouseX > width/16*11 && mouseY < height/16*12 && mouseY > height/16*11 && mouseIsPressed){
					scene = 3;
					sub = floor(sub/8);
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
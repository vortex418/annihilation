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
		var overlay = 0;
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
		};
		star.size = [round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max)),round(random(0,star.max))];
		//planets
		var planet = {
			max: 0,
			name: ["crash site","[1] Abrigato","[2] Beta-Keralis","[3] Suzum","[4] Vespa","[5] Coruscare","[6] Vulca","[7] Jaeger","[8] Kashyyyk","[9] Outpost-42","[10] Victoria Alpha","[11] Victoria Bravo","[12] Gesht","[13] Sanctuary","[14] Snowmass","[15] Ja","[16] Keeg","[17]Haemeiguli","[18]Borebalae","[19]Albataetarius","[20]Hataerius","[21]Achernaiphoros","[22]Antadrophei","[23]Hoemeirai","[24]Antabalis","[25]Hoereo","[26]Pazadam","[27]Equidor","[28]Pax","[29]Xena","[30]Titan","[31]Oturn","[32]Thuamia","[33]Heuthea","[34]Ditharus","[35]Muxater","[36]Trukovis","[37]Bichotune","[38]Etis","[39]Leorus","[40]Aphus","[41]Harophos","[42]","[43]","[44]","[45]","[46]","[47]","[48]","[49]","[50]","[51]","[52]","[53]","[54]","[55]","[56]","[57]","[58]","[59]","[60]","[61]","[62]","[63]","[64] Home!"],
			status: [0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
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
		var resource = {
			metal: 10000,
			minerals: 5000,
			fuel: 250,
			anicent_tech: 0,
			code_snippets: 0,
			display: {
				metal:function(){
					if(resource.metal < 1000){
					   return resource.metal;
					}
					if(resource.metal > 999){
						return resource.metal/1000+"K";
					}
					if(resource.metal > 999999){
						return resource.metal/1000000+"M";
					}
				},
				minerals:function(){
					if(resource.minerals < 1000){
					   return resource.minerals;
					}
					if(resource.minerals > 999){
						return resource.minerals/1000+"K";
					}
					if(resource.minerals > 999999){
						return resource.minerals/1000000+"M";
					}
				},
				fuel:function(){
					if(resource.fuel < 1000){
					   return resource.fuel;
					}
					if(resource.fuel > 999){
						return resource.fuel/1000+"K";
					}
					if(resource.fuel > 999999){
						return resource.fuel/1000000+"M";
					}
				}
			}
		};
		var tax = {
			claimed: 0,
			max: 10,
		};
		// everything ship related!
		var ship = {
			generic: {
				type: ["corvette","frigate","crusier","destroyer","battleship","dreadnought"],
				health: [10,25,50,100,250,1000],
				shields: [20,40,75,250,500,2000],
				damage: [1,5,10,25,100,250],
				reload: [0.5,1,2,1,1,1],
				width: [25,36,75,100,150,160,0,0,0,0,25,35,75,100,150,160],
				height: [24,18,50,50,60,131,0,0,0,0,24,18,50,50,60,131],
				x: [width/64*28,width/64*28,width/64*28,width/64*28,width/64*28,width/64*28,width/64*28,width/64*20,width/64*20,width/64*20,width/64*20,width/64*20,width/64*20,width/64*20,width/64*12,width/64*12,width/64*12,width/64*12,width/64*12,width/64*12,width/64*12,width/64*4,width/64*4,width/64*4,width/64*4],
				y: [width/64*16,width/64*12,width/64*20,width/64*8,width/64*24,width/64*4,width/64*28,width/64*2,width/64*36,width/64*56,width/64*41,width/64*51,width/64*48,width/64*10,width/64*31,width/64*31,width/64*8,width/64*40,width/64*4,width/64*10,width/64*59,width/64*52,width/64*29,width/64*10,width/64*27]
			},
			display: {
				level: ["","","","","",""]
			},
			cost: {
				metal: [1000,2000,4000,10000,25000,100000],
				minerals: [500,2000,1000,4000,10000,50000],
				fuel: [250,500,1000,2500,5000,25000],
				upgrade: [
					[1,2,4,8,16],
					[],
					[],
					[],
					[],
					[]
				]
			},
			fleet: {
				type: [],
				health: [],
				shields: [],
				damage: [],
				reload: [],
				level: [0,0,0,0,0,0]
			},
			frozen: {
				health: [0],
				shields: [0],
				reload: [0]
			},
			draw: function(type,x,y){
				var typeNum;
				if(type == "corvette"){typeNum = 0;}
				if(type == "frigate"){typeNum = 1;}
				if(type == "crusier"){typeNum = 2;}
				if(type == "destroyer"){typeNum = 3;}
				if(type == "battleship"){typeNum = 4;}
				if(type == "dreadnought"){typeNum = 5;}
				image(getImage("/annihilation/models/ships/"+type+".png"),x-20,y-20,ship.generic.width[typeNum],ship.generic.height[typeNum]);
			},
			num: function(filter){
				var count = 0;
				for(var i=0;i < ship.fleet.type.length;i++){
					if(ship.fleet.type[i] == filter){count++;}
				}
				return count;
			},
			total: {
				health: 0,
				shields: 0,
				reload: 0
			},
			add: function(type){
				var typeNum;
				if(type == "corvette"){typeNum = 0;}
				if(type == "frigate"){typeNum = 1;}
				if(type == "crusier"){typeNum = 2;}
				if(type == "destroyer"){typeNum = 3;}
				if(type == "battleship"){typeNum = 4;}
				if(type == "dreadnought"){typeNum = 5;}
				ship.fleet.type.push(ship.generic.type[typeNum]);
				ship.fleet.health.push(ship.generic.health[typeNum]);
				ship.fleet.shields.push(ship.generic.shields[typeNum]);
				ship.fleet.damage.push(ship.generic.damage[typeNum]);
				ship.fleet.reload.push(ship.generic.reload[typeNum]);
			}
		};
		var enemy = {
			generic: {
				type: ["corvette","frigate","crusier","destroyer","battleship","dreadnought"],
				health: [10,25,50,100,250,1000],
				shields: [20,40,75,250,500,2000],
				damage: [1,5,10,25,100,250],
				reload: [0.5,1,2,1,1,1],
				x: [width/64*50,width/64*50,width/64*50,width/64*50,width/64*50,width/64*50,width/64*50,width/64*44,width/64*44,width/64*44,width/64*44,width/64*44,width/64*44,width/64*44,width/64*38,width/64*38,width/64*38,width/64*38,width/64*38,width/64*38,width/64*38],
				y: [height/64*32,height/64*24,height/64*40,height/64*16,height/64*48,height/64*8,height/64*56,height/64*32,height/64*24,height/64*40,height/64*16,height/64*48,height/64*8,height/64*56,height/64*32,height/64*24,height/64*40,height/64*16,height/64*48,height/64*8,height/64*56,height/64*32,height/64*24,height/64*40,height/64*16,height/64*48,height/64*8,height/64*56]
			},
			fleet: {
				type: [
					[null]
					["frigate","corvette","corvette"],
					["frigate","corvette","corvette","corvette","corvette"],
					["frigate","frigate","frigate","frigate","frigate"],
					["crusier","frigate","frigate","corvette","corvette"],
					["crusier","frigate","frigate","frigate","frigate"],
					["crusier","crusier","crusier","corvette","corvette"],
					["destroyer","crusier","crusier"],
					["destroyer","crusier","crusier","frigate","frigate"],
					["destroyer","crusier","crusier","crusier","crusier"],
					["destroyer","destroyer","destroyer","crusier","crusier"],
					["destroyer","destroyer","destroyer","destroyer","destroyer"],
					["battleship","destroyer","destroyer","destroyer","destroyer"],
					["battleship","battleship","battleship","destroyer","destroyer"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["battleship","battleship","battleship","battleship","battleship"],
					["dreadnought","dreadnought","dreadnought","dreadnought","dreadnought"]
				],
				health: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
				shields: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
				damage: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
				reload: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
			},
			frozen: {
				health: [],
				shields: [],
				reload: []
			},
			draw: function(type,x,y){
				var typeNum;
				if(type == "corvette"){typeNum = 0;}
				if(type == "frigate"){typeNum = 1;}
				if(type == "crusier"){typeNum = 2;}
				if(type == "destroyer"){typeNum = 3;}
				if(type == "battleship"){typeNum = 4;}
				if(type == "dreadnought"){typeNum = 5;}
				image(getImage("/annihilation/models/ships/enemy-"+type+".png"),x-20,y-20,ship.generic.width[typeNum],ship.generic.height[typeNum]);
			},
			total: {
				health: 0,
				shields: 0,
				damage: 0
			}
		};
		for(var i=1;i < 64;i++){
			for(var j=0;j<enemy.fleet.type[i].length;j++){
				var typeNum;
				if(enemy.fleet.type[i][j] == "corvette"){typeNum = 0;}
				if(enemy.fleet.type[i][j] == "frigate"){typeNum = 1;}
				if(enemy.fleet.type[i][j] == "crusier"){typeNum = 2;}
				if(enemy.fleet.type[i][j] == "destroyer"){typeNum = 3;}
				if(enemy.fleet.type[i][j] == "battleship"){typeNum = 4;}
				if(enemy.fleet.type[i][j] == "dreadnought"){typeNum = 5;}
				enemy.fleet.health[i][j] = enemy.generic.health[typeNum];
				enemy.fleet.shields[i][j] = enemy.generic.shields[typeNum];
				enemy.fleet.damage[i][j] = enemy.generic.damage[typeNum];
				enemy.fleet.reload[i][j] = enemy.generic.reload[typeNum];
			}
		}
		var InBattle = false;
		var battleWon = false;
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
			url: null,
			str: "",
			valid: false,
			new: 0,
			data: {
				anicent_tech: 0,
				code_snippets: 0,
				metal: 0,
				minerals: 0,
				fuel: 0,
				planet: {},
				star: {},
				ship: {},
				tech: {},
				tax: {}
			},
			length: 1,
			date: new Date(),
			draw: function(name, date, type, y){
				textAlign(LEFT,CENTER);
				textSize(height/32);
				box(width*0.11,height*0.15+(y*0.11),width*0.78,height*0.065,"foreground");
				text(name,width*0.12,height*0.17+(y*0.14));
				text("Last Saved on: "+date,width*0.3,height*0.17+(y*0.14));
				text(type,width*0.6,height*0.17+(y*0.14));
			},
			name: ["Test","Trash","WHYYY"]
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
				}
			},
			hide: function(id){
				if(document.getElementById(id).classList.contains("hidden") == false){
					document.getElementById(id).classList.add("hidden");
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
			if(mouseX > x && mouseY > y && mouseX < x+width && mouseY < y+height){
				 document.body.style.cursor = "pointer";
			}
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
		var requestUserInfo = new XMLHttpRequest();
		requestUserInfo.onreadystatechange = function() {
    			if (this.readyState == 4 && this.status == 200) {
				user = JSON.parse(requestUserInfo.responseText);
    			}
		};
		requestUserInfo.open("GET", "/annihilation/userdata.json", true);
		requestUserInfo.send();
		draw = function(){
			save.data.metal = resource.metal;
			save.data.minerals = resource.minerals;
			save.data.fuel = resource.fuel;
			save.data.ancient_tech = resource.ancient_tech;
			save.data.code_snippets = resource.code_snippets;
			save.data.planet = JSON.stringify(planet);
			save.data.star = JSON.stringify(star);
			save.data.ship = JSON.stringify(ship.fleet);
			save.data.tech = JSON.stringify(tech);
			save.data.tax = JSON.stringify(tax);
			document.body.style.cursor = "default";
			if(scene != 0 && sub != 4){
				element.hide("inputsave");
			}
			if(planet.status[64] === 2){
				scene = 0;
				sub = 2;
			}
			ship.total.damage = 0;
			ship.total.health = 0;
			ship.total.shields = 0;
			enemy.total.damage = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			enemy.total.health = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			enemy.total.shields = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			for(var i = 0; i<ship.fleet.type.length; i++){
				ship.total.damage += ship.fleet.damage[i];
				ship.total.health += ship.fleet.health[i];
				ship.total.shields += ship.fleet.shields[i];
			}
			for(var i = 1; i<64;i++){
				for(var j=0;j<enemy.fleet.type[i].length; j++){
					enemy.total.damage[i] += enemy.fleet.damage[i][j];
					enemy.total.health[i] += enemy.fleet.health[i][j];
					enemy.total.shields[i] += enemy.fleet.shields[i][j];
				}
			}
			if(InBattle == false){
				var typeNum;
				for(var i = 1;i<64;i++){
					ship.frozen.health = ship.total.health;
					ship.frozen.shields = ship.total.shields;
					enemy.frozen.health[i] = enemy.total.health[i];
					enemy.frozen.shields[i] = enemy.total.shields[i];
					if(ship.fleet.type[i] == "corvette"){typeNum = 0;}
					if(ship.fleet.type[i] == "frigate"){typeNum = 1;}
					if(ship.fleet.type[i] == "crusier"){typeNum = 2;}
					if(ship.fleet.type[i] == "destroyer"){typeNum = 3;}
					if(ship.fleet.type[i] == "battleship"){typeNum = 4;}
					if(ship.fleet.type[i] == "dreadnought"){typeNum = 5;}
				}
				for(var i = 0;i<ship.fleet.type.length;i++){
					if(ship.fleet.type[i] == "corvette"){typeNum = 0;}
					if(ship.fleet.type[i] == "frigate"){typeNum = 1;}
					if(ship.fleet.type[i] == "crusier"){typeNum = 2;}
					if(ship.fleet.type[i] == "destroyer"){typeNum = 3;}
					if(ship.fleet.type[i] == "battleship"){typeNum = 4;}
					if(ship.fleet.type[i] == "dreadnought"){typeNum = 5;}
					ship.fleet.shields[i] = ship.generic.shields[typeNum];
				}
			}
			tech.points = parseFloat(tech.points);
			resource.metal = parseFloat(resource.metal);
			resource.minerals = parseFloat(resource.minerals);
			resource.fuel = parseFloat(resource.fuel);
			resource.anicent_tech = parseFloat(resource.anicent_tech);
			resource.code_snippets = parseFloat(resource.code_shippets);
			planet.max = parseFloat(planet.max);
			for(var i=0;i<64;i++){
				planet.color.r[i] = parseFloat(planet.color.r[i]);
				planet.color.g[i] = parseFloat(planet.color.g[i]);
				planet.color.b[i] = parseFloat(planet.color.b[i]);
			}
			tech.price = [Number(tech.level.armor)+5,Number(tech.level.shield)+10,Number(tech.level.laser)+5,parseFloat(tech.level.missle)+10,Number(tech.level.reload)+5,parseFloat(tech.level.recharge)+10];
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
				text("Beta",width/2,height/32*11);
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
					window.close();				
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
				text("Final fleet damage: "+round(ship.count("damage")),width/2,height/2-height/12);
				text("Final number of ships: "+ship.num,width/2,height/2-height/20);
				text("Did you have fun? Make sure to comment and upvote!",width/2,height/2);
				text("Support the game by joing the discord (https://discord.gg/7mQsXb3EdY) and telling everyone you know!",width/2,height/2+height/20); 
				text("All credit goes to Vortex418",width/2,height/2+height/12);
				fill(64,64,64);
				button(width/2-width/8*1.25,height/2+height/8+height/32,width/4*1.25,height/16);
				fill(200,200,214);
				textSize(height/32*1.5);
				text("Restart",width/2,height/2*1.375);
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8+height/16+height/32 && mouseY > height/2+height/8+height/32 && mouseIsPressed) {
					window.location.assign(rurl);
				}
			}
			if(scene === 0 && sub===4){
				background(0,0,0);
				image(getImage("/annihilation/models/menu.png"),0,0,width,height);	
				box(width/10,height/10,width/10*8,height/10*8,"background");
				for(var i=-1;i<save.name.length;i++){
					save.draw(save.name[i],save.date.getFullYear()+"/"+parseFloat(save.date.getMonth())+1+"/"+save.date.getDate(),"online",i);
				}
				textAlign(CENTER,CENTER);
				//button(width/2-width/16,height/32*26+8,width/8,height/32);
				textSize(height/(tabText*2));
				//text("Back",width/2,height/32*27);
				document.getElementById("inputsave").addEventListener('change', function() {
					mouseIsPressed = false;
					var reader = new FileReader();
					reader.onload = function(){ 
						save.selected = 0;
						save.str = reader.result;
					};
					reader.readAsText(this.files[0]);					
				});
				for(var i=0; i<planet.max; i++){
					planet.status[i] = 2;
				}
				
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/32*25 && mouseY > height/32*23 && mouseIsPressed && save.filled == true) {
[save.json.resource,save.json.planet,save.json.star,save.json.ship,save.json.tech,save.json.tax] = save.str.split("\n/sep/\n");
					resource = JSON.parse(save.json.resource);
					planet = JSON.parse(save.json.planet);
					star = JSON.parse(save.json.star);
					ship.fleet = JSON.parse(save.json.ship);
					tech = JSON.parse(save.json.tech);
					tax = JSON.parse(save.json.tax);
					element.hide("inputsave");
					scene = 3;
					sub = 0;
				}
				/*if(mouseX < width/2+width/16 && mouseX > width/2-width/16 && mouseY < height/32*28 && mouseY > height/32*27 && mouseIsPressed) {
					element.hide("inputsave");
					scene = 0;
					sub = 0;
				}*/
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
					ship.draw(ship.generic.type[sub],width/4,height/2);
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
					text("This feature was removed! This screen hasn't been removed so the game won't crash",width/2,height/2);
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
				button(width/16*2,height/16*8-height/32,width/16*5,height/16);
				button(width/16*2,height/16*10-height/32,width/16*5,height/16);
				button(width/16*2,height/16*12-height/32,width/16*5,height/16);
				button(width/16*10,height/16*8-height/32,width/16*5,height/16);
				button(width/16*10,height/16*10-height/32,width/16*5,height/16);
				button(width/16*10,height/16*12-height/32,width/16*5,height/16);
				//[I]
				button(width/16*6,height/16*8-height/32,width/16,height/16);
				button(width/16*6,height/16*10-height/32,width/16,height/16);
				button(width/16*6,height/16*12-height/32,width/16,height/16);
				button(width/16*14,height/16*8-height/32,width/16,height/16);
				button(width/16*14,height/16*10-height/32,width/16,height/16);
				button(width/16*14,height/16*12-height/32,width/16,height/16);
				//[^]
				button(width/16*1,height/16*8-height/32,width/16,height/16);
				button(width/16*1,height/16*10-height/32,width/16,height/16);
				button(width/16*1,height/16*12-height/32,width/16,height/16);
				button(width/16*9,height/16*8-height/32,width/16,height/16);
				button(width/16*9,height/16*10-height/32,width/16,height/16);
				button(width/16*9,height/16*12-height/32,width/16,height/16);
				fill(200,200,214);
				noStroke();
				textSize(height/24);
				textAlign(CENTER,TOP);
				text("Metal: "+resource.display.metal(),width/4*1,height/4*1);
				text("Minerals: "+resource.display.minerals(),width/4*2,height/4*1);
				text("Fuel: "+resource.display.fuel(),width/4*3,height/4*1);
				if (tax.max < 10000){
					text("Collect Taxes ("+tax.claimed+"/"+tax.max+")",width/4*2,height/24*8);
				}
				if (tax.max > 9999){
					text("Collect Taxes ("+tax.claimed+")",width/4*2,height/24*8);
				}
				textAlign(CENTER,CENTER);
				text("i",width/32*13,height/16*8);
				text("i",width/32*13,height/16*10);
				text("i",width/32*13,height/16*12);
				text("i",width/32*29,height/16*8);
				text("i",width/32*29,height/16*10);
				text("i",width/32*29,height/16*12);
				text("^",width/32*3,height/16*8);
				text("^",width/32*3,height/16*10);
				text("^",width/32*3,height/16*12);
				text("^",width/32*19,height/16*8);
				text("^",width/32*19,height/16*10);
				text("^",width/32*19,height/16*12);
				textSize(height/32);
				text("Corvette"+ship.display.level[0]+" ["+ship.num("corvette")+"]",width/8*2,height/16*8);
				text("Frigate"+ship.display.level[1]+" ["+ship.num("frigate")+"]",width/8*2,height/16*10);
				text("Crusier"+ship.display.level[2]+" ["+ship.num("crusier")+"]",width/8*2,height/16*12);
				text("Destoryer"+ship.display.level[3]+" ["+ship.num("destroyer")+"]",width/8*6,height/16*8);
				text("Battleship"+ship.display.level[4]+" ["+ship.num("battleship")+"]",width/8*6,height/16*10);
				text("Dreadnought"+ship.display.level[5]+" ["+ship.num("dreadnought")+"]",width/8*6,height/16*12);
				if(mouseX < width/2+width/10 && mouseX > width/2-width/10 && mouseY < height/24*9 && mouseY > height/24*8 && mouseIsPressed && tax.claimed < tax.max){
					console.log("Here!");
					resource.metal += planet.max*1000*resource.multiplyer;
					resource.minerals += planet.max*500*resource.multiplyer;
					resource.fuel += planet.max*250*resource.multiplyer;
					tech.points += planet.max*10;
					tax.claimed++;
				}
				if(mouseX < width/16*5 && mouseX > width/16*2 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32 && mouseIsPressed && resource.metal >= ship.cost.metal[0] && resource.minerals >= ship.cost.minerals[0] && resource.fuel >= ship.cost.fuel[0]){
					resource.metal -= ship.cost.metal[0];
					resource.minerals -= ship.cost.minerals[0];
					resource.fuel -= ship.cost.fuel[0];
					ship.add("corvette");
				}
				if(mouseX < width/16*5 && mouseX > width/16*2 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32 && mouseIsPressed && resource.metal >= ship.cost.metal[1] && resource.minerals >= ship.cost.minerals[1] && resource.fuel >= ship.cost.fuel[1]){
					resource.metal -= ship.cost.metal[1];
					resource.minerals -= ship.cost.minerals[1];
					resource.fuel -= ship.cost.fuel[1];
					ship.add("frigate");
				}
				if(mouseX < width/16*5 && mouseX > width/16*2 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32 && mouseIsPressed && resource.metal >= ship.cost.metal[2] && resource.minerals >= ship.cost.minerals[2] && resource.fuel >= ship.cost.fuel[2]){
					resource.metal -= ship.cost.metal[2];
					resource.minerals -= ship.cost.minerals[2];
					resource.fuel -= ship.cost.fuel[2];
					ship.add("crusier");
				}
				if(mouseX < width/16*13 && mouseX > width/16*10 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32 && mouseIsPressed && resource.metal >= ship.cost.metal[3] && resource.minerals >= ship.cost.minerals[3] && resource.fuel >= ship.cost.fuel[3]){
					resource.metal -= ship.cost.metal[3];
					resource.minerals -= ship.cost.minerals[3];
					resource.fuel -= ship.cost.fuel[3];
					ship.add("destroyer");
				}
				if(mouseX < width/16*13 && mouseX > width/16*10 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32 && mouseIsPressed && resource.metal >= ship.cost.metal[4] && resource.minerals >= ship.cost.minerals[4] && resource.fuel >= ship.cost.fuel[4]){
					resource.metal -= ship.cost.metal[4];
					resource.minerals -= ship.cost.minerals[4];
					resource.fuel -= ship.cost.fuel[4];
					ship.add("battleship");
				}
				if(mouseX < width/16*13 && mouseX > width/16*10 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32 && mouseIsPressed && resource.metal >= ship.cost.metal[5] && resource.minerals >= ship.cost.minerals[5] && resource.fuel >= ship.cost.fuel[5]){
					resource.metal -= ship.cost.metal[5];
					resource.minerals -= ship.cost.minerals[5];
					resource.fuel -= ship.cost.fuel[5];
					ship.add("dreadnought");
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
				if(mouseX < width/16*2 && mouseX > width/16*1 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32 && mouseIsPressed && ship.fleet.level[0] < 5){
					ship.fleet.level[0]++;
					ship.display.level[0] += "*";
					
				}
				if(mouseX < width/16*2 && mouseX > width/16*1 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32 && mouseIsPressed && ship.fleet.level[1] < 5){
					ship.fleet.level[1]++;
					ship.display.level[1] += "*";
				}
				if(mouseX < width/16*2 && mouseX > width/16*1 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32 && mouseIsPressed && ship.fleet.level[2] < 5){
					ship.fleet.level[2]++;
					ship.display.level[2] += "*";
				}
				if(mouseX < width/16*10 && mouseX > width/16*9 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32 && mouseIsPressed && ship.fleet.level[3] < 5){
					ship.fleet.level[3]++;
					ship.display.level[3] += "*";
				}
				if(mouseX < width/16*10 && mouseX > width/16*9 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32 && mouseIsPressed && ship.fleet.level[4] < 5){
					ship.fleet.level[4]++;
					ship.display.level[4] += "*";
				}
				if(mouseX < width/16*10 && mouseX > width/16*9 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32 && mouseIsPressed && ship.fleet.level[5] < 5){
					ship.fleet.level[5]++;
					ship.display.level[5] += "*";
				}
				if(mouseX < width/16*2 && mouseX > width/16*1 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32){
					box(width/16*1,height/16*6,width/8,height/12,"foreground");
					text("Cost to upgrade: "+ship.cost.upgrade[0][ship.fleet.level],width/16*2,height/16*7);
				}
				if(mouseX < width/16*2 && mouseX > width/16*1 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32){
					box(width/16*1,height/16*8,width/8,height/12,"foreground");
				}
				if(mouseX < width/16*2 && mouseX > width/16*1 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32){
					box(width/16*1,height/16*10,width/8,height/12,"foreground");
				}
				if(mouseX < width/16*10 && mouseX > width/16*9 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32){
					box(width/16*9,height/16*6,width/8,height/12,"foreground");
				}
				if(mouseX < width/16*10 && mouseX > width/16*9 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32){
					box(width/16*9,height/16*8,width/8,height/12,"foreground");
				}
				if(mouseX < width/16*10 && mouseX > width/16*9 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32){
					box(width/16*9,height/16*10,width/8,height/12,"foreground");
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
						finished = 3;
						if(finished === 3){
							save.url = window.URL.createObjectURL(new Blob([save.data], {type: "text/plain"}));
							document.getElementById("download_link").href = save.url;
							if(save.type == offline){
								localStorage.setItem("localSave"+save.selected,save.data);
							}
							if(save.type == online){
								
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
				button(width/16*8,height/16*11,width/8,height/16);
				if(sub !== 0 && planet.status[sub-1] >= 0 && planet.status[sub] < 0){
					if(ship.total.damage < planet.recommended[sub]){stroke(255,0,0);}
					if(ship.total.damage >= planet.recommended[sub]){stroke(0,255,0);} 
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
				text("your fleet damage: "+round(ship.total.damage),width/2,height/16*8);
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
				rect(width/64*1.1,height/64*1.1,round(ship.total.health/(ship.frozen.health/(width/64*7.7))),height/64*1);
				fill(0,255,255);
				rect(width/64*1.1,height/64*1.1,round(ship.total.shields/(ship.frozen.shields/(width/64*7.7))),height/64*1);
				fill(255,0,0);
			rect(width/64*1.1,height/64*2.5,round(enemy.total.health[sub]/(enemy.frozen.health[sub]/(width/64*7.7))),height/64*1);
				fill(128,64,192);
			rect(width/64*1.1,height/64*2.5,round(enemy.total.shields[sub]/(enemy.frozen.shields[sub]/(width/64*7.7))),height/64*1);
				fill(200,200,214);
				noStroke();
				text("surrender",width/64*4.5,height/64*8);
				for(var i=0;i<ship.fleet.type.length;i++){
					var typeNum;
					if(ship.fleet.type[i] == "corvette"){typeNum = 0;}
					if(ship.fleet.type[i] == "frigate"){typeNum = 1;}
					if(ship.fleet.type[i] == "crusier"){typeNum = 2;}
					if(ship.fleet.type[i] == "destroyer"){typeNum = 3;}
					if(ship.fleet.type[i] == "battleship"){typeNum = 4;}
					if(ship.fleet.type[i] == "dreadnought"){typeNum = 5;}
					var target = floor(random(0,enemy.fleet.type[sub].length));
					if(ship.fleet.health[i] > 0){
						ship.fleet.reload[i]--;
						ship.draw(ship.fleet.type[i],ship.generic.x[i],ship.generic.y[i]);
						if(ship.fleet.reload[i] <= 0){
							var typeNum;
							if(ship.fleet.type[i] == "corvette"){typeNum = 0;}
							if(ship.fleet.type[i] == "frigate"){typeNum = 1;}
							if(ship.fleet.type[i] == "crusier"){typeNum = 2;}
							if(ship.fleet.type[i] == "destroyer"){typeNum = 3;}
							if(ship.fleet.type[i] == "battleship"){typeNum = 4;}
							if(ship.fleet.type[i] == "dreadnought"){typeNum = 5;}
							var destinationX = floor(random(0,enemy.fleet.type[sub].length));
							var destinationY = floor(random(0,enemy.fleet.type[sub].length));
							stroke(0,255,255);
						line(ship.generic.x[i],ship.generic.y[i],enemy.generic.x[destinationX],enemy.generic.y[destinationY]);
							ship.fleet.reload[i] = ship.generic.reload[typeNum];
							playSound("laser.wav");
							if(enemy.fleet.shields[sub][target] < 1){
								enemy.fleet.health[sub][target]-=(ship.fleet.damage[i]/20)*ship.fleet.level[typeNum];
							} else if (enemy.fleet.shields[sub][target] > 0){
								enemy.fleet.shields[sub][target]-=(ship.fleet.damage[i]/20)*ship.fleet.level[typeNum];
							}
						}
					}
					
				}
				for(var i=0;i<enemy.fleet.type[sub].length;i++){
					var typeNum;
					if(enemy.fleet.type[sub][i] == "corvette"){typeNum = 0;}
					if(enemy.fleet.type[sub][i] == "frigate"){typeNum = 1;}
					if(enemy.fleet.type[sub][i] == "crusier"){typeNum = 2;}
					if(enemy.fleet.type[sub][i] == "destroyer"){typeNum = 3;}
					if(enemy.fleet.type[sub][i] == "battleship"){typeNum = 4;}
					if(enemy.fleet.type[sub][i] == "dreadnought"){typeNum = 5;}
					var target = floor(random(0,ship.fleet.type.length));
					if(enemy.fleet.health[sub][i] > 0){
						enemy.draw(enemy.fleet.type[sub][i],enemy.generic.x[i],enemy.generic.y[i]);
						enemy.fleet.reload[sub][i]--;
						if(enemy.fleet.reload[sub][i] <= 0){
							var destinationX = floor(random(0,ship.fleet.type.length));
							var destinationY = floor(random(0,ship.fleet.type.length));
							stroke(255,0,0);
							line(enemy.generic.x[i], enemy.generic.y[i], ship.generic.x[destinationX], ship.generic.y[destinationY]);
							enemy.fleet.reload[sub][i] = enemy.generic.reload[typeNum];
							if(ship.fleet.shields[target] < 1){
								ship.fleet.health[target]-=enemy.fleet.damage[sub][i]/20;
							} else if (ship.fleet.shields[target] > 0){
								ship.fleet.shields[target]-=enemy.fleet.damage[sub][i]/20;
							}
						}
					}
					
				}
				if(enemy.total.health[sub] <= 0){
					planet.status[sub] = 2;
					InBattle = false;
					resource.metal+= 5000*sub*resource.multiplyer;
					resource.minerals+= 2500*sub*resource.multiplyer;
					resource.fuel+= 2000*sub*resource.multiplyer;
					var r = random(0,100);
					if(r < 5){resource.ancient_tech+=sub}
					if(r > 95){resource.code_snippets+=sub}
					tech.points+= 5*sub;
					battleWon=true;
					planet.max++;
					scene=9;
				}
				if(ship.total.health <= 0){
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
					textSize(height/32);
					if(r < 5){text("You got "+sub+" anicent tech!",width/4*3,height/16*11);}
					if(r > 95){text("You got "+sub+" code snippets!",width/4*3,height/16*11);}
					textSize(height/16);
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
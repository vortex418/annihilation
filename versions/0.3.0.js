    	var sketchProc = function(processingInstance) {
	   var mouseIsPressed = false;
        processingInstance.mousePressed = function () { mouseIsPressed = true};
        processingInstance.mouseReleased = function () { mouseIsPressed = false};
	   processingInstance.touchStarted = function () { mouseIsPressed = true};
        processingInstance.touchEnded = function () { mouseIsPressed = false};
	   var keyIsPressed = false;
        processingInstance.keyPressed = function () { keyIsPressed = true};
        processingInstance.keyReleased = function () { keyIsPressed = false};
	   function getImage(url) {
            processingInstance.externals.sketch.imageCache.add(url);
            return processingInstance.loadImage(url);
        }
     with (processingInstance) {
		size(innerWidth/16*16,innerWidth/16*9);
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
		var scene = 0;
		var sub = 0;
		var pscene = 0;
		var psub = 0;
		var overlay = 0;
		var skip = 0;
		var date = new Date();
		var user = {
			loaded: false,
			name: "",
			keys: {},
			meta: {},
			saves: {},
			savesLoaded: false
		};
		var v;
		[v,user.name] = window.location.search.substring(1).split("&");
		var playSound = function(src) {
			document.getElementById("audio").src="/annihilation/sound/"+src;
			var sound = document.getElementById("audio");
  			sound.play();
		};
		var requestUserInfo = new XMLHttpRequest();
		requestUserInfo.onreadystatechange = function() {
    			if (this.readyState == 4 && this.status == 200) {
				user.tempData = JSON.parse(requestUserInfo.responseText);
				for(var i in user.tempData){
					user[i] = user.tempData[i];
				}
				user.loaded = true;
				user.savesLoaded = false;
    			}
		};
		requestUserInfo.open("GET", "/annihilation/userdata.json", true);
		requestUserInfo.send();
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
		var textBox = {
			cursor: {
				time: [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
				interval: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			},
			selected: 0,
			content: ["","","","","","","","","","","","","","","",""],
			characters: ["!","\"","#","$","%","&","'","()","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~","€","‚","ƒ","„","…","†","‡","ˆ","‰","Š","‹","Œ","Ž","‘","’","“","”","•","–","—","˜","™","š","›","œ","ž","Ÿ","¡","¢","£","¤","¥","¦","§","¨","©","ª","«","¬","®","¯","°","±","²","³","´","µ","¶","·","¸","¹","º","»","¼","½","¾","¿","À","Á","Â","Ã","Ä","Å","Æ","Ç","È","É","Ê","Ë","Ì","Í","Î","Ï","Ð","Ñ","Ò","Ó","Ô","Õ","Ö","×","Ø","Ù","Ú","Û","Ü","Ý","Þ","ß","à","á","â","ã","ä","å","æ","ç","è","é","ê","ë","ì","í","î","ï","ð","ñ","ò","ó","ô","õ","ö","÷","ø","ù","ú","û","ü","ý","þ","ÿ","Ā","ā","Ă","ă","Ą"],
			draw: function(x,y,w,h,id){
				box(x,y,w,h,"foreground");
				text(this.content[id],x+(w/2),y+(h/2));
				if(mouseX > x && mouseY > y && mouseX < x+w && mouseY < y+h && mouseIsPressed){
					this.selected = id;
					if(this.cursor.time > 5){
						stroke(200,200,214);
						line(x+(this.cursor.interval*16),y,x+(this.cursor.interval*16),y+h);
					} else if (this.cursor.time <= 0){
						this.cursor.time = 10;
					}	
				}
				if(keyIsPressed && key.code == 8){
						this.content[id] = this.content[id].slice(0,-1);
				}
				for(var i = 0;i<this.characters.length;i++){
					if(keyIsPressed && key.toString() == this.characters[i]){
						this.last = this.characters[i];
						this.content[id] += this.characters[i];
					}
				}
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
		var tech = {
			points: 100,
			cost: [5,5,5,10,10,10,10,20],
			costInc: 1,
			price: [0],
			level: {
				base: 5,
				armor: 0,
				shield: 0,
				laser: 0,
				missle: 0,
				reload: 0,
				recharge: 0,
				construction: 0,
				salvage: 0,
				max: [50,50,50,50,25,50,50,25]
			},
			display: ["","I","II","III","IV","V","VI","VII","VIII","IX","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI","XXII","XXIII","XXIV","XXV","XXVII","XXVII","XXVIII","XXIX","XXX","XXXI","XXXII","XXXIII","XXXIV","XXXV","XXXVI","XXXVII","XXXVIII","XXXIX","XL","XLI","XLII","XLIII","XLV","XLVI","XLVII","XLVIII","XLIX","L","LI","LII","LIII","LIV","LV","LVI","LVII","LVIII","LIX","LX","LXI","LXII","LXIII","LXIV","LXV","LXVI","LXVII","LXVIII","LXIX","LXX","LXXI","LXXII","LXXIII","LXXIV","LXXV","LXXVI","LXXVII","LXXVIII","LXXIX","LXXX","LXXXI","LXXXII","LXXXIII","LXXXIV","LXXXV","LXXXVI","LXXXVII","LXXXVIII","LXXXIX","XC","XCI","XCII","XCIII","XCIV","XCV","XCVI","XCVII","XCVIII","XCIX","C"],
			box: {
				x: [width*0.1,width*0.1,width*0.1,width*0.4,width*0.4,width*0.4,width*0.35,width*0.55],
				y: [height*0.4,height*0.6,height*0.8,height*0.4,height*0.6,height*0.8,height*0.5,height*0.5],
				w: width*0.15,
				h: height*0.05
			}
		};
		var resource = {
			metal: 10000,
			minerals: 5000,
			fuel: 2500,
			ancient_tech: 0,
			code_snippets: 0,
			multiplyer: 1
		};
		var displayResource = function(name){
			if(resource[name] < 1000){
				return resource[name];
			}
			else if(resource[name] > 999){
				return resource[name]/1000+"K";
			}
			else if(resource[name] > 999999){
				return resource[name]/1000000+"M";
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
				y: [width/64*16,width/64*12,width/64*20,width/64*8,width/64*24,width/64*4,width/64*28,width/64*2,width/64*36,width/64*56,width/64*41,width/64*51,width/64*48,width/64*10,width/64*31,width/64*31,width/64*8,width/64*40,width/64*4,width/64*10,width/64*59,width/64*52,width/64*29,width/64*10,width/64*27],
				cost: {
					metal: [1000,2000,4000,10000,25000,100000],
					minerals: [500,2000,1000,4000,10000,50000],
					fuel: [250,500,1000,2500,5000,25000]
				}
			},
			display: {
				level: ["","","","","",""]
			},
			cost: {
				upgrade: {
					ancient_tech: [
						[1,2,4,8,16,32],
						[2,4,7,9,12,15],
						[3,5,8,12,18,26],
						[8,12,20,35,60,75],
						[10,25,45,70,100,135],
						[25,50,100,150,250,400]
					],
					code_snippets: [
						[1,2,5,10,20,35,50],
						[5,10,20,30,35,40],
						[10,20,30,40,50,60],
						[25,40,60,85,100,125],
						[20,25,40,55,70,85],
						[50,75,88,100,125,150]
					]
				}
			},
			fleet: {
				type: [],
				health: [],
				shields: [],
				damage: [],
				reload: [],
				level: [0,0,0,0,0,0],
				crit: {
					chance: 30+tech.level.missle,
					damage: 50+tech.level.missle*5
				},
				multiplyer: {
					damage: 1+tech.level.laser*0.2,
					shields: 1+tech.level.shield*0.4,
					health: 1+tech.level.armor*0.15
				}
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
		var command = {};
		var save = {
			selected: 0,
			loaded: [false,false,false],
			url: null,
			str: "",
			valid: false,
			new: 0,
			data: {
				info: {},
				planet: {},
				star: {},
				ship: {},
				tech: {},
				tax: {}
			},
			info: {
				name: [],
				date: [],
				type: [],
			},
			draw: function(name, d, type,y){
				textAlign(LEFT,CENTER);
				textSize(height/32);
				box(width*0.11,height*0.0325+y*(height*0.078),width*0.78,height*0.065,"foreground");
				text(name,width*0.12,height*0.065+y*(height*0.078));
				text("Last Saved on: "+d,width*0.3,height*0.065+y*(height*0.078));
				text(type,width*0.6,height*0.065+y*(height*0.078));
if(mouseX > width*0.11 && mouseX < width*0.89 && mouseY > height*0.065+y*(height*0.078) && mouseY < height*0.065+y*(height*0.078) && mouseIsPressed){
					save.selected = y;
					if(type == "online"){
						if(y == null || y == undefined){
							alert("an unexpected error occured.");
							mouseIsPressed = false;
						}
						else {save.str = user.saves[y];}
					} else if(type == "offline"){
						save.str = localStorage.getItem("save-"+name);
					} else if(type == "uploaded"){}else{
						alert("an unexpected error occured.");
						mouseIsPressed = false;
					}
				}	
			}
		};
		
		
		
		
		
		
		

		
		
		draw = function(){
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
				textSize(height/16);
				text("Galaxy Map",width/4*0.5,height/8*0.5);
				text("Shipyard",width/4*1.5,height/8*0.5);
				text("Laboratory",width/4*2.5,height/8*0.5);
				text("Settings",width/4*3.5,height/8*0.5);
				if(mouseX < width/4*1 && mouseX > width/4*0 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					pscene = scene;
					scene = 3;
					sub = 0;
				}
				if(mouseX < width/4*2 && mouseX > width/4*1 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					pscene = scene;
					scene = 4;
				}
				if(mouseX < width/4*3 && mouseX > width/4*2 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					pscene = scene;
					scene = 5;
				}
				if(mouseX < width/4*4 && mouseX > width/4*3 && mouseY < height/8 && mouseY > 0 && mouseIsPressed) {
					pscene = scene;
					scene = 6;
				}
			};
			ship.cost.metal = [ship.generic.cost.metal[0]*(1-tech.level.construction/100),ship.generic.cost.metal[1]*(1-tech.level.construction/100),ship.generic.cost.metal[2]*(1-tech.level.construction/100),ship.generic.cost.metal[3]*(1-tech.level.construction/100),ship.generic.cost.metal[4]*(1-tech.level.construction/100),ship.generic.cost.metal[5]*(1-tech.level.construction/100)];
			ship.cost.minerals = [ship.generic.cost.minerals[0]*(1-tech.level.construction/100),ship.generic.cost.minerals[1]*(1-tech.level.construction/100),ship.generic.cost.minerals[2]*(1-tech.level.construction/100),ship.generic.cost.minerals[3]*(1-tech.level.construction/100),ship.generic.cost.minerals[4]*(1-tech.level.construction/100),ship.generic.cost.minerals[5]*(1-tech.level.construction/100)];
			ship.cost.fuel = [ship.generic.cost.fuel[0]*(1-tech.level.construction/100),ship.generic.cost.fuel[0]*(1-tech.level.construction/100),ship.generic.cost.fuel[2]*(1-tech.level.construction/100),ship.generic.cost.fuel[3]*(1-tech.level.construction/100),ship.generic.cost.fuel[4]*(1-tech.level.construction/100),ship.generic.cost.fuel[5]*(1-tech.level.construction/100)];
			save.data.resource = resource;
			save.data.planet = planet; 
			save.data.star = star;
			save.data.ship = ship.fleet;
			save.data.tech = tech;
			save.data.tax = tax;
			document.body.style.cursor = "default";
			if(planet.status[64] === 2){
				scene = 0;
				sub = 2;
			}
			if(user.savesLoaded == false && user.loaded == true && user.name != null && user.name !== undefined && user.name != "defaultuser0" ){
				if(user.name == undefined){
					for(var i=0;i<user.saves[user.name].length;i++){
						save.info.name.push(user.meta.names[user.name][i]);
						save.info.date.push(user.meta.dates[user.name][i]);
						save.info.type.push("online");
					}
				user.savesLoaded = true;
				}
			}
			ship.total.damage = 0;
			ship.total.health = 0;
			ship.total.shields = 0;
			enemy.total.damage = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			enemy.total.health = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			enemy.total.shields = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			for(var i = 0; i<ship.fleet.type.length; i++){
				ship.total.damage = 0;
				ship.total.health = 0;
				ship.total.shields = 0;
				ship.total.damage += ship.fleet.damage[i];
				ship.total.health += ship.fleet.health[i];
				ship.total.shields += ship.fleet.shields[i];
			}
			for(var i = 1; i<64;i++){
				enemy.total.damage[i] = 0;
				enemy.total.health[i] = 0;
				enemy.total.shields[i] = 0;
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
			if(keyIsPressed && scene != 0 && key.toString() == "/"){
				command.str = prompt("Command:");
				if(command.str != null){
					[command.title, command.param_1, command.param_2] = command.str.split(" ");
					if(command.title == "set"){
						if(command.param_1 == "tech"){
							tech = JSON.parse(command.param_2);
						}
						if(command.param_1 == "ship"){
							ship = JSON.parse(command.param_2);
						}
						if(command.param_1 == "resource"){
							resource = JSON.parse(command.param_2);
						}
						if(command.param_1 == "planet"){
							planet = JSON.parse(command.param_2);
						}
						if(command.param_1 == "star"){
							star = JSON.parse(command.param_2);
						}
						if(command.param_1 == "enemy"){
							enemy = JSON.parse(command.param_2);
						}
					}
				}
				keyIsPressed = false;
			}
			tech.points = parseFloat(tech.points);
			resource.metal = parseFloat(resource.metal);
			resource.minerals = parseFloat(resource.minerals);
			resource.fuel = parseFloat(resource.fuel);
			resource.ancient_tech = parseFloat(resource.ancient_tech);
			resource.code_snippets = parseFloat(resource.code_snippets);
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
					if(user.name != null && user.name != undefined && user.name != "defaultuser0" && user.name != ""){
						save.info.type.push("online");
						save.type = "online";
					}
					sub = 1;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/32 && mouseY > height/2-height/32 && mouseIsPressed && skip === 2) {
					scene = 3;
					playSound("on.mp3");
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/32*4 && mouseY > height/2+height/32*2 && mouseIsPressed) {
						sub = 4;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/32*7 && mouseY > height/2+height/32*5 && mouseIsPressed) {
					window.close();				
				}
			}
			if(scene === 0 && sub===1){
				background(0,0,0);
				noStroke();
				fill(255,255,255);
				starscape(0);
				textAlign(CENTER,CENTER);
				fill(200,200,214);
				textSize(height/32);
				text("save name:",width*0.5,height*0.4);
				textBox.draw(width*0.375,height*0.45,width*0.25,height*0.05,1);
				button(width/2-width/8*1.25,height/2+height/8+height/32,width/4*1.25,height/16);
				textSize(height/32);
				text("Start Game",width/2,height/2*1.375);
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/2+height/8+height/16+height/32 && mouseY > height/2+height/8+height/32 && mouseIsPressed) {
					save.info.name.push(textBox.content[1]);
					save.info.date.push(date.getFullYear()+"/"+date.getMonth()+1+"/"+date.getDate());
					for(var i=0;i<save.info.name.length;i++){
						if(save.info.name[i] == textBox.content[1]){
						   save.selected = i;
						}
					}
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
				for(var i=0;i<save.info.name.length;i++){
					save.draw(save.info.name[i],save.info.date[i],save.info.type[i],i+1);
				}
				textAlign(CENTER,CENTER);
				button(width/16*2,height/16*12,width/4,height/16);
				button(width/16*6,height/16*12,width/4,height/16);
				button(width/16*10,height/16*12,width/4,height/16);
				button(width/16*4,height/16*13,width/4,height/16);
				button(width/16*8,height/16*13,width/4,height/16);
				textSize(height/32);
				text("Play",width/16*4,height/32*25);
				text("Delete",width/16*8,height/32*25);
				text("New",width/16*12,height/32*25);
				text("Back",width/16*6,height/32*27);
				text("Upload",width/16*10,height/32*27);
				if(mouseX > width/16*2 && mouseX < width/16*6 && mouseY > height/16*12 && mouseY < height/16*13 && save.str == null && save.str == undefined){
					document.body.style.cursor = "not-allowed";
				}
				if(mouseX > width/16*2 && mouseX < width/16*6 && mouseY > height/16*12 && mouseY < height/16*13 && mouseIsPressed && save.str != undefined){
					save.content = JSON.parse(save.str);	 
					resource = save.content.resource;
					planet = save.content.planet;
					star = save.content.star;
					ship.fleet = save.content.ship;
					tech = save.content.tech;
					tax = save.content.tax;
					scene = 3;
					sub = 0;
				}
				if(mouseX > width/16*6 && mouseX < width/16*10 && mouseY > height/16*12 && mouseY < height/16*13 && mouseIsPressed){
					alert("An unexpected error occured. Please contact the support team on the discord if you would like to delete an online save.");
					mouseIsPressed = false;
				}
				if(mouseX > width/16*10 && mouseX < width/16*14 && mouseY > height/16*12 && mouseY < height/16*13 &&mouseIsPressed){
					scene = 3;
					sub = 0;
				}
				if(mouseX > width/16*4 && mouseX < width/16*8 && mouseY > height/16*13 && mouseY < height/16*14 && mouseIsPressed){
					scene = 0;
					sub = 0;
				}
				if(mouseX > width/16*8 && mouseX < width/16*12 && mouseY > height/16*13 && mouseY < height/16*14 && mouseIsPressed){
					save.loaded[2] = false;
					document.getElementById("inputsave").click();
				}
				document.getElementById("inputsave").addEventListener('change', function() {
					mouseIsPressed = false;
					var reader = new FileReader();
					reader.onload = function(){
						if(save.loaded[2] == false){
							save.str = reader.result;
							save.content = JSON.parse(save.str);
							save.info.name.push(save.content.info.name);
							save.info.date.push(save.content.info.date);
							save.info.type.push("uploaded");
							console.log("loaded save \""+save.content.info.name+"\" from "+save.content.info.date);
							save.loaded[2] = true;
						}
						
					};
					reader.readAsText(this.files[0]);					
				});
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
					ship.draw(ship.generic.type[sub-1],width/4,height/2);
					textAlign(LEFT,CENTER);
					noStroke();
					fill(255,255,255);
					text("metal cost: "+ship.cost.metal[sub-1],width/2,height/16*7);
					text("minerals cost: "+ship.cost.minerals[sub-1],width/2,height/16*8);
					text("fuel cost: "+ship.cost.fuel[sub-1],width/2,height/16*9);
					textAlign(CENTER,CENTER);
					if(mouseX < width/16*10 && mouseX > width/16*8 && mouseY < height/16*12 && mouseY > height/16*11 && mouseIsPressed){
						if(pscene == 4){
							scene = 4;
						} else {
							sub = 8;
						}
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
					playSound("on.mp3");
					scene = 3;
					sub=0;
				}
			}
			if(scene === 3){
				// Galaxy map GUI
				drawUI(0);
				fill(255,255,255);
				noStroke();
				textAlign(CENTER,CENTER);
				textSize(height/32);
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
			if(scene == 4){
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
				text("Metal: "+displayResource("metal"),width/4*1,height/4*1);
				text("Minerals: "+displayResource("minerals"),width/4*2,height/4*1);
				text("Fuel: "+displayResource("fuel"),width/4*3,height/4*1);
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
					pscene = 4;
					scene = 1;
					sub = 1;
				}
				if(mouseX < width/16*7 && mouseX > width/16*6 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32 && mouseIsPressed){
					pscene = 4;
					scene = 1;
					sub = 2;
				}
				if(mouseX < width/16*7 && mouseX > width/16*6 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32 && mouseIsPressed){
					pscene = 4;
					scene = 1;
					sub = 3;
				}
				if(mouseX < width/16*15 && mouseX > width/16*14 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32 && mouseIsPressed){
					pscene = 4;
					scene = 1;
					sub = 4;
				}
				if(mouseX < width/16*15 && mouseX > width/16*14 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32 && mouseIsPressed){
					pscene = 4;
					scene = 1;
					sub = 5;
				}
				if(mouseX < width/16*15 && mouseX > width/16*14 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32 && mouseIsPressed){
					pscene = 4;
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
				textSize(height/48);
				if(mouseX < width/16*2 && mouseX > width/16*1 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32){
					box(width/16*1,height/16*6,width/8,height/12,"foreground");
					text("Ancient Tech: "+resource.ancient_tech+"/"+ship.cost.upgrade.ancient_tech[0][ship.fleet.level[0]],width/16*2,height/16*6.5);
					text("Code Snippets: "+resource.code_snippets+"/"+ship.cost.upgrade.code_snippets[0][ship.fleet.level[0]],width/16*2,height/16*7);
				}
				if(mouseX < width/16*2 && mouseX > width/16*1 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32){
					box(width/16*1,height/16*8,width/8,height/12,"foreground");
					text("Ancient Tech: "+resource.ancient_tech+"/"+ship.cost.upgrade.ancient_tech[1][ship.fleet.level[1]],width/16*2,height/16*8.5);
					text("Code Snippets: "+resource.code_snippets+"/"+ship.cost.upgrade.code_snippets[1][ship.fleet.level[1]],width/16*2,height/16*9);
				}
				if(mouseX < width/16*2 && mouseX > width/16*1 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32){
					box(width/16*1,height/16*10,width/8,height/12,"foreground");
					text("Ancient Tech: "+resource.ancient_tech+"/"+ship.cost.upgrade.ancient_tech[2][ship.fleet.level[2]],width/16*2,height/16*10.5);
					text("Code Snippets: "+resource.code_snippets+"/"+ship.cost.upgrade.code_snippets[2][ship.fleet.level[2]],width/16*2,height/16*11);
				}
				if(mouseX < width/16*10 && mouseX > width/16*9 && mouseY < height/16*9-height/32 && mouseY > height/16*8-height/32){
					box(width/16*9,height/16*6,width/8,height/12,"foreground");
					text("Ancient Tech: "+resource.ancient_tech+"/"+ship.cost.upgrade.ancient_tech[3][ship.fleet.level[3]],width/16*10,height/16*6.5);
					text("Code Snippets: "+resource.code_snippets+"/"+ship.cost.upgrade.code_snippets[3][ship.fleet.level[3]],width/16*10,height/16*7);
				}
				if(mouseX < width/16*10 && mouseX > width/16*9 && mouseY < height/16*11-height/32 && mouseY > height/16*10-height/32){
					box(width/16*9,height/16*8,width/8,height/12,"foreground");
					text("Ancient Tech: "+resource.ancient_tech+"/"+ship.cost.upgrade.ancient_tech[4][ship.fleet.level[4]],width/16*10,height/16*8.5);
					text("Code Snippets: "+resource.code_snippets+"/"+ship.cost.upgrade.code_snippets[4][ship.fleet.level[4]],width/16*10,height/16*9);
				}
				if(mouseX < width/16*10 && mouseX > width/16*9 && mouseY < height/16*13-height/32 && mouseY > height/16*12-height/32){
					box(width/16*9,height/16*10,width/8,height/12,"foreground");
					text("Ancient Tech: "+resource.ancient_tech+"/"+ship.cost.upgrade.ancient_tech[5][ship.fleet.level[5]],width/16*10,height/16*10.5);
					text("Code Snippets: "+resource.code_snippets+"/"+ship.cost.upgrade.code_snippets[5][ship.fleet.level[5]],width/16*10,height/16*11);
				}
			}
			if(scene == 5){
				// Lab GUI
				drawUI(1);
				textSize(height/36);
				textAlign(CENTER,CENTER);
				for(var i=0;i<8;i++){
					button(tech.box.x[i],tech.box.y[i],tech.box.w,tech.box.h);
				}
				if(tech.level.armor < 100){
					text("Armor "+tech.display[tech.level.armor],width*0.175,height*0.425);
				} else {text("Armor "+tech.level.armor,width*0.175,height*0.425);}
				if(tech.level.laser < 100){
					text("Laser "+tech.display[tech.level.laser],width*0.175,height*0.625);
				} else {text("Laser "+tech.level.laser,width*0.175,height*0.625);}
				if(tech.level.reload < 100){
					text("Reload "+tech.display[tech.level.reload],width*0.175,height*0.825);
				} else {text("Reload "+tech.level.reload,width*0.175,height*0.825);}
				if(tech.level.shield < 100){
					text("Shields "+tech.display[tech.level.shield],width*0.475,height*0.425);
				} else {text("Shields "+tech.level.shield,width*0.475,height*0.425);}
				if(tech.level.missle < 100){
					text("Missles "+tech.display[tech.level.missle],width*0.475,height*0.625);
				} else {text("Missles "+tech.level.missle,width*0.475,height*0.625);}
				if(tech.level.recharge < 100){
					text("Recharge "+tech.display[tech.level.recharge],width*0.475,height*0.825);
				} else {text("Recharge "+tech.level.recharge,width*0.475,height*0.825);}
				if(tech.level.construction < 100){
					text("Construction "+tech.display[tech.level.construction],width*0.425,height*0.525);
				} else {text("Construction "+tech.level.construction,width*0.425,height*0.525);}
				if(tech.level.salvage < 100){
					text("Salvage "+tech.display[tech.level.salvage],width*0.625,height*0.525);
				} else {text("Salvage "+tech.level.salvage,width*0.625,height*0.525);}
				if(tech.level.armor > 4){stroke(0,255,0)}else{stroke(200,200,214)}
				line(width*0.25,height*0.425,width*0.4,height*0.425);
				if(tech.level.armor > 4){stroke(0,255,0)}else{stroke(200,200,214)}
				line(width*0.25,height*0.425,width*0.35,height*0.525);
				if(tech.level.construction > 4){stroke(0,255,0)}else{stroke(200,200,214)}
				line(width*0.5,height*0.525,width*0.55,height*0.525);
				if(tech.level.laser > 4){stroke(0,255,0)}else{stroke(200,200,214)}
				line(width*0.25,height*0.625,width*0.4,height*0.625);
				if(tech.level.reload > 4){stroke(0,255,0)}else{stroke(200,200,214)}
				line(width*0.25,height*0.825,width*0.4,height*0.825);
				noStroke();
				fill(200,200,214);
				textSize(height/32);
				for(var i=0;i<8;i++){
					var p;
					var pp;
					if(i==0){p="armor";pp="base"}
					if(i==1){p="laser";pp="base"}
					if(i==2){p="reload";pp="base"}
					if(i==3){p="shield";pp="armor"}
					if(i==4){p="missle";pp="laser"}
					if(i==5){p="recharge";pp="reload"}
					if(i==6){p="construction";pp="armor"}
					if(i==7){p="salvage";pp="construction"}
					if(mouseX > tech.box.x[i] && mouseX < tech.box.x[i]+tech.box.w && mouseY > tech.box.y[i] && mouseY < tech.box.y[i]+tech.box.h && tech.points >= tech.cost[i]+tech.level[p]*tech.costInc && tech.level[p] <  tech.level.max[i] && tech.level[pp] > 4){
						if(mouseIsPressed){
							tech.points -= tech.cost[i]+tech.level[p]*tech.costInc;
							tech.level[p]++;
							playSound("level.mp3");
						}
						box(tech.box.x[i],tech.box.y[i]-tech.box.h*2,tech.box.w,tech.box.h*2,"foreground");
						text("cost: "+parseFloat(tech.cost[i]+tech.level[p]*tech.costInc),tech.box.x[i]+tech.box.w/2,tech.box.y[i]-tech.box.h);
					}
					if(tech.level[p] < 1 && pp != "base"){
						image(getImage("/annihilation/models/UI/lock.png"),tech.box.x[i]+width*0.05,tech.box.y[i]+height);
					}
				}
				textSize(height/24);
				text("Research Points: "+tech.points,width/2,height/4*1);
			}
			if(scene == 6){
				// Settings GUI
				drawUI(1);
				noStroke();
				fill(64,64,64);
				button(width/2-width/8,height/32*15,width/4,height/16);
				button(width/2-width/8,height/32*18,width/4,height/16);
				button(width/2-width/8,height/32*21,width/4,height/16);
				button(width/2-width/8,height/32*24,width/4,height/16);
				textSize(height/16);
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
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/32*20 && mouseY > height/32*18 && mouseIsPressed) {
					skip = 1;
					pscene = 6;
					scene = 1;
					sub = 0;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/32*23 && mouseY > height/32*21 && mouseIsPressed) {
					skip = 2;
					scene = 0;
					sub = 0;
				}
				if(mouseX < width/2+width/8 && mouseX > width/2-width/8 && mouseY < height/32*26 && mouseY > height/32*24 && mouseIsPressed) {
					var downloadSave;
					if(save.info.name[save.selected] != null && save.info.name[save.selected] != undefined){
					document.getElementById("download_link").download=save.info.name[save.selected]+".json";
					} else {alert("an error occured 'no save name'. Your save could not be downloaded!")}
					save.status = 1;
					save.data.info.name = save.info.name[save.selected];
					save.data.info.date = save.info.date[save.selected];
					save.data.info.type = save.info.type[save.selected];
					if(save.status == 1){
						save.url = window.URL.createObjectURL(new Blob([JSON.stringify(save.data)], {type: "text/plain"}));
						document.getElementById("download_link").href = save.url;
						if(save.type == "offline"){
							localStorage.setItem("save-"+save.info.name[save.selected],JSON.stringify(save.data));
						}
						if(save.type == "online"){
							user.saves[user.name][save.selected] = JSON.stringify(save.data);
						}
						save.status = 2;
					}
					if(save.status = 2){
						downloadSave = confirm("Download Save?");
						mouseIsPressed = false;
						if(downloadSave == true){document.getElementById("download_link").click();} else {save.status = 0}
					}
				}
			}
			if(scene == 7){
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
							var destinationX = floor(random(0,enemy.fleet.type[sub].length));
							var destinationY = floor(random(0,enemy.fleet.type[sub].length));
							ship.fleet.crit.random = random(0,100);
							if(ship.fleet.crit.random < ship.fleet.crit.chance){
								ship.fleet.crit.dmg = 1+ship.fleet.crit.damage/100;
								textSize(height/32);
								fill(255, 128, 16);
					text("Crit!",ship.generic.x[i]+ship.generic.width[typeNum]/2,ship.generic.y[i]+ship.generic.height[typeNum]/2);
							}
							else{ship.fleet.crit.dmg = 1}
							stroke(0,255,255);
						line(ship.generic.x[i],ship.generic.y[i],enemy.generic.x[destinationX],enemy.generic.y[destinationY]);
							ship.fleet.reload[i] = ship.generic.reload[typeNum];
							if(enemy.fleet.shields[sub][target] < 1){
					enemy.fleet.health[sub][target]-=ship.fleet.damage[i]/20*(ship.fleet.multiplyer.damage*ship.fleet.crit.dmg*(ship.fleet.level[typeNum]+1));
							} else if (enemy.fleet.shields[sub][target] > 0){
					enemy.fleet.shields[sub][target]-=ship.fleet.damage[i]/20*(ship.fleet.multiplyer.damage*ship.fleet.crit.dmg*(ship.fleet.level[typeNum]+1));
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
					resource.random = random(0,100);
					if(resource.random < 5+tech.level.salvage){
						resource.ancient_tech+=sub
					}
					if(resource.random > 95-tech.level.salvage){
						resource.code_snippets+=sub
					}
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
				if(battleWon==true){
					text("You Won!",width/4*3,height/4*2);
					textSize(height/32);
					if(resource.random < 5+tech.level.salvage){text("You got "+sub+" ancient tech!",width/4*3,height/16*11);}
					if(resource.random > 95-tech.level.salvage){text("You got "+sub+" code snippets!",width/4*3,height/16*11);}
					textSize(height/16);
				}
				if(battleWon==false){
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
    var processingInstance = new Processing(document.getElementById("mycanvas"), sketchProc); 
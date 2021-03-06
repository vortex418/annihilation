# Annihilation

 Welcome to Annihilation! Annihilation is a free, online space battle simulator. It is the theme and content of xcraft, but in the liniear form and progression of island clash. Play it now and join the Annihilation Discord Server (https://discord.gg/ZyTsVR4NCV)!
 
# Changelog

### 0.5.0
#### Release: 2021/5/18

Massive internal changes and a few external changes.
*Helpful tips: access the console with Ctrl + Shift + J and when we reference num, its just any number, don't actually try something like `planet[num]`, instead do `planet[0]` or `planet[1]`*

- Changed how data is stored, from objects of arrays (`{x:[0,1],y:[0,1]}`) to arrays of objects  (`[{x:0,y:0},{x:1,y:1}]`), This pretty much means that you will be able to access planet data with `planet[num]` instead of `planet.x[num], planet.y[num], etc.` This applies to research (`tech`), ships, stars, and planets.
- Enemy data stored in planet data (`planet[num].enemy`)
- add the flags system, used in the window query area (`https://vortex418.github.io/annihilation/play/beta?flags=debug`). Notice the end of the string past the `?`. Seperate flags with commas (e.g. `?flags=debug,reload`) The `debug` flag now automatically enables debug/dev mode on page load. The `reload` flag prevents the game from reloading when you resize the screen *Note this is not recommended as resizing the window WILL corrupt the planet hitboxes*. Finally, the `mp` flag enables the multiplayer testing.
- Multiplayer testing: with the `mp` flag (read above) you can access the expirimental multiplayer features. For 0.5.0 just the UI and data organziation has been added, so you can't connect to any servers (yet).
- Changed research mechanics (and added really cool tooltips!): Cost now scales (20% or 25% per level). The shield research now is damage reduction, and you now regen (1 + regen level percent per second). 
- IMPORTANT: Changed save UI. Double click a save or server to play, and right click for options. (Also cool new right-click menu).
- QOL changes:
	- save/saver creation menus have a x if you want to stop making a save or server
	- added more error handing so less crashes
	- battles are slower and hopefully more enjoyable
- Bug Fixes:
	- Fixed the planet hitboxes!
	- patched the cordinate bugs
	- fixed a ton of other bugs that got found while in development
- This update has reduced the code size by 27% AND added a ton of useful stuff, so its worth the month and a half wait.

 ### 0.4.4
#### Released: 2021/4/26

Changed added URL data slightly

- World Generation: `worldgen={...}`
- Automatic save loading - this allows you to automatically load a save and start playing without all the UI stuff!
`save=<save name here>` and `view= <view>`. Currently the only aloud views are map, lab, yard, and settings. 
Make sure to seperate the arguments with ampersands! Also not that the save must already exist. Example below.
	
`https://vortex418.github.io/annihilation/play/0.4.4?worldgen={"planets":69}&save=Test Save&view=map`

### 0.4.3
#### Released: 2021/4/22

Added the ability to download a save from the load menu. Added custom planet numbers and star numbers to worldGen (exmaple below)


*Notes on worldgen*
Custom worlds are made via JSON at the end of the [base URL](https://vortex418.github.io/annihilation/play/0.4.3) by adding ?{JSON here}
`https://vortex418.github.io/annihilation/play/0.4.3?{"planets":250,"stars":500,"borders":[2050,1150],"radius":[50,100]}`

### 0.4.2
#### Released: 2021/4/14

Fixed some major bugs, and added the ability to crash the game with Shift + C. Bug Fixes:

	A-7: Patched autosaves -- saves now automatically save to cookies
	A-8: Enemy health was not loading correctly
	A-9: Now click on the attack button in the planet attack preview will not also attack planets behind the button.

### 0.4.1
#### Released: 2021/4/8

Annihilation v0.4.1 is a small bug fix update. A few features have been added to dev mode, to include hovering over a planet displaying information about it and changeing the outline. Bug fixes:

	A-5: Hitboxes are moved upwards slightly
	A-6: Reszing the windows would miss align hitboxes, now  

### 0.4.0
#### Released: 2021/3/30

0.4.0 is here! Including all the features from the prerelease, 0.4.0 is not visually different from the prerelease. Although it doesn't seem different, it is. With a massive amount of internal changes. Also some bug fixes! 

### v0.4.0 prerelease
##### Released: 2021/3/14

Indroducing Annihilation, but with HTML. Now supported accross all platforms, and with a frash new look, its better than ever! Completly updated planet generation, and massive feature improvements! The main release should come soon, but we want your feedback. Head over to the discord to give yours!

### v0.3.0
##### Released: 2021/3/2

Complete Revamp! Completely revised ships and battles, changes the lab UI and added 2 new research skills.

### App v0.1 \[Discontinued\]
##### Released: 2021/2/5

*Only on Chrome OS*
Added basic UI features, currently you are only able to play the beta from Feburary 4th.

### v0.2.0
##### Released: 2021/1/7

 Added saves, completely revamped all UI's to have new textures, added commands (check the infopedia in-game) and changed shield meters to bars! 

### v0.1.3
##### Released: 2020/12/8

Changed name interface to tips, bug fixes.

### v0.1.2	
##### Released: 2020/11/30

Added the tax button, removed repeat attacks, added 48 new levels widthout full titles or values, added ending (after level 64), added sounds, and changed release notes ingame to credits. 

### v0.1.1	
##### Released: 2020/11/23

Added the infopedia! Improved all ship textures to images and made the shipyard interface better. Reload/Recharge research improves firing speed. Added 8 more levels and research costs now scale.

### v0.1.0	
##### Released: 2020/11/16	

Space Battles added!

### v0.0.3	
##### Released: 2020/11/09

Planet overview tabs available.

### v0.0.2	
##### Released: 2020/11/05

Labraotry and shipyard tabs finished entirly.

### v0.0.1
##### Released: 2020/10/23	

How To Play,Username screen, Settings, and Tabs finsihed.

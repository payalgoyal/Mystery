	var levelButtons = [];
	
	var playerStateStage1 = function(game){}
// Creates a new 'main' state that will contain the game
   playerStateStage1.prototype = {
		// Function called first to load all the assets
		preload: function() { 
			// Change the background color of the game	

			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.setScreenSize(true);
			
			game.load.image("levelsBg", "images/levelsBg.png");
			game.load.image("levelsLand", "images/levelLand.png");
			game.load.image("ocean", "images/ocean.jpg");
			game.load.image("boat", "images/boat.png");
			game.load.spritesheet("coinsSprite", "images/coinSprite.png",40,39);
		},

		// Fuction called after 'preload' to setup the game 
		create: function() { 
			ocean = game.add.sprite(0,0,'ocean');
			ocean.width = game.width;
			ocean.height = game.height;
			
			stageText = game.add.text(game.width/2.5,30,"Stage " + currStage ,{
				font:"bold 40px Arial", fill: "red" 
					});
					
			levelText = game.add.text(game.width/2.5,90," Level " + stage1CurrLevel ,{
				font:"bold 40px Arial", fill: "red" 
					});
			
			mysprite=game.add.sprite(game.width/2.5,game.height/2.5,'rightSprite');
			mysprite.frame=4;
			mysprite.width = 50;
			mysprite.height = 60;
			
			if(remLives == 0){
				gameOverText = game.add.text(game.width/2.5,game.height/1.5,"Game Over",{
					font:"bold 40px Arial", fill: "red" 
				});
				// heart.kill();
				restartGame = game.add.button(game.width/2,game.height/1.6,"levelsLand");
				textOnRestartGameButton = game.add.text(restartGame.x+restartGame.width/3,restartGame.y+restartGame.height/3,"Restart Game",{
					font:"bold 24px Arial", fill: "white" 
				});
				restartGame.onInputDown.add(gameRestarted);
			}
			
			if (remLives > 0 || timerEnd == 1){
				restartLevel = game.add.button(game.width/2,game.height/1.6,"levelsLand");
				textOnRestartButton = game.add.text(restartLevel.x+restartLevel.width/3,restartLevel.y+restartLevel.height/3,"Restart Level",{
					font:"bold 24px Arial", fill: "white" 
				});
				restartLevel.onInputDown.add(levelRestarted);
			}

			if (levelSuccess == 1){
				levelCompletText = game.add.text(game.width/2.5,game.height/1.5,"Stage " + currStage + " Level " + stage1CurrLevel +" Completed ",{
				font:"bold 40px Arial", fill: "red" 
					});
				levelCompletText.fixedToCamera = true;
				// maxLevel = localStorage.getItem("maxLevel")==null?2:localStorage.getItem("maxLevel");
				
				localStorage.setItem("levelCompletedStage1",Math.max(stage1CurrLevel+1,levelCompletedStage1));
				
				nextLevel = game.add.button(game.width/2,game.height/1.6,"levelsLand");
				textOnNextLevelButton = game.add.text(nextLevel.x+nextLevel.width/3,nextLevel.y+nextLevel.height/3,"Next Level",{
					font:"bold 16px Arial", fill: "white" 
				});
				nextLevel.onInputDown.add(nextLevelStart);
			}
		},

		// This function is called 60 times per second
		update: function() {
			// upButton.onInputDown.add(openLevel);
			
		}
   }
   
	function levelRestarted(){
		if (stage1CurrLevel == 1){
			game.state.add("Stage1LevelDesign1",stage1LevelDesign1);
			game.state.start("Stage1LevelDesign1");
		}
		else if (stage1CurrLevel == 2){
			game.state.add("stage1LevelDesign2",stage1LevelDesign2);
			game.state.start("stage1LevelDesign2");
		}
		else if (stage1CurrLevel == 3){
			game.state.add("stage1LevelDesign3",stage1LevelDesign3);
			game.state.start("stage1LevelDesign3");
		}
		else if (stage1CurrLevel == 4){
			game.state.add("stage1LevelDesign4",stage1LevelDesign4);
			game.state.start("stage1LevelDesign4");
		}
		else if (stage1CurrLevel == 5){
			game.state.add("stage1LevelDesign5",stage1LevelDesign5);
			game.state.start("stage1LevelDesign5");
		}
	}
	
	function gameRestarted(){
		game.state.add("Stage1Levels",stage1Levels);
		game.state.start("Stage1Levels");
	}
	
	function nextLevelStart(){
		if (stage1CurrLevel == 1){
			game.state.add("Stage1LevelDesign2",stage1LevelDesign2);
			game.state.start("Stage1LevelDesign2");
		}
		else if (stage1CurrLevel == 2){
			game.state.add("Stage1LevelDesign3",stage1LevelDesign3);
			game.state.start("Stage1LevelDesign3");
		}
		else if (stage1CurrLevel == 3){
			game.state.add("Stage1LevelDesign4",stage1LevelDesign4);
			game.state.start("Stage1LevelDesign4");
		}
		else if (stage1CurrLevel == 4){
			game.state.add("Stage1LevelDesign5",stage1LevelDesign5);
			game.state.start("Stage1LevelDesign5");
		}
		else if (stage1CurrLevel == 5){
			game.state.add("Stage2Levels",stage2Levels);
			game.state.start("Stage2Levels");
		}
	}
   
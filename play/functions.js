	var my_media = null;
	var witchPresent = -1;
	var treasureBrickTraversed = [];
	
	var playAudio = function(audioID) {
		if (my_media != null){
			my_media.pause();
		}
		var audioElement = document.getElementById(audioID);
		var url = audioElement.getAttribute('src');
		
		var loop = function (status) {
			if (status === Media.MEDIA_STOPPED && gameAlive === true) {
				my_media.play();
			}
		};
		
		if (audioID === "walk"){
			my_media = new Media(url, null, null, loop); 
		}
		else{
			my_media = new Media(url, null, null); 
			// my_media = new Audio(url);
		}
		
			   // // // Play audio
		 my_media.play();
	} 
	
	function checkPit(){
		for (var p =0;p<pits.children.length;p++){
			if ((mysprite.x > pits.children[p].x && mysprite.x+mysprite.width < pits.children[p].x+pits.children[p].width && mysprite.y+mysprite.height+2 > pits.children[p].y) ){
				mysprite.animations.stop();
				pitFall = true;
				mysprite.body.velocity.y = 60;
				mysprite.body.velocity.x = 0;
				setTimeout(function(){
					checkLives();
				 }, 800);
			}
		}
	}
	
	function checkWitchVisibility(){
		witchPresent = -1;
		for (var i=0;i<enemies.children.length;i++){
			if (enemies.children[i].x - mysprite.x > 50 && enemies.children[i].x - mysprite.x < 350){
				witchPresent = i;
			}
		}
		
		if(witchPresent > -1){
			witch.x = mysprite.x + 200;
			witch.y = game.height/6;
			witch.visible = true;
		}
		else{
			witch.visible = false;
		}
	}
	
	function myspriteMysteryCollision(a,b){
		levelSuccess = 1;
		checkStage();
	}
	
	function rightUp(){
		rightButton.pressed = "false";
		rightButton.pressed = "false";
	}
	
	function rightDown(){
		rightButton.pressed = "true";
		if (upButton.pressed == "true"){
			jumpPlayerRight();
		}
		else{
			movePlayerRight();
		}
	}
	
	function leftUp(){
		leftButton.pressed = "false";
	}
	
	function leftDown(){
		leftButton.pressed = "true";
		if (upButton.pressed == "true"){
			jumpPlayerLeft();
		}
		else{
			movePlayerLeft();
		}
	}
	
	function upUp(){
		upButton.pressed = "false";
	}
	
	function resetVar(){
		stepsInd = -1;
	}
	
	function checkTresRight(){
		treasureIndex = -1;
		
		if (tresIndex+1 < treasureBrick.children.length){
			if ((treasureBrick.children[tresIndex].x + treasureBrick.children[tresIndex].width + 10)>treasureBrick.children[tresIndex+1].x){
				treasureIndex = tresIndex+1;
			}
			
			if (treasureIndex > -1){
				nextElementRock = "treasureRight";
			}
			if (treasureIndex == -1){
				checkTresRockRight();
			}
		}
		else{
			checkTresRockRight();
		}
	}
	
	function checkTresRockRight(){
		tresRockIndex = -1;
		for (var rockIn = 0;rockIn<rock.children.length;rockIn++){
			if ((treasureBrick.children[tresIndex].x + treasureBrick.children[tresIndex].width + 10)>rock.children[rockIn].x){
				tresRockIndex = rockIn;
			}
		}
		if (tresRockIndex > -1){
			nextElementRock = "rockRight";
		}
	}
	
	function checkRockTresRight(){
		rockTresIndex = -1;
		for (var tresIn = 0;tresIn<treasureBrick.children.length;tresIn++){
			if ((rock.children[index].x + rock.children[index].width + 10) > treasureBrick.children[tresIn].x){
				rockTresIndex = tresIn;
			}
		}
		if (rockTresIndex > -1){
			nextElementRock = "treasureRight";
		}
		if (rockTresIndex == -1){
			nextElementRock = "ground";
		}
	}
	
	function checkTresLeft(){
		treasureIndex = -1;
		if (tresIndex-1 > -1){
			if ((treasureBrick.children[tresIndex].x - 10)<treasureBrick.children[tresIndex].x + treasureBrick.children[tresIndex-1].width){
				treasureIndex = tresIndex;
			}
			
			if (treasureIndex > -1){
				nextElementRock = "treasureLeft";
			}
			if (treasureIndex == -1){
				checkTresRockLeft();
			}
		}
		else{
			checkTresRockLeft();
		}
	}
	
	function checkTresRockLeft(){
		tresRockIndex = -1;
		for (var rockIn = 0;rockIn<rock.children.length;rockIn++){
			if ((treasureBrick.children[tresIndex].x - 10) < rock.children[rockIn].x + rock.children[rockIn].width){
				tresRockIndex = rockIn;
			}
		}
		if (tresRockIndex > -1){
			nextElementRock = "rockLeft";
		}
	}
	
	function checkRockTresLeft(){
		rockTresIndex = -1;
		for (var tresIn = 0;tresIn<treasureBrick.children.length;tresIn++){
			if ((rock.children[index].x - 10) < treasureBrick.children[tresIn].x + treasureBrick.children[tresIn].width){
				rockTresIndex = tresIn;
			}
		}
		if (rockTresIndex > -1){
			nextElementRock = "treasureLeft";
		}
		if (rockTresIndex == -1){
			nextElementRock = "ground";
		}
	}
	
	function checkRockRight(){
		if (index+1 < rock.children.length && index > -1){
			if (rock.children[index+1].alive){
				if ((rock.children[index].x + rock.children[index].width + 10)>rock.children[index+1].x){
					nextRockIndex = index+1;
				}
			}
			else{
				checkRockTresRight();
			}
		}
	}
	
	function checkRockLeft(){
		if (index - 1 >= 0 && index < rock.children.length){
			if (rock.children[index-1].alive){
				if (((rock.children[index].x - 10)<rock.children[index-1].x + rock.children[index-1].width) && ((rock.children[index].x - 10)>rock.children[index-1].x)){
					nextElementRock = "rockLeft";
				}
			}
			else{
				checkRockTresLeft();
			}
		}	
	}
	
	function moveEnemy(){
		for (var i =0;i<enemies.children.length;i++){
			enemies.children[i].body.velocity.x = enemies.children[i].vel;
		}
	}
	
	function killPlayer(en){
		mysprite.dying = true;
		mysprite.body.velocity.x = 0;
		mysprite.body.velocity.y = 0;
		
		mysprite.height = enemies.children[en].height/1.5;
		mysprite.y = enemies.children[en].y + enemies.children[en].height/3;
		// remLives = remLives - 1;
		// my_media.stop();
		setTimeout(function(){
			mysprite.height = enemies.children[en].height/2.5;
			mysprite.width = mysprite.width * 1.2;
			mysprite.body.velocity.x = 0;
			setTimeout(function(){
				mysprite.width = mysprite.width * 1.5;
				mysprite.height = enemies.children[en].height/3.5;
				mysprite.body.velocity.x = 0;
			} , 200);
		} , 200);
		
		setTimeout(function(){
			mysprite.kill();
		}, 400);
		
		setTimeout(function(){
			checkLives();
		}, 900);
	}
	
	function enemyObstructCollision(a,b){
		obstructIndex = b.parent.getIndex(b)
		b.body.immovable = true;
		b.body.moves = false;
		if (b.key == "lowerSteps"){
			steps2.children[obstructIndex].body.immovable = true;
			steps2.children[obstructIndex].body.moves = false;
		}
		else if (b.key == "steps2"){
			steps1.children[obstructIndex].body.immovable = true;
			steps1.children[obstructIndex].body.moves = false;
		}
		else{}
		
		b.body.velocity.x = 0;
		b.body.immovable = true;
		b.body.moves = false;
		enemyIndex = a.parent.getIndex(a);
		enemies.children[enemyIndex].vel = -enemies.children[enemyIndex].vel;
		enemies.children[enemyIndex].body.velocity.x = enemies.children[enemyIndex].vel;
	}
	
	function checkLives(){
		if (!mysprite.alive && livesDeducted == false || pitFall == true || timerEnd == 1){
			remLives = remLives - 1;
			livesDeducted = true;
			pitFall = false;
			timerEnd = 0;
			checkStage();
		}
	}
	
	function checkStage(){
		if (currStage == 1){
			game.state.add("PlayerStateStage1",playerStateStage1);
			game.state.start("PlayerStateStage1");
		}
		if (currStage == 2){
			game.state.add("PlayerStateStage2",playerStateStage2);
			game.state.start("PlayerStateStage2");
		}
	}
	
	function myspriteEnemiesCollision(a,b){
		if ((mysprite.body.facing == 1 || mysprite.body.facing == 2 || b.body.facing == 1 || b.body.facing == 2) && b.alive && a.energised == 0){
			mysprite.dying = true;
			mysprite.body.velocity.x = 0;
			mysprite.body.velocity.y = 0;
			
			mysprite.height = b.height/1.5;
			mysprite.y = b.y + b.height/3;
			// remLives = remLives - 1;
			// my_media.stop();
			setTimeout(function(){
				mysprite.height = b.height/2.5;
				mysprite.width = mysprite.width * 1.2;
				mysprite.body.velocity.x = 0;
				setTimeout(function(){
					mysprite.width = mysprite.width * 1.5;
					mysprite.height = b.height/3.5;
					mysprite.body.velocity.x = 0;
				} , 200);
			} , 200);
			
			setTimeout(function(){
				my_media.pause();
				mysprite.kill();
			}, 400);
			
			setTimeout(function(){
				checkLives();
			}, 900);
		}
		if ((mysprite.body.facing == 1 || mysprite.body.facing == 2 || b.body.facing == 1 || b.body.facing == 2) && b.alive && a.energised == 1){
			b.body.velocity.x = 0;
			mysprite.body.velocity.x = 100;
			playAudio("enemyKill");
			b.kill();
		}
	}
	
	function myspriteTubesCollision(a,b){
		if (move == "right"){
			move = "stopRight";
		}
		if (move == "left"){
			move = "stopLeft";
		}
		mysprite.animations.stop();
		collision = 1;
		tubeIndex = b.parent.getIndex(b);
		
		if (b.body.facing == 1 || b.body.touching.left 
			|| b.body.facing == 2 || b.body.touching.right){
				b.body.velocity.x = 0;
				b.body.immovable = true;
				b.body.moves = false;
				mysprite.body.velocity.x = 0;
				playerBaseLevel = "ground";
		}
		
		if (b.body.facing == 4 || b.body.touching.up){
			b.body.velocity = 0;
			mysprite.body.y = b.body.y - mysprite.height;
			mysprite.body.velocity.y = 0;
			b.body.velocity.y = 0;
			mysprite.body.gravity.y = 0;
			mysprite.body.velocity.x = 0;
			mysprite.body.velocity.y = 0;
			upButton.pressed = "false";
			playerBaseLevel = "tube";
		}
	}
	
	function changeRockEdge(rockIndex){
		if (rockIndex < rock.children.length-1){
			if (((rock.children[rockIndex].x + rock.children[rockIndex].width + 10)>rock.children[rockIndex+1].x) && rock.children[rockIndex+1].alive){
				rock.children[rockIndex+1].edgeLeft = true;
			}
		}
		
		if (rockIndex > 0){
			if ((((rock.children[rockIndex].x - 10)<rock.children[rockIndex-1].x + rock.children[rockIndex-1].width) && ((rock.children[rockIndex].x - 10)>rock.children[rockIndex-1].x)) && rock.children[rockIndex-1].alive){
				rock.children[rockIndex-1].edgeRight = true;
			}
		}
		
		for (var tr = 0;tr<treasureBrick.children.length;tr++){
			if (((rock.children[rockIndex].x + rock.children[rockIndex].width + 10)>treasureBrick.children[tr].x)){
				treasureBrick.children[tr].edgeLeft = true;
			}
			
			if (((rock.children[rockIndex].x - 10) < treasureBrick.children[tr].x + treasureBrick.children[tr].width)){
				treasureBrick.children[tr].edgeRight = true;
			}
		}
	}
	
	function changeTreasureEdge(tresIndex){
		if (tresIndex < treasureBrick.children.length-1){
			if (((treasureBrick.children[tresIndex].x + treasureBrick.children[tresIndex].width + 10)>treasureBrick.children[tresIndex+1].x) && treasureBrick.children[tresIndex+1].alive){
				treasureBrick.children[tresIndex+1].edgeLeft = true;
			}
		}
		
		if (tresIndex > 0){
			if ((((treasureBrick.children[tresIndex].x - 10)<treasureBrick.children[tresIndex-1].x + treasureBrick.children[tresIndex-1].width) && ((treasureBrick.children[tresIndex].x - 10)>treasureBrick.children[tresIndex-1].x)) && treasureBrick.children[tresIndex-1].alive){
				treasureBrick.children[tresIndex-1].edgeRight = true;
			}
		}
		
		for (var r = 0;r<rock.children.length;r++){
			if (((treasureBrick.children[tresIndex].x + treasureBrick.children[tresIndex].width + 10)>rock.children[r].x)){
				rock.children[r].edgeLeft = true;
			}
			
			if (((treasureBrick.children[rockIndex].x - 10) < rock.children[r].x + rock.children[r].width)){
				rock.children[r].edgeRight = true;
			}
		}
	}
	
	function myspriteRock10Collision(b){
		check = 1;
		if (move == "right"){
			move = "stopRight";
		}
		if (move == "left"){
			move = "stopLeft";
		}
		index = b.parent.getIndex(b);
		mysprite.animations.stop();
		collision = 1;
		if (b.body.facing == 1
			|| b.body.facing == 2){
				mysprite.body.velocity.x = 0;
				b.body.immovable = true;
				b.body.moves = false;
				playerBaseLevel = "ground";
				b.body.velocity.x = 0;
		}
		if (b.body.facing == 3 || b.body.touching.down){
			b.visible = false;
			breakingBrick = game.add.sprite(b.x,b.y-10,'breakingBrick');
			playAudio("brickBreaking");
			b.kill();
			coinsText.text = "Coins - " + ++coinsCollected;
			setTimeout(function(){
				breakingBrick.kill();
			},300);
			
			mysprite.body.y = ground.y - mysprite.height;
			mysprite.body.velocity.y = 0;
			playerBaseLevel = "ground";
			changeRockEdge(b.parent.getIndex(b));
		}
		if (b.body.facing == 4 || b.body.touching.up){
			rockCol = 4;
			mysprite.body.y = b.body.y - mysprite.height - 2;
			mysprite.body.gravity.y = 0;
			mysprite.body.velocity.x = 0;
			mysprite.body.velocity.y = 0;
			b.body.velocity.y = 0;
			b.body.velocity.x = 0;
			b.body.gravity.y = 0;
			b.body.immovable = true;
			b.body.move = false;
			upButton.pressed = "false";
			playerBaseLevel = "rock";
		}
	}
	
	function myspriteRockCollision(a,b){
		if (b != undefined){
			myspriteRock10Collision(b);
		}
	}
	
	function energyComplete(){
		if (move == "right"){
			mysprite.animations.play('right');
		}
		else if (move == "left"){
			mysprite.animations.play('left');
		}
		else{
			mysprite.frame = 4;
		}
	}
	
	function myspriteEnergyCollision(){
		energyBottle.kill();
		playAudio("energy");
		mysprite.energised = 1;
	}
	
	function treasurePoint(treasureIndex){
		if (treasureBrickTraversed[treasureIndex] == undefined){
			treasureBrickTraversed[treasureIndex] = 0;
		}
		// if(!treasureBrick.children[treasureIndex].traversed){
			playAudio("brickBreaking");
			if (treasureBrick.children[treasureIndex].power == undefined && treasureBrickTraversed[treasureIndex] < treasureBrick.children[treasureIndex].traversed){
			treasureBrickTraversed[treasureIndex] = treasureBrickTraversed[treasureIndex]+1;
			treasureCoin = game.add.sprite(treasureBrick.children[treasureIndex].x,treasureBrick.children[treasureIndex].y-10,'coinsSprite');
			treasureCoin.animations.add('spin',[0,1,2,3],30,true);
			playAudio("coinCollect");
			treasureCoin.animations.play('spin');
			setTimeout(function(){
				treasureCoin.animations.stop();
				treasureCoin.kill();
			},150);
			coinsText.text = "Coins - " + ++coinsCollected;
			}
			if (treasureBrick.children[treasureIndex].power == 1 && !treasureBrick.children[treasureIndex].traversed){
				energyBottle = game.add.sprite(treasureBrick.children[treasureIndex].x,treasureBrick.children[treasureIndex].y-30,'energyBottle');
				game.physics.enable(energyBottle, Phaser.Physics.ARCADE);
				treasureBrick.children[treasureIndex].traversed = true;
			}	
	}
	
	function myspriteTreasureCollision(a,b){
		if (move == "right"){
			move = "stopRight";
		}
		if (move == "left"){
			move = "stopLeft";
		}
		index = b.parent.getIndex(b);
		mysprite.animations.stop();
		collision = 1;
		if (b.body.facing == 1 || b.body.touching.left
			|| b.body.facing == 2 || b.body.touching.right){
				mysprite.body.velocity.x = 0;
				b.body.velocity.y = 0;
				b.body.velocity.x = 0;
				b.body.gravity.y = 0;
				b.body.immovable = true;
				b.body.move = false;
				playerBaseLevel = "ground";
				b.body.velocity.x = 0;
		}
		if (b.body.facing == 3 || b.body.touching.down){
			mysprite.body.y = ground.y - mysprite.height;
			mysprite.body.velocity.y = 0;
			b.body.velocity.y = 0;
			b.body.velocity.x = 0;
			b.body.gravity.y = 0;
			playerBaseLevel = "ground";
			treasurePoint(b.parent.getIndex(b));
		}
		if (b.body.facing == 4 || b.body.touching.up){
			mysprite.body.y = b.body.y - mysprite.height - 2;
			mysprite.body.gravity.y = 0;
			mysprite.body.velocity.x = 0;
			mysprite.body.velocity.y = 0;
			b.body.velocity.y = 0;
			b.body.velocity.x = 0;
			b.body.gravity.y = 0;
			b.body.immovable = true;
			b.body.move = false;
			upButton.pressed = "false";
			playerBaseLevel = "treasure";
		}
	}
	
	function myspriteCoinCollision(a,b){
		if (b.body.facing > 0 || b.body.touching.none == false){
			b.visible = false;
			playAudio("coinCollect");
			b.kill();
			coinsText.text = "Coins - " + ++coinsCollected;
		}
	}
	
	function myspriteSteps1Collision(a,b){
		steps1Index = b.parent.getIndex(b);
		if (move == "right"){
			move = "stopRight";
		}
		if (move == "left"){
			move = "stopLeft";
		}
		
		mysprite.animations.stop();
		collision = 1;
		//left collision
		if (b.body.facing == 1 || b.body.facing == 2){
			
			b.body.immovable = true;
			b.body.moves = false;
			steps2.children[steps1Index].body.immovable = true;
			steps2.children[steps1Index].body.moves = false;
			
			// if (move == "stopRight"){
				mysprite.body.velocity.x = 0;
			// }
		}
		
		//top collision
		if (b.body.facing == 4){
			mysprite.body.y = b.body.y - b.body.height;
			mysprite.body.gravity.y = 0;
			mysprite.body.velocity.x = 0;
			mysprite.body.velocity.y = 0;
			upButton.pressed = "false";
			playerBaseLevel = "steps1";
		}		
	}
	
	function myspriteSteps2Collision(a,b){
		steps2Index = b.parent.getIndex(b);
		if (move == "right"){
			move = "stopRight";
		}
		if (move == "left"){
			move = "stopLeft";
		}
		
		mysprite.animations.stop();
		collision = 1;
		//left collision
		if (b.body.facing == 1 || b.body.facing == 2){
			
			b.body.immovable = true;
			b.body.moves = false;
			steps1.children[steps2Index].body.immovable = true;
			steps1.children[steps2Index].body.moves = false;
			
			// if (move == "stopRight"){
				mysprite.body.velocity.x = 0;
			// }
		}
		
		//top collision
		if (b.body.facing == 4){
			mysprite.body.y = b.body.y - b.body.height;
			b.body.velocity.y = 0;
			mysprite.body.gravity.y = 0;
			mysprite.body.velocity.x = 0;
			mysprite.body.velocity.y = 0;
			upButton.pressed = "false";
			playerBaseLevel = "steps2";
			stepsColIndex = stepsInd;
		}	
	}
	
	function movePlayerRight(){
		check = 0;
		baseLevelChange = 0;
		myspriteState = "move";
		if ((move == "stopLeft" && collision == 1) || (move == "jump" && collision == 1)){
			collision = 0;
		}
		if ((move == "stopRight" && collision == 1 && jumpRight == "true") || (move == "jump" && collision == 1 && jumpRight == "true")){
			collision = 0;
		}
		
		if (collision == 0){
			mysprite.body.velocity.x = 100;
			rightButton.pressed = "true";
			mysprite.animations.play('right');
			move = "right";
			playAudio("walk");
		}
	}
	
	function movePlayerLeft(){
		check = 0;
		baseLevelChange = 0;
		myspriteState = "move";
		if ((move == "stopRight" && collision == 1) || (move == "jump" && collision == 1)){
			collision = 0;
		}
		if ((move == "stopLeft" && collision == 1 && jumpLeft == "true") || (move == "jump" && collision == 1 && jumpRight == "true")){
			collision = 0;
		}
		
		if (collision == 0){
			leftButton.pressed = "true";
			mysprite.animations.play('left');
			move = "left";
			playAudio("walk");
			mysprite.body.velocity.x = -100;	
		}
	}
	
	function checkGround(){
		if(stepsColIndex != -1){
			if (playerBaseLevel == "steps2" && collision != 1){
				if ((steps2.children[stepsColIndex].x + steps2.children[stepsColIndex].width) < mysprite.x){
					if (mysprite.x > (steps2.children[stepsColIndex].x + steps2.children[stepsColIndex].width + 1)){
						mysprite.y = ground.y - mysprite.height;
						playerBaseLevel = "ground";
						baseLevelChange = 1;
						check = 1;
					}
					
				}
				if (playerBaseLevel == "steps2" && collision != 1 && steps2.children[stepsColIndex].x > (mysprite.x + mysprite.width)){
					if (steps1.children[stepsColIndex].x > (mysprite.x + mysprite.width) ){
						mysprite.y = ground.y - mysprite.height;
						playerBaseLevel = "ground";
						baseLevelChange = 1;
						check = 1;
					}
					else{
						mysprite.y = steps1.children[stepsColIndex].y - mysprite.height;
						// mysprite.body.gravity.y = 0;
						mysprite.body.gravity.y = 0;
						mysprite.body.velocity.x = 0;
						mysprite.body.velocity.y = 0;
						upButton.pressed = "false";
						playerBaseLevel = "steps1";
						check = 1;
					}
				}
			}
			
			if (playerBaseLevel == "steps1" && collision != 1){
				if ((steps1.children[stepsColIndex].x + steps1.children[stepsColIndex].width) < mysprite.x || steps1.children[stepsColIndex].x > (mysprite.x + mysprite.width) ){
					mysprite.y = ground.y - mysprite.height;
					playerBaseLevel = "ground";
					baseLevelChange = 1;
					check = 1;
				}
			}
		}
		
		if (tresIndex != -1 && tresIndex < treasureBrick.children.length){
			if (playerBaseLevel == "treasure" && collision != 1 && ((move == "right" && nextElementRock != "treasureRight") && (move == "left" && nextElementRock != "treasureLeft"))){
				if ((treasureBrick.children[tresIndex].x + treasureBrick.children[tresIndex].width) < mysprite.x || treasureBrick.children[tresIndex].x > (mysprite.x + mysprite.width) ){
					mysprite.y = ground.y - mysprite.height;
					playerBaseLevel = "ground";
					baseLevelChange = 1;
					check = 1;
				}	
			}
		}
		
		if (index != -1 && index < rock.children.length){
			if (playerBaseLevel == "rock" && collision != 1 && ((move == "right" && nextElementRock != "rockRight") && (move == "left" && nextElementRock != "rockLeft"))){
				if ((rock.children[index].x + rock.children[index].width) < mysprite.x || rock.children[index].x > (mysprite.x + mysprite.width) ){
					mysprite.y = ground.y - mysprite.height;
					playerBaseLevel = "ground";
					baseLevelChange = 1;
					check = 1;
				}	
			}
		}
		
		if (tubeIndex != -1 && tubeIndex < tubes.children.length){
			if (playerBaseLevel == "tube" && collision != 1){
				if ((tubes.children[tubeIndex].x + tubes.children[tubeIndex].width) < mysprite.x || tubes.children[tubeIndex].x > (mysprite.x + mysprite.width) ){
					mysprite.y = ground.y - mysprite.height;
					playerBaseLevel = "ground";
					baseLevelChange = 1;
					check = 1;
				}	
			}
		}
	}
	
	function checkCollision(){
		resetVar();
		for (var stepsInde = 0;stepsInde < steps1.children.length; stepsInde++){
			if ((steps1.children[stepsInde].x < (mysprite.x + mysprite.width) && steps1.children[stepsInde].x+steps1.children[stepsInde].width > mysprite.x+(mysprite.width/2))){
				
				stepsInd = stepsInde;
					
				// if (steps1.children[stepsInd].body.facing == 0 
				 // && (((steps1.children[stepsInd].x + steps1.children[stepsInd].width) < mysprite.x) || (steps1.children[stepsInd].x > mysprite.x))
				 // && steps2.children[stepsInd].body.facing == 0){
					// mysprite.y = ground.y - mysprite.height;
					// playerBaseLevel = "ground";
				// }
				// else{
					if (steps1.children[stepsInd].body.facing > 0 || (((steps1.children[stepsInd].x + steps1.children[stepsInd].width) > mysprite.x) && (steps1.children[stepsInd].x < mysprite.x))){
						if (((steps2.children[stepsInd].x + steps2.children[stepsInd].width) > mysprite.x) && (steps2.children[stepsInd].x < (mysprite.x + mysprite.width))){
							mysprite.y = steps2.children[stepsInd].y - mysprite.height;
							steps2.children[stepsInd].body.velocity.y = 0;
							mysprite.body.gravity.y = 0;
							mysprite.body.velocity.x = 0;
							mysprite.body.velocity.y = 0;
							upButton.pressed = "false";
							playerBaseLevel = "steps2";
							stepsColIndex = stepsInd;
						}
						else if (((steps2.children[stepsInd].x + steps2.children[stepsInd].width) > mysprite.x) && (steps2.children[stepsInd].x > (mysprite.x + (mysprite.width/2)))){
							mysprite.y = steps1.children[stepsInd].y - mysprite.height;
							mysprite.body.gravity.y = 0;
							mysprite.body.velocity.x = 0;
							mysprite.body.velocity.y = 0;
							upButton.pressed = "false";
							playerBaseLevel = "step1";
							stepsColIndex = stepsInd;
						}
						else{
							mysprite.y = ground.y - mysprite.height;
							playerBaseLevel = "ground";
						}
						
					}
				// }
			}
		}
		
		treasureCollision();	
		
		rockCollision();
			
		tubeCollision();
		
		enemyCollision();
	}
	
	function jumpPlayerRight(){
		jumpRight = "true";
		mysprite.body.velocity.x = 100;
		mysprite.body.gravity.y = 100;
		setTimeout(function(){
			if ((ground.y < mysprite.y+mysprite.height) ){
				mysprite.body.velocity.y = 0;
				mysprite.body.gravity.y = 0;
				mysprite.body.velocity.x = 0;
			}
			checkCollision();
		}	,1550)
	}
	
	function jumpPlayerLeft(){
		jumpLeft = "true";
		mysprite.body.velocity.x = -100;
		mysprite.body.gravity.y = 100;
		setTimeout(function(){
			if ((ground.y < mysprite.y+mysprite.height) ){
				mysprite.body.velocity.y = 0;
				mysprite.body.gravity.y = 0;
				mysprite.body.velocity.x = 0;
			}
			checkCollision();
		}	,1550)
	}
	
	function treasureCollision(){
		if (enemyKilled != 1){
			for (var ind = 0;ind<treasureBrick.children.length;ind++){
				if(treasureBrick.children[ind].alive && tresCheck == 0){
					if (treasureBrick.children[ind].x < mysprite.x && (treasureBrick.children[ind].x+treasureBrick.children[ind].width) > mysprite.x
					&& treasureBrick.children[ind].y > mysprite.y+mysprite.height && treasureBrick.children[ind].y > mysprite.y+mysprite.height-5
					){
						tresCheck = 1;
						mysprite.y = treasureBrick.children[ind].y - mysprite.height - 2;
						tresIndex = ind;
						mysprite.body.gravity.y = 0;
						// mysprite.body.velocity.x = 0;
						// mysprite.body.velocity.y = 0;
						treasureBrick.children[ind].body.immovable = true;
						treasureBrick.children[ind].body.moves = false;
						treasureBrick.children[ind].body.velocity.y = 0;
						treasureBrick.children[ind].body.velocity.x = 0;
						treasureBrick.children[ind].body.gravity.y = 0;
						upButton.pressed = "false";
						playerBaseLevel = "treasure";
						break;
					}
				}
			}
		}
		
	}
	
	function rockCollision(){
		if (enemyKilled != 1){
			for (var ind = 0;ind<rock.children.length;ind++){
				if(rock.children[ind].alive && check == 0){
					if (rock.children[ind].x < mysprite.x && (rock.children[ind].x+rock.children[ind].width) > mysprite.x
					&& rock.children[ind].y > mysprite.y+mysprite.height && rock.children[ind].y > mysprite.y+mysprite.height-5
					){
						check = 1;
						mysprite.y = rock.children[ind].y - mysprite.height - 2;
						index = ind;
						mysprite.body.gravity.y = 0;
						if (rightButton.pressed == "false" || leftButton.pressed == "false"){
							mysprite.body.velocity.x = 0;
						}
						mysprite.body.velocity.y = 0;
						rock.children[ind].body.immovable = true;
						rock.children[ind].body.moves = false;
						rock.children[ind].body.velocity.y = 0;
						rock.children[ind].body.velocity.x = 0;
						rock.children[ind].body.gravity.y = 0;
						upButton.pressed = "false";
						playerBaseLevel = "rock";
						break;
					}
				}
			}
		}
		
	}
	
	function tubeCollision(){
		for (var tub = 0;tub<tubes.children.length;tub++){
			
			if (tubes.children[tub].x < mysprite.x && (tubes.children[tub].x+tubes.children[tub].width) > mysprite.x+mysprite.width/1.4
			|| (tubes.children[tub].x < mysprite.x + (mysprite.width/1.4) && (tubes.children[tub].x+tubes.children[tub].width) > mysprite.x)){
				mysprite.y = tubes.children[tub].y - mysprite.height;
				tubeIndex = tub;
				tubes.children[tub].body.velocity.y = 0;
				mysprite.body.gravity.y = 0;
				if (rightButton.pressed == "false" || leftButton.pressed == "false"){
					mysprite.body.velocity.x = 0;
				}
				mysprite.body.velocity.y = 0;
				upButton.pressed = "false";
				playerBaseLevel = "tube";
				break;
			}	
		}
	}
	
	function enemyCollision(){
		for (var en = 0;en<enemies.children.length;en++){
			if (enemies.children[en].alive ){
				if((( (enemies.children[en].x < mysprite.x && (enemies.children[en].x +enemies.children[en].width) > mysprite.x)
				|| (enemies.children[en].x < mysprite.x + mysprite.width && (enemies.children[en].x+enemies.children[en].width)>mysprite.x))
				|| (enemies.children[en].x + enemies.children[en].width-3 < mysprite.x && enemies.children[en].x + enemies.children[en].width > mysprite.x)
				|| (enemies.children[en].x + enemies.children[en].width < mysprite.x - mysprite.width && enemies.children[en].x + enemies.children[en].width +3 > mysprite.x - mysprite.width)
				&& mysprite.alive)){
					if (baseLevelChange == 0){
						if (mysprite.y+mysprite.height < enemies.children[en].y+5 && mysprite.y+mysprite.height > enemies.children[en].y){
							mysprite.body.velocity.y =0;
							mysprite.body.velocity.x =0;
							enemies.children[en].body.gravity.y = 0;
							enemies.children[en].body.velocity.y = 0;
							
							enemyDyin = game.add.sprite(enemies.children[en].body.x,enemies.children[en].body.y + enemies.children[en].body.height - 10,'enemyDie');
							mysprite.y = enemyDyin.y - mysprite.height;
							playAudio("enemyKill");
							enemies.children[en].kill();
							setTimeout(function(){
								enemyDyin.kill();
								mysprite.y = enemyDyin.y + enemyDyin.height - mysprite.height;
							},300);
							enemyKilled = 1;
							break;
						}
						else{
							if (mysprite.y+mysprite.height < enemies.children[en].y+10 && mysprite.y+mysprite.height > enemies.children[en].y+4){
								killPlayer(en);
							}
						}
					}
					else{
						if (mysprite.x > enemies.children[en].x && mysprite.x < enemies.children[en].x+enemies.children[en].width){
							mysprite.body.velocity.y =0;
							mysprite.body.velocity.x =0;
							enemies.children[en].body.gravity.y = 0;
							enemies.children[en].body.velocity.y = 0;
							
							enemyDyin = game.add.sprite(enemies.children[en].body.x,enemies.children[en].body.y + enemies.children[en].body.height - 10,'enemyDie');
							mysprite.y = enemyDyin.y - mysprite.height;
							playAudio("enemyKill");
							enemies.children[en].kill();
							setTimeout(function(){
								enemyDyin.kill();
								mysprite.y = enemyDyin.y + enemyDyin.height - mysprite.height;
							},300);
							enemyKilled = 1;
							baseLevelChange = 0;
							break;
						}
						else{
							if ((mysprite.x+7 < enemies.children[en].x && mysprite.x+mysprite.width > enemies.children[en].x -3)
								|| (mysprite.x > enemies.children[en].x + enemies.children[en].width && mysprite.x < enemies.children[en].x + enemies.children[en].width + 7)){
									baseLevelChange = 0;
									killPlayer(en);
								}
						}
					}
				}
				else{
					if (mysprite.x-mysprite.width > enemies.children[en].x+enemies.children[en].width && mysprite.x-mysprite.width-3 < enemies.children[en].x+enemies.children[en].width
					&& mysprite.y+mysprite.height < enemies.children[en].y && mysprite.y+mysprite.height+2 > enemies.children[en].y){
						baseLevelChange = 0;
						killPlayer(en);
					}
				}
			}
			baseLevelChange = 0;
		}
	}
  
	function jumpPlayer(){
		if (mysprite.y > 80 && mysprite.body.velocity.y <= 0){
			jumpCount++;
			upButton.pressed = "true";
			pos = "up";
			move = "jump";
			
			mysprite.body.velocity.y = -80;
			mysprite.body.velocity.x = 0;
			playAudio("jump");
				
			setTimeout(function(){
				pos = "down";
				
				// mysprite.body.velocity.y = 0;
				if(jumpLeft != true && jumpRight != true){
					mysprite.body.gravity.y = 100;
				}
				
				resetVar();
				
				for (var stepsInde = 0;stepsInde < steps1.children.length; stepsInde++){
					if ((steps1.children[stepsInde].x < mysprite.x && steps1.children[stepsInde].x+steps1.children[stepsInde].width > mysprite.x+mysprite.width)){
				
						stepsInd = stepsInde;
				
						if ((steps1.children[stepsInd].body.facing > 0 || (((steps1.children[stepsInd].x + steps1.children[stepsInd].width) > mysprite.x) && (steps1.children[stepsInd].x < mysprite.x)))){
							if((((steps2.children[stepsInd].x + steps2.children[stepsInd].width) > mysprite.x) && (steps2.children[stepsInd].x < mysprite.x+mysprite.width))){
								mysprite.y = steps2.children[stepsInd].y - mysprite.height;
								steps2.children[stepsInd].body.velocity.y = 0;
								mysprite.body.gravity.y = 0;
								// my_media.stop();
								mysprite.body.velocity.x = 0;
								mysprite.body.velocity.y = 0;
								upButton.pressed = "false";
								playerBaseLevel = "steps2";
								stepsColIndex = stepsInd;
							}
							else if ((((steps2.children[stepsInd].x + steps2.children[stepsInd].width) > mysprite.x) && (steps2.children[stepsInd].x > (mysprite.x+mysprite.width))) && (steps1.children[stepsInd].x < (mysprite.x + mysprite.width))){
								mysprite.y = steps1.children[stepsInd].y - mysprite.height;
								mysprite.body.gravity.y = 0;
								mysprite.body.velocity.x = 0;
								mysprite.body.velocity.y = 0;
								upButton.pressed = "false";
								playerBaseLevel = "steps1";
							}
							else{
								checkPit();
							}
						}				
					}
				}

				treasureCollision();
				
				rockCollision();
				
				tubeCollision();
				
				enemyCollision();
				
				mysprite.animations.stop();
			}	,1550)
		}
		
	}
	function myspriteMysteryCollision(){
		levelCompletText = game.add.text(150,10,"Level Completed ",{
				font:"bold 16px Arial", fill: "red" 
			});
		levelCompletText.fixedToCamera = true;
		maxLevel = localStorage.getItem("maxLevel")==null?2:localStorage.getItem("maxLevel");
		localStorage.setItem("levelCompleted",Math.max(2,maxLevel));
		nextLevel.inputEnabled = true;
		rightButton.inputEnabled = false;
		leftButton.inputEnabled = false;
		upButton.inputEnabled = false;
		mysprite.visible = false;
		mysprite.x = 100;
		mysprite.body.velocity.x = 0;
		mysprite.body.velocity.y = 0;
		mysprite.animations.stop();
		mystery.body.velocity.x = 0;
		mystery.body.velocity.y = 0;
		nextLevel.onInputDown.add(goNextLevel,this);
	}
	
	function goNextLevel(){
		levelClick.play();
		game.state.add("LevelDesign2",levelDesign2);
		game.state.start("LevelDesign2");
	}
	
	function rightUp(){
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
		for (var tres = 0;tres<treasureBrick.children.length;tres++){
			if ((treasureBrick.children[index].x + treasureBrick.children[index].width + 10)>treasureBrick.children[tres].x){
				tresIndex = tres;
			}
		}
		if (tresIndex > -1){
			nextElementRock = "treasureRight";
		}
	}
	
	function checkTresRockRight(){
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
		for (var tresIn = 0;tresIn<treasureBrick.children.length;tresIn++){
			if ((rock.children[index].x + rock.children[index].width + 10) > treasureBrick.children[tresIn].x){
				rockTresIndex = tresIn;
			}
		}
		if (rockTresIndex > -1){
			nextElementRock = "treasureRight";
		}
	}
	
	function checkTresLeft(){
		for (var tres = 0;tres<treasureBrick.children.length;tres++){
			if ((treasureBrick.children[index].x - 10)<treasureBrick.children[tres].x + treasureBrick.children[tres].width){
				tresIndex = tres;
			}
		}
		if (tresIndex > -1){
			nextElementRock = "treasureLeft";
		}
	}
	
	function checkTresRockLeft(){
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
		for (var tresIn = 0;tresIn<treasureBrick.children.length;tresIn++){
			if ((rock.children[index].x - 10) < treasureBrick.children[tresIn].x + treasureBrick.children[tresIn].width){
				rockTresIndex = tresIn;
			}
		}
		if (rockTresIndex > -1){
			nextElementRock = "treasureLeft";
		}
	}
	
	function checkRockRight(){
		if (index+1 < rock.children.length && index > -1){
			if (rock.children[index+1].alive){
				if ((rock.children[index].x + rock.children[index].width + 10)>rock.children[index+1].x){
					nextElementRock = "rockRight";
				}
			}
			else{
				nextElementRock = "ground";
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
				nextElementRock = "ground";
			}
		}
		
	}
	
	function moveEnemy(){
		for (var i =0;i<enemies.children.length;i++){
			enemies.children[i].body.velocity.x = enemies.children[i].vel;
		}
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
	
	function myspriteEnemiesCollision(a,b){
		if ((mysprite.body.facing == 1 || mysprite.body.facing == 2) && b.alive && a.energised == 0){
			run.stop();
			mysprite.body.velocity.x = 0;
			mysprite.body.velocity.y = 0;
			
			mysprite.height = b.height/1.5;
			mysprite.y = b.y + b.height/3;
			
			setTimeout(function(){
				mysprite.height = b.height/2.5;
				mysprite.width = mysprite.width * 1.2;
				mysprite.body.velocity.x = 0;
			} , 200);
			setTimeout(function(){
				mysprite.width = mysprite.width * 1.5;
				mysprite.height = b.height/3.5;
				mysprite.body.velocity.x = 0;
			} , 200);
			setTimeout(function(){
				mysprite.kill();
				gameOverText = game.add.text(game.width/2.3,game.height/1.7,"Game Over",{
				font:"bold 40px Arial", fill: "red" 
			});
			}, 400);
			
			stopScene();
		}
		if ((mysprite.body.facing == 1 || mysprite.body.facing == 2) && b.alive && a.energised == 1){
			b.body.velocity.x = 0;
			mysprite.body.velocity.x = 100;
			run.stop();
			enemyKill.play();
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
				run.stop();
				mysprite.body.velocity.x = 0;
				playerBaseLevel = "ground";
				stopScene();
		}
		
		if (b.body.facing == 4 || b.body.touching.up){
			b.body.velocity = 0;
			mysprite.body.y = b.body.y - mysprite.height;
			mysprite.body.velocity.y = 0;
			b.body.velocity.y = 0;
			mysprite.body.gravity.y = 0;
			run.stop();
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
				run.stop();
				mysprite.body.velocity.x = 0;
				b.body.immovable = true;
				b.body.moves = false;
				playerBaseLevel = "ground";
				b.body.velocity.x = 0;
				stopScene();
		}
		if (b.body.facing == 3 || b.body.touching.down){
			b.visible = false;
			
			breakingBrick = game.add.sprite(b.x,b.y-10,'breakingBrick');
			brickBreaking.play();
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
			run.stop();
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
		run.stop();
		energy.play();
		mysprite.energised = 1;
	}
	
	function treasurePoint(treasureIndex){
		if(!treasureBrick.children[treasureIndex].traversed){
			run.stop();
			if (treasureBrick.children[treasureIndex].power == undefined){
				treasureCoin = game.add.sprite(treasureBrick.children[treasureIndex].x,treasureBrick.children[treasureIndex].y-10,'coinsSprite');
				treasureCoin.animations.add('spin',[0,1,2,3],30,true);
				treasureCoin.animations.play('spin');
				setTimeout(function(){
					treasureCoin.animations.stop();
					treasureCoin.kill();
				},150);
				coinsText.text = "Coins - " + ++coinsCollected;
			}
			if (treasureBrick.children[treasureIndex].power == 1){
				energyBottle = game.add.sprite(treasureBrick.children[treasureIndex].x,treasureBrick.children[treasureIndex].y-30,'energyBottle');
				game.physics.enable(energyBottle, Phaser.Physics.ARCADE);
			}
			
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
				run.stop();
				mysprite.body.velocity.x = 0;
				b.body.velocity.y = 0;
				b.body.velocity.x = 0;
				b.body.gravity.y = 0;
				b.body.immovable = true;
				b.body.move = false;
				playerBaseLevel = "ground";
				b.body.velocity.x = 0;
				stopScene();
		}
		if (b.body.facing == 3 || b.body.touching.down){
			mysprite.body.y = ground.y - mysprite.height;
			mysprite.body.velocity.y = 0;
			b.body.velocity.y = 0;
			b.body.velocity.x = 0;
			b.body.gravity.y = 0;
			playerBaseLevel = "ground";
			treasureHit.play();
			treasurePoint(b.parent.getIndex(b));
		}
		if (b.body.facing == 4 || b.body.touching.up){
			mysprite.body.y = b.body.y - mysprite.height - 2;
			run.stop();
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
			coinCollect.play();
			b.kill();
			coinsText.text = "Coins - " + ++coinsCollected;
			// rockCollision();
			// tubeCollision();
			
			// mysprite.body.y = ground.y - mysprite.height;
			// mysprite.body.velocity.y = 0;
			// playerBaseLevel = "ground";
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
				run.stop();
				mysprite.body.velocity.x = 0;
			// }
			stopScene();
		}
		
		//top collision
		if (b.body.facing == 4){
			mysprite.body.y = b.body.y - b.body.height;
			run.stop();
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
				run.stop();
				mysprite.body.velocity.x = 0;
			// }
			
			stopScene();
		}
		
		//top collision
		if (b.body.facing == 4){
			mysprite.body.y = b.body.y - b.body.height;
			b.body.velocity.y = 0;
			run.stop();
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
		myspriteState = "move";
		if ((move == "stopLeft" && collision == 1) || (move == "jump" && collision == 1)){
			collision = 0;
		}
		if ((move == "stopRight" && collision == 1 && jumpRight == "true") || (move == "jump" && collision == 1 && jumpRight == "true")){
			collision = 0;
		}
		if (collision == 1){
			stopScene();
		}
		
		if (collision == 0){
			rightButton.pressed = "true";
			mysprite.animations.play('right');
			move = "right";
			run.play();
			mysprite.body.velocity.x = 100;
		}
		
	}
	
	function movePlayerLeft(){
		check = 0;
		myspriteState = "move";
		if ((move == "stopRight" && collision == 1) || (move == "jump" && collision == 1)){
			collision = 0;
		}
		if ((move == "stopLeft" && collision == 1 && jumpLeft == "true") || (move == "jump" && collision == 1 && jumpRight == "true")){
			collision = 0;
		}
		if (collision == 1){
			stopScene();
		}
		
		if (collision == 0){
			leftButton.pressed = "true";
			mysprite.animations.play('left');
			move = "left";
			run.play();
			mysprite.body.velocity.x = -100;	
		}
	}
	
	function moveSceneRight(){
		// if (ground.x > -1200){
			// ground.x-=2;
		// }
		// else{
			// ground.x = 1000;
		// }
		// if (ground_dup.x > -1200){
			// ground_dup.x -= 2;
		// }
		// else{
			// ground_dup.x = 1000;
		// }
		
		for(var j = 0;j < steps1.children.length; j++){
			steps1.children[j].body.immovable = false;
			steps1.children[j].body.moves = true;
			steps1.children[j].body.velocity.x = -100;
		}
		
		for(var k = 0;k < steps2.children.length; k++){
			steps2.children[k].body.immovable = false;
			steps2.children[k].body.moves = true;
			steps2.children[k].body.velocity.x = -100;
		}
		
		for (var i = 0; i < rock.children.length; i++){
			rock.children[i].body.immovable = false;
			rock.children[i].body.moves = true;
			rock.children[i].body.velocity.x = -100;
		}
		
		for (var l = 0;l < tubes.children.length; l++){
			tubes.children[l].body.immovable = false;
			tubes.children[l].body.moves = true;
			tubes.children[l].body.velocity.x = -100;
		}
		
		for (var m = 0;m < coins.children.length; m++){
			coins.children[m].body.velocity.x = -100;
		}
	}
	
	function moveSceneLeft(){
		// if (ground.x < 1200){
			// ground.x+=2;
		// }
		// else{
			// ground.x = -1000;
		// }
		// if (ground_dup.x < 1200){
			// ground_dup.x += 2;
		// }
		// else{
			// ground_dup.x = -1000;
		// }
		
		for (var i = 0; i < rock.children.length; i++){
			rock.children[i].body.immovable = false;
			rock.children[i].body.moves = true;
			rock.children[i].body.velocity.x = 100;
		}
		for(var j = 0;j < steps1.children.length; j++){
			steps1.children[j].body.immovable = false;
			steps1.children[j].body.moves = true;
			steps1.children[j].body.velocity.x = 100;
		}
		
		for(var k = 0;k < steps2.children.length; k++){
			steps2.children[k].body.immovable = false;
			steps2.children[k].body.moves = true;
			steps2.children[k].body.velocity.x = 100;
		}	
		
		for (var l = 0;l < tubes.children.length; l++){
			tubes.children[l].body.immovable = false;
			tubes.children[l].body.moves = true;
			tubes.children[l].body.velocity.x = 100;
		}
		
		for (var m = 0;m < coins.children.length; m++){
			coins.children[m].body.velocity.x = 100;
		}
	}
   
	function stopScene(){
		for(var j = 0;j < steps1.children.length; j++){
			steps1.children[j].body.velocity.x = 0;
		}
		
		for(var k = 0;k < steps2.children.length; k++){
			steps2.children[k].body.velocity.x = 0;
		}
		for (var i = 0; i < rock.children.length; i++){
			rock.children[i].body.velocity.x = 0;
		}
		for (var l = 0; l < tubes.children.length; l++){
			tubes.children[l].body.velocity.x = 0;
		}
		for (var m = 0;m < coins.children.length; m++){
			coins.children[m].body.velocity.x = 0;
		}
	}
	
	function checkGround(){
		if(stepsColIndex != -1){
			if (playerBaseLevel == "steps2" && collision != 1){
				if ((steps2.children[stepsColIndex].x + steps2.children[stepsColIndex].width) < mysprite.x){
					if (mysprite.x > (steps2.children[stepsColIndex].x + steps2.children[stepsColIndex].width + 1)){
						mysprite.y = ground.y - mysprite.height;
						playerBaseLevel = "ground";
						check = 1;
					}
					
				}
				if (playerBaseLevel == "steps2" && collision != 1 && steps2.children[stepsColIndex].x > (mysprite.x + mysprite.width)){
					if (steps1.children[stepsColIndex].x > (mysprite.x + mysprite.width) ){
						mysprite.y = ground.y - mysprite.height;
						playerBaseLevel = "ground";
						check = 1;
					}
					else{
						mysprite.y = steps1.children[stepsColIndex].y - mysprite.height;
						// mysprite.body.gravity.y = 0;
						run.stop();
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
					check = 1;
				}
			}
		}
		
		if (tresIndex != -1 && tresIndex < treasureBrick.children.length){
			if (playerBaseLevel == "treasure" && collision != 1 && ((move == "right" && nextElementRock != "treasureRight") && (move == "left" && nextElementRock != "treasureLeft"))){
				if ((treasureBrick.children[tresIndex].x + treasureBrick.children[tresIndex].width) < mysprite.x || treasureBrick.children[tresIndex].x > (mysprite.x + mysprite.width) ){
					mysprite.y = ground.y - mysprite.height;
					playerBaseLevel = "ground";
					check = 1;
				}	
			}
		}
		
		if (index != -1 && index < rock.children.length){
			if (playerBaseLevel == "rock" && collision != 1 && ((move == "right" && nextElementRock != "rockRight") && (move == "left" && nextElementRock != "rockLeft"))){
				if ((rock.children[index].x + rock.children[index].width) < mysprite.x || rock.children[index].x > (mysprite.x + mysprite.width) ){
					mysprite.y = ground.y - mysprite.height;
					playerBaseLevel = "ground";
					check = 1;
				}	
			}
		}
		
		if (tubeIndex != -1 && tubeIndex < tubes.children.length){
			if (playerBaseLevel == "tube" && collision != 1){
				if ((tubes.children[tubeIndex].x + tubes.children[tubeIndex].width) < mysprite.x || tubes.children[tubeIndex].x > (mysprite.x + mysprite.width) ){
					mysprite.y = ground.y - mysprite.height;
					playerBaseLevel = "ground";
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
							run.stop();
							mysprite.body.velocity.x = 0;
							mysprite.body.velocity.y = 0;
							upButton.pressed = "false";
							playerBaseLevel = "steps2";
							stepsColIndex = stepsInd;
						}
						else if (((steps2.children[stepsInd].x + steps2.children[stepsInd].width) > mysprite.x) && (steps2.children[stepsInd].x > (mysprite.x + (mysprite.width/2)))){
							mysprite.y = steps1.children[stepsInd].y - mysprite.height;
							mysprite.body.gravity.y = 0;
							run.stop();
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
		
		// if (stepsInd == -1){
			// mysprite.y = ground.y - mysprite.height;
			// playerBaseLevel = "ground";
		// }
		treasureCollision();	
		
		rockCollision();
			
		tubeCollision();
		
		enemyCollision();
	}
	
	function jumpPlayerRight(){
		run.stop();
		jumpRight = "true";
		mysprite.body.velocity.x = 100;
		mysprite.body.gravity.y = 100;
		setTimeout(function(){
			if ((ground.y < mysprite.y+mysprite.height) ){
				mysprite.body.velocity.y = 0;
				mysprite.body.gravity.y = 0;
				run.stop();
				mysprite.body.velocity.x = 0;
			}
			checkCollision();
		}	,1550)
	}
	
	function jumpPlayerLeft(){
		run.stop();
		jumpLeft = "true";
		mysprite.body.velocity.x = -100;
		mysprite.body.gravity.y = 100;
		setTimeout(function(){
			if ((ground.y < mysprite.y+mysprite.height) ){
				mysprite.body.velocity.y = 0;
				mysprite.body.gravity.y = 0;
				run.stop();
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
					){
						tresCheck = 1;
						mysprite.y = treasureBrick.children[ind].y - mysprite.height - 2;
						tresIndex = ind;
						mysprite.body.gravity.y = 0;
						run.stop();
						mysprite.body.velocity.x = 0;
						mysprite.body.velocity.y = 0;
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
					){
						check = 1;
						mysprite.y = rock.children[ind].y - mysprite.height - 2;
						index = ind;
						mysprite.body.gravity.y = 0;
						run.stop();
						mysprite.body.velocity.x = 0;
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
			
			if (tubes.children[tub].x < mysprite.x && (tubes.children[tub].x+tubes.children[tub].width) > mysprite.x
			|| (tubes.children[tub].x < mysprite.x + mysprite.width && (tubes.children[tub].x+tubes.children[tub].width) > mysprite.x)){
				mysprite.y = tubes.children[tub].y - mysprite.height;
				tubeIndex = tub;
				tubes.children[tub].body.velocity.y = 0;
				mysprite.body.gravity.y = 0;
				run.stop();
				mysprite.body.velocity.x = 0;
				mysprite.body.velocity.y = 0;
				upButton.pressed = "false";
				playerBaseLevel = "tube";
				break;
			}	
		}
	}
	
	function enemyCollision(){
		for (var en = 0;en<enemies.children.length;en++){
			if (enemies.children[en].alive){
				if(((enemies.children[en].x < mysprite.x && (enemies.children[en].x +enemies.children[en].width) > mysprite.x
				|| (enemies.children[en].x < mysprite.x + mysprite.width && (enemies.children[en].x+enemies.children[en].width)>mysprite.x && (mysprite.y+mysprite.height > enemies.children[en].y-3)))
				&& mysprite.alive)){
					mysprite.body.velocity.y =0;
					mysprite.body.velocity.x =0;
					enemies.children[en].body.gravity.y = 0;
					enemies.children[en].body.velocity.y = 0;
					
					enemyDyin = game.add.sprite(enemies.children[en].body.x,enemies.children[en].body.y + enemies.children[en].body.height - 10,'enemyDie');
					mysprite.y = enemyDyin.y - mysprite.height;
					run.stop();
					enemyKill.play();
					enemies.children[en].kill();
					setTimeout(function(){
						enemyDyin.kill();
						mysprite.y = enemyDyin.y + enemyDyin.height - mysprite.height;
					},300);
					enemyKilled = 1;
					break;
				}
			}
			
		}
	}
  
	function jumpPlayer(){
		if (mysprite.y > 80){
			jumpCount++;
			upButton.pressed = "true";
			pos = "up";
			move = "jump";
			
			mysprite.body.velocity.y = -80;
			mysprite.body.velocity.x = 0;
			stopScene();
			run.stop();
			jump.play();
				
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
								run.stop();
								mysprite.body.velocity.x = 0;
								mysprite.body.velocity.y = 0;
								upButton.pressed = "false";
								playerBaseLevel = "steps2";
								stepsColIndex = stepsInd;
							}
							else if ((((steps2.children[stepsInd].x + steps2.children[stepsInd].width) > mysprite.x) && (steps2.children[stepsInd].x > (mysprite.x+mysprite.width))) && (steps1.children[stepsInd].x < (mysprite.x + mysprite.width))){
								mysprite.y = steps1.children[stepsInd].y - mysprite.height;
								mysprite.body.gravity.y = 0;
								run.stop();
								mysprite.body.velocity.x = 0;
								mysprite.body.velocity.y = 0;
								upButton.pressed = "false";
								playerBaseLevel = "steps1";
							}
							else{
								
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
   
	function breakRock(){
		// rock.visible = false;
		mysprite.body.velocity.y = 0;
		mysprite.y = 260;
	}
	
	function stopPlayer(){
		if(mysprite.x <= steps1.x && mysprite.x >= steps1.x-32){
			rightMove = 0;
			// mysprite.body.velocity.y = 0;
			playerStop = 1;
		}
		if(mysprite.x >= steps1.x+steps1.width && mysprite.x <= steps1.x+steps1.width+8){
			leftMove = 0;
			// mysprite.body.velocity.y = 0;
			playerStop = 1;
		}
		
	}
	
	function diePlayer(){
		mysprite.visible=false;
	}
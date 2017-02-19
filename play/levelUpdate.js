function updateFunctions(){
	if (remLives > -1){
		if (mysprite.y  > game.height/1.75 + 5 && !pitFall){
			mysprite.y = game.height/1.75;
		}
		// if (mysprite.body.velocity.x == 0){
			// my_media.stop();
		// }
		
		checkWitchVisibility();	
		
		// checkPit();

		if (mysprite.energised == 1){
			if (move == "right"){
				mysprite.animations.play('rightEnergy');
			}
			else if (move == "left"){
				mysprite.animations.play('leftEnergy');
			}
			else if (jumpRight == "true"){
				mysprite.animations.play('rightJumpEnergy');
			}
			else{
				mysprite.animations.play('leftJumpEnergy');
			}
			
			setTimeout(function(){
				mysprite.energised = 0;
				energyComplete();
			},15000)
		}
		

		// mysprite.animations.play('right');
		if (rightButton.pressed == "true" && upButton.pressed == "true" && leftButton.pressed == "false"){
			jumpPlayerRight();
		}
		
		if (rightButton.pressed == "false" && upButton.pressed == "true" && leftButton.pressed == "true"){
			jumpPlayerLeft();
		}
		
		if(playerBaseLevel == "rock"){
			if (move == "right"){
				checkRockRight();
				// checkRockTresRight();
			}
			if (move == "left"){
				checkRockLeft();
				// checkRockTresLeft();
			}
			
		}
		
		if(playerBaseLevel == "treasure"){
			if (move == "right"){
				checkTresRight();
			}
			if (move == "left"){
				checkTresLeft();
			}
			
		}
		
		if (tresIndex > -1 && tresIndex < treasureBrick.children.length){
			if(treasureBrick.children[tresIndex].edgeRight == true && move == "right"){
				if (mysprite.x > treasureBrick.children[tresIndex].x + treasureBrick.children[tresIndex].width + 1){
					mysprite.y = ground.y - mysprite.height;
					playerBaseLevel = "ground";
				}
			}
			if(treasureBrick.children[tresIndex].edgeLeft == true && move == "left"){
				if (mysprite.x < treasureBrick.children[tresIndex].x - 1){
					mysprite.y = ground.y - mysprite.height;
					playerBaseLevel = "ground";
				}
			}
			
			if (nextElementRock = "treasureRight" && mysprite.x > (treasureBrick.children[tresIndex].x + treasureBrick.children[tresIndex].width+1) && move == "right"){
				if(tresIndex < treasureBrick.children.length-1){
					tresIndex = tresIndex + 1;
				}
				
			}
			
			if (nextElementRock = "treasureLeft" && mysprite.x < (treasureBrick.children[tresIndex].x - 1) && move == "left"){
				tresIndex = tresIndex - 1;
			}

		}
		
		if (index > -1 && index < rock.children.length){
			if(rock.children[index].edgeRight == true && move == "right"){
				if (mysprite.x > rock.children[index].x + rock.children[index].width + 1){
					mysprite.y = ground.y - mysprite.height;
					playerBaseLevel = "ground";
				}
			}
			if(rock.children[index].edgeLeft == true && move == "left"){
				if (mysprite.x < rock.children[index].x - 1){
					mysprite.y = ground.y - mysprite.height;
					playerBaseLevel = "ground";
				}
			}
			
			if (nextElementRock = "rockRight" && mysprite.x > (rock.children[index].x + rock.children[index].width+1) && move == "right"){
				if(index != 9){
					index = index + 1;
				}
				
			}
			
			if (nextElementRock = "rockLeft" && mysprite.x < (rock.children[index].x - 1) && move == "left"){
				index = index - 1;
			}

		}
		
		if ((ground.y < mysprite.y+mysprite.height) && 
		(((move == "jump" && pos == "down") || (move == "jump" && pos == "up" && (rightButton.pressed == "true" || leftButton.pressed == "true")))
		||	(move == "jump" && pos == "down" && (jumpLeft == "true" || jumpRight == "true")))){
			upButton.pressed = "false";
			mysprite.body.velocity.y = 0;
			mysprite.body.gravity.y = 0;
			mysprite.body.velocity.x = 0;
			jumpCount = 0;
		}
		
		
		if (move == "jump" ){
			for (en=0;en<enemies.children.length;en++){
				if (enemies.children[en].alive && mysprite.alive && !mysprite.dying){
					if((enemies.children[en].x-2 < mysprite.x + mysprite.width) && (enemies.children[en].y > mysprite.y+mysprite.height && enemies.children[en].y-5 < mysprite.y+mysprite.height) && enemies.children[en].x + enemies.children[en].width > mysprite.x + mysprite.width){
						mysprite.body.velocity.x = 0;
						mysprite.body.velocity.y = 0;
						
						enemies.children[en].body.velocity.y = 0;
						enemies.children[en].body.gravity.y = 0;
						
						enemyDyin = game.add.sprite(enemies.children[en].body.x,enemies.children[en].body.y + enemies.children[en].body.height - 10,'enemyDie');
						// playAudio("enemyKilled");
						enemies.children[en].kill();
						setTimeout(function(){
							enemyDyin.kill();
						},300);
						enemyKilled = 1;
						// mysprite.y = game.height/1.75;
					}
				}
				
			}
			
		}
		
		if (baseLevelChange == 1 && (move =="right" || move == "left")){
			enemyCollision();
		}
		
		rightButton.onInputDown.add(rightDown,this);
		
		leftButton.onInputDown.add(leftDown);
		upButton.onInputDown.add(jumpPlayer);
		rightButton.onInputUp.add(rightUp,this);
		leftButton.onInputUp.add(leftUp,this);
		if (upButton.pressed !="true"){
			checkGround();
		}
		
		checkGround();
		
		if (pos == "up" || (pos == "down" && move == "jump")|| collision == 1 || rockCol == 1){
			stopScene();
		}
		
		moveEnemy();
		
		for (var i = 0;i<coins.children.length;i++){
			if(coins.children[i].alive){
				coins.children[i].animations.play('spin');
			}
			
		}
		
		// // if (playerBaseLevel == "tube" || playerBaseLevel == "rock" || playerBaseLevel == "steps1" || playerBaseLevel == "steps2")
		
		// game.physics.arcade.collide(mysprite, targetBox, myspriteMysteryCollision, null, this);
		// game.physics.arcade.collide(mysprite, princess, myspriteMysteryCollision, null, this);
		// game.physics.arcade.collide(mysprite, energyBottle, myspriteEnergyCollision, null, this);
		// game.physics.arcade.collide(mysprite, enemies, myspriteEnemiesCollision, null, this);
		// game.physics.arcade.collide(enemies, obstructs, enemyObstructCollision, null, this);
		// game.physics.arcade.collide(mysprite, rock, myspriteRockCollision, null, this);
		// game.physics.arcade.collide(mysprite, treasureBrick, myspriteTreasureCollision, null, this);
		// game.physics.arcade.collide(mysprite, coins, myspriteCoinCollision, null, this);
		// game.physics.arcade.collide(mysprite, tubes, myspriteTubesCollision, null, this);
		// game.physics.arcade.collide(mysprite, steps1, myspriteSteps1Collision, null, this);
		// game.physics.arcade.collide(mysprite, steps2, myspriteSteps2Collision, null, this);
	}
}

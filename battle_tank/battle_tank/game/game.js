var x_size = 390;
var y_size = 390;
var trackAnimate = false;

// генерация игрового поля. генерить планирую в пикселях, чтобы движение было более плавным
function fieldGeneration() {
	var tank = document.createElement('div');
	tank.id = "tank";
	tank.classList.add("cannon_up","tank01");
	document.getElementById("wrap").appendChild(tank);
	return;
}

/* функция движения танчика */
function move(e) {
	let keyCode = e.keyCode;
    let tank = document.getElementById("tank");
    let partOfClass = tank.classList.item(0); //определяем первый класс блока под замену
    let x = tank.offsetLeft; //Определяем координату отступа (по оси x) от родительского элемента
	switch(e.keyCode) { //Объект события, определяющий какая клавиша нажата (В системе Unicode)
		case 37: //Код клавиши со стрелкой влево (В системе Unicode)
			tankAnimate(e);
			tank.classList.replace(partOfClass, 'cannon_left');
			if (x > 0) {
				x--; //Сдвиг на 1 пиксел влево
				tank.style.left = x + "px"; //Новое значение координаты
			}
			break;
		case 39: //Код клавиши со стрелкой вправо (В системе Unicode)
			tankAnimate(e);
			tank.classList.replace(partOfClass, 'cannon_right');
			if (x < 351) {
				x++; //Сдвиг на 1 пиксел вправо
				tank.style.left = x + "px"; //Новое значение координаты
			}
			break;
	}

	let y = tank.offsetTop; //Определяем координату отступа (по оси x) от родительского элемента
	switch(e.keyCode) { //Объект события, определяющий какая клавиша нажата (В системе Unicode)
		case 38: //Код клавиши со стрелкой вверх (В системе Unicode)
			tankAnimate(e);
			tank.classList.replace(partOfClass, 'cannon_up');
			if (y > 0) {
				y--; //Сдвиг на 1 пиксел вверх
				tank.style.top = y + "px"; //Новое значение координаты
			}
			break;
		case 40: //Код клавиши со стрелкой вправо (В системе Unicode)
			tankAnimate(e);
			tank.classList.replace(partOfClass, 'cannon_down');
			if (y < 351) {
				y++; //Сдвиг на 1 пиксел вниз
				tank.style.top = y + "px"; //Новое значение координаты
			}
			break;
	}

	switch(e.keyCode) {
		case 32:
			tankShoot(e);
	} return;
}

/*
Функция стрельбы
*/
function tankShoot(e) {
	let keyCode = e.keyCode;
	let tank = document.getElementById("tank");
	let partOfClass = tank.classList.item(0);
	var b_x = tank.offsetLeft;
	var b_y = tank.offsetTop;
	if (e.keyCode == 32) {
		switch(partOfClass) {
			case 'cannon_up':
				var playerBullet = document.createElement('div');
				playerBullet.className = "playerBullet";
				document.getElementById("wrap").appendChild(playerBullet);
				playerBullet.style.left = (b_x + 14) + "px";
				playerBullet.style.top = (b_y - 10) + "px";
				console.log(partOfClass);
				function iterate_top(i) {
				    playerBullet.style.top = i + "px";
				    if (i > 0) {
				    	console.log(i);
				        setTimeout(function() { iterate_top(i - 4); }, 10);
				        if ( i < 5) {
				        	document.getElementById("wrap").removeChild(playerBullet);
				        }
				    }
				}
				iterate_top(b_y);
			break;

			case 'cannon_left':
				var playerBullet = document.createElement('div');
				playerBullet.className = "playerBullet_left";
				document.getElementById("wrap").appendChild(playerBullet);
				playerBullet.style.left = (b_x - 12) + "px";
				playerBullet.style.top = (b_y + 13) + "px";
				console.log(partOfClass);
				function iterate_left(i) {
				    playerBullet.style.left = i + "px";
				    if (i > 0) {
				    	console.log(i);
				        setTimeout(function() { iterate_left(i - 4); }, 10);
				        if ( i < 5) {
				        	document.getElementById("wrap").removeChild(playerBullet);
				        }
				    }
				}
				iterate_left(b_x);
			break;

			case 'cannon_right':
				var playerBullet = document.createElement('div');
				playerBullet.className = "playerBullet_right";
				document.getElementById("wrap").appendChild(playerBullet);
				playerBullet.style.left = (b_x + 42) + "px";
				playerBullet.style.top = (b_y + 13) + "px";
				console.log(partOfClass);
				function iterate_right(i) {
				    playerBullet.style.left = i + "px";
				    if (i < 390) {
				    	console.log(i);
				        setTimeout(function() { iterate_right(i + 4); }, 10);
				        if ( i > 380) {
				        	document.getElementById("wrap").removeChild(playerBullet);
				        }
				    }
				}
				iterate_right(b_x);
			break;

			case 'cannon_down':
				var playerBullet = document.createElement('div');
				playerBullet.className = "playerBullet_bottom";
				document.getElementById("wrap").appendChild(playerBullet);
				playerBullet.style.left = (b_x + 14) + "px";
				playerBullet.style.top = (b_y - 10) + "px";
				console.log(partOfClass);
				function iterate_bottom(i) {
				    playerBullet.style.top = i + "px";
				    if (i < 390) {
				    	console.log(i);
				        setTimeout(function() { iterate_bottom(i + 4); }, 10);
				        if ( i > 380) {
				        	document.getElementById("wrap").removeChild(playerBullet);
				        }
				    }
				}
				iterate_bottom(b_y);
			break;
			
		}
	} return;
}


/*
Анимируем гусеницы танка
*/
function tankAnimate() {
		let animTrack = document.getElementById("tank").classList.item(1); //ищем второй класс у объекта
		if (animTrack == "tank01") { //и меняем его в зависимости от условия
				document.getElementById("tank").classList.replace(animTrack, "tank02");
			
		} else {
				document.getElementById("tank").classList.replace(animTrack, "tank01");
		}
}

document.addEventListener('keydown', move, tankShoot, tankAnimate);

// Инициализация
window.onload = fieldGeneration();
'use strict';

angular.module('pauseApp')
//Status Screen Angular Controller
.controller('StatusCtrl', ['$scope', '$timeout', 'localStorageService', 'storageLiason', 'expHandler', 'soundManager',
	function($scope, $timeout, localStorageService, storageLiason, expHandler, soundManager) {

		//Fadein effect.
		angular.element('.animate-screen').css('opacity', 0.0);
		angular.element('.animate-screen').animate({
				opacity: 1,
				'-webkit-animation-fill-mode': 'forwards'
			}, 1000, function() {});

		//Store a read-only copy of the data.
		$scope.data = storageLiason.data;

		$scope.expPercent = expHandler.getExpForLevel($scope.data.level, 
			$scope.data.exp)/expHandler.levelExp($scope.data.level);
		$scope.levelExp = Math.round(expHandler.totalMinLevelExp($scope.data.level+1));

		//Directive Styling
		$scope.genderColor = angular.element('h1').css('color');

		var birthday = new Date($scope.data.birthday);
		$scope.birthdayString = (birthday.getMonth()+1) + '/' + birthday.getDate();

		////////////////
		// TODO STUFF //
		////////////////

		//The next key for a new todo element.
		$scope.nextKey = 2;
		//We define todos as pairs of unique keys and the corresponding todo message
		//to avoid 'duplicate' errors with ng-repeat.
		$scope.todos = storageLiason.data.todos || [
			[0, 'Add todos!'], 
			[1, '']
		];
		storageLiason.setTodos($scope.todos);

		var todoForm = angular.element('.todos-inner ul');

		/*
		 * Function: setFocusTo
		 * --------------------
		 * Called by the todo list handlers.
		 * Shifts focus to the todo item given by the specific index
		 * in the $scope.todos array.
		 * Wrapped in a timeout call to avoid calling $digest during
		 * an already running digest cycle.
		 */
		var setFocusTo = function($index) {
			$timeout(function() {
				todoForm.find('.textarea').eq($index).focus();
			});
		};

		/*
		 * Function: onSubmitTodo
		 * ----------------------
		 * Invoked when submitting a todo from the input form.
		 */
		$scope.onSubmitTodo = function(todoPair, $index) {
			//
			var key = todoPair[0];
			var todo = todoPair[1];
			var active = angular.element(document.activeElement);

			if (! todo)
				$scope.removeTodo($index);
			else {
				$scope.todos[$index] = [key, todo.replace(/(&NBSP;)+/gi, '').toUpperCase()];

				if ($scope.todos.length == $index + 1)
					$scope.todos.push([$scope.nextKey++, '']);

				if ($index < $scope.todos.length-1)
					setFocusTo($index + 1);

				storageLiason.setTodos($scope.todos);
			}
		};

		/*
		 * Function: keyDown
		 * -----------------
		 * Binds up and down arrow keys to navigating the todo list,
		 * and binds the enter key to submitting a todo.
		 */
		$scope.keyDown = function(e, todo, $index) {

			//ENTER
			if (e.which == 13) {
				$scope.onSubmitTodo(todo, $index);
				e.preventDefault();
			}
			// //UP ARROW
			if (e.which == 38) {
				if ($index > 0)
					setFocusTo($index - 1);
				e.preventDefault();
			}
			// //DOWN ARROW
			if (e.which == 40) {
				setFocusTo($index + 1);
				e.preventDefault();
			}

		};

		/*
		 * Function: completeTodo
		 * ----------------------
		 */
		$scope.completeTodo = function(e, todoPair, $index) {
			var checkbox = angular.element(e.target);

			var todo = todoPair[1];
			if (todo) {
				//Update EXP.
				var expGained = Math.round(5 + Math.random()*49);
				$scope.data.exp += expGained;
				var oldLevel = $scope.data.level;
				$scope.data.level = expHandler.calculateLevel($scope.data.exp);
				$scope.expPercent = expHandler.getExpForLevel($scope.data.level, 
					$scope.data.exp)/expHandler.levelExp($scope.data.level);
				$scope.levelExp = Math.round(expHandler.totalMinLevelExp($scope.data.level+1));

				var levelUp = $scope.data.level != oldLevel;
				//Kind of hacky solution.
				if (levelUp) {
					soundManager.playSound('levelUpAudio','levelup', 500, 13000);

					var oldExpPercent = $scope.expPercent;
					$scope.expPercent = 1;
					$timeout(function() {
						$scope.expPercent = 0;
						angular.element('.expbar_fill').removeClass('expbar_transition');
						$timeout(function() {
							$scope.expPercent = oldExpPercent;
							angular.element('.expbar_fill').addClass('expbar_transition');
						}, 300);
					}, 600);
				}

				//ANIMATE EXP POINTS
				var indicatorText = angular.element('<h1>+'+ Math.round(expGained)+' EXP</h1>');
				indicatorText.css('font-size', '1.5em').css('position', 'absolute').css('top', '-23px').css('right', '0');
				checkbox.parent().append(indicatorText);
				indicatorText.animate({
					opacity: 1,
					'-webkit-animation-fill-mode': 'forwards',
					top: '-200px'
				}, 2000, function() {});
			}

			//REMOVE TODO 
			checkbox.parent().animate({
				opacity: 0,
				'webkit-animation-fill-mode': 'forwards'
			}, 1000, function() {
				checkbox.height(0);
				$scope.removeTodo($index);
			});

				
		};

		/*
		 * Function: removeTodo
		 * ----------------------
		 */
		$scope.removeTodo = function($index) {

			$scope.todos.splice($index, 1);

			if ($index > 0)
				setFocusTo($index-1);
			else
				setFocusTo($index+1);

			if ($scope.todos.length === 0)
				$scope.todos[0] = [$scope.nextKey++, ''];

			storageLiason.setTodos($scope.todos);
		};


		// setInterval(function() {
		// 	$rootScope.data.expPercent += 0.001;
		// 	if ($rootScope.data.expPercent > 1.0) {
		// 		$rootScope.data.expPercent -= 1.0;
		// 		$rootScope.data.level++;
		// 	}
		// 	if ($rootScope.data.level > 100)
		// 		$rootScope.data.level = 1;
		// 	$scope.$apply();
		// }, 15);
	}
]);
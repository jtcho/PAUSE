'use strict';

angular.module('pauseApp')
//Status Screen Angular Controller
.controller('StatusCtrl', ['$scope', 'localStorageService', 'storageLiason',
	function($scope, localStorageService, storageLiason) {

		//
		angular.element('.animate-screen').css('opacity', 0.0);
		angular.element('.animate-screen').animate({
				opacity: 1,
				'-webkit-animation-fill-mode': 'forwards'
			}, 1000, function() {});

		$scope.data = storageLiason.data;

		var birthday = new Date($scope.data.birthday);
		$scope.birthdayString = (birthday.getMonth()+1) + '/' + birthday.getDate();

		//The next key for a new todo element.
		$scope.nextKey = 2;
		//We define todos as pairs of unique keys and the corresponding todo message
		//to avoid 'duplicate' errors with ng-repeat.
		$scope.todos = [
			[0, 'Add todos!'], 
			[1, '']
		];

		var todoForm = angular.element('.todos-inner ul');

		$scope.autoGrow = function(event) {
			var oField = angular.element(event.target);
			console.log(oField.prop('scrollHeight'));
			// var scrollHeight = oField.prop('scrollHeight');
			// var clientHeight = oField.prop('clientHeight');
			// if (scrollHeight > clientHeight) {
   //  			oField.css('height', scrollHeight + 'px');
  	// 		}
  			oField.height(1).height(oField.prop('scrollHeight') );
		};

		var previousInput = function(active) {
			return active.parent().parent().prev().find('form').find('input');
		};

		var nextInput = function(active) {
			return active.parent().parent().next().find('form').find('input');
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

			if (! todo) {
				$scope.todos.splice($index, 1);

				var active = angular.element(document.activeElement);

				if ($index > 0)
					previousInput(active).focus();
				else
					nextInput(active).focus();

				if ($scope.todos.length === 0) {
					$scope.todos[0] = [$scope.nextKey++, ''];
				}
			}
			else {
				$scope.todos[$index] = [key, todo.toUpperCase()];
				if ($scope.todos.length == $index + 1) {
					$scope.todos.push([$scope.nextKey++, '']);
				}

				if ($index < $scope.todos.length-1) {
					setTimeout(function() {	//Kind of cheap, not sure how to get a 'promise' to the third element.
						var inputs = todoForm.find('form').find('input');
						inputs.eq($index + 1).focus();
					}, 500);
				}
			}
		};

		/*
		 * Binds up and down arrow keys to navigating the todo list.
		 */
		todoForm.keydown(function(e) {
			//up38 right 39 down 40 left 37
			var active = angular.element(document.activeElement);

			if (e.which == 38) {
				active.parent().parent().prev().find('form').find('input').focus();
				e.preventDefault();
			}
			if (e.which == 40) {
				active.parent().parent().next().find('form').find('input').focus();
				e.preventDefault();
			}

		});


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
])
//Custom Directive for QTip2 Tooltips
.directive('tooltip', function() {
	return function(scope, element, attrs) {
		element.qtip({
	    	style: {
	    		classes: 'qtip-dark tooltip-center'
	    	},
	        content: {
	        	text: function(event, api) {
	        		// return Math.round(angular.element(this).attr('tooltip-content'))+'%' || '';
	        		return angular.element(this).attr('tooltip-content') || '';
	        	}
	        },
	        position: {
	        	target: 'mouse',
	        	adjust: {
	        		x:10,
	        		y:20,
	        		mouse: true
	        	}
	        }
	 	});
	};
})
;
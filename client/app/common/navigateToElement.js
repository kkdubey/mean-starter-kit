(function () {
	'use strict';
	focusFactory.$inject = ['$timeout', '$window'];
	angular.module('app').factory('focus', focusFactory);

	function focusFactory($timeout, $window) {
		return function (id) {
			$timeout(function () {
				var element = $window.document.getElementById(id);
				if (element)
					element.focus();
			});
		};
	}
})();
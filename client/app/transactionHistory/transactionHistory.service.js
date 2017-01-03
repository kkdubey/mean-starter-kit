(function () {
	'use strict';
	angular.module("app").factory('transactionHistoryService', [
        'apiHelper',
        function (apiHelper) {
		return {
			getTransactionsByType: _getTransactionsByType,
			};

		function _getTransactionsByType(transactionType) {
			var url = '/api/getTransactionByTransactionType?type=' + transactionType,
			config = { headers: {} };
			return apiHelper.get(url, config);
		}

        }
	]);
})();
(function () {
	'use strict';

	angular.module("app").factory('apiHelper', ['$http', '$q', function ($http, $q) {
		function processRequest(verb, uri, data, config) {
			var deferred = $q.defer(),
                httpArgs = [uri],
                defaultHeaders = {
					'Accept': 'application/json',
					'Accept-Language': 'en-US',
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache'
                };

			var _config = {};
			_config['headers'] = defaultHeaders;

			verb = verb.toLowerCase();
			if (verb.match(/post|put/))
				httpArgs.push(data);

			if (config) {
				_config['cache'] = config.cache && config.cache === true ? true : false;
				if (config.headers) {
					angular.forEach(config.headers, function (value, key) {
						_config.headers[key] = value;
					});
				}
			}

			httpArgs.push(_config);

			$http[verb].apply(null, httpArgs)
                .success(function (data, status, header, config) { deferred.resolve(data); })
                .error(function (data, status, header, config) {
					deferred.reject(data);
                })
                ['finally'](function () { }); // disable eslint

			return deferred.promise;
		}

		return {
			get: function (uri, config) {
				return processRequest('get', uri, null, config);
			},
			post: function (uri, data, config) {
				return processRequest('post', uri, data, config);
			},
			put: function (uri, data, config) {
				return processRequest('put', uri, data, config);
			},
			delete: function (uri, config) {
				return processRequest('delete', uri, config)
			}
		};

	}]);
})();
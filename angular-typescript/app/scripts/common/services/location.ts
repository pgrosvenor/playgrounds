'use strict';

module playgrounds.common.service {

  export interface ILocationService {
    get(): angular.IPromise<playgrounds.common.model.ICoordinate>;
  }

  class LocationService implements ILocationService {

    public static $inject = ['$window', '$q'];

    private promise: angular.IPromise<playgrounds.common.model.ICoordinate>;

    constructor(private $window: angular.IWindowService, private $q: angular.IQService) {
      this.promise = $q((resolve, reject) => {
        if ($window.navigator.geolocation) {
          $window.navigator.geolocation.getCurrentPosition((position: Position) => {
            console.log('Got current position', position.coords);
            resolve(new playgrounds.common.model.Coordinate(position.coords.latitude, position.coords.longitude));
          }, () => {
            reject('Unable to get current position');
          });
        } else {
          reject('geolocation is not supported by the browser');
        }
      });
    }

    public get(): angular.IPromise<playgrounds.common.model.ICoordinate> {
      return this.promise;
    }
  }

  angular.module('playgrounds')
    .service('location', LocationService);

}

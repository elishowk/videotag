/*global define*/

define(['backbone'], function (Backbone) {
  'use strict';

  return Backbone.Tastypie.Model.extend({
    'urlRoot': require.appConfig.poserApiUrl + 'page/',
  });
});

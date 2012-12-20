/*global define*/

define([
  'backbone',
  './model'
], function (Backbone, Model) {
  'use strict';

  return Backbone.Tastypie.Collection.extend({
    'model': Model,
    'urlRoot': require.appConfig.poserApiUrl + '/user'
  });
});

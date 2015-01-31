/// <reference path="../../definitions/handlebars/handlebars.d.ts" />
/// <reference path="../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../definitions/easeljs/easeljs.d.ts" />
/// <reference path="../../definitions/js-signals/js-signals.d.ts" />
/// <reference path="./HandlebarsTemplates.ts" />

/// <reference path="com/spacewarsts/SpaceWarsGame.ts" />

import SpaceWarsGame= com.spacewarsts.SpaceWarsGame;

$(function() {
	var game= new SpaceWarsGame();
	game.start();
});
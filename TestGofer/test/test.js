var assert = require('assert');
var attributeMissions = require('../missionsMasseurs.js').attributeMissions;
var initMasseurs = require('../missionsMasseurs.js').initMasseurs;
var initStandard = require('../missionsMasseurs.js').initStandard;

describe('Missions Masseurs', function() {
	describe('Attribute Missions', function() {

		it('recoit un tableau vide', function() {
			initMasseurs();
			var missions = [];

			var instructionsMasseurs = attributeMissions(missions);

			for (var i = 1; i <= 50; i++) {
				assert.equal(0, instructionsMasseurs[i]['x']);
				assert.equal(0, instructionsMasseurs[i].y);

			}
		});

		it('recoit une premiere mission un masseur se deplace', function () {
			initMasseurs();
			var missions = [ {start: 1, length: 1, x: 1, y: 1}];

			var instructionsMasseurs = attributeMissions(missions);

			assert.equal(1, instructionsMasseurs[1].x);
			assert.equal(1, instructionsMasseurs[1].y);
		})

		it('attend sur place le début de la mission', function () {
			initMasseurs();
			var mission1 = [{start: 25, length: 5, x: 1, y: 1}];
			var instructionsMasseurs = attributeMissions(mission1);

			var mission2 = [{start: 700, length: 5, x: 2, y: 2}];
			instructionsMasseurs = attributeMissions(mission2);

			var mission3 = [{start: 900, length: 5, x: 3, y: 3}];
			instructionsMasseurs = attributeMissions(mission3);

			assert.equal(1, instructionsMasseurs[1].x);
			assert.equal(1, instructionsMasseurs[1].y);
		})

		it('doit rester le temps d\'un massage', function(){
			initMasseurs();
			var mission = [ {start: 0, length: 6, x: 1, y: 1} ];
			var instructionsMasseurs = attributeMissions(mission);

			assert.equal(1, instructionsMasseurs[1].x);
			assert.equal(1, instructionsMasseurs[1].y);

			mission = [ {start: 5, length: 6, x: 7, y: 3} ];
			instructionsMasseurs = attributeMissions(mission);

			assert.equal(1, instructionsMasseurs[1].x);
			assert.equal(1, instructionsMasseurs[1].y);

		});
	});

	describe('Standard', function() {

		it('ordonne les missions', function(){
			var standard = initStandard();

			var missions = [ 
							 {start: 10, length: 6, x: 7, y: 3},
							 {start: 5, length: 6, x: 7, y: 3},
							 {start: 25, length: 6, x: 7, y: 3}
							 ];
			console.log(standard)
			standard.recoit(missions);
			var agendaAttendu = [ 
							 	  {start: 5, length: 6, x: 7, y: 3},
							 	  {start: 10, length: 6, x: 7, y: 3},
							 	  {start: 25, length: 6, x: 7, y: 3}
							 	  ];

			assert.equal(JSON.stringify(agendaAttendu), JSON.stringify(standard.agenda));
		})
	});
});

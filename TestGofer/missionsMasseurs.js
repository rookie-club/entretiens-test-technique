var instructionsMasseurs = initialiseLes50Masseurs();

function initialiseLes50Masseurs() {
	var instructionsMasseurs = {};
	// la production impose que le premier masseur soit 1
	for (var i = 1; i <= 50; i++) {
    	instructionsMasseurs[i] = {
    		x: 0,
    	 	y: 0,
    	 	dureeRestanteMission: 0,
    	};
	}
	return instructionsMasseurs;
}

var standard = initialiseLeStandard();

function initialiseLeStandard() {
		var standard = {
			agenda:[],
			recoit : function(missions){
				this.agenda = Object.assign(missions);
				this.agenda.sort(function(a,b){return a.start - b.start});
				return this.agenda;
			}
	};
	return standard; 
}

var minutesEntre2Appels = 5;


function attributeMissions(missions) {


	if (laMissionNEstPasTerminee(1)) {
		instructionsMasseurs[1].dureeRestanteMission -= minutesEntre2Appels;
	}

	for (mission of missions) {
		if (leMasseurEstDisponible(1)) {
      		instructionsMasseurs[1].x = mission.x;
      		instructionsMasseurs[1].y = mission.y;
      		instructionsMasseurs[1].dureeRestanteMission = mission.start + mission.length
  		}
	}

	return instructionsMasseurs
}

function laMissionNEstPasTerminee (numero) {
	return instructionsMasseurs[numero].dureeRestanteMission >= minutesEntre2Appels 
}

function leMasseurEstDisponible (numero) {
	return instructionsMasseurs[numero].dureeRestanteMission <= 0
}

var standard = {

	prochaine:function(){
	}	
}

module.exports.attributeMissions = attributeMissions;
module.exports.initMasseurs = function () { 
  return instructionsMasseurs = initialiseLes50Masseurs();
}
module.exports.initStandard = function () {
  return standard = initialiseLeStandard();
};
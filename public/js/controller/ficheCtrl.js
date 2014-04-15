function ficheCtrl($scope){

	// recuperation de la liste des inscrits
	$scope.participants = [{
		nom: 'COURT',
		prenom: 'philippe',
		age: '28',
		sexe: 'M',
	},{
		nom: 'COURT',
		prenom: 'Laurence',
		age: '25',
		sexe: 'S',
	},{
		nom: 'COURT',
		prenom: 'Marina',
		age: '30',
		sexe: 'S',
	},{
		nom: 'RICHARDS',
		prenom: 'Denise',
		age: '30',
		sexe: 'S',
	}]

	// evenement courant
	/*
	$scope.evenement = {
		title: 'Evenement de test',
		description: 'Description de mon evenement 
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
		Aliquam, neque, suscipit, laudantium totam et adipisci repudiandae 
		officia accusamus optio ipsam ipsum in voluptatum incidunt sit provident 
		natus necessitatibus quibusdam ipsa.',
		is_public: true,
		categorie: 'politique'
	};
	*/
}
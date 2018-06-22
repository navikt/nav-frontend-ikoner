function getAllTeams() {
	return fetch("api/teams").then(res => res.json());
}

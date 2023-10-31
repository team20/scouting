import { AutoInfo } from "./auto-bar";
import { EndScreen } from "./end-screen";
import { GamePieceGrid } from "./grid";
import { MatchInfo } from "./main-element";
import { TeleopInfo } from "./teleop-info";

export function combineData() {
	let matchInfo = (document.getElementById("matchInfo") as MatchInfo).getInfo();
	let autoScoring = (
		document.getElementById("autoScoringInfo") as GamePieceGrid
	).getScoringInfo();
	let autoInfo = (document.getElementById("autoInfo") as AutoInfo).getInfo();
	let teleopScoring = (
		document.getElementById("teleopScoringInfo") as GamePieceGrid
	).getScoringInfo();
	let teleopInfo = (
		document.getElementById("teleopInfo") as TeleopInfo
	).getInfo();
	let endInfo = (document.getElementById("endInfo") as EndScreen).getInfo();
	console.log(matchInfo);
	console.log(autoInfo);
	console.log(teleopInfo);
	console.log(endInfo);
}

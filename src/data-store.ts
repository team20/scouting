import { AutoInfo } from "./auto-info";
import { EndScreen } from "./end-screen";
import { GamePieceGrid } from "./grid";
import { MatchInfo } from "./match-info";
import { TeleopInfo } from "./teleop-info";

let matchScreen = document.getElementById("matchInfo")! as MatchInfo;
let autoGrid = document.getElementById("autoScoringInfo")! as GamePieceGrid;
let autoInfoBar = document.getElementById("autoInfo")! as AutoInfo;
let teleopGrid = document.getElementById("teleopScoringInfo")! as GamePieceGrid;
let teleopInfoBar = document.getElementById("teleopInfo")! as TeleopInfo;
let endScreen = document.getElementById("endInfo")! as EndScreen;
export function combineData(): string {
	let matchInfo = matchScreen.getInfo();
	let autoScoring = autoGrid.getScoringInfo();
	let autoInfo = autoInfoBar.getInfo();
	let teleopScoring = teleopGrid.getScoringInfo();
	let teleopInfo = teleopInfoBar.getInfo();
	let endInfo = endScreen.getInfo();
	let autoGridList = "";
	for (let i = 0; i < autoScoring.high.length; i++) {
		if (autoScoring.high[i] === "None") {
			autoGridList += `true\t`;
		} else {
			autoGridList += `false\t`;
		}
	}
	for (let i = 0; i < autoScoring.middle.length; i++) {
		if (autoScoring.middle[i] === "None") {
			autoGridList += `true\t`;
		} else {
			autoGridList += `false\t`;
		}
	}
	for (let i = 0; i < autoScoring.low.length; i++) {
		autoGridList += `${autoScoring.low[i]}\t`;
	}
	let teleopGridList = "";
	for (let i = 0; i < teleopScoring.high.length; i++) {
		if (teleopScoring.high[i] === "None") {
			teleopGridList += `true\t`;
		} else {
			teleopGridList += `false\t`;
		}
	}
	for (let i = 0; i < teleopScoring.middle.length; i++) {
		if (teleopScoring.middle[i] === "None") {
			teleopGridList += `true\t`;
		} else {
			teleopGridList += `false\t`;
		}
	}
	for (let i = 0; i < teleopScoring.low.length; i++) {
		teleopGridList += `${teleopScoring.low[i]}\t`;
	}
	return `${matchInfo.name}	${matchInfo.matchType}	${matchInfo.matchNum}	${matchInfo.isReplay}	${matchInfo.alliance}	${matchInfo.startingPosition}	${matchInfo.teamNum}	${matchInfo.preload}	${autoGridList}${autoInfo.conesDropped}	${autoInfo.cubesDropped}	${autoInfo.mobility}	${autoInfo.attemptedEndgame}	${autoInfo.actualEndgame}	${teleopGridList}${teleopInfo.conesDropped}	${teleopInfo.cubesDropped}	${teleopInfo.fouls}	${teleopInfo.techFouls}	${teleopInfo.attemptedEndgame}	${teleopInfo.actualEndgame}	${endInfo.defenseQualityFaced}	${endInfo.defenseQuantityFaced}	${endInfo.defenseQualityPlayed}	${endInfo.defenseQuantityPlayed}	${endInfo.breakdown}	${endInfo.chargeStationClimbTime}	${endInfo.chargeStationSide}	comments: ${endInfo.comments}	`;
}
export function resetSession(isSameScouter: boolean) {
	matchScreen.reset(isSameScouter);
}

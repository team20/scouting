import { AutoInfo } from "./auto-info";
import { EndScreen } from "./end-screen";
import { GamePieceGrid } from "./grid";
import { MatchInfo } from "./match-info";
import { NodeButton } from "./node-button";
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
		if (autoScoring.high[i] === NodeButton.pieceOptions[2]) {
			autoGridList += "false|";
		} else {
			autoGridList += "true|";
		}
	}
	for (let i = 0; i < autoScoring.middle.length; i++) {
		if (autoScoring.middle[i] === NodeButton.pieceOptions[2]) {
			autoGridList += "false|";
		} else {
			autoGridList += "true|";
		}
	}
	for (let i = 0; i < autoScoring.low.length; i++) {
		autoGridList += `${autoScoring.low[i]}|`;
	}
	let teleopGridList = "";
	for (let i = 0; i < teleopScoring.high.length; i++) {
		if (teleopScoring.high[i] === NodeButton.pieceOptions[2]) {
			teleopGridList += "false|";
		} else {
			teleopGridList += "true|";
		}
	}
	for (let i = 0; i < teleopScoring.middle.length; i++) {
		if (teleopScoring.middle[i] === NodeButton.pieceOptions[2]) {
			teleopGridList += "false|";
		} else {
			teleopGridList += "true|";
		}
	}
	for (let i = 0; i < teleopScoring.low.length; i++) {
		teleopGridList += `${teleopScoring.low[i]}|`;
	}
	return `${matchInfo.name}|${matchInfo.matchType}|${matchInfo.matchNum}|${matchInfo.isReplay}|${matchInfo.alliance}|${matchInfo.startingPosition}|${matchInfo.teamNum}|${matchInfo.preload}|${autoGridList}${autoInfo.conesDropped}|${autoInfo.cubesDropped}|${autoInfo.mobility}|${autoInfo.attemptedEndgame}|${autoInfo.actualEndgame}|${teleopGridList}${teleopInfo.conesDropped}|${teleopInfo.cubesDropped}|${teleopInfo.fouls}|${teleopInfo.techFouls}|${teleopInfo.attemptedEndgame}|${teleopInfo.actualEndgame}|${endInfo.defenseQualityFaced}|${endInfo.defenseQuantityFaced}|${endInfo.defenseQualityPlayed}|${endInfo.defenseQuantityPlayed}|${endInfo.breakdown}|${endInfo.chargeStationClimbTime}|${endInfo.chargeStationSide}|${endInfo.comments}|`;
}
export function getMatchInfo() {
	return matchScreen.getInfo();
}
export function resetSession(isSameScouter: boolean) {
	matchScreen.reset(isSameScouter);
	autoGrid.reset();
	autoInfoBar.reset();
	teleopGrid.reset();
	teleopInfoBar.reset();
	endScreen.reset();
}

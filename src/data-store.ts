import { AutoInfo } from "./auto-info";
import { EndScreen } from "./end-screen";
import { GamePieceGrid } from "./grid";
import { MatchInfo } from "./match-info";
import { NodeButton } from "./node-button";
import { TeleopInfo } from "./teleop-info";

// Open database
let dbRequest = window.indexedDB.open("db");
let db: IDBDatabase;
dbRequest.addEventListener("success", () => {
	db = dbRequest.result;
});
dbRequest.addEventListener("error", () => {
	alert(
		"DATABASE COULD NOT BE OPENED! PLEASE CONTACT A SCOUTER BEFORE PROCEEDING"
	);
});
dbRequest.addEventListener("upgradeneeded", (e) => {
	// @ts-ignore
	db = e.target.result;
	db.createObjectStore("scoutingData");
});
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
/**
 * Stores data in IndexedDB.
 * @param data The data to store
 * @param key The key to store the data under
 */
export function storeData(data: string, key: string) {
	db
		.transaction("scoutingData", "readwrite")
		.objectStore("scoutingData")
		.put(data, key).onerror = () => {
		alert("Data could not be saved to database. Notify a scouter");
	};
}
/**
 * Removes all data in IndexedDB.
 */
export function removeData() {
	db.transaction("scoutingData", "readwrite")
		.objectStore("scoutingData")
		.clear();
}
/**
 * Gets all the data stored in IndexedDB.
 * @returns A promise returning an array of string data
 */
export function getData(): Promise<string[]> {
	return new Promise((resolve, reject) => {
		const readRequest = db
			.transaction("scoutingData", "readonly")
			.objectStore("scoutingData")
			.getAll();
		readRequest.addEventListener("success", () => {
			resolve(readRequest.result);
		});
		readRequest.addEventListener("success", () => {
			reject(readRequest.result);
		});
	});
}

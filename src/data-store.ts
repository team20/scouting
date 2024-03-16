import { AutoInfo } from "./auto-info";
import { EndScreen } from "./end-screen";
import { MatchInfo } from "./match-info";
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
let autoInfoBar = document.getElementById("autoInfo")! as AutoInfo;
let teleopInfoBar = document.getElementById("teleopInfo")! as TeleopInfo;
let endScreen = document.getElementById("endInfo")! as EndScreen;

/**
 * Returns whether or not all the fields are valid.
 * Use this to force scouters to fill out fields properly.
 *
 * If there was a breakdown and no comments, this returns false.
 * @returns If all the fields are valid.
 */
export function allFieldsValid(): boolean {
	return (
		endScreen.getInfo().comments !== "No comment." ||
		endScreen.getInfo().breakdown == 0
	);
}
export function combineData(): string {
	let matchInfo = matchScreen.getInfo();
	let autoInfo = autoInfoBar.getInfo();
	let teleopInfo = teleopInfoBar.getInfo();
	let endInfo = endScreen.getInfo();

	var matchTypeNum =
		matchInfo.matchType == "PRAC" ? 0 : matchInfo.matchType == "QUAL" ? 1 : 2;

	return (
		`${matchInfo.name}\t${matchTypeNum}\t${matchInfo.matchNum}\t${matchInfo.isReplay}\t${matchInfo.alliance}\t${matchInfo.teamNum}\t${matchInfo.startingPosition}\t` +
		`${autoInfo.speakerNum}\t${autoInfo.speakerNumMiss}\t${autoInfo.ampNum}\t${autoInfo.ampNumMiss}\t${autoInfo.notesDroppedCounter}\t${autoInfo.toggleLeft}\t` +
		`${teleopInfo.speakerNum}\t${teleopInfo.speakerNumMiss}\t${teleopInfo.ampNum}\t${teleopInfo.ampNumMiss}\t${teleopInfo.notesDroppedCounter}\t${teleopInfo.foulCounter}\t${teleopInfo.techCounter}\t` +
		`${endInfo.trapAttempted}\t${endInfo.trapResult}\t${
			endInfo.climbAttempted
		}\t${endInfo.climbResult}\t${endInfo.park}\t${endInfo.harmony}\t${
			endInfo.breakdown
		}\t${endInfo.defensePlayed}\t${endInfo.defenseFaced}\t${
			endInfo.comments
		}\t${new Date().valueOf()}`
	);
}
export function getMatchInfo() {
	return matchScreen.getInfo();
}
export function resetSession(isSameScouter: boolean) {
	matchScreen.reset(isSameScouter);
	autoInfoBar.reset();
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
		readRequest.addEventListener("error", () => {
			reject(readRequest.result);
		});
	});
}

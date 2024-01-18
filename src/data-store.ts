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

export function combineData(): string {
	let matchInfo = matchScreen.getInfo();
	let autoInfo = autoInfoBar.getInfo();
	let teleopInfo = teleopInfoBar.getInfo();
	let endInfo = endScreen.getInfo();

	var matchTypeNum =
		matchInfo.matchType == "PRAC" ? 0 : matchInfo.matchType == "QUAL" ? 1 : 2;

	return (
		`${matchInfo.name};${matchTypeNum};${matchInfo.matchNum};${matchInfo.isReplay};${matchInfo.alliance};${matchInfo.teamNum};${matchInfo.startingPosition};` +
		`${autoInfo.speakerNum};${autoInfo.ampNum};${autoInfo.notesDroppedCounter};${autoInfo.toggleLeft};` +
		`${teleopInfo.speakerNum};${teleopInfo.ampNum};${teleopInfo.notesDroppedCounter};${teleopInfo.foulCounter};${teleopInfo.techCounter};` +
		`${endInfo.trapAttempted};${endInfo.trapResult};${endInfo.climbAttempted};${endInfo.climbResult};${endInfo.park};${endInfo.harmony};${endInfo.breakdown};${endInfo.comments}`
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
		readRequest.addEventListener("success", () => {
			reject(readRequest.result);
		});
	});
}

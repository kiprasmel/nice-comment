#!/usr/bin/env ts-node-dev

import { expectToError, runMany } from "jest-sucks";

import { joinWithDeep, toComment } from "../nice-comment";

runMany([
	[
		"joinWithDeep",
		// TODO TS
		// @ts-expect-error
		joinWithDeep(" ", "")(["ayy", ["l", "m", "a", "o"]]),
		`ayy lmao`,
	],
]);

expectToError(() => {
	// @ts-expect-error
	joinWithDeep(" ", "")(["ayy", ["l", "m", "a", "o", ["kek"]]]);
});

expectToError(() => {
	// @ts-expect-error
	joinWithDeep(" ", "")(["ayy", ["l", "m", "a", "o", ["yeet"]]]);
});

expectToError(() => {
	// @ts-expect-error
	toComment(["ayy", ["l", "m", "a", "o", ["yeet", ["1337"]]]]);
});

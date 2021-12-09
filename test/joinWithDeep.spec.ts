#!/usr/bin/env ts-node-dev

import { runMany } from "jest-sucks";
import { joinWithDeep } from "../nice-comment";

runMany([
	[
		"joinWithDeep",
		// TODO TS
		// @ts-expect-error
		joinWithDeep(" ", "")(["ayy", ["l", "m", "a", "o"]]),
		`ayy lmao`,
	],
]);

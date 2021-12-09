#!/usr/bin/env ts-node-dev

import { runMany, expectToError } from "jest-sucks";

import { joinWithDeep, toSentence, toParagraph, toComment } from "../nice-comment";

runMany([
	[
		`joinWithDeep("") <=> toSentence`, //
		toSentence(["ayy", "lmao"]),
		joinWithDeep("")(["ayy", "lmao"]),
	],
	[
		`joinWithDeep(" ", "") <=> toParagraph`, //
		toParagraph(["what's good", ["ayy", "lmao"]]),
		joinWithDeep(" ", "")(["what's good", ["ayy", "lmao"]]),
	],
	[
		`joinWithDeep("\\n\\n", " ", "") <=> toComment`, //
		toComment(["nothing much", ["what's good", ["ayy", "lmao"]]]),
		joinWithDeep("\n\n", " ", "")(["nothing much", ["what's good", ["ayy", "lmao"]]]),
	],
]);

expectToError(() => {
	throw new Error();
});

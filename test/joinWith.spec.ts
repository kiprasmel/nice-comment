#!/usr/bin/env ts-node-dev

import { expectToError, runMany } from "jest-sucks";
import { joinWith, joinWithIncludingFirst, joinWithIncludingLast, joinWithIncludingFirstLast } from "../nice-comment";

runMany([
	[
		"joinWith \\n", //
		joinWith("\n")(["wow", "very", "nice"]),
		`\
wow
very
nice`,
	],
	[
		"joinWithIncludingFirst", //
		joinWith("\n", 1)(["a", "b", "c"]),
		joinWithIncludingFirst("\n")(["a", "b", "c"]),
	],
	[
		"joinWithIncludingLast", //
		joinWith("\n", 2)(["a", "b", "c"]),
		joinWithIncludingLast("\n")(["a", "b", "c"]),
	],
	[
		"joinWithIncludingFirstLast", //
		joinWith("\n", 3)(["a", "b", "c"]),
		joinWithIncludingFirstLast("\n")(["a", "b", "c"]),
	],
	[
		"joinWith deep v1",
		joinWith("\n", joinWith(" "))(["sentence 1", ["part 1", "part 2"]]),
		`\
sentence 1
part 1 part 2\
`,
	],
	[
		"joinWith deep v2",
		joinWith(
			"\n",
			joinWith(" ", joinWith(""))
		)(["sentence 1", ["part 1", "part 2", ["p", "a", "r", "t", " ", "3"]]]),
		`\
sentence 1
part 1 part 2 part 3\
`,
	],
]);

expectToError(
	// @ts-expect-error
	joinWith(" ")("ayy lmao")
);
// 	"should eventually fail when we exclude the single item (TODO TS)", //
// 	`ayy lmao`,
// ],

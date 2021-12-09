#!/usr/bin/env ts-node-dev

import { runMany } from "jest-sucks";
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
]);

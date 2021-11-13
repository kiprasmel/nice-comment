#!/usr/bin/env ts-node-dev

import { toComment } from "../nice-comment";

const c = toComment([
	`paragraph 1`,
	[
		`p2 sentence 1.`, //
		`p2 sentence 2.`,
		`p2 sentence 3.`,
	],
	`paragraph 3`,
]);

const expected = `\
paragraph 1

p2 sentence 1. p2 sentence 2. p2 sentence 3.

paragraph 3\
`;

console.log({
	"c === expected": c === expected,
	c,
	expected,
});

if (c !== expected) process.exit(1);

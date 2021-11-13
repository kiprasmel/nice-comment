#!/usr/bin/env ts-node-dev

import { toComment } from "../nice-comment";

const c = toComment([
	`paragraph 1`, //
	`paragraph 2`,
	`paragraph 3`,
]);

const expected = `\
paragraph 1

paragraph 2

paragraph 3\
`;

console.log({
	"c === expected": c === expected,
	c,
	expected,
});

if (c !== expected) process.exit(1);

#!/usr/bin/env ts-node-dev

import { runMany } from "jest-sucks";

import { toComment, toParagraph, toSentence } from "../nice-comment";

runMany([
	[
		"works with toComment L1",
		toComment([
			`paragraph 1`, //
			`paragraph 2`,
			`paragraph 3`,
		]),

		`\
paragraph 1

paragraph 2

paragraph 3\
`,
	],

	[
		"works with toComment L1 + L2",
		toComment([
			`paragraph 1`,
			[
				`p2 sentence 1.`, //
				`p2 sentence 2.`,
				`p2 sentence 3.`,
			],
			`paragraph 3`,
		]),

		`\
paragraph 1

p2 sentence 1. p2 sentence 2. p2 sentence 3.

paragraph 3\
`,
	],

	[
		"works with toComment L1 + toParagraph L2",
		toComment([
			`paragraph 1`,
			toParagraph([
				`p2 sentence 1.`, //
				`p2 sentence 2.`,
				`p2 sentence 3.`,
			]),
			`paragraph 3`,
		]),

		`\
paragraph 1

p2 sentence 1. p2 sentence 2. p2 sentence 3.

paragraph 3\
`,
	],

	[
		"works with toComment L1 + L2 + L3",
		toComment([
			`paragraph 1`,
			[
				`p2 sentence 1.`,
				[
					`p2 s2 part 1 (`, //
					`p2 s2 part 2`,
					`) p2 s2 part 3.`,
				],
				`p2 sentence 3.`,
			],
			`paragraph 3`,
		]),

		`\
paragraph 1

p2 sentence 1. p2 s2 part 1 (p2 s2 part 2) p2 s2 part 3. p2 sentence 3.

paragraph 3\
`,
	],

	[
		"works with toComment L1 + toParagraph L2 + toSentence L3",
		toComment([
			`paragraph 1`,
			toParagraph([
				`p2 sentence 1.`,
				toSentence([
					`p2 s2 part 1 (`, //
					`p2 s2 part 2`,
					`) p2 s2 part 3.`,
				]),
				`p2 sentence 3.`,
			]),
			`paragraph 3`,
		]),

		`\
paragraph 1

p2 sentence 1. p2 s2 part 1 (p2 s2 part 2) p2 s2 part 3. p2 sentence 3.

paragraph 3\
`,
	],

	[
		"works with toComment L1 + L2 + L3, L3 from a variable",
		((part2 = `p2 s2 part 2`): string =>
			toComment([
				`paragraph 1`,
				[
					`p2 sentence 1.`,
					`p2 s2 part 1`,
					[
						`(`, //
						part2,
						`)`,
					],
					`p2 s2 part 3.`,
					`p2 sentence 3.`,
				],
				`paragraph 3`,
			]))(),
		`\
paragraph 1

p2 sentence 1. p2 s2 part 1 (p2 s2 part 2) p2 s2 part 3. p2 sentence 3.

paragraph 3\
`,
	],
]);

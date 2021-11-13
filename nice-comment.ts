/* eslint-disable indent */

type Predicate = (item: string) => string;

export const quote: Predicate = (item) => `"${item}"`;

export const tick: Predicate = (item) => "`" + item + "`";

/**
 * item => `"item"`
 *
 * named by the way you would read it in code
 *
 * (you probably want this)
 */
export const tickQuote: Predicate = (item) => [item].map(quote).map(tick)[0];

/**
 * item => "`item`"
 *
 * named by the way you would read it in code
 *
 * (you probably want the other one)
 */
export const quoteTick: Predicate = (item) => [item].map(tick).map(quote)[0];

export const bracket: Predicate = (item) => "[" + item + "]";

export const parens = (prefixInside: string, mid: string, postfixOutside: string = "", midPredicate = tick): string =>
	"(" + prefixInside + " " + midPredicate(mid) + ")" + postfixOutside;

export const toPrettyArr = (arr: string[] = [], predicate: Predicate = quote, ret: string = ""): string => (
	(ret = arr.map(predicate).join(", ")), //
	(ret = bracket(ret)),
	ret
);

/**
 * 1st level array - joining with double newlines `"\n\n"`
 *
 * ```ts
 * toComment([
 *   `paragraph 1`,
 *   `paragraph 2`,
 *   `paragraph 3`,
 * ])
 *
 * =>
 *
 * `
 * paragraph1
 *
 * paragraph2
 *
 * paragraph3
 * `
 * ```
 *
 * ---
 *
 * 2nd level array - joining with spaces `" "`
 *
 * ```ts
 * toComment([
 *   `paragraph 1`,
 *   [
 *      `p2 sentence 1.`,
 *      `p2 sentence 2.`,
 *      `p2 sentence 3.`,
 *   ],
 *   `paragraph 3`,
 * ])
 *
 * =>
 *
 * `
 * paragraph1
 *
 * p2 sentence 1. p2 sentence 2. p2 sentence 3.
 *
 * paragraph 3
 * `
 * ```
 *
 * ---
 *
 * 3rd level array - joining with nothing `""`
 *
 * ```ts
 * toComment([
 *    `paragraph 1`,
 *    [
 *       `p2 sentence 1.`,
 *       [
 *          `p2 s2 part 1 (`,
 *          `p2 s2 part 2`,
 *          `) p2 s2 part 3.`,
 *       ],
 *       `p2 sentence 3.`,
 *    ],
 *    `paragraph 3`,
 * ])
 *
 * =>
 *
 * `
 * paragraph 1
 *
 * p2 sentence 1. p2 s2 part 1 (p2 s2 part 2) p2 s2 part 3. p2 sentence 3.
 *
 * paragraph 3
 * `
 *
 * ```
 *
 * same as
 *
 * ```ts
 * const part2 = `p2 s2 part 2`
 *
 * toComment([
 *    `paragraph 1`,
 *    [
 *       `p2 sentence 1.`,
 *       `p2 s2 part 1`,
 *       [
 *          `(`,
 *           part2,
 *          `)`,
 *       ],
 *       `p2 s2 part 3.`,
 *       `p2 sentence 3.`,
 *    ],
 *    `paragraph 3`,
 * ])
 *
 * =>
 *
 * `
 * paragraph 1
 *
 * p2 sentence 1. p2 s2 part 1 (p2 s2 part 2) p2 s2 part 3. p2 sentence 3.
 *
 * paragraph 3
 * `
 * ```
 *
 */
export const toComment = (
	paragraphs: Array<
		| string //
		| Array<
				| string //
				| Array<
						string //
				  >
		  >
	>
): string =>
	paragraphs //
		.map((sentences) =>
			Array.isArray(sentences)
				? sentences //
						.map((parts) =>
							Array.isArray(parts)
								? parts //
										.join("")
								: parts
						)
						.join(" ")
				: sentences
		)
		.join("\n\n");

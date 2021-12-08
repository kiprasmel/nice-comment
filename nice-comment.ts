/* eslint-disable indent */

type Predicate = (item: string) => string;

export const quote: Predicate = (item) => `"${item}"`;

export const tick = (prefixInside: string, postfixOutside: string = ""): string =>
	"`" + prefixInside + "`" + postfixOutside;

/**
 * item => `"item"`
 *
 * named by the way you would read it in code
 *
 * (you probably want this)
 */
export const tickQuote: Predicate = (item) => [item].map(quote).map((i) => tick(i))[0];

/**
 * item => "`item`"
 *
 * named by the way you would read it in code
 *
 * (you probably want the other one)
 */
export const quoteTick: Predicate = (item) => [item].map((i) => tick(i)).map(quote)[0];

export const bracket: Predicate = (item) => "[" + item + "]";

export const parens = (prefixInside: string, mid: string, postfixOutside: string = "", midPredicate = tick): string =>
	"(" + prefixInside + " " + midPredicate(mid) + ")" + postfixOutside;

export const array = (arr: string[] = [], predicate: Predicate = quote, ret: string = ""): string => (
	(ret = arr.map(predicate).join(", ")), //
	(ret = bracket(ret)),
	ret
);

export const bullets = (
	prefixSentence: string = "", //
	arr: string[] = [],
	bulletpoint = "- ",
	joiner = "\n"
): string => [prefixSentence, ...arr].join(joiner + bulletpoint);

export type S = string;

export type DeepArray<T> = Array<T | DeepArray<T>>;

// export type JoinerOfDeepArrays<T extends DeepArray<S> = DeepArray<S>> = (items: T) => S;
export type JoinerOfDeepArrays<ItemOrDeepItems extends DeepArray<S> = DeepArray<S>> = (
	items: ItemOrDeepItems extends DeepArray<any> ? string | ItemOrDeepItems : string
) => string;
// export type JoinerOfDeepArrays<T extends S | DeepArray<S> = S | DeepArray<S>> = (items: T) => S;

export const ifDeepArrayThenFlattenWith = <T extends S | DeepArray<S> = S | DeepArray<S>>(
	deepArrayJoiner: JoinerOfDeepArrays<Exclude<T, S>> //
) => (
	// items: T extends Array<infer SS> ? SS : S | T //
	// items: S | T
	items: T extends DeepArray<any> ? S | T : S
): S =>
	// typeof items === "string" //
	// 	? (items as I)
	// 	: deepArrayJoiner(items as Exclude<T, I>);
	!Array.isArray(items) //
		? (items as S)
		: deepArrayJoiner(items as Exclude<T, S>);

/**
 * aka Flattener
 */
type Joiner<T extends S | DeepArray<S> = S | DeepArray<S>> = (items: S | T) => S;

/**
 * overloads
 */

const l1 = joinWith("");
const sheeesh = ifDeepArrayThenFlattenWith(l1);
const l2 = joinWith(" ", sheeesh);
const ooka = ifDeepArrayThenFlattenWith(l2);
const l3 = joinWith("\n", ooka);

l3(["foo", ["lmao", ["kek", "w", ["upps"]]]]);

export function joinWith<Item extends S = S>(
	separator: string, //
	appendNeitherFirstLastBoth?: 0 | 1 | 2 | 3 | never,
	joinerOfItemOrDeepItems?: never
): // TODO compile-time (if DeepItems<S> === S[]):
(items: Item[]) => string;
// (items: Item | Item[]) => string;
// (items: Item | Item[]) => typeof items extends any[] ? string : never;
// (...items: Item[]) => string;
// (items: Item | Item[]) => string;

export function joinWith<ItemOrDeepItems extends S | DeepArray<S> = S | DeepArray<S>>(
	separator: string, //
	appendNeitherFirstLastBoth: 0 | 1 | 2 | 3,
	// joinerOfItemOrDeepItems: Joiner<ItemOrDeepItems> //
	joinerOfItemOrDeepItems: JoinerOfDeepArrays<Exclude<ItemOrDeepItems, S>> //
): (
	// items: ItemOrDeepItems extends Array<infer SS> ? (S extends SS ? S : never) : ItemOrDeepItems | ItemOrDeepItems[]
	// items: S extends ItemOrDeepItems ? S : ItemOrDeepItems // | ItemOrDeepItems[]
	// items: S extends ItemOrDeepItems ? S : ItemOrDeepItems | ItemOrDeepItems[]
	// items: ItemOrDeepItems | ItemOrDeepItems[]
	items: ItemOrDeepItems[]
) => string;
// (items: ItemOrDeepItems[]) => string;

export function joinWith<ItemOrDeepItems extends S | DeepArray<S> = S | DeepArray<S>>(
	separator: string, //
	// joinerOfItemOrDeepItems: Joiner<ItemOrDeepItems> //
	joinerOfItemOrDeepItems: JoinerOfDeepArrays<Exclude<ItemOrDeepItems, S>> //
): (items: ItemOrDeepItems | ItemOrDeepItems[]) => string;
// (items: ItemOrDeepItems[]) => string;

export function joinWith<ItemOrDeepItems extends S | DeepArray<S> = S | DeepArray<S>>(
	// export function joinWith<ItemOrDeepItems extends DeepArray<S> = DeepArray<S>>(
	separator: string, //
	// appendNeitherFirstLastBoth: 0 | 1 | 2 | 3 | JoinerOfDeepArrays<Exclude<ItemOrDeepItems, S>> = 0,
	appendNeitherFirstLastBoth: 0 | 1 | 2 | 3 | JoinerOfDeepArrays<ItemOrDeepItems> = 0,

	// flattenIfDeep: Joiner<ItemOrDeepItems> = ifDeepArrayThenFlattenWith<ItemOrDeepItems>(() => {
	// flattenIfDeep: JoinerOfDeepArrays<Exclude<ItemOrDeepItems, S>> = ifDeepArrayThenFlattenWith<ItemOrDeepItems>(() => {
	// flattenIfDeep: JoinerOfDeepArrays<ItemOrDeepItems> = ifDeepArrayThenFlattenWith<ItemOrDeepItems>(() => {
	flattenIfDeep = ifDeepArrayThenFlattenWith<ItemOrDeepItems>(() => {
		throw new Error(
			"`joinerOfItemOrDeepItems` predicate is required for function `joinWith` if `items` are `DeepArray<S>` instead of just `S`, but none was provided."
		);
	})
	// // TODO compile-time (if DeepItems<S> === S[]):
	// joinerOfItemOrDeepItems: S[] extends ItemOrDeepItems
	// 	? Joiner<ItemOrDeepItems> //
	// : never
	// 	: never = (ifDeepArrayThenFlattenWith<ItemOrDeepItems>(() => {
	// 	throw new Error(
	// 		"`joinerOfItemOrDeepItems` predicate is required for function `joinWith` if `items` are `DeepArray<S>` instead of just `S`, but none was provided."
	// 	);
	// 	// : never
	// }) as Joiner<ItemOrDeepItems> | never) as any
	// // TODO function overloads
) {
	return (
		// items: ItemOrDeepItems | ItemOrDeepItems[] //

		// item: ItemOrDeepItems,
		// ...items: ItemOrDeepItems[] //

		items: ItemOrDeepItems | ItemOrDeepItems[] //
	): string =>
		appendNeitherFirstLastBoth instanceof Function
			? (Array.isArray(items) ? items : [items])
					// ?  items
					.map((itemOrDeepItems) => ifDeepArrayThenFlattenWith(appendNeitherFirstLastBoth)(itemOrDeepItems))
					.join(separator)
			: ([1, 3].includes(appendNeitherFirstLastBoth) ? separator : "") +
			  (Array.isArray(items) ? items : [items]) //
					.map((itemOrDeepItems: ItemOrDeepItems) =>
						ifDeepArrayThenFlattenWith(flattenIfDeep)(itemOrDeepItems)
					)
					.join(separator) +
			  ([2, 3].includes(appendNeitherFirstLastBoth) ? separator : "");
}

export const joinWithIncludingLast = (sep: string) => joinWith(sep, 2);
export const joinWithIncludingFirstLast = (sep: string) => joinWith(sep, 3);

export type Part = string;
export type Sentence = string | Part[];
export type Paragraph = string | Sentence[];
export type Comment = Paragraph[];

export const toSentence = joinWith<Part>("", 0);
export const fromParts = joinWith<Part>("", 0);

export const toParagraph = joinWith<Sentence>(" ", 0, toSentence);
export const fromSentences = joinWith<Sentence>(" ", 0, fromParts);

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
export const toComment = joinWith<Paragraph>("\n\n", 0, toParagraph);
export const fromParagraphs = joinWith<Paragraph>("\n\n", 0, fromSentences);

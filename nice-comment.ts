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
// export const toComment = (
// 	paragraphs: Array<
// 		| string //
// 		| Array<
// 				| string //
// 				| Array<
// 						string //
// 				  >
// 		  >
// 	>
// ): string =>
// 	paragraphs //
// 		.map((sentences) =>
// 			!Array.isArray(sentences)
// 				? sentences // already a paragraph
// 				: toParagraph(sentences)
// 		)
// 		.join("\n\n");

// type Poo = Array<
// 	// | string //
// 	| Array<
// 			| string //
// 			| Array<
// 					string //
// 			  >
// 	  >
// >;

type Poo =
	// | string // TODO RM
	Array<
		| string //
		| Array<
				| string //
				| Array<
						string //
						// | Array<string> // TODO RM
				  >
		  >
	>;

type DeepArray<T> = Array<T | DeepArray<T>>;

// type Joiner<T extends DeepArray<any>> = T extends DeepArray<infer U> ? (items: U | T) => T : never; //
// type JoinerOfDeepArrays<T> = T extends DeepArray<infer U> ? (items: T) => U : never;
type Joiner<I, T extends DeepArray<I>> = (items: I | T) => I;
type JoinerOfDeepArrays<I, T extends DeepArray<I>> = (items: T) => I;

export const ifDeepArrayThenModifyWith = <I = unknown, T extends DeepArray<I> = DeepArray<I>>(
	deepArrayJoiner: JoinerOfDeepArrays<I, T> //
): Joiner<I, T> => (
	items //
) =>
	!Array.isArray(items) //
		? items
		: deepArrayJoiner(items);

// export const toComment2 = (
// 	paragraphs: Poo //
// ): string =>
// 	paragraphs //
// 		.map(ifDeepArrayThenModifyWith(toParagraph))
// 		.join("\n\n");

// const toParagraph = (sentences: Sentences): string =>
// 	sentences //
// 		.map(ifDeepArrayThenModifyWith(toSentence))
// 		.join(" ");

//

// const createJoiner = <T>(pred: (item: T) => T, separator: string) => (items: T[]): string =>
// const createJoiner = <I = unknown | never, T extends DeepArray<I> = DeepArray<I>>(
// 	pred: (items: T) => I,
// 	separator: string
// ) => (items: T): string => items.map(pred).join(separator);

// const joinWith = <T>(separator: string, pred: Joiner<T> = ifDeepArrayThenModifyWith((item) => item)) => (
export const joinWith = <Item = unknown>(
	separator: string, //
	deepArrayJoiner: Joiner<Item, DeepArray<Item>> = ifDeepArrayThenModifyWith<Item, DeepArray<Item>>((_deepArray) => {
		throw new Error(
			"`deepArrayJoiner` predicate required for function `joinWith` if `items` are DeepArray<T> instead of just `T`"
		);
	})
) => (
	items: DeepArray<Item> //
): string =>
	items //
		.map(deepArrayJoiner)
		.join(separator);

// const toSentence = (parts: Parts): string =>
// 	parts
// 		.map((part) => part) // just don't modify!
// 		.join("");

type Sentences = Exclude<Poo[0], string>;
type Parts = Exclude<Sentences[0], string>;

const a: Parts = [""];

const noop = (..._xs: any[]): void => {};

noop(a);

// const toSentence = joinWith("", (i) => i);
export const toSentence = joinWith<Parts[0]>("");

// const toParagraph = joinWith(" ", ifDeepArrayThenModifyWith(toSentence));
export const toParagraph = joinWith<Sentences>(" ", ifDeepArrayThenModifyWith(toSentence));

export const toComment = joinWith<Poo[0]>("\n\n", ifDeepArrayThenModifyWith(toParagraph));

// type FromArrayExtractT<A> = A extends Array<infer T> ? T : never;

// const toSentence = ifArrayThenModifyWith((items) => items.join(""));
// const toSentence = (parts: Parts) => [parts].map(ifArrayThenModifyWith((items) => items.join("")))[0];
// const toSentence = (parts: Parts): FromArrayExtractT<Parts> => [parts].map((stillParts) => stillParts.join(""))[0];
// const toSentence = (parts: Parts): string => [parts].map((stillParts) => stillParts.join(""))[0];
// const toSentence = (parts: Parts): string =>
// 	// parts.map(
// 	// 	ifArrayThenModifyWith((i) => i.join("")) //
// 	// )[0];
// 	// .join("");
// 	ifArrayThenModifyWith((stillParts) => stillParts.join(""))(parts);
// // parts.join("");

// const toSentence = (parts: Parts): string =>
// 	// wrapping here is bad because the the `ifArrayThenModifyWith` cannot properly infer the `string` type
// 	[parts]
// 		.map(
// 			ifArrayThenModifyWith<string>((stillParts) => stillParts.join(""))
// 		)
// 		// )[0];
// 		.join(""); // works identical to [0]

// const arr: string[] = ["a", "b", "c"];
// const bbbbb = ifArrayThenModifyWith<string>((i) => i.join(""))(arr);
// const bbbbb = ifArrayThenModifyWith<string>((i) => i)(arr);

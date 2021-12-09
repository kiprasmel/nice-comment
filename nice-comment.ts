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

export type JoinerOfDeepArrays<T extends DeepArray<S> = DeepArray<S>> = (items: T) => S;

export const ifDeepArrayThenFlattenWith = <T extends S | DeepArray<S> = S | DeepArray<S>>(
	deepArrayJoiner: JoinerOfDeepArrays<Exclude<T, S>> //
) => (
	items: S | T //
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

export function joinWith<Item extends S = S>(
	separator: string, //
	appendNeitherFirstLastBoth?: 0 | 1 | 2 | 3,
	joinerOfItemOrDeepItems?: never
): (items: Item[]) => string; // since Item is only a string, this would be identical: (items: (string | Item)[]) => string)

export function joinWith<ItemOrDeepItems extends S | DeepArray<S> = S | DeepArray<S>>(
	separator: string, //
	appendNeitherFirstLastBoth: 0 | 1 | 2 | 3,
	joinerOfItemOrDeepItems: Joiner<ItemOrDeepItems> //
): (items: ItemOrDeepItems | (S | ItemOrDeepItems)[]) => string;

export function joinWith<ItemOrDeepItems extends S | DeepArray<S> = S | DeepArray<S>>(
	separator: string, //
	appendNeitherFirstLastBoth: 0 | 1 | 2 | 3 = 0,
	flattenIfDeep: Joiner<ItemOrDeepItems> = ifDeepArrayThenFlattenWith<ItemOrDeepItems>(() => {
		throw new Error(
			"`joinerOfItemOrDeepItems` predicate is required for function `joinWith` if `items` are `DeepArray<S>` instead of just `S`, but none was provided."
		);
	})
) {
	return (
		items: ItemOrDeepItems | (S | ItemOrDeepItems)[] //
	): string =>
		([1, 3].includes(appendNeitherFirstLastBoth) ? separator : "") +
		(Array.isArray(items) ? items : [items])
			.map((itemOrDeepItems: ItemOrDeepItems | S) => flattenIfDeep(itemOrDeepItems))
			.join(separator) +
		([2, 3].includes(appendNeitherFirstLastBoth) ? separator : "");
}

/**
 * BEGIN joinWithDeep
 */

export type ArrayWithoutFirstElement<T extends any[] | readonly any[]> =
	T extends any[] | readonly any[]
		? T extends [infer _, ...infer RestT]
			? RestT
		: T extends readonly [infer _, ...infer RestT] 
			? RestT // TODO return `readonly`
			: never
		: never;

// TODO TEST TYPES
// type WO1 = ArrayWithoutFirstElement<[1,2,3]>
// type WO1R = ArrayWithoutFirstElement<readonly [1,2,3]>

export type ArrayWithAtLeastOneElement<T = any> = [T, ...T[]];
export type ReadonlyArrayWithAtLeastOneElement<T = any> = readonly [T, ...T[]];

export type JoinDeep<Seps extends any[] | readonly any[]> = JoinDeepHelper<Seps, never>

/**
 * https://devblogs.microsoft.com/typescript/announcing-typescript-4-5/#tailrec-conditional
 */
export type JoinDeepHelper<Seps extends any[] | readonly any[] | never, Acc > =
	Seps extends ArrayWithAtLeastOneElement<any> | ReadonlyArrayWithAtLeastOneElement<any>
		? | string[]
		  | (
			  | string
			  | JoinDeepHelper<ArrayWithoutFirstElement<Seps>, (string | Acc)>
			)[]
		: Acc

export type DeepJoiner<Seps extends string[] | readonly string[]> = (items: JoinDeep<Seps>) => string;

export const joinWithDeep = <Seprtrs extends readonly string[]>(...separators: Seprtrs): DeepJoiner<typeof separators> =>
	separators
		.slice(0, -1) // remove the last one, because we're using it in the initialization of .reduceRight
		.reduceRight(
			(composed, sep) => joinWith<ReturnType<typeof composed> | S>(sep, 0, ifDeepArrayThenFlattenWith(composed)),
			joinWith(separators[separators.length - 1], 0)
		) as DeepJoiner<typeof separators> // TS should infer automatically, but not yet

/**
 * END joinWithDeep
 */

export const joinWithIncludingFirst = (sep: string) => joinWith(sep, 1);
export const joinWithIncludingLast = (sep: string) => joinWith(sep, 2);
export const joinWithIncludingFirstLast = (sep: string) => joinWith(sep, 3);

export type Part = string;
export type Sentence = string | Part[];
export type Paragraph = string | Sentence[];
export type Comment = Paragraph[];

export const toSentence = joinWith("", 0);
// export const toParagraph = joinWith<string | string[]>(" ", 0, ifDeepArrayThenFlattenWith(toSentence));
export const toParagraph = joinWith<string[]>(" ", 0, ifDeepArrayThenFlattenWith(toSentence));

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
// export const toComment = joinWith<Paragraph>("\n\n", 0, ifDeepArrayThenFlattenWith(toParagraph));
export const toComment = joinWith("\n\n", 0, ifDeepArrayThenFlattenWith(toParagraph));

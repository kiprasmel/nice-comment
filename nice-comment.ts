type Predicate = (item: string) => string;

export const quote: Predicate = item => `"${item}"`;

export const tick: Predicate = item => "`" + item + "`";

/**
 * item => `"item"`
 *
 * named by the way you would read it in code
 *
 * (you probably want this)
 */
export const tickQuote: Predicate = item => [item].map(quote).map(tick)[0];

/**
 * item => "`item`"
 *
 * named by the way you would read it in code
 *
 * (you probably want the other one)
 */
export const quoteTick: Predicate = item => [item].map(tick).map(quote)[0];

export const bracket: Predicate = item => "[" + item + "]";

export const parens = (prefixInside: string, mid: string, postfixOutside: string = "", midPredicate = tick): string =>
	"(" + prefixInside + " " + midPredicate(mid) + ")" + postfixOutside;

export const toPrettyArr = (arr: string[] = [], predicate: Predicate = quote, ret: string = ""): string => (
    (ret = arr.map(predicate).join(", ")), //
    (ret = bracket(ret)),
    ret
);

export const toComment = (comments: (string | string[] | string[][])[]): string =>
	comments //
		.map((line) => (Array.isArray(line) ? line.map((l) => (Array.isArray(l) ? l.join(" ") : l)).join("") : line))
		.join("\n\n");

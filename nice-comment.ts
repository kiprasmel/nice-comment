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

export const spaceL: Predicate = item => " " + item
export const spaceR: Predicate = item => item + " ";
export const space: Predicate = item => [item].map(spaceL).map(spaceR)[0];

export const toPrettyArr = (arr: string[] = [], predicate: Predicate = quote, ret: string = ""): string => (
    (ret = arr.map(predicate).join(", ")), //
    (ret = bracket(ret)),
    ret
);

export const toComment = (comments: (string | string[])[]): string =>
    comments //
        .map(line => (Array.isArray(line) ? line.join("") : line))
        .join("\n\n");

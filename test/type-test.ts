import { joinWith, Sentence, toComment } from "../nice-comment";

export const noop = (..._xs: any[]): void => {};

try {
	// @ts-expect-error
	const toParagraphBadBecauseMissingDeepJoiner = joinWith<Sentence>(" ");

	noop(toParagraphBadBecauseMissingDeepJoiner);

	// @ts-expect-error
	toComment(["foo", ["bar", ["baz", ["ooka"]]]]);

	toComment(["foo", ["bar", ["baz"]]]);

	// @ts-expect-error
	toComment("foo");
} catch (e) {
	//
}

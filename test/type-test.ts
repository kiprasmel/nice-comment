import { expectToError, noop } from "jest-sucks";
import { joinWith, Sentence, toComment } from "../nice-comment";

// @ts-expect-error
const toParagraphBadBecauseMissingDeepJoiner = joinWith<Sentence>(" ");
noop(toParagraphBadBecauseMissingDeepJoiner);

expectToError(() => {
	// @ts-expect-error
	toComment(["foo", ["bar", ["baz", ["ooka"]]]]);
});

toComment(["foo", ["bar", ["baz"]]]);

// @ts-expect-error
toComment("foo");

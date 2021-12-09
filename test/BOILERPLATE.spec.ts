#!/usr/bin/env ts-node-dev

import { runMany, expectToError } from "jest-sucks";

/**
 * remember to include in test.ts!
 */

runMany([
	// [ //
	// ],
]);

expectToError(() => {
	throw new Error();
});

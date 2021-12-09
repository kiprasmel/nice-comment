try {
	import("./util-test");
	import("./type-test");
	import("./joinWith.spec");
	import("./joinWithDeep.spec");
} catch (e) {
	process.exit(1);
}

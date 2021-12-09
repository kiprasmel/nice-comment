try {
	import("./util-test");
	import("./type-test");
	import("./joinWith.spec");
	import("./joinWithDeep.spec");
	import("./joinWithDeep.backwards-compat.spec");
} catch (e) {
	process.exit(1);
}

const onElementAppears = <T extends HTMLElement>(elementSelector: string, callback: (element: T) => void) => {
	let element = document.querySelector<T>(elementSelector);

	if (element) {
		callback(element);
		return;
	}

	const bodyObserver = new MutationObserver((mutationsList, observer) => {
		for (const mutation of mutationsList) {
			if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
				element = document.querySelector<T>(elementSelector);

				if (element) {
					callback(element);
					observer.disconnect();
					break;
				}
			}
		}
	});

	bodyObserver.observe(document.body, { childList: true, subtree: true });
};

onElementAppears<HTMLDivElement>("#related #contents", (element) => {
	const child = element.children[2];
	child.remove();
});

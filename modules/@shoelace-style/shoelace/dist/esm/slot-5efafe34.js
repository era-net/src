//
//
// Given a slot, this function iterates over all of its assigned text nodes and returns the concatenated text as a
// string. This is useful because we can't use slot.textContent as an alternative.
//
function getTextContent(slot) {
    const nodes = slot.assignedNodes({ flatten: true });
    let text = '';
    [...nodes].map(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            text += node.textContent;
        }
    });
    return text;
}
//
// Determines whether a slot with the given name exists in an element.
//
function hasSlot(el, name) {
    return [...el.querySelectorAll('[slot]')].filter((slottedEl) => slottedEl.slot === name).length > 0;
}

export { getTextContent as g, hasSlot as h };

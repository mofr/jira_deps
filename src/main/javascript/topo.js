export class CircularDependencyError extends Error {

}


function toposort(input) {
    /*
    Dependencies are expressed as an array of 2-value arrays whose first item depends on items in the second array.
    Output is a list of sets in topological order. The first set consists of items with no
    dependencies, each subsequent set consists of items that depend upon items in the preceding sets.
     */

    if (input.length === 0) {
        return [];
    }
    const graph = new Map();
    for (const [item, precedingItems] of input) {
        graph.set(item, new Set(precedingItems));

        // Ignore self dependencies
        graph.get(item).delete(item);

        for (const precedingItem of precedingItems) {
            if (!graph.has(precedingItem)) {
                graph.set(precedingItem, new Set());
            }
        }
    }

    const result = [];
    while (true) {
        const independents = new Set();
        for (const [key, precedingItems] of graph) {
            if (precedingItems.size === 0)
                independents.add(key);
        }
        if (independents.size === 0)
            break;
        result.push(independents);
        for (const independent of independents) {
            graph.delete(independent);
            for (const precedingItems of graph.values()) {
                precedingItems.delete(independent);
            }
        }
    }

    if (graph.size !== 0) {
        throw new CircularDependencyError();
    }

    return result;
}

export default toposort;

export class CircularDependencyError extends Error {

}

class Node {
    constructor(item, dependencies = []) {
        this.item = item;
        this.dependencies = new Set(dependencies);
    }
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
    let data = {};
    for (const [item, precedingItems] of input) {
        data[item] = new Node(item, precedingItems);

        // Ignore self dependencies
        data[item].dependencies.delete(item);

        for (const precedingItem of precedingItems) {
            if (!(precedingItem in data)) {
                data[precedingItem] = new Node(precedingItem);
            }
        }
    }

    const result = [];
    while (true) {
        const independents = [];
        for (const key in data) {
            if (data[key].dependencies.size === 0)
                independents.push(data[key].item);
        }
        if (independents.length === 0)
            break;
        result.push(independents);
        for (const independent of independents) {
            delete data[independent];
            for (const key in data) {
                data[key].dependencies.delete(independent);
            }
        }
    }

    if (Object.keys(data).length !== 0)
        throw new CircularDependencyError();

    return result;
}

export default toposort;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResolver = void 0;
class BaseResolver {
    fields(info) {
        const fields = info.fieldNodes[0].selectionSet.selections.filter(field => !field.selectionSet);
        return fields.map(field => field.name.value);
    }
    relations(info) {
        const fields = info.fieldNodes[0].selectionSet.selections.filter(field => field.selectionSet);
        return fields.map(field => {
            return {
                [field.name.value]: [
                    ...field.selectionSet.selections.map(field => field.name.value)
                ]
            };
        });
    }
}
exports.BaseResolver = BaseResolver;
//# sourceMappingURL=base-resolver.js.map
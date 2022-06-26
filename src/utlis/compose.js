"use strict";
/**
 * Build functional pipeline.
 */
export default function compose(...processors) {
    if (processors.length === 0)
        return (input) => input;
    if (processors.length === 1)
        return processors[0];

    return processors.reduce((prev, next) => {
        return (...args) => {
            if(prev===undefined){
                return next(...args)
            }
            return next(prev(...args))
        };
    });
};

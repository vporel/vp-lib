"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiHooks = void 0;
const react_1 = require("react");
function useGet(serverFunctionCall) {
    const [data, setData] = (0, react_1.useState)(undefined);
    (0, react_1.useEffect)(() => {
        (async () => {
            setData(undefined);
            const response = await serverFunctionCall();
            if (response.ok)
                setData(response.data);
            else
                setData(null);
        })();
    }, [serverFunctionCall]);
    return [data, setData];
}
exports.ApiHooks = {
    useGet
};

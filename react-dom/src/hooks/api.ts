import { useEffect, useState } from "react"

function useGet<DataType>(serverFunctionCall: Function): [data: DataType|null|undefined, setData: (data: DataType) => void]{
    const [data, setData] = useState<DataType|null|undefined>(undefined)

    useEffect(() => {
        (async () => {
            setData(undefined)
            const response = await serverFunctionCall()
            if(response.ok) setData(response.data)
            else setData(null)
        })()
    }, [serverFunctionCall])

    return [data, setData]
}

export const ApiHooks = {
    useGet
}
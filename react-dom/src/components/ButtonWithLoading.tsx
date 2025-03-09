'use client'
import { Button, ButtonTypeMap } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import Loader from "./Loader";

export default function ButtonWithLoading({loading, ...props}: {loading: boolean} & DefaultComponentProps<ButtonTypeMap>){
    return <Button startIcon={loading && <Loader size={20} color="white" />} {...props} />
}
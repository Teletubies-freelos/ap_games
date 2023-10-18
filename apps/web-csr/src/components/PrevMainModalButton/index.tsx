import { ArrowBackIos } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { setPrevState } from "../../observables"

export const PrevButton = ()=> (
  <IconButton onClick={setPrevState}>
    <ArrowBackIos />
  </IconButton>
)

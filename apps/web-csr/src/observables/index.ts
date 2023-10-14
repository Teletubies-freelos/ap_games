
import { bind } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"

export const [isCartOpenChange$, setIsCartOpen] = createSignal<boolean>();

export const [useIsCartOpen, text$] = bind(isCartOpenChange$, false)

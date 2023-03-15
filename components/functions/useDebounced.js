import debounce from "lodash.debounce"
import { useMemo } from "react"

export const useDebounced = (action, delay = 500) =>
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useMemo(() => debounce(action, delay), [delay])

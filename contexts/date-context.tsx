"use client"

import { createContext, useContext, ReactNode } from "react"

interface DateContextType {
    currentDate: string
}

const DateContext = createContext<DateContextType | undefined>(undefined)

/**
 * Provider component that supplies current date to all child components.
 */
export function DateProvider({ children }: { children: ReactNode }) {
    const currentDate = new Date().toISOString()

    return <DateContext.Provider value={{ currentDate }}>{children}</DateContext.Provider>
}

/**
 * Hook to access the current date from the DateContext.
 * @throws Error if used outside of DateProvider
 */
export function useCurrentDate() {
    const context = useContext(DateContext)
    if (context === undefined) {
        throw new Error("useCurrentDate must be used within a DateProvider")
    }
    return context.currentDate
}

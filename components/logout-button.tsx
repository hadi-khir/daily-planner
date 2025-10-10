'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

/**
 * Button component for user logout functionality.
 */
export function LogoutButton() {
  const router = useRouter()

  /**
   * Handles user logout and redirects to login page.
   */
  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return <Button onClick={logout}>Logout</Button>
}

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page() {

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const isLoggedIn = !!user;

    if (isLoggedIn) {
        redirect('/planner');
    } else {
        redirect('/signup');
    }
}
"use client"

import { signup } from "@/app/actions/auth";

const Page = () => {

    return (
        <form action={signup}>
            <>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" placeholder="name" />
            </>
            <>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" placeholder="email" type="email" />
            </>
            <>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" placeholder="password" type="password" />
            </>
            <button type="submit">Sign up!</button>
        </form>
    )
}

export default Page;
import { cookies } from 'next/headers'
export async function getCookie(cookie) {

    const cookieStore = cookies()
    const hasCookie = cookieStore.has(cookie)
    if (hasCookie) return cookieStore.get(cookie).value
    return null
}
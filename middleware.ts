export {default} from "next-auth/middleware"

export const config = {
    matcher: ['/', '/post', '/Laporan', '/post/:id*']
}
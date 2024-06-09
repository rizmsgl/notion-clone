import {Crimson_Pro} from "next/font/google";
import {Luckiest_Guy} from "next/font/google";

export const crimson = Crimson_Pro({
    subsets: ['latin'],
    display: 'swap',
    variable: "--font-crimson"
})

export const luckiestGuy = Luckiest_Guy({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: "--font-luckiest-guy"
});
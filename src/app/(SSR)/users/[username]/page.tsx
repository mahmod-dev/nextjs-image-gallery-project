import { UserModel } from "@/models/UserModel"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import style from "./UserPage.module.css"
import { cache } from "react"
import { Alert } from "@/components/bootstrap"

export interface PageProp {
    params: {
        username: string
    }
}

async function getUser(username: string): Promise<UserModel> {
    const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
    if (response.status === 404) notFound()

    return response.json()
}

//const getUserCached = cache(getUser)   /* use cache if you're not using the native fetch */
export async function generateMetadata({ params: { username } }: PageProp): Promise<Metadata> {
    const user = await getUser(username)

    return {
        title: user.first_name + " " + user.last_name
    }
}

export default async function page({ params: { username } }: PageProp) {
    const user = await getUser(username)

    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This profile page uses <strong>generateMetadata</strong> to set the <strong>page title</strong> dynamically from the API response.
            </Alert>
            
            <h1>{user.username}</h1>
            <p>firstname: {user.first_name}</p>
            <p>lastname: {user.last_name}</p>
            <Image
                src={user.profile_image.medium}
                alt={user.first_name}
                width={300}
                height={300}
                className={style.image}
            />
            <Link target="_blank" className='py-4' href={"https://unsplash.com/" + user.username}>{`${user.username}'s profile on Unsplash`}</Link>

        </div>
    )

}
import { ImageModel } from "@/models/ImageModel"
import Image from "next/image"
import Link from "next/link"
import {Alert} from "@/components/bootstrap"


export const metadata = {
    title: 'Dynamic Fetching Images',
}

export const revalidate = 0 //disable caching 

export default async function page() {

    const response = await fetch("https://api.unsplash.com/photos/random?collection=4474589&client_id=" + process.env.UNSPLASH_ACCESS_KEY, {
        //    cache:"no-cache"/"no-store"
        //  next: { revalidate: 0 }
    })
    const image: ImageModel = await response.json()

    const width = Math.min(500, image.width)
    const height = (width / image.width) * image.height


    return (
        <div className="d-flex flex-column align-items-center">

            <Alert>
                This page <strong>fetches data dynamically</strong>.
                Every time you refresh the page, you get a new image from the Unsplash API.
            </Alert>

            <Image
                src={image.urls.raw}
                alt={image.description}
                width={width}
                height={height}
                className="rounded shadow mw-100 h-100"
            />

            by <Link href={"/users/" + image.user.username}>{image.user.username}</Link>

        </div>

    )
}
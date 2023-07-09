import { ImageModel } from "@/models/ImageModel"
import Image from "next/image"
import Link from "next/link"
import { Alert } from "@/components/bootstrap"

export const metadata = {
    title: 'Incremental Static Regeneration Fetching Images',
}

export const revalidate = 15 // refresh after 15 second all over the page (page level)

export default async function page() {

    const response = await fetch("https://api.unsplash.com/photos/random?collection=4474589&client_id=" + process.env.UNSPLASH_ACCESS_KEY, {
        //  next: { revalidate: 15 }  // refresh after 15 second (fetch level not all page)
    })
    const image: ImageModel = await response.json()

    const width = Math.min(500, image.width)
    const height = (width / image.width) * image.height


    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This page uses <strong>incremental static regeneration</strong>.
                A new image is fetched every 15 seconds (after refreshing the page) and then served from the cache for that duration.
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
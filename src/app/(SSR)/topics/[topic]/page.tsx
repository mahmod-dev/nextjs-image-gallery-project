import { ImageModel } from "@/models/ImageModel"
import Image from "next/image"
import style from "./TopicPage.module.css"
import { Metadata } from "next"
import { Alert } from "@/components/bootstrap"


/**
 *  [dynamicParams] is reserved name
 * ignoring all dynamic params (topics) except the keywords that already defiend in generateStaticParams
 */
//export const dynamicParams = false

/**
 * [generateStaticParams] is reserved name
 * to caching data in building time 
 * @returns array of topics that will be executed and cached in build time
 */
export async function generateStaticParams() {
    return ["swimming", "fitness", "coding"].map(topic => ({ topic }))
}


interface TopicProp {
    /**
     * [params] is reserved name
     * [topic] the same name of folder [topic]
     */
    params: { topic: string },
    //   searchParams: { [key: string]: string | string[] | undefined }
}



export function generateMetadata({ params: { topic } }: TopicProp): Metadata {
    return {
        title: topic
    }

}
export default async function page({ params: { topic } }: TopicProp) {

    const response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
    const images: ImageModel[] = await response.json()

    return (
        <div>
            <Alert>
                This page uses <strong>generateStaticParams</strong> to render and cache static pages at build time, even though the URL has a dynamic parameter.
                Pages that are not included in generateStaticParams will be fetched & rendered on first access and then <strong>cached for subsequent requests</strong> (this can be disabled).
            </Alert>


            <h1>{topic}</h1>
            {
                images.map(image => (
                    <Image
                        src={image.urls.raw}
                        alt={image.description}
                        height={250}
                        width={250}
                        key={image.urls.raw}
                        className={style.image}
                    />
                ))
            }
        </div>
    )
}
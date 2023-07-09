"use client"

import { ImageModel, SearchImageResponse } from "@/models/ImageModel"
import Image from "next/image"
import { FormEvent, useState } from "react"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import styles from "./SearchPage.module.css"


export default function SearchPage() {
    const [searchResult, setSearchResult] = useState<ImageModel[] | null>(null)
    const [showLoading, setShowLoading] = useState(false)
    const [resultError, setResultError] = useState(false)


    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        // prevent refresh automatically when clicking on search button
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)
        const query = formData.get("query")?.toString().trim()
        if (query) {
            try {
                setSearchResult(null)
                setShowLoading(true)
                setResultError(false)
                const response = await fetch(`/api/search?query=${query}`)
                const images: ImageModel[] = await response.json()
                setSearchResult(images)

                if (images.length === 0) {

                }
            } catch (error) {
                console.error(error);
                setResultError(true)
            } finally {
                setShowLoading(false)
            }

        }


    }
    return (
        <div>
            <Form onSubmit={handleSubmit} >
                <Form.Group controlId="form-search">

                    <Form.Label>Seach in unsplash images site</Form.Label>
                    <Form.Control
                        name="query"
                        placeholder="E.g sports, sky, cats, food, ..."
                    >

                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="my-3">
                    Search
                </Button>

            </Form>

            <div className="d-flex flex-column align-items-center">
                {showLoading &&
                    <Spinner animation="border" />
                }

                {resultError &&
                    <p>somthing went wrong, Please try again.</p>
                }

                {searchResult?.length === 0 &&
                    <p>Nothing found. Try a different query!</p>

                }
                
                <Row xs={1} md={2} xl={3} >
                    {searchResult &&
                        searchResult.map(image => (
                            <>
                                <Col>
                                <Image
                                    src={image.urls.raw}
                                    alt={image.description}
                                    width={400}
                                    height={400}
                                    key={image.urls.raw}
                                    className={styles.image}
                                />
                                </Col>
                            </>


                        ))
                    }
                </Row>





            </div>

        </div>
    )
}
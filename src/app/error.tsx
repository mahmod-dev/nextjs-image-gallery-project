"use client"
import { Button } from "react-bootstrap"

interface ErrorPageProps {
    error: Error,
    reset: () => void
}


export default function errorPage({ error, reset }: ErrorPageProps) {
    return (<div>

        <h1>Error</h1>
        <p>Ops.. something went wrong!</p>
        <Button onClick={reset}> try again!</Button>
    </div>
    )
}
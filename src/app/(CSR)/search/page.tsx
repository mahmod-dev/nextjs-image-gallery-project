import SearchPage from "./SearchPage"


export const metadata = {
    title: 'Search about an image in unsplash',
}
export default function page() {
    return (
        <div>
            {<SearchPage />}
        </div>
    )
}
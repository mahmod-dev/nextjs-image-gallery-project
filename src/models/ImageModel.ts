
export interface ImageModel {
    description: string,
    user: {
        username: string
    },
    urls: {
        raw: string
    },
    width: number,
    height: number
}

export interface SearchImageResponse {
    results: ImageModel[]
}


export interface Song{
        id: string,
        name: string,
        type: string,
        year: string | null,
        releaseDate:string | null,
        duration:number,
        label:string|  null,
        explicitContent : true,
        playCount: string | null,
        language: string ,
        hasLyrics: boolean,
        lyricsId: string | null,
        lyrics: {
          lyrics: string,
          copyright: string,
          snippet: string
        },
        url: string,
        copyright: string | null,
        album: {
          "id": string | null,
          "name": string | null,
          "url":string |  null
        },
        artists: {
          primary:Artist[],
          featured: Artist[],
          all: Artist[]
        },
        image: Url[],
        downloadUrl:  Url[]
}
interface Url{
    quality:string,
    url:string
}

interface Artist{
        "id":  string | null,
        "name":  string | null,
        "role": string |  null,
        "type": string |  null,
        "image": string |  null,
        "url": string |  null
}
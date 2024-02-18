
type ToProduceDetailed = {
    id: string,
    name: string,
    description: string,
    image_url: string,
    total_enrute_demand: number,
    total_demand: number,
    location_demand: {
        district: string,
        data: {
            date: string,
            demand: number
        }[]
    }[]
}

interface ToProduce {
    id: string,
    name: string,
}
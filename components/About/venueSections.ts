// Each entry becomes one card on the About page.
// To add a photo, drop the file in /public/pictures and set `image` to its path,
// e.g. image: "/pictures/chapel.jpeg". Leave it out to show a placeholder.

export type VenueSection = {
    title: string;
    subtitle?: string;
    description: string;
    images?: VenueImage[];
    aspectRatio?: string;
};

export type VenueImage = {
    src: string;
    alt?: string;
};
// usage: images: [{ src: "/pictures/chapel-1.jpeg", alt: "..." }, { src: "/pictures/chapel-2.jpeg" }]


export const venueSections: VenueSection[] = [
    {
        title: "Arrival",
        subtitle: "Parking & Entrance",
        description: "Plenty of parking in a big gravel lot. The entrance is located at the south end of the lot. There will be a shuttle service for those who need it from the parking lot to the chapel.",
        images: [
            {  src:'/pictures/Screenshot 2026-10-15 151010-2.png' }
        ],    
    },
    {
        title: "The Chapel",
        subtitle: "Old Fashioned Charm",
        description: "We cannot wait to see the chapel filled with familiar faces! Expect the high to be around 68 degrees.",
        aspectRatio: "495 / 400",
        images: [
            { src:'/pictures/church1-495x400.jpg' },
            { src:'/pictures/church2-495x400.jpg' },
        ],
    },
    {
        title: "The Reception",
        subtitle: "Dinner in the livery",
        description: "The floor in the reception area (as well as the parking lot) is gravel, so dress accordingly. Dinner will be provieded by PhatBoys Taco catering and will feature a self service taco bar.",
        aspectRatio:'729/485',
        images:[
            {src:'/pictures/livery1.webp'},
            {src:'/pictures/livery-2.jpg'}
        ]
    },
    {
        title: "Exploring the Grounds",
        subtitle: "Pioneer Living History Museum",
        description: "Pioneer Living History Museum is a sprawling 90-acre open-air museum in northern Phoenix that recreates a 19th-century frontier town representing Territorial Arizona from 1863 to 1912. Please keep in mind that even during the wedding, the venue still is a museum so please respect it as such. The museum will be closing just prior to the start time of the wedding, but guests are welcome to show up early to experience the village.",
        images: [
            { src:'/pictures/Screenshot 2026-10-19 071657.png' },
        ],
    },
];

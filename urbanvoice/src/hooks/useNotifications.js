import { INCIDENTS } from "../constants";

export default function useMarkers() {
    const notifications = [
        {
            id: 1,
            centroid_latitude: 51.505,
            centroid_longitude: -0.09,
            category: INCIDENTS[0]
        },
        {
            id: 2,
            centroid_latitude: 51.505,
            centroid_longitude: -0.09,
            category: INCIDENTS[1]
        },
    ]

    return { notifications };
}
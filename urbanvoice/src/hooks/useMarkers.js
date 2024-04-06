import { useEffect, useState } from 'react';
import supabase from '../supabase';

export default function useMarkers() {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        supabase
            .from('reports')
            .select(`
                id,
                latitude,
                longitude,
                category,
                description,
                agrees:agreements,
                comment_count,
                mock_user,
                comments (
                    id,
                    comment,
                    user:mock_user
                )
            `).then(({ data, error }) => {
                if (error) {
                    console.error(error);
                } else {
                    setMarkers(data.map(({ latitude, longitude, ...obj }) =>
                        ({ position: [latitude, longitude], ...obj })
                    ));
                }
            });
    }, [])

    return { markers };
}
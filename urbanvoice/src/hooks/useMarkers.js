import { useCallback, useEffect, useState } from 'react';
import supabase from '../supabase';

export function useMarker({ id }) {
    const [marker, setMarker] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateMarker = (data) => {
        setLoading(true);
        supabase.from('reports').update(data).match({ id }).then(({ data, error }) => {
            if (error) {
                setError(error);
            } else {
                setError(null);
                setMarker(data[0]);
            }
        }).finally(() => setLoading(false));
    }

    const toggleLike = useCallback((mockUser) => {
        setLoading(true);
        supabase.from('agreements').select('agrees').match({ report_id: id, mock_user: mockUser }).then(({ data, error }) => {
            if (error) {
                setError(error);
            } else {
                const agrees = data[0]?.agrees || false;
                const newAgreementStatus = !agrees;
                supabase.from('agreements').upsert({ report_id: id, mock_user: mockUser, agreed: newAgreementStatus }).then(({ data, error }) => {
                    if (error) {
                        setError(error);
                    } else {
                        setError(null);
                    }
                });
            }
        }).finally(() => setLoading(false));
    }, [id]);

    const addComment = useCallback((comment, mockUser) => { 
        setLoading(true);
        supabase.from('comments').insert({ report_id: id, comment, mock_user: mockUser }).then(({ data, error }) => {
            if (error) {
                setError(error);
            } else {
                setError(null);
            }
        }).finally(() => setLoading(false));
    }, [id]);

    return { marker, error, loading, updateMarker, toggleLike, addComment };
}

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
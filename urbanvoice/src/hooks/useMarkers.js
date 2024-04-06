export function useMarker({ markerId }) {
    // const togll
}

export default function useMarkers() {
    const markers = [
        {
            id: '1', position: [51.505, -0.09],
            category: 'Traffic accident',
            description: 'Car crash in intersection',
            agrees: 10,
            // disagrees: 3,
            comments: [
                {
                    id: 1,
                    user: '@jon',
                    comment: 'thanks'
                },
                {
                    id: 2,
                    user: '@juan',
                    comment: '👍'
                },
                {
                    id: 3,
                    user: '@jon',
                    comment: 'thanks'
                },
                {
                    id: 4,

                    user: '@juan',
                    comment: '👍'
                },
                {
                    id: 5,

                    user: '@jon',
                    comment: 'thanks'
                },
                {
                    id: 6,
                    user: '@juan',
                    comment: '👍'
                },
                {
                    id: 7,
                    user: '@jon',
                    comment: 'thanks'
                },
                {
                    id: 8,
                    user: '@juan',
                    comment: '👍'
                },
                {
                    id: 9,
                    user: '@jon',
                    comment: 'thanks'
                },
                {
                    id: 10,
                    user: '@juan',
                    comment: '👍'
                }
            ]
        }
    ];


    return { markers };
}
export default function useMarkers() {
    const markers = [
        { id: '1', position: [51.505, -0.09], popupConfig: { description: 'Car crash' } }
    ];

    return { markers };
}
export const generateDistanceOptions = (): { label: string; key: string }[] => {
    const distanceOptions: { label: string; key: string }[] = [];

    for (let hours = 8; hours <= 12; hours += 2) {
        const distance = hours * 10; // Assuming 10kms for each hour
        const distanceString = `${hours} hr ${distance} kms`;

        distanceOptions.push({ label: distanceString, key: distanceString });
    }

    return distanceOptions;
};

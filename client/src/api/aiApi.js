import axios from './axios'; // Using your existing axios instance

export const analyzeGrainImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axios.post('/ai/analyze', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error analyzing grain:", error);
        throw error;
    }
};
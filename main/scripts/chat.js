async function sendMessageToDeepSeek(message) {
    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        // Log the response for debugging
        console.log('Backend Response:', response);

        if (!response.ok) {
            throw new Error(`Backend request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('Backend Data:', data); // Log the backend data
        return data.response; // Adjust based on your backend response
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, something went wrong. Please try again.';
    }
}

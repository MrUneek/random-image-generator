const accessKey = '-WGhOJwQFWGr5zvK1bn4aJ7JU8OT8z53pW4MdOqMuno';
const endpoint = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=`;

const imageCountInput = document.getElementById('imageCount');
const errorMsg = document.getElementById('errorMsg');
const gallery = document.getElementById('gallery');
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    const count = parseInt(imageCountInput.value);
    if (isNaN(count) || count <= 0 || count > 10) {
        errorMsg.textContent = 'Please enter a number between 1 and 10.';
        return;
    }
    fetch(`${endpoint}${count}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            return response.json();
        })
        .then(data => {
            displayImages(data);
        })
        .catch(error => {
            errorMsg.textContent = 'Failed to fetch images. Please try again later.';
            console.error('Error fetching images:', error);
        });
});

function displayImages(images) {
    gallery.innerHTML = ''; // Clear existing images
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.regular; // Using regular size for better quality
        imgElement.alt = image.alt_description || 'Random image';
        gallery.appendChild(imgElement);
    });
}

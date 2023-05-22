const createFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#post_title').value.trim();
    console.log(name);
    const description = document.querySelector('#post_description').value.trim();
    console.log(description);

    if (name && description && brand && MSRP && ourPrice && cores && threads) {
        const response = await fetch('/upload/post', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log("Made Post")
        if (response.ok) {
            document.location.replace('/profile');
        }
        else {
            alert("Must enter a title and description")
        }
    };
};
document
    .querySelector('#post_submit')
    .addEventListener('click', createFormHandler);

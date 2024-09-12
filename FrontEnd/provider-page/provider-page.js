document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-option');
    const sections = document.querySelectorAll('.content-section');
    const slider = document.querySelector('.toggle-slider');

    toggleButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to the clicked button
            button.classList.add('active');

            // Move the slider
            slider.style.left = `calc(${index * 25}% + 3px)`; // Adjust left position based on index

            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));

            // Show the section related to the clicked button
            const sectionId = button.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
});

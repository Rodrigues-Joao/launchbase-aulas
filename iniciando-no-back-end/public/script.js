const modalOverlay = document.querySelector('.modal_overlay')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener('click', () => {
        const Id = card.getAttribute('id')
        window.location.href = `/video/${Id}`
    })
}
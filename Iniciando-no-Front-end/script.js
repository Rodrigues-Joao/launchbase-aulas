const modalOverlay = document.querySelector('.modal_overlay')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener('click', () => {
        const Id = card.getAttribute('id')
        modalOverlay.classList.add('active')
        modalOverlay.querySelector('iframe').src = `https://www.youtube.com/embed/${Id}`
    })
}

document.querySelector('.close-modal').addEventListener('click', () => {
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector('iframe').src = ''
})
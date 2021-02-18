const current_page = location.pathname
const menuItems = document.querySelectorAll("header .links a")

console.log(current_page)

for (item of menuItems) {
    if (current_page.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

/*---- Paginação -----*/
function paginate(selected_page, total_pages) {

    let pages = [],
        old_page

    for (let current_page = 1; current_page <= total_pages; current_page++) {
        const first_last_page = current_page == 1 || current_page == total_pages
        const before_pages = current_page >= selected_page - 2
        const after_pages = current_page <= selected_page + 2

        if (first_last_page || before_pages && after_pages) {

            if (old_page && current_page - old_page > 2) {
                pages.push('...')
            }
            if (old_page && current_page - old_page == 2) {
                pages.push(current_page - 1)
            }
            pages.push(current_page)
            old_page = current_page
        }
    }
    return pages
}

function create_pagination(pagination) {

    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)
    let elements = ``

    for (let page of pages) {
        if (String(page).includes('...')) {
            elements += `<span>${page}</span>`
        } else {
            console.log(filter)
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }
    pagination.innerHTML = elements
}

const pagination = document.querySelector('.pagination')
if (pagination)
    create_pagination(pagination)
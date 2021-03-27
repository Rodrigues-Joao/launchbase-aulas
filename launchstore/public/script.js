const Mask = {
    apply(input, func) {
        setTimeout(() => {
            input.value = Mask[func](input.value)
        }, 1)
    },
    formatBRL(value) {
        value = value.replace(/\D/g, '')
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100)
    }
}

const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 6,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if (PhotosUpload.hasLimit(event))
            return
        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const container = this.getContainer(image)

                PhotosUpload.preview.appendChild(container)
            }
            reader.readAsDataURL(file)
        })
        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input


        const photosContainer = []
        preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == 'photo')
                photosContainer.push(item)
        })

        const totalPhotos = fileList.length + photosContainer.length
        const qtdPhotos = uploadLimit - photosContainer.length
        if (qtdPhotos == 0) {
            alert('Você atingiu o limite máximo de fotos')
            event.preventDefault()
            return true
        } else if (totalPhotos > uploadLimit) {
            alert(`Você só pode adicionar mais ${qtdPhotos} foto(s)`)
            event.preventDefault()
            return true
        } else if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }
        return false
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image) {
        const container = document.createElement('div')

        container.classList.add('photo')

        container.onclick = PhotosUpload.removePhoto

        container.appendChild(image)

        container.appendChild(this.getRemoveButton())
        return container
    },
    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = 'close'
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)


        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()



        photoDiv.remove()
    },
    removeOldPhoto(event) {
        const photoContainer = event.target.parentNode

        if (photoContainer.id) {
            const removedFiles = document.querySelector('input[name="removed_files"]')
            console.log("========================================================")
            console.log(removedFiles)
            console.log("========================================================")
            if (removedFiles) {
                removedFiles.value += `${photoContainer.id},`
            }
        }

        photoContainer.remove()
    }
}
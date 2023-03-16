const url = 'https://localhost:7095/api/Song'
let app = document.getElementById('app')
let data
let user
let allSongs = []

const getSongs = function () {
    fetch(url).then(function (response) {
        return response.json()
    }).then(function(data) {
        makeTable(data)
    })
}

const favorite = function () {
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            favoriteSong(data)
        })
}

const deleteOption = function () {
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            deleteSong(data)
        })
}

getSongs()

function handleOnLoad() {
    favorite()
    deleteOption()
}

const createSong = async (event) => {
    event.preventDefault()
    const target = event.target
    const song = {
        title: target.songTitle.value,
        artist: target.songArtist.value,
        favorited: 'false',
        deleted: 'false',
    }
    await fetch(url, {
        method: 'POST',
        headers: {
            accept: '*/*',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(song),
    })
    addRow(song)
    location.reload()
}

function addRow(newSong) {
    let tableBody = document.getElementById('songTableBody')
    let tr = document.createElement('TR')
    tableBody.appendChild(tr)

    let td1 = document.createElement('TD')
    td1.width = 300
    td1.appendChild(document.createTextNode(`${newSong.title}`))
    tr.appendChild(td1)

    let td2 = document.createElement('TD')
    td2.width = 250
    td2.appendChild(document.createTextNode(`${newSong.artist}`))
    tr.appendChild(td2)

    let td3 = document.createElement('TD')
    td3.width = 100
    td3.appendChild(document.createTextNode(`${newSong.dateAdded}`))
    tr.appendChild(td3)

    let td4 = document.createElement('TD')
    td4.width = 100
    td4.appendChild(document.createTextNode(`${newSong.favorited}`))
    tr.appendChild(td4)

    allSongs.unshift(newSong)
    location.reload()
}

const makeTable = (songs) => {
    let table = document.createElement('TABLE')
    table.border = '2'
    table.id = 'songTable'
    let tableBody = document.createElement('TBODY')
    tableBody.id = 'songTableBody'
    table.appendChild(tableBody)

    let tr = document.createElement('TR')
    tableBody.appendChild(tr)

    let th1 = document.createElement('TH')
    th1.width = 300
    th1.appendChild(document.createTextNode('Title'))
    tr.appendChild(th1)

    let th2 = document.createElement('TH')
    th2.width = 250
    th2.appendChild(document.createTextNode('Artist'))
    tr.appendChild(th2)

    let th3 = document.createElement('TH')
    th3.width = 100
    th3.appendChild(document.createTextNode('Date Added'))
    tr.appendChild(th3)

    let th4 = document.createElement('TH')
    th4.width = 100
    th4.appendChild(document.createTextNode('Favorited'))
    tr.appendChild(th4)
    songs.forEach((s) => {
        if (s.deleted != "true") {
            let tr = document.createElement('TR')
            tableBody.appendChild(tr)

            let td1 = document.createElement('TD')
            td1.width = 300
            td1.appendChild(document.createTextNode(`${s.title}`))
            tr.appendChild(td1)

            let td2 = document.createElement('TD')
            td2.width = 250
            td2.appendChild(document.createTextNode(`${s.artist}`))
            tr.appendChild(td2)

            let td3 = document.createElement('TD')
            td3.width = 100
            td3.appendChild(document.createTextNode(`${s.dateAdded}`))
            tr.appendChild(td3)

            let td4 = document.createElement('TD')
            td4.width = 100
            td4.appendChild(document.createTextNode(`${s.favorited}`))
            tr.appendChild(td4)
        }
    })
    app.appendChild(table)
}

const favoriteSong = (json) => {
    let favoriteForm = document.getElementById('favoriteSong')
    let title
    let artist
    let foundID
    let finding
    favoriteForm.addEventListener('submit', async function (event) {
        event.preventDefault()
        title = event.target.elements.songTitle.value.toLowerCase()
        artist = event.target.elements.songArtist.value.toLowerCase()

        try {
            finding = json.find(
                (json) =>
                    json.title.toLowerCase() == title &&
                    json.artist.toLowerCase() == artist &&
                    json.deleted == 'false'
            )
            if (finding.favorited == 'false') {
                foundID = {
                    id: finding.songID,
                    title: finding.title,
                    artist: finding.artist,
                    dateAdded: finding.dateAdded,
                    favorited: 'true',
                    deleted: 'false',
                    numID: finding.numID,
                }
            } else {
                foundID = {
                    id: finding.songID,
                    title: finding.title,
                    artist: finding.artist,
                    dateAdded: finding.dateAdded,
                    favorited: 'false',
                    deleted: 'false',
                    numID: finding.numID,
                }
            }
            let putID = finding.songID
            await fetch(`${url}/${putID}`, {
                method: 'PUT',
                headers: {
                    accept: '*/*',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(foundID),
            })
        } catch {
            alert('Song does not exist!')
        }
        location.reload()
    })
}

const deleteSong = (json) => {
    let deleteForm = document.getElementById('deleteSong')
    let title
    let artist
    let foundID
    let finding
    deleteForm.addEventListener('submit', async function (event) {
        event.preventDefault()
        title = event.target.elements.songTitle.value.toLowerCase()
        artist = event.target.elements.songArtist.value.toLowerCase()

        try {
            finding = json.find(
                (json) =>
                    json.title.toLowerCase() == title &&
                    json.artist.toLowerCase() == artist
            )
            if (finding.deleted == 'false') {
            foundID = {
                id: finding.songID,
                title: finding.title,
                artist: finding.artist,
                dateAdded: finding.dateAdded,
                favorited: 'false',
                deleted: 'true',
                numID: finding.numID,
            }
            let putID = finding.songID
            await fetch(`${url}/${putID}`, {
                method: 'PUT',
                headers: {
                    accept: '*/*',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(foundID),
            })} else{
                alert('Song does not exist!')
            }
        } catch {
            alert('Song does not exist!')
        }
        location.reload()
    })
}
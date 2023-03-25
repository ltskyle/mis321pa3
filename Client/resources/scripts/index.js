const url = 'https://localhost:7095/api/Song'
let app = document.getElementById('app')
let data
let user
let allSongs = []

const getSongs = function () {
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            makeTable(data)
        })
}

getSongs()

function handleOnLoad() {
    createSong()
}

const createSong = () => {
    let addForm = document.getElementById('addSong')
    let song
    addForm.addEventListener('submit', async function (event) {
        event.preventDefault()
        song = {
            title: event.target.elements.songTitle.value,
            artist: event.target.elements.songArtist.value,
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
        location.reload()
    })
}

const makeTable = (songs) => {
    let table = document.createElement('TABLE')
    table.border = '.5'
    table.id = 'songTable'
    let tableBody = document.createElement('TBODY')
    tableBody.id = 'songTableBody'
    table.appendChild(tableBody)

    let tr = document.createElement('TR')
    tableBody.appendChild(tr)

    let th1 = document.createElement('TH')
    th1.width = 250
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

    let th5 = document.createElement('TH')
    th5.width = 215
    th5.appendChild(document.createTextNode('Change'))
    tr.appendChild(th5)

    songs.forEach((s) => {
        if (s.deleted != 'true') {
            let tr = document.createElement('TR')
            tableBody.appendChild(tr)

            let td1 = document.createElement('TD')
            td1.width = 250
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

            let ftbn = document.createElement('BUTTON')
            ftbn.className = 'btn-info'
            ftbn.id = `${s.songID}`
            ftbn.style = 'margin: 5px'
            ftbn.onclick = () => {
                favorite(s.songID)
            }
            ftbn.width = 70
            ftbn.appendChild(document.createTextNode('Favorite'))
            tr.appendChild(ftbn)

            let dbtn = document.createElement('BUTTON')
            dbtn.className = 'btn-info'
            dbtn.id = `${s.songID}`
            dbtn.style = 'margin: 5px'
            dbtn.onclick = () => {
                deleteSong(s.songID)
            }
            dbtn.width = 70
            dbtn.appendChild(document.createTextNode('Delete'))
            tr.appendChild(dbtn)

            let ebtn = document.createElement('BUTTON')
            ebtn.className = 'btn-info'
            ebtn.id = `${s.songID}`
            ebtn.style = 'margin: 5px'
            ebtn.onclick = () => {
                $("#editSong").modal('show')
                editSong(s.songID)
            }
            ebtn.width = 70
            ebtn.appendChild(document.createTextNode('Edit'))
            tr.appendChild(ebtn)
        }
    })
    app.appendChild(table)
}

async function favorite(ID) {
    const newUrl = `https://localhost:7095/api/Song/${ID}`
    await fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(async function (data) {
            finding = data.find((data) => data.songID == ID)

            finding.favorited == 'true'
                ? (song = {
                      id: finding.songID,
                      title: finding.title,
                      artist: finding.artist,
                      dateAdded: finding.dateAdded,
                      favorited: 'false',
                      deleted: finding.deleted,
                      numID: finding.numID,
                  })
                : (song = {
                      id: finding.songID,
                      title: finding.title,
                      artist: finding.artist,
                      dateAdded: finding.dateAdded,
                      favorited: 'true',
                      deleted: finding.deleted,
                      numID: finding.numID,
                  })

            await fetch(newUrl, {
                method: 'PUT',
                headers: {
                    accept: '*/*',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(song),
            })
            location.reload()
        })
}

async function deleteSong(ID) {
    const newUrl = `https://localhost:7095/api/Song/${ID}`
    await fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(async function (data) {
            finding = data.find((data) => data.songID == ID)
        song = {
            id: finding.songID,
            title: finding.title,
            artist: finding.artist,
            dateAdded: finding.dateAdded,
            favorited: finding.favorited,
            deleted: 'true',
            numID: finding.numID,
        }
        await fetch(newUrl, {
            method: 'PUT',
            headers: {
                accept: '*/*',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(song),
        })
        location.reload()
    })
}

async function editSong(ID) {
    let newTitle
    let newArtist
    let editForm = document.getElementById('editSong')
    const newUrl = `https://localhost:7095/api/Song/${ID}`
    await fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(async function (data) {
            finding = data.find((data) => data.songID == ID)
            document.getElementById("currTitle").innerHTML = finding.title
            document.getElementById("currArtist").innerHTML = finding.artist
            editForm.addEventListener('submit', async function (event) {
                event.preventDefault()
                newTitle = event.target.elements.newSongTitle.value
                newArtist = event.target.elements.newSongArtist.value
                song = {
                    id: finding.songID,
                    title: newTitle,
                    artist: newArtist,
                    dateAdded: finding.dateAdded,
                    favorited: 'false',
                    deleted: finding.deleted,
                    numID: finding.numID,
                }
                await fetch(newUrl, {
                    method: 'PUT',
                    headers: {
                        accept: '*/*',
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(song),
                })
            location.reload()
        })
    }
)}
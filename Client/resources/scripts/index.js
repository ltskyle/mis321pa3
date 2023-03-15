const url = 'https://localhost:7095/api/Song'
let app = document.getElementById('app')
let data
let mySongs = []

const getSongs = function () {
    fetch(url).then(function (response) {
        return response.json()
    }).then(function(data) {
        makeTable(data)
    })
}

getSongs()

function handleOnLoad(mySongs) {
    // addForm(mySongs)
    // favoriteSong(mySongs)
    // deleteSong(mySongs)
}

const createSong = async (event) => {
    event.preventDefault();
    const target = event.target;
    let id = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
                /[018]/g,
                (c) =>
                    (
                        c ^
                        (crypto.getRandomValues(new Uint8Array(1))[0] &
                            (15 >> (c / 4)))
                    ).toString(16))
    const song = {
        songID: id,
        title: target.songTitle.value,
        artist: target.songArtist.value,
        dateAdded: new Date().toLocaleDateString().slice(0, 10).toString(),
        favorited: "false",
        deleted: "false",
    }
    console.log(JSON.stringify(song))
    await fetch(url, {
        method: "POST",
        headers: {
            accept: "*/*",
            "Content-type": "application/json",
        },
        body: JSON.stringify(song)
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

    mySongs.unshift(newSong)
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

const favoriteSong = async (event) => {
    event.preventDefault()
    const target = event.target
    const song = {
        title: target.songTitle.value,
        artist: target.songArtist.value,
        favorited: 'true',
    }
    console.log(JSON.stringify(song))
    await fetch(url, {
        method: 'PUT',
        headers: {
            accept: '*/*',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(song),
    })
    addRow(song)
    location.reload()
}
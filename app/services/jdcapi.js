export default class JdcAPI {
    constructor() {
        this.baseurl = "http://localhost:3000"
    }
    getUserInfo(id){
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/users/${id}`)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }
    getUser(data){
        const myHeaders= new Headers({"Content-Type": "application/json"})
        const myInit= {method: 'POST',headers: myHeaders, body : JSON.stringify(data) ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/auth/login`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    createUser(data){
        const myHeaders = new Headers({"Content-Type": "application/json"})
        const myInit= {method: 'POST',headers: myHeaders, body : JSON.stringify(data) ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/users`, myInit)
            .then(async res => {
                if (res.status === 201) {
                    resolve()
                } else {
                    reject(await res.json())
                }
            })
            .catch(err => reject(err)))
    }

    getUserCards(id) {
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-cards/load/${id}`)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(await res)
                }
            })
            .catch(err => reject(err)))
    }

    getCardById(id) {
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/cards/${id}`)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(await res)
                }
            })
            .catch(err => reject(err)))
    }
    getCards() {
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/cards`)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(await res)
                }
            })
            .catch(err => reject(err)))
    }

    updateUserChoseCard(user_id, id_card_user, id_card) {
        const myInit= {method: 'PUT' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/users/chose-card/${user_id}/${id_card_user}/${id_card}`,myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(await res)
                }
            })
            .catch(err => reject(err)))
    }

    updateUserInfo(data,id_user){
        const myHeaders= new Headers({"Content-Type": "application/json"})
        const myInit= {method: 'PUT',headers: myHeaders, body : JSON.stringify(data) ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/users/update/${id_user}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    checkPassword(id_user, password) {
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/users/check/password/${id_user}/${password}`)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res)
                } else {
                    reject(await res)
                }
            })
            .catch(err => reject(err)))
    }
    loadUserCardsWithoutDeck(id_user) {
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-cards/load/without-deck/${id_user}`)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(await res)
                }
            })
            .catch(err => reject(err)))
    }

    loadUserCardsWithoutOnesHeHas(id_user) {
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-cards/load/without-ones-he-has/${id_user}`)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(await res.json())
                }
            })
            .catch(err => reject(err)))
    }
    getCardsUserByUserId(id_user) {
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/cards/find-all-user-cards/${id_user}`)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(await res.json())
                }
            })
            .catch(err => reject(err)))
    }
    createUserCard(data){
        const myHeaders = new Headers({"Content-Type": "application/json"})
        const myInit= {method: 'POST',headers: myHeaders, body : JSON.stringify(data) ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-cards/buyCard`, myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve()
                } else {
                    reject(400)
                }
            })
            .catch(err => reject(err)))
    }

    getGameHistory(id_user){
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/games-history/${id_user}`)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(await res.json())
                }
            })
            .catch(err => reject(err)))
    }

    getTrophyById(id_trophy){
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/trophys/find/${id_trophy}`)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(await res.json())
                }
            })
            .catch(err => reject(err)))
    }

    getUserTrophy(id_user){
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-trophys/findAll/${id_user}`)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(await res.json())
                }
            })
            .catch(err => reject(err)))
    }

    getUserTrophyRemaining(id_user){
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-trophys/remaining-trophies/${id_user}`)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(await res.json())
                }
            })
            .catch(err => reject(err)))
    }
    createTrophyUser(id_user, name_trophy){
        const myInit= {method: 'POST'}
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-trophys/create/${id_user}/${name_trophy}`, myInit)
            .then(async res => {
                if (res.status === 200) {
                    resolve(await res.json())
                } else {
                    reject(await res.json())
                }
            })
            .catch(err => reject(err)))
    }
}
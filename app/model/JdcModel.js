import JdcAPI from "../services/jdcapi.js";

export default class JdcModel {
    constructor() {
        this.api = new JdcAPI()
    }
    async refreshToken(id_user){
        try {
            return await this.api.refreshToken(id_user)
        } catch(e) {
            navigate('login');
            sessionStorage.removeItem('token');
            localStorage.setItem('server error', "true")
            throw new Error()
        }
    }
    async getUserInfo(id){
        try {
            return await this.api.getUserInfo(id)
        } catch(e) {
            navigate('login');
            sessionStorage.removeItem('token');
            localStorage.setItem('server error', "true")
            throw new Error()
        }
    }
    async getUser(data){
        try {
            return await this.api.getUser(data)
        } catch(e) {
            if(e === 401){
                return 401
            } else {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error()
            }
        }
    }

    async createUser(data){
        try {
            return await this.api.createUser(data)
        } catch (e) {
            if (e === 400) {
                throw new Error("pseudo not unique")
            } else if (e === 401) {
                throw new Error("email not unique")
            } else if (e === 403) {
                throw new Error("email and pseudo not unique")
            } else {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error(e)
            }
        }
    }

    async getUserCards(id){
        try {
            return await this.api.getUserCards(id)
        } catch(e) {
            navigate('login');
            sessionStorage.removeItem('token');
            localStorage.setItem('server error', "true")
            throw new Error()
        }
    }
    async getCardById(id){
        try {
            return await this.api.getCardById(id)
        } catch(e) {
            navigate('login');
            sessionStorage.removeItem('token');
            localStorage.setItem('server error', "true")
            throw new Error()
        }
    }
    async updateUserChoseCard(user_id, id_card_user, id_card){
        try {
            return await this.api.updateUserChoseCard(user_id, id_card_user, id_card)
        } catch(e) {
            navigate('login');
            sessionStorage.removeItem('token');
            localStorage.setItem('server error', "true")
            throw new Error()
        }
    }

    async getCards(){
        try {
            return await this.api.getCards()
        } catch(e) {
            navigate('login');
            sessionStorage.removeItem('token');
            localStorage.setItem('server error', "true")
            throw new Error()
        }
    }
    async updateUserInfo(data, id_user){
        try {
            return await this.api.updateUserInfo(data, id_user)
        } catch(e) {
            if (e === 400) {
                throw new Error("pseudo not unique")
            } else if (e === 401) {
                throw new Error("email not unique")
            } else if (e === 403) {
                throw new Error("email and pseudo not unique")
            } else {
                navigate('login');
                sessionStorage.removeItem('token');
                localStorage.setItem('server error', "true")
                throw new Error(e)
            }
        }
    }

    async checkPassword(id_user, password){
        try {
            return await this.api.checkPassword(id_user, password)
        } catch(e) {
            Error(e)
            return e
        }
    }

    async loadUserCardsWithoutDeck(id_user){
        try {
            return await this.api.loadUserCardsWithoutDeck(id_user)
        } catch(e) {
            navigate('login');
            sessionStorage.removeItem('token');
            localStorage.setItem('server error', "true")
            throw new Error()
        }
    }
    async loadUserCardsWithoutOnesHeHas(id_user){
        try {
            return await this.api.loadUserCardsWithoutOnesHeHas(id_user)
        } catch(e) {
            navigate('login');
            sessionStorage.removeItem('token');
            localStorage.setItem('server error', "true")
            throw new Error()
        }
    }
    async getCardsUserByUserId(id_user){
        try {
            return await this.api.getCardsUserByUserId(id_user)
        } catch(e) {
            navigate('login');
            sessionStorage.removeItem('token');
            localStorage.setItem('server error', "true")
            throw new Error()
        }
    }
    async createUserCard(data){
        try {
            return await this.api.createUserCard(data)
        } catch(e) {
            navigate('login');
            sessionStorage.removeItem('token');
            localStorage.setItem('server error', "true")
            throw new Error()
        }
    }
    async getGameHistory(id_user){
        try {
            return await this.api.getGameHistory(id_user)
        } catch(e) {
            navigate('login');
            sessionStorage.removeItem('token');
            localStorage.setItem('server error', "true")
            throw new Error()
        }
    }

    async getTrophyById(id_trophy){
        try {
            return await this.api.getTrophyById(id_trophy)
        } catch(e) {
            navigate('login');
            sessionStorage.removeItem('token');
            localStorage.setItem('server error', "true")
            throw new Error()
        }
    }

    async getUserTrophy(id_user){
        try {
            return await this.api.getUserTrophy(id_user)
        } catch(e) {
            navigate('login');
            sessionStorage.removeItem('token');
            localStorage.setItem('server error', "true")
            throw new Error()
        }
    }

    async getUserTrophyRemaining(id_user){
        try {
            return await this.api.getUserTrophyRemaining(id_user)
        } catch(e) {
            navigate('login');
            sessionStorage.removeItem('token');
            localStorage.setItem('server error', "true")
            throw new Error()
        }
    }
    async createTrophyUser(id_user,name_trophy){
        try {
            return await this.api.createTrophyUser(id_user,name_trophy)
        } catch(e) {
            navigate('login');
            sessionStorage.removeItem('token');
            localStorage.setItem('server error', "true")
            throw new Error()
        }
    }
}
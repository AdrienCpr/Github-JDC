import JdcAPI from "../services/jdcapi.js";

export default class JdcModel {
    constructor() {
        this.api = new JdcAPI()
    }
    async getUserInfo(id){
        try {
            return await this.api.getUserInfo(id)
        } catch(e) {
            Error(e)
            return e
        }
    }
    async getUser(data){
        try {
            return await this.api.getUser(data)
        } catch(e) {
            Error(e)
            return e
        }
    }

    async createUser(data){
            return await this.api.createUser(data)
    }

    async getUserCards(id){
        try {
            return await this.api.getUserCards(id)
        } catch(e) {
            Error(e)
            return e
        }
    }
    async getCardById(id){
        try {
            return await this.api.getCardById(id)
        } catch(e) {
            Error(e)
            return e
        }
    }
    async updateUserChoseCard(user_id, id_card_user, id_card){
        try {
            return await this.api.updateUserChoseCard(user_id, id_card_user, id_card)
        } catch(e) {
            Error(e)
            return e
        }
    }

    async getCards(){
        try {
            return await this.api.getCards()
        } catch(e) {
            Error(e)
            return e
        }
    }
    async updateUserInfo(data, id_user){
        try {
            return await this.api.updateUserInfo(data, id_user)
        } catch(e) {
            Error(e)
            return e
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
            Error(e)
            return e
        }
    }
    async loadUserCardsWithoutOnesHeHas(id_user){
        try {
            return await this.api.loadUserCardsWithoutOnesHeHas(id_user)
        } catch(e) {
            Error(e)
            return e
        }
    }
    async getCardsUserByUserId(id_user){
        try {
            return await this.api.getCardsUserByUserId(id_user)
        } catch(e) {
            Error(e)
            return e
        }
    }
    async createUserCard(data){
        try {
            return await this.api.createUserCard(data)
        } catch(e) {
            Error(e)
            return e
        }
    }
    async getGameHistory(id_user){
        try {
            return await this.api.getGameHistory(id_user)
        } catch(e) {
            return e
        }
    }

    async getTrophyById(id_trophy){
        try {
            return await this.api.getTrophyById(id_trophy)
        } catch(e) {
            return 400
        }
    }

    async getUserTrophy(id_user){
        try {
            return await this.api.getUserTrophy(id_user)
        } catch(e) {
            return 400
        }
    }

    async getUserTrophyRemaining(id_user){
        try {
            return await this.api.getUserTrophyRemaining(id_user)
        } catch(e) {
            return 400
        }
    }
    async createTrophyUser(id_user,name_trophy){
        try {
            return await this.api.createTrophyUser(id_user,name_trophy)
        } catch(e) {
            Error(e)
            return e
        }
    }
}
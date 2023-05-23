import BaseController from "./basecontroller.js";
import JdcModel from "../model/JdcModel.js";

class webSocketController extends BaseController {
    constructor() {
        super()
        this.model = new JdcModel()

        this.socket = io("https://adriencpr.github.io/Github-JDC/");
        console.log(this.socket);
        this.searchPlayer()
    }

    createChrono() {
        var startTime = Date.now();
        var timerInterval;

        function updateTime() {
            var currentTime = Date.now();
            var elapsedTime = Math.floor((currentTime - startTime) / 1000); // en secondes
            var minutes = Math.floor(elapsedTime / 60);
            var seconds = elapsedTime % 60;
            document.getElementById("room").innerHTML =
                (minutes < 10 ? "0" + minutes : minutes) + ":" +
                (seconds < 10 ? "0" + seconds : seconds);
        }

        function startChrono() {
            startTime = Date.now();
            timerInterval = setInterval(updateTime, 1000);
        }

        function stopChrono() {
            clearInterval(timerInterval);
        }

        startChrono();

        return {
            stop: stopChrono
        };
    }

    async searchPlayer() {

        let user = await this.model.getUserInfo(decodeToken().id_user)

        let chrono = ''
        this.socket.emit('join-room', user);                           //envoie au serveur les données du joueur

        this.socket.on('joined-lobby', (roomName) => {
            console.log(`Vous avez rejoint la room: ${roomName}`);      // informe le client quelle room il a rejoint
            // document.getElementById('room').innerHTML = roomName        //affiche le nom de la room

            chrono = this.createChrono()
        });


        this.socket.on('waiting-for-player', () => {
            console.log(`En attente de joueurs`);          // informe le client qui a rejoint la room
        });

        this.socket.on('game-created', async (usersRoom) => {
            chrono.stop()
            for (const userRoom of usersRoom) {                     //Sur les utilisateurs d'une room
                if (decodeToken().id_user === userRoom.id_user) {           //Si c'est moi, affiche mes cartes
                    const CardsPlayer = await this.model.getCardsUserByUserId(userRoom.id_user)

                    let content = ``
                    CardsPlayer.forEach((Card,index) => {
                        index++
                        let figureClass = Card.type_2 ? "card--" + (Card.type_2) : "card--" + Card.type_1
                        let image = Card.image
                        let name = Card.name
                        let cardType = Card.type_2 ? Card.type_2 + '/' + Card.type_1 : Card.type_1
                        let HP = Card.HP
                        let attack = Card.attack
                        let defense = Card.defense
                        let special_attack = Card.special_attack
                        let special_defense = Card.special_defense
                        let speed = Card.speed

                        content = `${this.cardHtml(figureClass, image, name, cardType, HP, attack, defense, special_attack, special_defense, speed)}`
                        document.getElementById(`card-${index}`).innerHTML = content
                    })
                }


            }
        });

        this.socket.on('turn-player', async (userStart, userCard, RoomFull) => {
            console.log(RoomFull)
            console.log(userStart)
            const socket = this.socket;
            let userIdTurn = decodeToken().id_user
            if (userIdTurn === userStart.id_user) { //Définie a qui le tour
                document.getElementById('room').innerHTML = 'c\'est a vous de commencer'

                for (let i = 1; i <= 3; i++) {
                    let pokemonChoose = await this.model.getCardsUserByUserId(decodeToken().id_user)

                    document.getElementById(`card-${i}`).onclick = async function () {
                        let cardsIndex = ['1', '2', '3']
                        cardsIndex.splice(i - 1, 1)
                        cardsIndex.forEach(cardIndex => {
                            document.getElementById(`chose-action-${cardIndex}`).innerHTML = ''
                        })
                        if (userCard[i-1].HP > 0) {
                            let type_1 = pokemonChoose[i - 1].type_1
                            let type_2 = pokemonChoose[i - 1].type_2 ? pokemonChoose[i - 1].type_2 : null

                            let content = `<button id="attack-1-${i}" data-text="0">Normal</button>
                                           <button id="attack-2-${i}" data-text="1">${type_1}</button>`

                            if (type_2 !== null) {
                                content += `<button id="attack-3-${i}" data-text="2">${type_2}</button>`
                            }

                            document.getElementById(`chose-action-${i}`).innerHTML = content

                            document.getElementById('pokemon-player-1').innerHTML = `<img src="${pokemonChoose[i - 1].sprite}">`

                            // définir les propriétés onclick ici, après la création des boutons

                            let normalAttack = document.getElementById(`attack-1-${i}`)
                            let type1Attack = document.getElementById(`attack-2-${i}`)

                            normalAttack.onclick = function () {
                                const action = 'attack';
                                const type_action = normalAttack.dataset.text
                                socket.emit('player-action', i, action, userIdTurn, RoomFull, type_action);
                            };

                            type1Attack.onclick = function () {
                                const action = 'attack';
                                const type_action = type1Attack.dataset.text
                                socket.emit('player-action', i, action, userIdTurn, RoomFull,type_action);
                            };

                            if (type_2 !== null) {
                                let type2Attack = document.getElementById(`attack-3-${i}`)

                                type2Attack.onclick = function () {
                                    const action = 'attack';
                                    const type_action = type2Attack.dataset.text
                                    socket.emit('player-action', i, action, userIdTurn, RoomFull,type_action);
                                };
                            }
                        }
                    }
                }
            } else {
                document.getElementById('room').innerHTML = 'c\'est a l\'adversaire de jouer'
                document.getElementById(`chose-action-1`).innerHTML = ''
                document.getElementById(`chose-action-2`).innerHTML = ''
                document.getElementById(`chose-action-3`).innerHTML = ''
                document.getElementById(`card-1`).onclick = ''
                document.getElementById(`card-2`).onclick = ''
                document.getElementById(`card-3`).onclick = ''
            }
        });

        this.socket.on('display round', (J1, J2, playerFirstAndPourcent, user1turn, user2turn, playerStartResult, playerFinishResult) => {
            console.log(playerStartResult, playerFinishResult)
            document.getElementById(`chose-action-1`).innerHTML = ''
            document.getElementById(`chose-action-2`).innerHTML = ''
            document.getElementById(`chose-action-3`).innerHTML = ''
            document.getElementById(`card-1`).onclick = ''
            document.getElementById(`card-2`).onclick = ''
            document.getElementById(`card-3`).onclick = ''
            let text1 = `${J1.pseudo} ${user1turn[1]} avec son ${user1turn[0].name} et ${J2.pseudo} ${user2turn[1]} avec son ${user2turn[0].name}. `
            let text2 = `C'est ${playerFirstAndPourcent[0].pseudo} qui commence avec ${playerFirstAndPourcent[1]}% de chance de commencer en premier`
            let text3;
            let text4;

            playerStartResult[0] ? (text3 = `${playerStartResult[1].name} a tué ${playerStartResult[2].name} sans lui laissé jouer son coup`) : (text3 = `${playerStartResult[1].name} a attaqué ${playerStartResult[2].name} et l'a mit a ${playerStartResult[2].HP} HP. `)
            playerStartResult[0] ? text4 = '' : playerFinishResult[1]? (text4 = `${playerFinishResult[1].name} a riposté et a tué ${playerFinishResult[2].name}`) : (text4 = `${playerFinishResult[1].name} a attaqué ${playerFinishResult[2].name} et l'a mit a ${playerFinishResult[2].HP} HP. `);
            document.getElementById('display-result').innerHTML = `${text1}<br>${text2}<br>${text3}<br>${text4}`
            console.log(user1turn)
            console.log(user2turn)
            document.getElementById('pokemon-player-1').innerHTML = `<img src="${user1turn[0].sprite}"><br><p>attaque ${user1turn[2]} ${user1turn[3] ? user1turn[3] : ''}</p>`
            document.getElementById('pokemon-player-2').innerHTML = `<img src="${user2turn[0].sprite}"><br><p>attaque ${user2turn[2]} ${user2turn[3] ? user2turn[3] : ''}</p>`
        });

        this.socket.on('update-card', (player1 , player1Cards, player2, player2Cards) => {
            if (decodeToken().id_user === player1.id_user) {
                let content = ``
                player1Cards.forEach((Card,index) => {
                    index++
                    let figureClass = Card.HP <= 0 ? "card-pokemon" :Card.type_2 ? "card--" + (Card.type_2) : "card--" + Card.type_1
                    let image = Card.image
                    let name = Card.name
                    let cardType = Card.type_2 ? Card.type_2 + '/' + Card.type_1 : Card.type_1
                    let HP = Card.HP
                    let attack = Card.attack
                    let defense = Card.defense
                    let special_attack = Card.special_attack
                    let special_defense = Card.special_defense
                    let speed = Card.speed

                    content = `${this.cardHtml(figureClass, image, name, cardType, HP, attack, defense, special_attack, special_defense, speed)}`
                    document.getElementById(`card-${index}`).innerHTML = content
                })
            }else{
                let content = ``
                player2Cards.forEach((Card,index) => {
                    index++
                    let figureClass = Card.HP <= 0 ? "card-pokemon" :Card.type_2 ? "card--" + (Card.type_2) : "card--" + Card.type_1
                    let image = Card.image
                    let name = Card.name
                    let cardType = Card.type_2 ? Card.type_2 + '/' + Card.type_1 : Card.type_1
                    let HP = Card.HP
                    let attack = Card.attack
                    let defense = Card.defense
                    let special_attack = Card.special_attack
                    let special_defense = Card.special_defense
                    let speed = Card.speed

                    content = `${this.cardHtml(figureClass, image, name, cardType, HP, attack, defense, special_attack, special_defense, speed)}`
                    document.getElementById(`card-${index}`).innerHTML = content
                })
            }
        });

        this.socket.on('end-game', (playerWin) => {
            document.getElementById('result').innerHTML= `${playerWin.pseudo} a gagné la partie`
            document.getElementById('room').innerHTML = ''
            document.getElementById(`card-1`).innerHTML = ''
            document.getElementById(`card-2`).innerHTML = ``
            document.getElementById(`card-3`).innerHTML = ''
            document.getElementById('center-item').innerHTML = `<a onclick="navigate('home')" type="button" class="btn btn-primary">Retour à l'accueil</a>`
        });
    }
}

export default () => window.webSocketController = new webSocketController()

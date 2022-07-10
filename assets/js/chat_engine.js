class ChatEngine {
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // io is global variable  that is given by socket cdn
        this.socket = io.connect('http://localhost:5000');

        // connection handler should be called from constructor
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log("connection established using sockets..!");

            self.socket.emit('join_room',{
                user_email: self.userEmail,
                chatRoom: 'Codeial'
            });

            console.log('A user is joined');
            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })

        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            console.log("Enetered msg 1");

            if (msg != ''){
                self.socket.emit('send_message',         {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        console.log("Enetered msg 2");

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message); //remove later


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
            // console.log("Enetered msg 3");
        })
    }
}
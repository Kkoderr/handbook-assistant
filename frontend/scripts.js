const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
let chatHistory  = [];

function addMessage(text, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            messageDiv.textContent = text;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
            typingDiv.id = 'typing';
            messagesContainer.appendChild(typingDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
            const typing = document.getElementById('typing');
            if (typing) typing.remove();
        }

        const getChatResponse = async(user_input)=>{
            await sendUserInputToServer(user_input);
        }

        const sendUserInputToServer = async(user_input)=>{
            chatHistory.push({"USER":user_input});
            try{
                const response = await fetch("http://localhost:8080/user_response", {
                    method: 'POST',
                    headers:{'Content-Type':"application/json"},
                    body: JSON.stringify({chatHistory})
                });
                hideTypingIndicator();
                if(response.ok){
                    const data = await response.json();
                    console.log(data);
                    const ai_response = data['AI']
                    chatHistory.push(data);
                    addMessage(ai_response, false);
                }else{
                    chatHistory.pop();
                    addMessage("Error try again!", false);
                }
            }catch (error){
                console.error(error)
            }
        }

        async function sendMessage(){
            const text = messageInput.value.trim();
            if (!text) return;

            addMessage(text, true);
            messageInput.value = '';

            showTypingIndicator();

            await getChatResponse(text);
        }

        sendButton.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Add some interactive hover effects
        messageInput.addEventListener('focus', () => {
            document.querySelector('.input-container').style.transform = 'translateY(-2px)';
        });

        messageInput.addEventListener('blur', () => {
            document.querySelector('.input-container').style.transform = 'translateY(0)';
        });
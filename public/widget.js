/**
 * Widget Chatbot - Script d'intégration
 * À intégrer sur vos sites web (d3drone.com, monauxiliaire.com, rhilkom.com)
 */

(function() {
    'use strict';

    // Configuration
    const SUPABASE_URL = 'https://jxelniiffmaifwwoellj.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4ZWxuaWlmZm1haWZ3d29lbGxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MTU2MTYsImV4cCI6MjA3Nzk5MTYxNn0.E7tT-405eUBeXlF4_TysZUMCs-8VEWQJWD8IpPGcuu0';
    
    // Récupérer l'ID du chatbot depuis l'attribut data
    const scriptTag = document.currentScript;
    const chatbotId = scriptTag ? scriptTag.getAttribute('data-chatbot-id') : null;

    if (!chatbotId) {
        console.error('Widget Chatbot: data-chatbot-id manquant');
        return;
    }

    // Créer le conteneur du widget
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'chatbot-widget-container';
    widgetContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    // Styles du widget
    const styles = `
        #chatbot-widget-button {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        #chatbot-widget-button:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
        #chatbot-widget-button svg {
            width: 28px;
            height: 28px;
            fill: white;
        }
        #chatbot-widget-window {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 380px;
            height: 600px;
            max-height: calc(100vh - 120px);
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            display: none;
            flex-direction: column;
            overflow: hidden;
            animation: slideUp 0.3s ease-out;
        }
        #chatbot-widget-window.open {
            display: flex;
        }
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .chatbot-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .chatbot-header h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
        }
        .chatbot-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .chatbot-messages {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            background: #f7f7f7;
        }
        .chatbot-message {
            margin-bottom: 12px;
            display: flex;
            flex-direction: column;
        }
        .chatbot-message.user {
            align-items: flex-end;
        }
        .chatbot-message.bot {
            align-items: flex-start;
        }
        .chatbot-message-bubble {
            max-width: 75%;
            padding: 10px 14px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.4;
        }
        .chatbot-message.user .chatbot-message-bubble {
            background: #667eea;
            color: white;
        }
        .chatbot-message.bot .chatbot-message-bubble {
            background: white;
            color: #333;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        .chatbot-input-container {
            padding: 16px;
            background: white;
            border-top: 1px solid #e5e5e5;
            display: flex;
            gap: 8px;
        }
        .chatbot-input {
            flex: 1;
            border: 1px solid #e5e5e5;
            border-radius: 20px;
            padding: 10px 16px;
            font-size: 14px;
            outline: none;
        }
        .chatbot-input:focus {
            border-color: #667eea;
        }
        .chatbot-send {
            background: #667eea;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        }
        .chatbot-send:hover {
            background: #5568d3;
        }
        .chatbot-send svg {
            width: 20px;
            height: 20px;
            fill: white;
        }
        @media (max-width: 480px) {
            #chatbot-widget-window {
                width: calc(100vw - 40px);
                height: calc(100vh - 120px);
                right: 20px;
            }
        }
    `;

    // Ajouter les styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // HTML du widget
    widgetContainer.innerHTML = `
        <button id="chatbot-widget-button" aria-label="Ouvrir le chat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
        </button>
        <div id="chatbot-widget-window">
            <div class="chatbot-header">
                <h3>Chat avec nous</h3>
                <button class="chatbot-close" aria-label="Fermer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
            <div class="chatbot-messages" id="chatbot-messages">
                <div class="chatbot-message bot">
                    <div class="chatbot-message-bubble">
                        Bonjour! Comment puis-je vous aider aujourd'hui?
                    </div>
                </div>
            </div>
            <div class="chatbot-input-container">
                <input 
                    type="text" 
                    class="chatbot-input" 
                    id="chatbot-input" 
                    placeholder="Écrivez votre message..."
                    autocomplete="off"
                />
                <button class="chatbot-send" id="chatbot-send" aria-label="Envoyer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(widgetContainer);

    // Variables
    let isOpen = false;
    let conversationId = null;
    let clientId = null;

    // Éléments DOM
    const button = document.getElementById('chatbot-widget-button');
    const window = document.getElementById('chatbot-widget-window');
    const closeBtn = document.querySelector('.chatbot-close');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const messagesContainer = document.getElementById('chatbot-messages');

    // Toggle widget
    function toggleWidget() {
        isOpen = !isOpen;
        window.classList.toggle('open', isOpen);
        if (isOpen) {
            input.focus();
            if (!conversationId) {
                initializeConversation();
            }
        }
    }

    button.addEventListener('click', toggleWidget);
    closeBtn.addEventListener('click', toggleWidget);

    // Initialiser la conversation
    async function initializeConversation() {
        try {
            // Créer le client
            const clientData = {
                name: 'Visiteur',
                email: null,
                origin: (typeof window !== 'undefined' && window.location) ? window.location.hostname : 'unknown',
                location: await getClientLocation(),
                visit_info: {
                    page: (typeof window !== 'undefined' && window.location) ? window.location.href : '',
                    referrer: (typeof document !== 'undefined') ? document.referrer : '',
                    userAgent: (typeof navigator !== 'undefined') ? navigator.userAgent : ''
                }
            };

            const clientResponse = await fetch(`${SUPABASE_URL}/rest/v1/clients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(clientData)
            });

            const [client] = await clientResponse.json();
            clientId = client.id;

            // Récupérer le chatbot
            const chatbotResponse = await fetch(
                `${SUPABASE_URL}/rest/v1/chatbots?script_id=eq.${chatbotId}&select=*`,
                {
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                    }
                }
            );

            const [chatbot] = await chatbotResponse.json();

            if (!chatbot) {
                console.error('Chatbot non trouvé');
                return;
            }

            // Créer la conversation
            const conversationData = {
                chatbot_id: chatbot.id,
                client_id: clientId,
                status: 'active',
                is_bot_active: true,
                unread_count: 0
            };

            const conversationResponse = await fetch(`${SUPABASE_URL}/rest/v1/conversations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(conversationData)
            });

            const [conversation] = await conversationResponse.json();
            conversationId = conversation.id;

        } catch (error) {
            console.error('Erreur initialisation conversation:', error);
        }
    }

    // Obtenir la localisation du client
    async function getClientLocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return {
                city: data.city,
                country: data.country_name,
                ip: data.ip
            };
        } catch {
            return null;
        }
    }

    // Envoyer un message
    async function sendMessage() {
        const message = input.value.trim();
        if (!message || !conversationId) return;

        // Afficher le message de l'utilisateur
        addMessageToUI(message, 'user');
        input.value = '';

        try {
            // Sauvegarder dans Supabase
            await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                },
                body: JSON.stringify({
                    conversation_id: conversationId,
                    sender_type: 'client',
                    content: message,
                    attachments: []
                })
            });

            // Simuler une réponse du bot (vous pouvez intégrer Gemini ici)
            setTimeout(() => {
                addMessageToUI('Merci pour votre message! Un agent va vous répondre dans quelques instants.', 'bot');
            }, 1000);

        } catch (error) {
            console.error('Erreur envoi message:', error);
        }
    }

    // Ajouter un message à l'interface
    function addMessageToUI(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}`;
        messageDiv.innerHTML = `
            <div class="chatbot-message-bubble">${escapeHtml(text)}</div>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Échapper le HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    console.log('Widget Chatbot initialisé pour:', chatbotId);
})();

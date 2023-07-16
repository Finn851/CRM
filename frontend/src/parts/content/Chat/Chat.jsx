import './Chat.css'
const Chat = () => {
    return (
        <div class="chat">
            <div class="chat-container">
                <div class="chat-list">
                    <div class="chat-item active">
                        <div class="avatar">
                            <img src="avatar1.jpg" alt="User Avatar" />
                        </div>
                        <div class="user-info">
                            <h3>User 1</h3>
                            <p>Last message...</p>
                        </div>
                        <div class="message-time">12:30 PM</div>
                    </div>
                    <div class="chat-item">
                        <div class="avatar">
                            <img src="avatar2.jpg" alt="User Avatar" />
                        </div>
                        <div class="user-info">
                            <h3>User 2</h3>
                            <p>Last message...</p>
                        </div>
                        <div class="message-time">Yesterday</div>
                    </div>
                    <div class="chat-item">
                        <div class="avatar">
                            <img src="avatar3.jpg" alt="User Avatar" />
                        </div>
                        <div class="user-info">
                            <h3>User 3</h3>
                            <p>Last message...</p>
                        </div>
                        <div class="message-time">Mon</div>
                    </div>
                </div>
                <div class="chat-content">
                    <div class="chat-header">
                        <h1>Chat with User 1</h1>
                        <p>User 1 was online 12:27</p>
                    </div>
                    <div class="chat-messages">
                        <div class="message other">
                            <div class="avatar">
                                <img src="avatar1.jpg" alt="User Avatar" />
                            </div>
                            <p>Hello, how are you?</p>
                        </div>
                        <div class="message mine">
                            <div class="avatar">
                                <img src="avatar2.jpg" alt="User Avatar" />
                            </div>
                            <p>I'm doing great, thanks!</p>
                        </div>
                    </div>
                    <div class="chat-input">
                        <input type="text" placeholder="Type your message..." />
                        <button>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat